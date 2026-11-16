pipeline {
    agent any

    options {
        disableConcurrentBuilds()
        buildDiscarder(logRotator(numToKeepStr: '10'))
        timestamps()
    }

    parameters {
        string(
            name: 'VERIFY_URL',
            defaultValue: '',
            description: 'URL base del sitio publicado, por ejemplo https://conectamayor.example. Vacío: verificar solo los archivos desplegados.'
        )
    }

    environment {
        CONECTAMAYOR_APP_DIR = '/var/www/apps/conectamayor/public'
    }

    stages {
        stage('Frontend prepare') {
            steps {
                script {
                    // Aislar imágenes, red y volumen respecto a desarrollo y otros jobs.
                    env.COMPOSE_PROJECT_NAME = "conectamayor-ci-${env.JOB_NAME}-${env.BUILD_NUMBER}"
                        .toLowerCase().replaceAll('[^a-z0-9_-]', '-')
                }

                sh '''
                    set -eu

                    command -v docker >/dev/null
                    command -v rsync >/dev/null
                    docker compose version
                    docker compose config --quiet

                    # npm ci y quasar prepare se ejecutan dentro del Dockerfile.
                    docker compose build frontend
                '''
            }
        }

        stage('Frontend build') {
            steps {
                sh '''
                    set -eu

                    # El volumen nuevo recibe las dependencias de la imagen construida.
                    # run sobrescribe el CMD de desarrollo: no inicia el servidor Quasar.
                    docker compose run --rm --no-deps \
                        -e NODE_OPTIONS=--max-old-space-size=1536 \
                        frontend npm run build

                    test -s front/dist/pwa/index.html
                    test -s front/dist/pwa/manifest.json
                    test -s front/dist/pwa/sw.js

                    printf '{"version":"%s","commit":"%s"}\\n' \
                        "$BUILD_NUMBER" "${GIT_COMMIT:-unknown}" \
                        > front/dist/pwa/version.json
                '''

                archiveArtifacts artifacts: 'front/dist/pwa/**', fingerprint: true
            }
        }

        stage('Deploy') {
            steps {
                sh '''
                    set -eu

                    mkdir -p "$CONECTAMAYOR_APP_DIR"

                    # Conservar assets antiguos para pestañas que aún usan otra versión.
                    # Publicar primero recursos y después los archivos de entrada.
                    rsync -az \
                        --exclude index.html \
                        --exclude manifest.json \
                        --exclude version.json \
                        --exclude sw.js \
                        front/dist/pwa/ "$CONECTAMAYOR_APP_DIR/"

                    staged_file=''
                    trap 'if [ -n "$staged_file" ]; then rm -f "$staged_file"; fi' EXIT HUP INT TERM

                    for entry_file in manifest.json sw.js version.json index.html; do
                        staged_file=$(mktemp "$CONECTAMAYOR_APP_DIR/.${entry_file}.XXXXXX")
                        cp "front/dist/pwa/$entry_file" "$staged_file"
                        chmod 644 "$staged_file"
                        mv -f "$staged_file" "$CONECTAMAYOR_APP_DIR/$entry_file"
                        staged_file=''
                    done
                '''
            }
        }

        stage('Verify Deployment') {
            steps {
                sh '''
                    set -eu

                    for entry_file in index.html manifest.json sw.js version.json; do
                        cmp "front/dist/pwa/$entry_file" "$CONECTAMAYOR_APP_DIR/$entry_file"
                    done

                    if [ -n "$VERIFY_URL" ]; then
                        command -v curl >/dev/null
                        checked_file=$(mktemp)
                        trap 'rm -f "$checked_file"' EXIT HUP INT TERM

                        curl --fail --silent --show-error --location \
                            --connect-timeout 10 --max-time 30 \
                            --retry 3 --retry-delay 2 --retry-connrefused \
                            --header 'Cache-Control: no-cache' \
                            "${VERIFY_URL%/}/version.json?build=$BUILD_NUMBER" \
                            --output "$checked_file"

                        if ! cmp front/dist/pwa/version.json "$checked_file"; then
                            echo '[verify] La URL no sirve la versión de esta ejecución.' >&2
                            exit 1
                        fi
                        echo '[verify] La URL sirve la versión desplegada.'
                    else
                        echo '[verify] Archivos verificados. Configurar VERIFY_URL para verificar también HTTP.'
                    fi
                '''
            }
        }
    }

    post {
        always {
            script {
                if (env.COMPOSE_PROJECT_NAME) {
                    def cleanupStatus = sh(
                        returnStatus: true,
                        script: 'docker compose down --volumes --rmi local --remove-orphans'
                    )
                    if (cleanupStatus != 0) {
                        echo 'No se pudieron limpiar todos los recursos Docker de esta ejecución.'
                    }
                }
            }
        }
    }
}

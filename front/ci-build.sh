#!/bin/sh
set -eu

# Jenkins pasa la identidad real del agente; Docker compila como root.
: "${CI_UID:?Falta el UID del agente Jenkins}"
: "${CI_GID:?Falta el GID del agente Jenkins}"
case "$CI_UID:$CI_GID" in
    *[!0-9:]*|:*|*:) echo 'UID o GID de CI inválido' >&2; exit 2 ;;
esac

restore_workspace_permissions() {
    for output_dir in .quasar dist; do
        if [ -d "$output_dir" ]; then
            chown -R "$CI_UID:$CI_GID" "$output_dir"
        fi
    done
}

# También reparar permisos si Quasar termina con un error.
trap restore_workspace_permissions EXIT

npm run build

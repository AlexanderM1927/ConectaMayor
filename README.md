# ConectaMayor

ConectaMayor será una aplicación web progresiva (PWA) orientada a personas mayores que desean aprender a realizar actividades digitales cotidianas y reconocer situaciones de fraude. Ofrecerá instrucciones sencillas, tutoriales interactivos, simulaciones seguras y ejercicios que cada persona podrá completar a su propio ritmo.

La aplicación funcionará exclusivamente en el cliente, sin backend. El progreso, las respuestas y las preferencias se guardarán en IndexedDB, dentro del navegador del dispositivo utilizado.

## Estado del proyecto

**Etapa actual: preparación del entorno de desarrollo.** Se dispone de una base Quasar con Vue Router, Pinia, configuración PWA y Docker Compose para el frontend. La pantalla inicial es provisional. Los módulos educativos, la persistencia en IndexedDB y los entregables de diseño y accesibilidad siguen pendientes.

## Objetivos

- Facilitar el uso de herramientas digitales mediante prácticas guiadas y repetibles.
- Enseñar a identificar mensajes sospechosos, enlaces engañosos y solicitudes de información personal.
- Ofrecer una experiencia legible, accesible y predecible, con botones grandes y lenguaje claro.
- Permitir continuar el aprendizaje sin conexión una vez que los recursos necesarios estén disponibles localmente.
- Registrar el aprendizaje en el dispositivo sin solicitar cuentas ni datos personales reales.

## Alcance

La primera versión incluirá un menú principal, tutoriales de actividades cotidianas, ejemplos de fraudes, simulaciones interactivas, evaluaciones básicas, seguimiento del progreso y una sección de ayuda y ajustes de accesibilidad.

Se distribuirá únicamente como PWA, utilizable desde el navegador e instalable cuando este lo permita. No se desarrollarán aplicaciones nativas ni se incorporarán Capacitor, autenticación, API de negocio, base de datos remota o sincronización entre dispositivos. Las prácticas no enviarán mensajes, efectuarán pagos ni abrirán enlaces sospechosos reales.

## Referencia de desarrollo

- Vue 3 y Quasar para las pantallas y componentes.
- Vue Router para conectar las secciones.
- Pinia para el estado compartido durante el uso de la aplicación.
- Separación entre `layouts`, `pages`, `components`, `composables`, `services`, `stores` y `utils`.
- Configuración PWA, manifiesto y service worker.

Se adaptarán estas convenciones al aprendizaje digital y la persistencia local. Los servicios de ConectaMayor accederán a IndexedDB; no se trasladarán los módulos de backend, autenticación, IA o despliegue nativo de la referencia.

## Arquitectura propuesta

| Capa | Tecnología o responsabilidad |
| --- | --- |
| Interfaz | Vue 3, Quasar 2 y estilos adaptables a móvil, tableta y escritorio |
| Construcción | Quasar CLI con Vite, JavaScript y ESLint, siguiendo la referencia |
| Navegación | Vue Router con rutas simples y nombres visibles en español |
| Estado en memoria | Pinia; se inicializará desde la persistencia local |
| Persistencia | IndexedDB mediante una capa centralizada de acceso a datos |
| Contenido educativo | Archivos locales versionados y empaquetados con la aplicación |
| Uso sin conexión | Service worker y Cache Storage para archivos y contenido estático |
| Instalación | Manifiesto PWA, iconos e instrucciones según el navegador |
| Publicación | Alojamiento estático servido por HTTPS |
| Desarrollo local | Docker Compose con un único servicio `frontend`, siguiendo la referencia |

```text
Persona usuaria
      |
      v
PWA: pantallas y componentes
      |
      +-- Vue Router: navegación
      +-- Pinia: estado de la sesión de uso
      +-- Servicios locales --> IndexedDB: progreso, intentos y ajustes
      +-- Contenido educativo incluido en la aplicación
      +-- Service worker --> Cache Storage: recursos para uso sin conexión
```

IndexedDB almacenará datos de uso; Cache Storage conservará los recursos de la PWA. La interfaz accederá a los datos mediante servicios, sin duplicar la lógica de persistencia en las pantallas. El alojamiento estático solo entregará archivos y no procesará información de aprendizaje.

### Estructura prevista

El siguiente árbol es una propuesta; no representa archivos ya creados.

```text
ConectaMayor/
|-- README.md
|-- compose.yaml
|-- docs/
|   |-- requisitos.md
|   |-- navegacion.md
|   |-- contenidos/
|   |-- diseno/
|   |   |-- baja-fidelidad/
|   |   `-- media-fidelidad/
|   |-- accesibilidad/
|   |   |-- checklist.md
|   |   `-- registro-mejoras.md
|   `-- evidencias/
|       |-- README.md
|       `-- capturas/
`-- front/
    |-- Dockerfile
    |-- package.json
    |-- quasar.config.js
    |-- public/
    |   `-- icons/
    |-- src-pwa/
    |   |-- manifest.json
    |   `-- register-service-worker.js
    `-- src/
        |-- App.vue
        |-- assets/
        |-- boot/
        |-- components/
        |-- composables/
        |-- content/
        |-- css/
        |-- layouts/
        |-- pages/
        |-- router/
        |-- services/
        |   `-- db/
        |-- stores/
        `-- utils/
```

## Menú principal y navegación

| Sección | Función | Ruta propuesta |
| --- | --- | --- |
| Inicio | Mostrar accesos grandes a cada sección y la opción de continuar aprendiendo | `/` |
| Aprende paso a paso | Elegir y completar tutoriales cotidianos | `/aprende` |
| Reconoce los engaños | Explorar ejemplos de mensajes y fraudes con explicaciones | `/enganos` |
| Practica con seguridad | Resolver simulaciones de enlaces y solicitudes sospechosas | `/practica` |
| Pon a prueba lo aprendido | Responder preguntas y ejercicios básicos | `/evaluacion` |
| Mi progreso | Consultar actividades iniciadas, completadas y resultados | `/progreso` |
| Ayuda y ajustes | Consultar instrucciones, ajustar la lectura y gestionar datos locales | `/ayuda` |

Cada pantalla tendrá un título claro y accesos consistentes a «Inicio», «Volver» y «Ayuda». Los tutoriales utilizarán «Anterior», «Siguiente» y «Repetir paso», además de un indicador como «Paso 2 de 5». Al cambiar de pantalla, el foco se situará en el contenido principal para facilitar la orientación con teclado o lector de pantalla.

### Instrucciones de uso previstas

1. En Inicio, selecciona la actividad que quieras aprender o practicar.
2. Lee la explicación y pulsa «Comenzar».
3. Realiza cada paso. Puedes volver atrás, repetirlo o consultar la ayuda.
4. En una práctica, elige la acción que consideres más segura y revisa la explicación.
5. Consulta «Mi progreso» para continuar una actividad pendiente o repetir una terminada.
6. En «Ayuda y ajustes», cambia el tamaño del texto o consulta cómo instalar la aplicación.

Las instrucciones se mostrarán dentro de cada módulo, cerca de la acción correspondiente. Se evitarán tecnicismos, párrafos extensos y botones identificados únicamente por un icono.

## Contenido educativo

### Tutoriales interactivos

Los temas iniciales propuestos son enviar un mensaje de prueba, reconocer un contacto, buscar información, ajustar el tamaño del texto e identificar las partes de un enlace. Cada tutorial contendrá un objetivo, una explicación breve, pasos numerados, una demostración interactiva, ayuda contextual y un cierre con lo aprendido.

Las actividades se realizarán en interfaces simuladas con contactos y datos ficticios. No requerirán acceder a cuentas, contactos o aplicaciones personales. Se podrá repetir cualquier paso y salir conservando el avance confirmado.

### Mensajes sospechosos y fraudes

Se prepararán ejemplos de premios inexistentes, suplantación de familiares, avisos bancarios falsos y solicitudes urgentes de contraseñas o códigos. Cada caso explicará las señales de alerta y una acción segura, como detenerse y verificar por un canal conocido.

Los mensajes legítimos de comparación también serán ficticios. Se enseñará a considerar varias señales; la apariencia o la ausencia de errores ortográficos no bastarán para declarar confiable un mensaje.

### Simulaciones seguras

- Mostrar una etiqueta permanente: «Práctica: todos los datos son ficticios».
- Representar enlaces y solicitudes mediante componentes internos de la aplicación.
- Usar direcciones ficticias, como `https://premio.example`, mostradas como texto y sin navegación externa.
- Ofrecer decisiones como «No compartir», «Verificar por otro medio» o «Ignorar el mensaje».
- No solicitar ni guardar contraseñas, códigos, documentos, teléfonos o información bancaria reales.
- Explicar qué podría ocurrir ante una decisión riesgosa sin realizar esa acción fuera de la simulación.

### Preguntas y retroalimentación

Las evaluaciones combinarán selección de respuestas, identificación de señales de alerta y elección de acciones seguras. No tendrán límite de tiempo, permitirán reintentos y explicarán cada respuesta.

| Resultado | Ejemplo de mensaje |
| --- | --- |
| Respuesta correcta | «Correcto. No compartas tus códigos. Verifica la solicitud por un medio que ya conozcas». |
| Respuesta incorrecta | «Vamos a revisarlo. El mensaje intenta apresurarte para que compartas un código. Puedes verificar la solicitud por otro medio antes de actuar». |
| Actividad terminada | «Terminaste esta práctica. Puedes repetirla o volver al inicio». |

Los mensajes serán respetuosos, específicos y visibles hasta que la persona decida continuar. El texto y los indicadores accesibles acompañarán los colores y los iconos.

## Requisitos funcionales

| ID | Requisito | Criterio de aceptación |
| --- | --- | --- |
| RF-01 | Mostrar un menú principal organizado | Todas las secciones se abren desde Inicio con botones de texto claro. |
| RF-02 | Proporcionar instrucciones de navegación | Cada módulo explica cómo comenzar, avanzar, repetir y salir. |
| RF-03 | Ofrecer tutoriales interactivos | Cada tutorial tiene pasos, práctica, ayuda y opción de retomarlo. |
| RF-04 | Presentar ejemplos educativos de fraude | Cada ejemplo incluye señales de alerta y una acción segura explicada. |
| RF-05 | Simular situaciones sospechosas | Las decisiones tienen consecuencias educativas internas y no usan datos reales. |
| RF-06 | Evaluar el aprendizaje | Existen preguntas básicas y ejercicios con reintentos sin límite de tiempo. |
| RF-07 | Dar retroalimentación inmediata | Cada respuesta muestra una explicación y una acción para continuar o reintentar. |
| RF-08 | Conectar todas las pantallas | Los recorridos permiten avanzar, volver y regresar a Inicio sin bloqueos. |
| RF-09 | Guardar progreso y preferencias | Los datos confirmados se recuperan desde IndexedDB al cerrar y reabrir la PWA. |
| RF-10 | Permitir instalación y uso sin conexión | Tras preparar la caché, los módulos incluidos funcionan sin red; la instalación se explica según el navegador. |
| RF-11 | Gestionar los datos locales | Se puede consultar su alcance y borrarlos mediante una confirmación explícita. |
| RF-12 | Comunicar problemas de almacenamiento | Si IndexedDB falla o falta espacio, se informa que el avance no pudo guardarse y se ofrece reintentar. |

## Accesibilidad y facilidad de uso

Los siguientes son objetivos de diseño y criterios de revisión del proyecto. Su cumplimiento deberá demostrarse con verificaciones registradas; este README no declara una certificación de accesibilidad.

| ID | Criterio verificable |
| --- | --- |
| RA-01 | Texto principal de al menos 20 px por defecto, tipografía legible e interlineado de al menos 1,5; tamaño ajustable. |
| RA-02 | Botones principales con área interactiva mínima de 48 × 48 píxeles CSS y separación suficiente para evitar pulsaciones accidentales. |
| RA-03 | Contraste mínimo objetivo de 4,5:1 para texto normal, 3:1 para texto grande y 3:1 para controles e indicadores visuales necesarios. |
| RA-04 | Todas las acciones se pueden completar con teclado, con foco visible y sin trampas de foco. |
| RA-05 | Encabezados ordenados, regiones semánticas, etiquetas de controles y alternativas de texto para imágenes informativas. |
| RA-06 | Los estados, errores y resultados se expresan con texto y se anuncian a lectores de pantalla cuando corresponde. |
| RA-07 | El aumento de texto al 200 % y la vista de 320 píxeles CSS de ancho conservan contenido y controles sin desplazamiento horizontal innecesario. |
| RA-08 | Instrucciones breves, una acción principal por paso y etiquetas consistentes entre pantallas. |
| RA-09 | Sin ejercicios cronometrados, destellos, audio automático ni movimiento indispensable; respetar la preferencia de movimiento reducido. |
| RA-10 | Ayuda disponible, reintentos sin penalización y confirmación antes de borrar datos. |

La revisión combinará mediciones de contraste, herramientas automáticas y recorridos manuales con teclado, lector de pantalla, zoom y dispositivos táctiles. Se realizarán sesiones de usabilidad con personas mayores cuando sea posible, registrando sus dificultades sin incluir datos personales en las evidencias.

## Persistencia local y privacidad

La base IndexedDB propuesta se llamará `conectamayor`. Tendrá un esquema versionado y migraciones que preserven el progreso existente.

| Almacén | Datos previstos |
| --- | --- |
| `preferences` | Tamaño de texto, opciones de accesibilidad y preferencias de interfaz |
| `progress` | Identificador de actividad, versión del contenido, paso actual, estado y fecha de actualización |
| `attempts` | Identificador del ejercicio, respuestas seleccionadas, resultado y fecha del intento |
| `metadata` | Versión del contenido y datos auxiliares de la aplicación |

El contenido educativo se distribuirá con la PWA. Pinia reflejará el estado de uso y los servicios confirmarán las escrituras en IndexedDB antes de mostrar «Guardado». Las actualizaciones del contenido identificarán su versión para evitar asociar respuestas antiguas a preguntas modificadas.

Los datos pertenecerán al navegador, perfil y origen donde se utilice la aplicación. No se sincronizarán ni se enviarán a servidores. Borrar los datos del sitio, usar navegación privada o cambiar de navegador puede hacer que el progreso no esté disponible. La ayuda deberá explicar estas condiciones con lenguaje sencillo.

Si el almacenamiento no está disponible, se informará que la sesión puede continuar sin conservar el avance. No se sustituirá silenciosamente IndexedDB por otro mecanismo. El borrado local eliminará progreso, intentos y preferencias después de confirmar la acción; no se incorporarán analítica remota ni rastreadores.

## Comportamiento PWA previsto

- El primer acceso necesitará conexión para descargar los recursos de la aplicación.
- El service worker preparará la interfaz, los iconos y el contenido educativo para su uso sin conexión. Las fuentes y demás recursos necesarios se distribuirán localmente.
- Se indicará cuándo los recursos estén listos para trabajar sin conexión y cuándo una operación no esté disponible.
- Una actualización mostrará un aviso y permitirá guardar el avance antes de recargar; actualizar la caché no deberá borrar IndexedDB.
- El manifiesto definirá nombre, iconos, colores, inicio y visualización independiente.
- La versión publicada usará HTTPS. La instalación dependerá de las capacidades del navegador y tendrá instrucciones alternativas cuando no exista un aviso de instalación.

## Diseño y documentación

Los bocetos de baja fidelidad definirán distribución, jerarquía, botones y recorridos. Las pantallas de media fidelidad incorporarán tipografía, contraste, espaciado, textos y estados de interacción. Ambos niveles deberán cubrir Inicio, listado de tutoriales, tutorial paso a paso, ejemplo de fraude, simulación, evaluación, retroalimentación, progreso y ayuda.

También se documentarán los estados sin progreso, sin conexión y con error de guardado. La lista de accesibilidad registrará criterio, pantalla, método, resultado, evidencia y mejora pendiente. El registro de mejoras indicará problema, cambio aplicado y resultado de la revisión posterior.

Las evidencias se organizarán por fase y pantalla, con nombres descriptivos como `media-fidelidad-inicio-v01.png`. Su índice incluirá fecha, versión, recorrido y requisito demostrado. Las capturas utilizarán únicamente información ficticia.

## Plan de trabajo y entregables

Todas las tareas siguientes están pendientes. Se marcarán como completas cuando exista el entregable y se haya revisado su criterio de aceptación.

- [ ] Diseñar una interfaz con letras legibles, botones grandes y contraste adecuado; documentar estilos y mediciones.
- [ ] Diseñar el menú principal y organizar las secciones; entregar el mapa de navegación.
- [ ] Redactar instrucciones claras para navegar y utilizar cada módulo; incorporarlas en las pantallas.
- [ ] Diseñar tutoriales interactivos sobre actividades digitales cotidianas; entregar contenido y recorridos.
- [ ] Elaborar ejemplos educativos de mensajes sospechosos y fraudes; explicar señales y acciones seguras.
- [ ] Diseñar simulaciones de enlaces y solicitudes sospechosas con datos ficticios; comprobar que no producen acciones externas.
- [ ] Crear preguntas y ejercicios básicos; asociarlos a los objetivos de aprendizaje.
- [ ] Diseñar mensajes de retroalimentación para respuestas correctas e incorrectas; revisar claridad y tono.
- [ ] Conectar las pantallas y configurar la navegación del prototipo; verificar los recorridos completos.
- [ ] Revisar facilidad de uso, legibilidad y accesibilidad; registrar hallazgos y correcciones.
- [ ] Documentar los requisitos funcionales y de accesibilidad en `docs/requisitos.md`, partiendo de este README.
- [ ] Elaborar bocetos de baja fidelidad de las pantallas principales; guardarlos en `docs/diseno/baja-fidelidad/`.
- [ ] Elaborar las pantallas de media fidelidad del prototipo; guardarlas en `docs/diseno/media-fidelidad/`.
- [ ] Aplicar una lista de verificación de accesibilidad y registrar mejoras en `docs/accesibilidad/`.
- [ ] Organizar capturas, evidencias y documentación con un índice en `docs/evidencias/`.

## Desarrollo local con Docker

Requisito: Docker con soporte para contenedores Linux y Docker Compose. Todos los comandos siguientes se ejecutan desde `ConectaMayor/`. Node y npm se utilizan exclusivamente dentro de Docker.

Construir e iniciar el frontend:

```bash
docker compose up -d --build
```

Abrir [http://localhost:9001](http://localhost:9001). El puerto interno de Quasar es `9000`; el puerto del equipo es `9001` para evitar conflictos con la referencia. Puede cambiarse mediante `FRONTEND_PORT` en un archivo `.env` en la raíz de ConectaMayor.

Consultar el estado y los registros:

```bash
docker compose ps
docker compose logs --tail 80 frontend
```

La imagen usa Node 22 Alpine e instala las versiones resueltas en `front/package-lock.json` mediante `npm ci`. El código se monta desde `front/` para recarga automática y `node_modules` se mantiene en un volumen Docker independiente. El contenedor genera `.quasar` al arrancar. No se necesitan instalaciones globales de Quasar en el equipo.

Revisar código y generar la versión PWA de producción:

```bash
docker compose exec -T frontend npm run lint
docker compose exec -T frontend npm run build
```

La compilación genera `front/dist/pwa/`, preparada para alojamiento estático. El desarrollo también se inicia en modo PWA, pero la instalación y el uso sin conexión deben verificarse sobre la compilación de producción servida por HTTPS o en localhost.

Después de modificar dependencias, actualizar la instalación y reconstruir la imagen:

```bash
docker compose exec -T frontend npm install
docker compose up -d --build
```

En otro equipo, o para reinstalar exactamente las versiones del archivo de bloqueo en el volumen existente:

```bash
docker compose exec -T frontend npm ci
```

Detener el entorno conservando el volumen de dependencias:

```bash
docker compose down
```

La navegación utiliza rutas hash para facilitar el alojamiento estático sin reglas especiales de redirección. Las fuentes e iconos de Quasar se incluyen localmente. `idb` está instalado como base para implementar IndexedDB; todavía no se guardan datos de aprendizaje. Los iconos con las iniciales «CM» y la pantalla de bienvenida son provisionales.

### Verificación del entorno inicial

Se verificaron la configuración Compose, la instalación de dependencias y la compilación PWA dentro de Docker. La compilación generó la interfaz, el manifiesto, los iconos y el service worker en `front/dist/pwa/`. La instalación y el funcionamiento sin conexión en un navegador siguen pendientes de prueba.

La instalación conserva la rama `@quasar/app-vite` 2 de la referencia. En la auditoría inicial, `npm audit` reportó 10 avisos (3 altos, 6 moderados y 1 bajo); `npm audit --omit=dev` reportó 1 bajo en `esbuild`. `npm audit fix` no encontró una solución dentro de los rangos actuales. Queda pendiente actualizar las herramientas a la rama 3 y revisar sus cambios según la [guía oficial de Quasar](https://quasar.dev/quasar-cli-vite/upgrade-guide/). El contenedor de desarrollo se publica únicamente en la interfaz local del equipo.

## CI/CD con Jenkins

El `Jenkinsfile` contempla el ciclo del frontend: preparación, compilación PWA, despliegue estático y verificación. Node y npm se ejecutan dentro de Docker; no se necesita el plugin NodeJS de Jenkins ni una instalación global de Quasar.

Configurar el job con este repositorio y `Jenkinsfile` como ruta del pipeline. El checkout debe dejar `compose.yaml` y `front/` en la raíz del workspace del job. Si el repositorio contiene varios proyectos, seleccionar la carpeta `ConectaMayor` como raíz de ejecución del pipeline.

El agente Jenkins debe ser Linux, disponer de Docker con Compose compatible con `up --wait`, `rsync`, `curl`, `cmp` y `mktemp`, y tener permisos para usar el motor Docker y escribir en `/var/www/apps/conectamayor`. El workspace debe ser accesible para el motor Docker local, porque Compose monta `front/` durante la compilación. El agente debe estar en el servidor donde se publican los archivos; si existen varios agentes, asignar el job al agente de despliegue correspondiente.

El pipeline realiza lo siguiente:

1. Construye la imagen del frontend; el Dockerfile instala las dependencias con `npm ci` y prepara Quasar.
2. Ejecuta `ci-build.sh` en un contenedor temporal para compilar y devolver la propiedad de `.quasar/` y `dist/` al UID/GID del agente Jenkins, incluso si falla Quasar. Verifica `index.html`, `manifest.json` y `sw.js`.
3. Añade `version.json` con el número de ejecución y el commit, y archiva los archivos de la PWA en Jenkins.
4. Copia la PWA a `/var/www/apps/conectamayor/public`, conservando recursos de versiones anteriores para pestañas abiertas. Los archivos de entrada se sustituyen individualmente mediante renombrado para evitar archivos parcialmente escritos.
5. Copia la configuración de producción a `/var/www/apps/conectamayor`, construye el servidor estático y lo inicia con `compose.production.yaml`, esperando que pase su comprobación de salud.
6. Compara los archivos de entrada publicados con la compilación y comprueba por HTTP que `http://127.0.0.1:8007/version.json` corresponde a la ejecución. Si se configura `VERIFY_URL`, por ejemplo `https://conectamayor.alexanderm.co`, también verifica esa URL. Un fallo de red o una versión distinta hace fallar el pipeline.
7. Elimina los contenedores, volúmenes e imagen temporal del proyecto Compose de esa ejecución. No afecta al proyecto Compose de desarrollo ni al de producción.

El Dockerfile `front/Dockerfile` también se utiliza para compilar en CI: Jenkins sobrescribe su comando de inicio con `sh ./ci-build.sh`, por lo que no arranca el servidor de desarrollo. Este archivo no necesita cambios. `deploy/Dockerfile` crea la imagen de producción con Nginx y la configuración `deploy/nginx.conf`; sirve exclusivamente los archivos compilados, montados en modo de solo lectura.

Si Jenkins falla al crear `front/dist/pwa/version.json` con `Permission denied`, puede deberse a que una compilación anterior dejó los archivos como `root`. El script de CI corrige los directorios generados antes de devolver el control a Jenkins. Tras actualizar el repositorio, volver a ejecutar el pipeline completo; no reiniciar únicamente la etapa posterior a la compilación. El cambio de propiedad se limita a `.quasar/` y `dist/` del frontend.

El contenedor de producción publica `127.0.0.1:8007` en el servidor. Revalida los puntos de entrada de la PWA y permite caché prolongada para los recursos con hash de `assets/`. Las rutas hash de la aplicación no requieren redirección al documento inicial. No utiliza backend ni PM2.

### Producción y proxy HTTPS

La configuración de Nginx consultada en `C:\Users\johna\Documents\OLD PC\.envs\nginx\default` ya contiene el dominio `conectamayor.alexanderm.co`, sus certificados HTTPS y el proxy hacia `http://127.0.0.1:8007`. El despliegue se adapta a ese destino sin modificar ese archivo externo.

```text
https://conectamayor.alexanderm.co
    --> Nginx del servidor (HTTPS)
    --> http://127.0.0.1:8007
    --> contenedor Nginx, puerto 80
    --> /var/www/apps/conectamayor/public (PWA)
```

El dominio usa HTTPS en el Nginx externo; `8007` es el puerto HTTP interno del servidor. Desarrollo sigue usando `localhost:9001`.

Para administrar el servicio, desde `/var/www/apps/conectamayor` en el servidor:

```bash
docker compose -p conectamayor-production -f compose.production.yaml ps
docker compose -p conectamayor-production -f compose.production.yaml logs --tail 80 web
```

El servicio utiliza `restart: unless-stopped` y una comprobación de salud HTTP. El Nginx externo y sus certificados deben estar activos en el servidor; Jenkins no instala ni recarga esa configuración.

No se requieren credenciales `.env` para la configuración actual. Las variables incorporadas a una PWA son públicas y no deben contener secretos. El despliegue conserva los archivos antiguos de recursos; su limpieza se gestionará por separado cuando exista una política de retención. No se implementa rollback automático si falla la verificación posterior al despliegue.

Se verificaron localmente la compilación con un proyecto Compose aislado y la sintaxis shell de las etapas. En un contenedor temporal se comprobó la copia de archivos, la conservación de recursos antiguos y la verificación HTTP tanto con una versión correcta como con una incorrecta. También se probó el servidor de producción en `127.0.0.1:8007`: configuración Nginx válida, estado saludable, HTTP 200 para la PWA y sus puntos de entrada, cabeceras de caché previstas y HTTP 404 para archivos inexistentes. La ejecución completa del pipeline en Jenkins y el despliegue al servidor real quedan pendientes de configurar allí.

## Validación de la primera versión

Antes de considerar terminada la primera versión se comprobará que:

- Los recorridos de aprendizaje, práctica y evaluación se completan y permiten volver a Inicio.
- La recarga y reapertura conservan el progreso y las preferencias confirmadas en IndexedDB.
- El uso sin conexión funciona después de preparar la caché, incluso al reabrir la aplicación.
- Las actualizaciones conservan los datos locales y el borrado confirmado elimina los datos previstos.
- Los errores de almacenamiento se comunican sin presentar el progreso como guardado.
- Las simulaciones utilizan datos ficticios y no realizan solicitudes externas.
- Los criterios de accesibilidad se revisan y sus resultados quedan respaldados por evidencias.
- Los diseños, requisitos, instrucciones y capturas corresponden a la versión entregada.

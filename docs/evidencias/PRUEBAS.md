# Reproducción de las pruebas

El ejecutor está en `front/tests/browser.mjs`. Utiliza WebDriver y módulos nativos de Node; no añade una dependencia de navegador a la aplicación. Node y npm se ejecutan dentro del contenedor `frontend`.

La prueba usa un perfil nuevo de Chromium y borra únicamente los datos de ese perfil temporal. No ejecutar contra un perfil personal con datos que se quieran conservar.

## Preparación

1. Iniciar el frontend con `docker compose up -d` y compilar con `docker compose exec -T frontend npm run build`.
2. Preparar un contenedor Nginx con `deploy/Dockerfile` y montar `front/dist/pwa/` en `/usr/share/nginx/html`, de solo lectura.
3. Iniciar un contenedor Selenium/Chromium. Para esta revisión se utilizó `selenium/standalone-chromium:4.51.0-20261010`, con `--shm-size=1g`.
4. Los contenedores de navegador y servidor estático utilizaron `--network container:conectamayor-frontend-1`, por lo que el ejecutor accede a WebDriver en `127.0.0.1:4444` y el navegador accede a la PWA en `http://127.0.0.1:80`. No se publican nuevos puertos al equipo.
5. Opcionalmente, instalar axe-core en una carpeta temporal dentro del contenedor para repetir la auditoría automática:

```bash
docker compose exec -T frontend npm install --prefix /tmp/conectamayor-qa --no-save --package-lock=false --no-audit --no-fund axe-core
docker compose exec -T -e AXE_PATH=/tmp/conectamayor-qa/node_modules/axe-core/axe.min.js frontend node tests/browser.mjs
```

Sin axe-core, el recorrido funcional se puede ejecutar con:

```bash
docker compose exec -T frontend node tests/browser.mjs
```

El ejecutor acepta `WEBDRIVER_URL`, `APP_URL` y `EVIDENCE_DIR` para otra topología. Por defecto guarda informes y capturas en `front/.qa/`, una carpeta ignorada por Git. Las evidencias seleccionadas se copian a esta carpeta de documentación después de una ejecución correcta.

Si se reconstruye la PWA, recrear o reiniciar el contenedor estático de prueba para que su montaje apunte a la nueva carpeta generada. En producción, Jenkins copia a un directorio estable y el contenedor monta ese directorio, no `dist/pwa/` del workspace.

## Qué verifica

- Inicio e imagen local; selección de respuestas con teclado.
- Tutorial con respuesta incorrecta, reintento, reanudación tras recarga y finalización; recorridos de los otros tres tutoriales.
- Ejemplo de fraude sin enlaces activos, revelación de pistas y revisión persistida.
- Intentos correctos e incorrectos del simulador y resolución de las seis situaciones.
- Evaluación completa, resultado, revisión y recuperación tras recarga.
- Progreso derivado de datos reales del recorrido, sin datos precargados.
- Tamaño del texto, contraste, reflujo a 320 px y simulación de texto al 200 %.
- Cancelar y confirmar el borrado; los cuatro almacenes de IndexedDB se comprueban directamente.
- Excepción de cuota simulada y reintento exitoso de escrituras pendientes.
- Desconexión por Chrome DevTools Protocol, reapertura y ejercicio guardado sin red.
- Rutas inválidas, auditoría automatizada y errores inesperados de consola.

Al finalizar, retirar los contenedores temporales de navegador y servidor estático, conservando el frontend de desarrollo.

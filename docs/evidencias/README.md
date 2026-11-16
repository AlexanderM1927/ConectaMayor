# Evidencias de la primera versión

Las capturas y los informes proceden de la aplicación funcionando en Chromium, servida como PWA de producción por el Nginx del proyecto. Solo incluyen contactos, mensajes y resultados de las actividades ficticias de prueba.

## Informes

- [Resultados del recorrido funcional](resultados.json): navegador, momento de ejecución y comprobaciones completadas.
- [Auditoría automática de nueve vistas](auditoria-accesibilidad.json): infracciones reportadas y cantidad de comprobaciones aprobadas por vista.
- [Consola del navegador](consola.json): registro de la ejecución.
- [Cómo reproducir las pruebas](PRUEBAS.md).

## Capturas

| Captura | Pantalla/estado demostrado |
| --- | --- |
| [Inicio en escritorio](capturas/inicio-escritorio.png) | Bienvenida, ilustración y cuatro accesos principales a 1440 px |
| [Inicio móvil](capturas/inicio-movil.png) | Adaptación a 390 px y navegación inferior |
| [Catálogo de tutoriales](capturas/tutoriales-movil.png) | Búsqueda, tarjetas e instrucciones |
| [Paso de un tutorial](capturas/tutorial-paso-movil.png) | Reanudación después de recargar |
| [Ejemplo de prevención](capturas/prevencion-movil.png) | Mensaje ficticio y revisión de señales |
| [Respuesta en el simulador](capturas/simulador-respuesta-movil.png) | Decisión correcta y explicación |
| [Resultado de evaluación](capturas/evaluacion-resultado-movil.png) | Resultado obtenido con una respuesta incorrecta y cinco correctas |
| [Progreso](capturas/progreso-movil.png) | Contadores, logros y actividades realizadas por la prueba |
| [Ajustes ampliados](capturas/ayuda-texto-ampliado-320.png) | Texto grande y contraste a 320 px |
| [Texto al 200 %](capturas/texto-200-por-ciento-320.png) | Simulación con tamaño de raíz de 40 px y reflujo a 320 px |
| [Actividad sin conexión](capturas/tutorial-sin-conexion.png) | Reapertura offline y ejercicio interactivo |

Las capturas `vista-*.png` complementan las anteriores con las nueve vistas auditadas. Los estados muestran distintos momentos del recorrido; el borrado confirmado reinicia los datos antes de algunas pruebas de recuperación. Los informes y las capturas no representan datos de usuarios reales.

## Alcance y límites

Se comprueban los cuatro tutoriales, las seis simulaciones, la evaluación completa, la recuperación de datos, los ajustes, el borrado, los fallos de guardado y el uso sin red. La auditoría automática no reemplaza las sesiones con personas mayores, los lectores de pantalla o la instalación en teléfonos físicos. Esas revisiones se mantienen pendientes en la [lista de accesibilidad](../accesibilidad/checklist.md).

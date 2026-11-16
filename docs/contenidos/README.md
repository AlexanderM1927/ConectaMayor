# Contenidos educativos

La fuente editable es [`front/src/content/learning.js`](../../front/src/content/learning.js). La interfaz no descarga contenidos de terceros. Todas las personas, mensajes y dominios son ficticios.

| Módulo | Contenido inicial |
| --- | --- |
| WhatsApp | Contacto conocido, saludo, revisión/envío y fotografía sin información privada |
| Correo electrónico | Redactar, destinatario, asunto y comprobación previa |
| Videollamadas | Contacto, botón de cámara, privacidad y colgar; sin acceso a cámara/micrófono |
| Redes sociales | Solicitudes, audiencia, publicaciones y ayuda ante insistencia |
| Prevención y simulador | Aviso bancario, premio, familiar desde otro número, código de acceso, enlace/archivo inesperado y mensaje tranquilo para comparar |
| Evaluación | Seis decisiones de comunicación, privacidad, urgencia, identidad y enlaces |

Cada paso incluye objetivo, explicación, pregunta, opciones, respuesta, retroalimentación y consejo. Una respuesta incorrecta explica el riesgo sin ridiculizar a la persona ni imponer penalizaciones. El ejemplo tranquilo recuerda que una apariencia normal tampoco garantiza autenticidad.

Las pantallas de demostración ilustran conceptos y no reproducen exactamente aplicaciones de terceros; su interfaz puede variar. Los enlaces `.example` son texto inerte. No se pide completar formularios con datos reales ni se invocan aplicaciones externas.

Al cambiar preguntas u opciones, incrementar `contentVersion` y la versión que se escribe en `metadata` para que los resultados antiguos no se interpreten como respuestas al contenido nuevo. Las revisiones deben mantener las opciones correctas coherentes con las explicaciones y revisar nuevamente los recorridos.

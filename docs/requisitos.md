# Requisitos y alcance implementado

ConectaMayor es una PWA educativa para personas mayores. Funciona sin cuentas ni backend de aplicación. El servidor de producción entrega únicamente archivos estáticos; el aprendizaje se guarda en IndexedDB.

## Requisitos funcionales

| ID | Requisito | Implementación y verificación |
| --- | --- | --- |
| RF-01 | Menú principal organizado | Inicio, tutoriales, prevención, simulador y evaluación; progreso y ayuda disponibles en el menú. Navegación superior en escritorio e inferior en móvil. |
| RF-02 | Instrucciones claras | Ayuda, introducciones, pasos numerados, botones con verbos y explicaciones junto a las actividades. |
| RF-03 | Tutoriales interactivos | WhatsApp, correo, videollamadas y redes sociales; cuatro pasos cada uno con práctica y posibilidad de repetir. |
| RF-04 | Educación sobre fraude | Seis ejemplos con pistas, explicaciones y comparación con una comunicación que permite verificar sin presión. |
| RF-05 | Simulaciones seguras | Seis decisiones interactivas. Contactos ficticios, dominios `.example`, enlaces representados como texto y ausencia de acciones externas. |
| RF-06 | Evaluación básica | Seis preguntas sin límite de tiempo, resultado, revisión de respuestas y repetición completa. |
| RF-07 | Retroalimentación | Mensaje textual e icono para aciertos y errores; los errores del tutorial permiten reintentar antes de avanzar. |
| RF-08 | Pantallas conectadas | Rutas, retorno a Inicio y a cada listado, menú completo y recuperación de identificadores inexistentes. |
| RF-09 | Persistencia local | Avance del tutorial, ejemplos revisados, intentos, evaluación y preferencias en IndexedDB. Reanudación y recarga verificadas en Chromium. |
| RF-10 | Instalación y uso sin conexión | Manifiesto, instalación cuando el navegador la ofrece, instrucciones alternativas y precaché de módulos, fuentes, iconos e ilustración. Reapertura offline verificada. Instalación manual en dispositivos físicos pendiente. |
| RF-11 | Gestión de los datos | Descripción del alcance del guardado y borrado con confirmación. Cancelar preserva datos; confirmar limpia los cuatro almacenes. |
| RF-12 | Fallos de almacenamiento | Aviso persistente, avance en memoria y cola de escrituras con reintento. Simulada una excepción de cuota y verificada la recuperación. |

## Requisitos de accesibilidad

| ID | Criterio de diseño | Evidencia o límite |
| --- | --- | --- |
| RA-01 | Texto principal de 20 px, interlineado 1,6 y tamaños 24/28 px | Estilos globales y ajustes persistidos. Texto auxiliar de menor tamaño conserva contraste. |
| RA-02 | Acciones principales de al menos 48 × 48 píxeles CSS | Botones principales de 52 px o más; respuestas como etiquetas amplias. |
| RA-03 | Contraste de texto normal objetivo de al menos 4,5:1 | Auditoría automática y ajuste del turquesa sobre el fondo menta. Ver registro de mejoras. |
| RA-04 | Teclado y foco visible | Enlaces y botones nativos, grupo de radios con navegación por flechas, enlace de salto y foco al cambiar de pantalla/paso. |
| RA-05 | Estructura y nombres accesibles | Idioma español, un encabezado principal por vista, regiones de navegación nombradas, leyendas de preguntas y etiquetas. |
| RA-06 | Mensajes accesibles sin depender del color | Retroalimentación con texto, iconos y región viva; alertas de guardado y estado de conexión. |
| RA-07 | Reflujo en pantallas estrechas y texto ampliado | Seis vistas sin desbordamiento a 320 px con texto de 28 px y escala CSS de texto al 200 %. El zoom propio de otros navegadores y los lectores de pantalla humanos siguen pendientes. |
| RA-08 | Instrucciones y etiquetas consistentes | «Comprobar», «Siguiente», «Anterior», «Volver» y «Repetir», con una decisión por paso. |
| RA-09 | Sin presión temporal o movimiento obligatorio | Actividades sin cronómetro, sin reproducción automática y ajuste de movimiento que también respeta la preferencia del sistema. |
| RA-10 | Ayuda y recuperación | Ayuda permanente, rutas de recuperación, reintentos sin penalización y confirmación de borrado. |

Las comprobaciones automáticas y de funcionamiento no equivalen a certificación de accesibilidad ni reemplazan las pruebas con personas mayores y tecnologías de asistencia.

## Modelo de datos

Base: `conectamayor`, esquema IndexedDB 1. El contenido educativo tiene su propia versión; los registros incluyen esa versión para evitar interpretar respuestas de otra revisión del contenido.

| Almacén | Clave | Contenido |
| --- | --- | --- |
| `preferences` | `interface` | Tamaño del texto, contraste y movimiento reducido |
| `progress` | `tutorial:<id>` | Paso actual, pasos resueltos, finalización y fecha |
| `progress` | `fraud:<id>` | Ejemplo revisado y fecha |
| `progress` | `assessment:basic` | Pregunta actual, respuestas, resultado y finalización |
| `attempts` | UUID generado localmente | Tipo de ejercicio, actividad, respuesta, acierto, versión y fecha |
| `metadata` | `content` | Versión del contenido |

Los intentos y el avance asociado se escriben en la misma transacción. Se serializan las escrituras y se conserva una cola si fallan. Los estados de error no anuncian que el avance esté guardado. El borrado de datos es transaccional y también limpia el estado de Pinia y los ajustes visuales.

No se solicitan contraseñas, nombres, cuentas, documentos, cámara, micrófono o contactos reales. Los datos no se sincronizan entre navegadores o dispositivos. Compartir un perfil del navegador también comparte el progreso visible. El navegador puede eliminar almacenamiento; la ayuda explica este límite.

## Contenido y resultados

Los tutoriales permiten reintentar cada paso. Las prácticas guardan tanto aciertos como errores. La evaluación permite continuar tras leer cada explicación, guarda el resultado más reciente y conserva los intentos en el historial. Repetir una evaluación inicia un nuevo recorrido. Las insignias se derivan del progreso real; no se muestran logros precargados.

Las aproximaciones de duración de los tutoriales son orientativas. No hay calificaciones oficiales, certificados, operaciones bancarias o comunicaciones externas.

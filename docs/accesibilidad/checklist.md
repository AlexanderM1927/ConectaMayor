# Lista de verificación de accesibilidad

Revisión inicial: 16 de noviembre de 2026. Alcance: Chromium de escritorio, vista móvil de 390 px, reflujo a 320 px, preferencias de lectura y auditoría automatizada de nueve vistas. Los resultados reproducibles se conservan en [evidencias](../evidencias/README.md).

| Revisión | Método | Resultado |
| --- | --- | --- |
| Idioma y títulos | DOM y axe-core | Español, título por ruta y encabezado principal por pantalla |
| Regiones y etiquetas | axe-core | Sin infracciones automáticas reportadas en las nueve vistas revisadas |
| Contraste | axe-core, colores calculados | Se corrigió el turquesa sobre menta; revisión final sin infracciones reportadas |
| Texto y botones | Inspección de CSS e interacción real | Texto principal 20 px, interlineado 1,6, ajustes 24/28 px y acciones principales de al menos 52 px |
| Selección con teclado | WebDriver y radios nativos | Flecha abajo cambia de opción; respuesta y reintento completados |
| Foco y orientación | Inspección del código y recorrido | Foco visible, enlace de salto y foco al cambiar de pantalla, paso o pregunta |
| Retroalimentación | Acierto y error en el navegador | Texto, icono y región de estado; permanece hasta la siguiente acción |
| Texto ampliado | Ajuste persistido y escala CSS al 200 % | Preferencia restaurada tras recarga; seis vistas sin desbordamiento a 320 px |
| Navegación con texto muy grande | Diseño adaptativo | Se utiliza el menú superior para evitar etiquetas comprimidas en una barra fija |
| Movimiento | CSS del sistema y ajuste local | Preferencia del sistema respetada y opción persistente para reducirlo |
| Tiempo | Revisión de ejercicios | Sin cronómetros ni tiempos de espera para responder |
| Recuperación | Pruebas de error y rutas inexistentes | Reintentos, salida al inicio y ayuda disponibles |
| Pérdida de guardado | Excepción de cuota simulada | Aviso persistente; avance en memoria y reintento que escribe en IndexedDB |
| Borrado | Cancelación y confirmación reales | Cancelar conserva los datos; confirmar elimina los cuatro almacenes |

## Revisiones humanas pendientes

- [ ] Recorrido completo con NVDA y VoiceOver, incluyendo anuncios de resultado y diálogos.
- [ ] Sesiones con personas mayores para evaluar comprensión, pulsaciones accidentales y orientación.
- [ ] Instalación, reapertura y gestos en dispositivos Android e iOS físicos.
- [ ] Comportamiento con zoom propio de diferentes navegadores y preferencias de tamaño de letra del sistema.
- [ ] Confirmar en el VPS el ciclo de actualización de una PWA ya instalada, conservando los datos locales.

Una revisión automática sin infracciones no demuestra por sí sola conformidad completa. Las mejoras y los límites se registran en [registro-mejoras.md](registro-mejoras.md).

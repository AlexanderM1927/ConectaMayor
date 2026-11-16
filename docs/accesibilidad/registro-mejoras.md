# Registro de mejoras

| Hallazgo | Cambio aplicado | Comprobación |
| --- | --- | --- |
| Los prototipos contienen texto pequeño al verse dentro del dibujo de un teléfono | Interfaz adaptable a la pantalla real; texto principal de 20 px y dos tamaños mayores | Inspección visual en escritorio/móvil y ajuste persistido tras recarga |
| Algunos enlaces y números turquesa sobre menta tenían contraste 4,44:1 | Cambiar el turquesa de interfaz de `#167d82` a `#126f74` | Auditoría final sin infracciones de contraste reportadas en las vistas revisadas |
| Una barra inferior fija comprime palabras con texto muy ampliado | Con texto muy grande, conservar el menú superior y retirar las barras comprimidas; instrucciones en Ayuda | Reflujo a 320 px y capturas con texto al 200 % |
| Los iconos aislados pueden resultar ambiguos | Etiquetas visibles en acciones y nombres accesibles en botones de ayuda, menú y progreso | Auditoría de nombres y revisión del DOM |
| Una pregunta sin agrupación nativa dificulta navegar con teclado | Fieldset, leyenda y radios con nombre compartido | Cambio de respuesta con flecha abajo y comprobación real |
| Color por sí solo no explica un resultado | Texto concreto, icono y región viva para aciertos y errores | Recorridos con respuesta incorrecta y reintento |
| Cambiar de pantalla puede desorientar | Foco al contenido, título del documento por ruta y encabezado enfocable por paso | Navegación y reanudación tras recarga |
| Un fallo de almacenamiento podría parecer un guardado exitoso | Cola local, aviso persistente, botón de reintento y estado de guardado explícito | Excepción de cuota simulada, seguida de recuperación |
| Un borrado accidental puede eliminar todo el aprendizaje | Diálogo con alcance explícito y opción de conservar los datos | Cancelación conserva; confirmación elimina los cuatro almacenes |
| Actualizar mientras hay cambios sin guardar puede perderlos | Actualización manual y deshabilitada cuando existen errores o escrituras pendientes | Revisión del flujo; ciclo instalado en VPS pendiente de prueba humana |
| Registrar de nuevo un service worker sin conexión puede generar un error esperado | Reconocer la ausencia de red y el controlador ya instalado | Reapertura y ejercicio offline sin errores inesperados en consola |
| Repetir un tutorial no debería quitar un logro ya obtenido | Conservar la finalización previa mientras se vuelve a practicar | Revisión del estado de tutorial y persistencia |

No se han realizado todavía sesiones con participantes ni pruebas humanas de lector de pantalla. No se registran resultados ficticios de esas revisiones.

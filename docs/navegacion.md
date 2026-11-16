# Navegación e instrucciones

## Mapa de pantallas

```text
Inicio /
  ├─ Tutoriales /aprende
  │    └─ Tutorial /aprende/:id → pasos → finalización → progreso u otro tutorial
  ├─ Prevención /enganos
  │    └─ Ejemplo /enganos/:id → mostrar pistas → marcar revisado → practicar
  ├─ Simulador /practica
  │    └─ Situación /practica/:id → elegir → comprobar → explicación → repetir/otra
  ├─ Evaluación /evaluacion
  │    └─ introducción → seis preguntas → resultado → repaso/repetición
  ├─ Progreso /progreso → continuar un tutorial o elegir otra actividad
  └─ Ayuda /ayuda → lectura, instrucciones, instalación, privacidad y borrado
```

Las rutas se muestran después de `/#/`. El encabezado contiene el logo con enlace al inicio, ayuda y progreso. En móvil, el menú lateral ofrece también ayuda y progreso y la barra inferior mantiene los cinco módulos principales. Una dirección o identificador inexistente muestra una salida clara al inicio.

## Texto de ayuda incorporado

1. Elige qué quieres aprender o practicar.
2. Lee la explicación sin prisa.
3. Selecciona una respuesta y pulsa «Comprobar».
4. Lee la explicación del resultado.
5. Repite si lo necesitas o continúa con «Siguiente».
6. Consulta «Mi progreso» para retomar una actividad.

Los tutoriales muestran «Paso X de 4» y no permiten avanzar a un paso nuevo sin resolver el actual. La evaluación muestra «Pregunta X de 6» y permite continuar después de revisar la explicación, aunque la respuesta haya sido incorrecta. En el simulador, una respuesta equivocada ofrece «Volver a intentarlo».

## Estados y recuperación

- **Sin actividad previa:** el progreso invita a elegir el primer tutorial; muestra contadores en cero.
- **Actividad iniciada:** se recuperan el paso y las respuestas desde IndexedDB.
- **Sin conexión:** el aviso informa que solo se podrán usar los recursos descargados. La compilación precarga los módulos incluidos.
- **Fallo de guardado:** la actividad permanece en memoria; un aviso permite reintentar. No cerrar mientras haya cambios pendientes si se desea conservarlos.
- **Nueva versión:** se ofrece actualizar después de guardar. El botón queda deshabilitado si hay escrituras pendientes o error de almacenamiento.
- **Borrado:** el diálogo explica el alcance y permite conservar los datos. Solo la confirmación los elimina.

Al navegar se actualiza el título del documento y el foco pasa al contenido. Los pasos y las preguntas enfocan su encabezado o contenedor. Los resultados de los ejercicios se anuncian como estado, sin desaparecer automáticamente.

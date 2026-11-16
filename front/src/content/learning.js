export const contentVersion = 1

export const sections = [
  {
    title: 'Tutoriales digitales',
    short: 'Aprende',
    icon: 'menu_book',
    to: '/aprende',
    tone: 'blue',
    description: 'Pequeños pasos para tu día a día.'
  },
  {
    title: 'Prevención de fraudes',
    short: 'Fraudes',
    icon: 'verified_user',
    to: '/enganos',
    tone: 'green',
    description: 'Aprende a reconocer las señales de alerta.'
  },
  {
    title: 'Simulador de riesgos',
    short: 'Práctica',
    icon: 'sports_esports',
    to: '/practica',
    tone: 'purple',
    description: 'Practica tus decisiones en un lugar seguro.'
  },
  {
    title: 'Evaluación',
    short: 'Evaluación',
    icon: 'assignment',
    to: '/evaluacion',
    tone: 'orange',
    description: 'Descubre todo lo que has aprendido.'
  }
]

const step = (title, instruction, question, options, correct, explanation, tip) => ({
  title,
  instruction,
  question,
  options,
  correct,
  explanation,
  tip
})

export const tutorials = [
  {
    id: 'mensajes',
    title: 'WhatsApp',
    subtitle: 'Envía mensajes y comparte con los tuyos',
    icon: 'chat',
    tone: 'green',
    duration: '5 min',
    skill: 'Enviar un mensaje',
    visual: 'chat',
    introduction:
      'Vamos a practicar cómo elegir un contacto, preparar un mensaje y enviarlo. Todos los contactos son ficticios.',
    steps: [
      step(
        'Elige a quién escribir',
        'Antes de empezar, busca un contacto que reconozcas. En esta práctica escribiremos a Ana, tu contacto de ejemplo.',
        '¿A quién quieres escribir?',
        ['Ana · contacto conocido', 'Número desconocido · mensaje urgente'],
        0,
        'Elegiste al contacto de ejemplo. Comprobar a quién escribes evita confusiones.',
        'Revisa el nombre y el número antes de enviar información.'
      ),
      step(
        'Prepara tu mensaje',
        'Elige un saludo para Ana. Aquí usamos mensajes preparados: no necesitas escribir datos personales.',
        '¿Qué mensaje enviarías para saludar?',
        ['Mi contraseña es 1234', 'Hola, Ana. ¿Cómo estás?'],
        1,
        'Un saludo sencillo es una buena manera de iniciar la conversación.',
        'Las contraseñas y los códigos de verificación son privados.'
      ),
      step(
        'Envía el saludo',
        'Lee de nuevo el mensaje y comprueba el destinatario. Después, utiliza el botón de enviar.',
        'Todo está correcto. ¿Qué harías ahora?',
        ['Pulsar Enviar', 'Compartir un código de seguridad'],
        0,
        '¡Mensaje de práctica enviado! No se ha enviado nada fuera de ConectaMayor.',
        'Puedes revisar el mensaje antes de enviarlo, sin apresurarte.'
      ),
      step(
        'Comparte con cuidado',
        'Ana responde y te pide una foto del jardín. Antes de compartir una imagen, revisa lo que aparece en ella.',
        '¿Qué imagen es más apropiada para esta práctica?',
        ['Un documento de identidad', 'Unas flores, sin información privada'],
        1,
        'Bien. Elegiste una foto sin datos privados. Terminaste tu primer tutorial.',
        'Pide permiso antes de compartir fotos de otras personas.'
      )
    ]
  },
  {
    id: 'correo',
    title: 'Correo electrónico',
    subtitle: 'Prepara y reconoce tus correos',
    icon: 'mail_outline',
    tone: 'blue',
    duration: '5 min',
    skill: 'Preparar un correo',
    visual: 'email',
    introduction:
      'Practica cómo preparar un correo y revisar a quién lo envías. Las direcciones que verás son ficticias.',
    steps: [
      step(
        'Empieza un correo nuevo',
        'En una aplicación de correo, la opción de redactar permite preparar un mensaje nuevo.',
        '¿Qué opción necesitas?',
        ['Redactar un mensaje', 'Borrar todos los mensajes'],
        0,
        'Correcto. Redactar abre un correo nuevo.',
        'En tu aplicación puede llamarse «Redactar», «Nuevo» o mostrarse con un lápiz.'
      ),
      step(
        'Revisa el destinatario',
        'En «Para» se coloca la dirección de la persona que recibirá el correo. La dirección de ejemplo de Ana es ana@example.com.',
        '¿Qué revisarías antes de continuar?',
        ['Solo el color del botón', 'Que la dirección sea la de Ana'],
        1,
        'Revisar la dirección completa ayuda a evitar enviar un mensaje a otra persona.',
        'Una letra diferente puede cambiar el destinatario. Estas direcciones no se utilizan para enviar correos.'
      ),
      step(
        'Añade un asunto',
        'El asunto es un título breve que explica de qué trata el correo.',
        '¿Qué asunto describe una invitación a tomar café?',
        ['Nos vemos para tomar café', 'Dejar el asunto sin título'],
        0,
        'Un asunto breve y claro ayuda a reconocer el mensaje.',
        'No necesitas escribir todo el mensaje en el asunto.'
      ),
      step(
        'Comprueba antes de enviar',
        'Revisa el destinatario, el asunto, el mensaje y los archivos adjuntos antes de enviar.',
        '¿Cuál es el siguiente paso más seguro?',
        ['Enviar sin revisar', 'Revisar todo y después enviar'],
        1,
        '¡Muy bien! Ya sabes preparar un correo con cuidado.',
        'Si algo no está claro, puedes dejar el mensaje como borrador.'
      )
    ]
  },
  {
    id: 'videollamadas',
    title: 'Videollamadas',
    subtitle: 'Acércate a tu familia, estés donde estés',
    icon: 'videocam',
    tone: 'purple',
    duration: '4 min',
    skill: 'Preparar una videollamada',
    visual: 'call',
    introduction:
      'Aprende a iniciar y terminar una videollamada de ejemplo. No se utilizarán tu cámara ni tu micrófono.',
    steps: [
      step(
        'Busca a tu contacto',
        'Comprueba que el contacto es la persona con la que quieres hablar. En esta práctica es Ana.',
        '¿Con quién iniciarías la llamada?',
        ['Con un desconocido que pide datos', 'Con Ana, tu contacto de ejemplo'],
        1,
        'Comprobar el contacto es el primer paso.',
        'Puedes acordar la llamada previamente para que ambos estén preparados.'
      ),
      step(
        'Reconoce el botón de vídeo',
        'El dibujo de una cámara suele indicar una videollamada. El teléfono suele indicar una llamada de voz.',
        '¿Qué botón elegirías para ver a la otra persona?',
        ['Videollamada · cámara', 'Eliminar contacto'],
        0,
        'Identificaste la opción de videollamada.',
        'Busca una conexión estable y un lugar con buena luz.'
      ),
      step(
        'Cuida tu privacidad',
        'Antes de usar la cámara, revisa lo que aparece detrás de ti y concede permisos solo cuando entiendas para qué se necesitan.',
        '¿Qué harías antes de activar la cámara?',
        ['Mostrar documentos personales', 'Revisar el fondo y los permisos'],
        1,
        'Muy bien. Revisar el entorno ayuda a proteger tu privacidad.',
        'En esta simulación no se solicitan permisos de cámara o micrófono.'
      ),
      step(
        'Termina la llamada',
        'Al finalizar la conversación, utiliza el botón de colgar, que suele tener el dibujo de un teléfono.',
        '¿Qué opción termina la llamada?',
        ['Colgar', 'Subir el volumen'],
        0,
        'Terminaste la videollamada de ejemplo. ¡Buen trabajo!',
        'Comprueba que la llamada haya finalizado antes de dejar el dispositivo.'
      )
    ]
  },
  {
    id: 'redes-sociales',
    title: 'Redes sociales',
    subtitle: 'Comparte y conecta con más tranquilidad',
    icon: 'people_outline',
    tone: 'pink',
    duration: '5 min',
    skill: 'Compartir con privacidad',
    visual: 'social',
    introduction:
      'Practica cómo reconocer contactos, elegir quién ve una publicación y cuidar tus datos en redes sociales.',
    steps: [
      step(
        'Reconoce una solicitud',
        'Recibir una solicitud no significa que debas aceptarla. Puedes revisar quién es la persona.',
        'No reconoces a quien te envía una solicitud. ¿Qué haces?',
        ['Verificar antes de aceptar', 'Aceptar siempre'],
        0,
        'Correcto. Puedes dejar la solicitud pendiente mientras verificas.',
        'Una foto conocida no demuestra por sí sola quién controla una cuenta.'
      ),
      step(
        'Decide quién puede verlo',
        'Antes de publicar, busca las opciones de audiencia o privacidad.',
        '¿Qué opción limita más una publicación personal?',
        ['Público: cualquier persona', 'Solo contactos de confianza'],
        1,
        'Elegir la audiencia ayuda a controlar con quién compartes.',
        'Incluso una publicación limitada puede ser copiada por otra persona.'
      ),
      step(
        'Elige qué compartir',
        'Revisa que el texto y la imagen no incluyan información que quieras mantener privada.',
        '¿Cuál de estas publicaciones cuida mejor tus datos?',
        ['Una receta sin información personal', 'Tu documento y tu dirección'],
        0,
        'Elegiste un contenido sin datos personales.',
        'Evita publicar contraseñas, documentos o tu ubicación en tiempo real.'
      ),
      step(
        'Pide ayuda si algo incomoda',
        'Puedes detener una conversación, bloquear o reportar una cuenta desde las opciones de la plataforma.',
        'Si alguien insiste en pedir información privada, ¿qué haces?',
        ['Compartirla por insistencia', 'Detenerme y buscar ayuda de confianza'],
        1,
        'Bien. Puedes decir que no, bloquear y pedir ayuda.',
        'Tómate tu tiempo. No necesitas responder de inmediato.'
      )
    ]
  }
]

export const scenarios = [
  {
    id: 'banco',
    title: 'Un aviso del banco',
    category: 'Suplantación',
    channel: 'Mensaje de texto',
    sender: 'Seguridad · remitente desconocido',
    icon: 'account_balance',
    tone: 'blue',
    message:
      'Su cuenta será bloqueada en 10 minutos. Entre en banco-seguro.example y confirme su contraseña para evitarlo.',
    link: 'https://banco-seguro.example',
    question: '¿Qué harías con este aviso?',
    options: [
      'Entrar y escribir mi contraseña',
      'Verificar por la aplicación o un teléfono que ya conozco',
      'Responder con mi código de seguridad'
    ],
    correct: 1,
    signals: [
      'La amenaza intenta apresurarte.',
      'Pide una contraseña a través de un mensaje.',
      'El enlace escrito no demuestra que sea del banco.'
    ],
    explanation:
      'Detente y verifica por un canal que ya conoces. No uses el enlace ni los datos de contacto del mensaje para comprobarlo.',
    safeExample:
      'Una notificación puede invitarte a consultar tu aplicación habitual, sin pedir contraseñas por mensaje. Aun así, entra por tu cuenta y verifica.'
  },
  {
    id: 'premio',
    title: 'Un premio inesperado',
    category: 'Premio falso',
    channel: 'Correo de ejemplo',
    sender: 'Sorteo especial · premios@example.com',
    icon: 'redeem',
    tone: 'orange',
    message:
      '¡Ganaste una tableta! No participaste, pero fuiste seleccionado. Paga el envío y envía una foto de tu documento hoy mismo.',
    link: 'https://premio.example',
    question: '¿Qué decisión protege mejor tus datos?',
    options: [
      'Enviar mi documento',
      'Pagar cuanto antes',
      'No pagar ni compartir datos y verificar el supuesto sorteo'
    ],
    correct: 2,
    signals: [
      'Anuncia un premio de un sorteo en el que no participaste.',
      'Solicita dinero y un documento.',
      'Te presiona para actuar hoy.'
    ],
    explanation:
      'Un premio inesperado que exige dinero o documentos merece desconfianza. No compartas tus datos ni pagues por presión.',
    safeExample:
      'Si participaste en un sorteo, consulta sus bases y el resultado por el canal oficial que ya conocías, sin usar el enlace recibido.'
  },
  {
    id: 'familiar',
    title: '«Cambié de número»',
    category: 'Suplantación familiar',
    channel: 'Chat de ejemplo',
    sender: 'Número nuevo · sin verificar',
    icon: 'chat_bubble_outline',
    tone: 'green',
    message:
      'Hola, soy tu nieto. Cambié de teléfono. Necesito que envíes dinero urgente. No puedo hablar, no llames y no le cuentes a nadie.',
    question: '¿Cómo comprobarías quién escribe?',
    options: [
      'Llamar al número que ya tenía guardado o consultar a otro familiar',
      'Confiar porque dice ser mi nieto',
      'Hacer lo que pide sin preguntar'
    ],
    correct: 0,
    signals: [
      'Escribe desde un número que no reconoces.',
      'Pide dinero con urgencia.',
      'Evita llamadas y pide mantenerlo en secreto.'
    ],
    explanation:
      'Verifica la identidad por un contacto que ya conocías. El nombre, la foto o una historia familiar no bastan para comprobarla.',
    safeExample:
      'Un familiar puede avisar de un cambio de número, pero puedes confirmarlo con una llamada al contacto anterior o con otra persona de confianza.'
  },
  {
    id: 'codigo',
    title: 'Un código que solo es tuyo',
    category: 'Robo de cuenta',
    channel: 'Chat de ejemplo',
    sender: 'Supuesto servicio de ayuda',
    icon: 'lock_outline',
    tone: 'purple',
    message:
      'Soy del equipo de ayuda. Te llegará un código de seis cifras. Dímelo para actualizar tu cuenta y evitar que se cierre.',
    question: '¿Qué haces con un código de acceso?',
    options: [
      'Lo envío a quien dice ser de ayuda',
      'Lo mantengo privado y verifico desde la aplicación',
      'Lo publico en un grupo'
    ],
    correct: 1,
    signals: [
      'Pide un código que puede permitir entrar a tu cuenta.',
      'Se presenta como ayuda sin que hayas solicitado soporte.',
      'Amenaza con cerrar la cuenta.'
    ],
    explanation:
      'Los códigos de acceso son privados. No se los dictes a otra persona por un chat o una llamada inesperada.',
    safeExample:
      'Puedes escribir un código en la aplicación cuando tú has iniciado el acceso y sabes qué operación estás confirmando. No lo compartas con terceros.'
  },
  {
    id: 'enlace',
    title: 'Un enlace con sorpresa',
    category: 'Enlace engañoso',
    channel: 'Correo de ejemplo',
    sender: 'Fotos compartidas · remitente desconocido',
    icon: 'link',
    tone: 'pink',
    message:
      'Alguien publicó fotos tuyas. Descarga este archivo y entra con tu correo y contraseña para verlas.',
    link: 'https://fotos-privadas.example',
    question: '¿Cuál es la acción más segura?',
    options: [
      'Descargar el archivo por curiosidad',
      'Escribir mi contraseña para comprobarlo',
      'Evitar la descarga y verificar con quien supuestamente lo envió'
    ],
    correct: 2,
    signals: [
      'Despierta curiosidad o preocupación para que abras el enlace.',
      'Solicita descargar un archivo no esperado.',
      'Pide credenciales para ver unas supuestas fotos.'
    ],
    explanation:
      'No descargues archivos inesperados ni escribas tu contraseña en un sitio al que llegaste por un mensaje sospechoso.',
    safeExample:
      'Si alguien conocido te comparte fotos, puedes preguntarle primero por un medio que ya utilizaban. Haber recibido un enlace no garantiza que sea seguro.'
  },
  {
    id: 'calma',
    title: 'Una invitación para conversar',
    category: 'Verificar con calma',
    channel: 'Chat de ejemplo',
    sender: 'Ana · contacto de ejemplo',
    icon: 'forum',
    tone: 'green',
    message:
      'Hola, ¿te viene bien que hagamos una videollamada mañana? Si quieres, llámame al número de siempre cuando puedas.',
    question: '¿Qué puedes hacer sin apresurarte?',
    options: [
      'Responder sin enviar datos privados y usar el contacto conocido',
      'Compartir mi contraseña para preparar la llamada',
      'Creer que cualquier mensaje sin errores es seguro'
    ],
    correct: 0,
    signals: [
      'No pide contraseñas, códigos ni dinero.',
      'Permite comprobar por un contacto conocido.',
      'Aun con un mensaje tranquilo, conviene revisar quién escribe.'
    ],
    explanation:
      'Puedes conversar sin compartir datos privados y verificar por el número conocido. Ninguna apariencia garantiza por sí sola que un mensaje sea auténtico.',
    safeExample:
      'Este es un ejemplo de comunicación sin señales de urgencia. Siempre puedes verificar si algo te genera dudas.'
  }
]

export const questions = [
  {
    id: 'q-contacto',
    question: 'Antes de enviar un mensaje, ¿qué conviene revisar?',
    options: [
      'El nombre y el contacto de destino',
      'Solo el tamaño de la pantalla',
      'Nada, puedo enviarlo directamente'
    ],
    correct: 0,
    explanation: 'Revisar el contacto ayuda a evitar enviar un mensaje a la persona equivocada.'
  },
  {
    id: 'q-urgencia',
    question:
      'Un mensaje te amenaza con bloquear una cuenta si no actúas en cinco minutos. ¿Qué haces?',
    options: [
      'Actuar por la urgencia',
      'Detenerme y verificar por un canal conocido',
      'Compartir mi contraseña'
    ],
    correct: 1,
    explanation:
      'La presión para actuar rápido es una señal de alerta. Tómate tiempo para verificar.'
  },
  {
    id: 'q-codigo',
    question:
      'Alguien te pide el código que acabas de recibir para entrar a tu cuenta. ¿Lo compartes?',
    options: [
      'Sí, si se presenta como ayuda',
      'Sí, si su foto parece confiable',
      'No, los códigos de acceso son privados'
    ],
    correct: 2,
    explanation: 'Compartir un código puede permitir que otra persona entre a tu cuenta.'
  },
  {
    id: 'q-foto',
    question: '¿Qué imagen protege mejor tu privacidad al compartirla?',
    options: [
      'Una foto de tus documentos',
      'Una foto de flores sin datos personales',
      'Una foto de tus claves'
    ],
    correct: 1,
    explanation:
      'Antes de compartir una imagen, comprueba que no muestre datos privados y que tengas permiso si aparecen otras personas.'
  },
  {
    id: 'q-familiar',
    question:
      'Un supuesto familiar escribe desde un número nuevo y pide dinero urgente. ¿Cómo lo verificas?',
    options: [
      'Consultando por un contacto que ya conocía',
      'Usando solo los datos del mensaje',
      'Confiando en su foto'
    ],
    correct: 0,
    explanation: 'Comprueba la identidad por un medio independiente del mensaje recibido.'
  },
  {
    id: 'q-enlace',
    question: '¿Qué demuestra que un enlace es confiable?',
    options: [
      'Que tenga un dibujo de candado',
      'Que el mensaje esté bien escrito',
      'Ninguna de esas señales basta por sí sola; necesito verificar el origen'
    ],
    correct: 2,
    explanation:
      'Una apariencia cuidada o una conexión cifrada no prueban quién está detrás de un sitio.'
  }
]

export const tutorialById = (id) => tutorials.find((item) => item.id === id)
export const scenarioById = (id) => scenarios.find((item) => item.id === id)

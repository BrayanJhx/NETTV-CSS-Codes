document.addEventListener('DOMContentLoaded', () => {
    // Crear el contenedor del mensaje
    const overlayMessage = document.createElement('div');
    overlayMessage.id = 'overlay-message';

    // Crear el contenido en modo lista
    const messageList = document.createElement('ul');
    messageList.style.listStyleType = 'none'; // Eliminar los puntos de la lista
    messageList.style.padding = '0';
    messageList.style.margin = '0';
    messageList.style.textAlign = 'left'; // Alinear el texto a la izquierda

    // Agregar ítems a la lista
    const items = [
        '°Estamos terminando el diseño de todas las secciones, por favor sean pacientes.',
        '°Empezaremos a subir contenido nuevo muy pronto, garantizado el funcionamiento en dispositivos Android, ya sea Teléfonos, Tablets o SmartTV.',
        '°La adaptación a SmarTV ha retrasado los planes, pero esperamos estar en pleno funcionamiento en los próximos días.',  
        '°Contenido y actualizaciones sorprendentes vienen en camino, un poco de paciencia por favor.'
    ];
    items.forEach(itemText => {
        const listItem = document.createElement('li');
        listItem.textContent = itemText;

        // Estilizar cada ítem (sin líneas debajo)
        Object.assign(listItem.style, {
            padding: '10px 0',
            color: 'white',
            fontSize: '16px',
        });

        messageList.appendChild(listItem);
    });

    overlayMessage.appendChild(messageList);

    // Estilo del contenedor principal
    Object.assign(overlayMessage.style, {
        position: 'fixed',
        width: '90%', // Ocupa el 90% del ancho de pantalla
        maxWidth: '900px', // Limitar el ancho máximo en pantallas grandes
        padding: '20px',
        backgroundColor: '#1A374D', // Gris azulado
        color: 'white',
        fontSize: '18px',
        textAlign: 'center',
        borderRadius: '10px',
        border: '2px solid black', // Borde negro
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.3)',
        zIndex: '10000',
        top: '45%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        cursor: 'pointer',
        transition: 'transform 0.3s ease-in-out, opacity 0.3s ease-in-out',
        boxSizing: 'border-box', // Garantizar que el padding no afecte el tamaño total
    });
    
    // Limitar el ancho en orientación vertical
    overlayMessage.style.height = 'auto'; // Ajuste dinámico según contenido
    overlayMessage.style.maxHeight = '90vh'; // Máximo 90% del alto de la pantalla
    overlayMessage.style.overflowY = 'auto'; // Habilitar scroll si el contenido es demasiado largo

    // Función para eliminar el mensaje suavemente
    const removeMessage = () => {
        overlayMessage.style.opacity = '0'; // Desvanecer el mensaje
        setTimeout(() => {
            overlayMessage.remove(); // Eliminar después de desvanecerse
        }, 300); // Tiempo suficiente para que el efecto ocurra
    };

    // Detectar interacciones para eliminar el mensaje
    overlayMessage.addEventListener('click', removeMessage); // Detectar clic directamente en el mensaje
    document.addEventListener('touchstart', removeMessage); // Detectar toque
    document.addEventListener('scroll', removeMessage); // Detectar desplazamiento

    // Agregar el mensaje al body
    document.body.appendChild(overlayMessage);
});

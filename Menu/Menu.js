(function createChatMenu() {
    // Crear la bolita flotante
    const ball = document.createElement('div');
    ball.classList.add('floating-ball');
    ball.setAttribute('title', 'Haz clic para abrir el menú');

    // Añadir el ícono de menú hamburguesa dentro de la bolita
    const menuIcon = document.createElement('div');
    menuIcon.classList.add('menu-icon');

    // Crear las tres rayitas
    for (let i = 0; i < 3; i++) {
        const span = document.createElement('span');
        menuIcon.appendChild(span);
    }

    ball.appendChild(menuIcon);

    // Crear el mensaje de movilidad
    const moveAlert = document.createElement('div');
    moveAlert.classList.add('move-alert');
    moveAlert.textContent = 'Menú deslizable';
    document.body.appendChild(moveAlert);

    // Mostrar el mensaje al cargar la página
    setTimeout(() => {
        moveAlert.style.opacity = 1; // Hacer visible el aviso
    }, 500); // Mostrar el mensaje tras 500ms para que el usuario lo vea

    // Función para ocultar el mensaje de movilidad
    const hideMoveAlert = () => {
        moveAlert.style.opacity = 0; // Ocultar el aviso
    };

    // Ocultar el mensaje al hacer clic o deslizar en cualquier parte de la pantalla
    document.addEventListener('click', hideMoveAlert);
    document.addEventListener('touchstart', hideMoveAlert);

    // Crear el contenedor del menú
    const menu = document.createElement('nav');
    menu.classList.add('chat-menu');
    menu.style.display = 'none'; // El menú estará oculto al inicio

    // Crear los elementos del menú
    const menuItems = [
        { text: 'Peliculas', href: 'go:Homeplay' },
        { text: 'Series', href: 'go:Series' },
        { text: 'Música 24/7', href: 'go:Musica247' },
        { text: 'TV En Vivo', href: 'go:Pluto TV' },
        { text: 'PlayZone', href: 'go:PlayGames'},
        { text: 'Recarga tu cuenta', href: 'go:Recarga'},
        { text: 'Actualizar App', href: 'go:Actualizar'},
        { text: 'Novedades', href: 'go:Novedades'},
        { text: 'Reportar Fallas', href: 'Reportar'}
    ];

    const ul = document.createElement('ul');
    menuItems.forEach(item => {
        const li = document.createElement('li');
        const a = document.createElement('a');
        a.textContent = item.text;
        a.href = item.href;
        li.appendChild(a);
        ul.appendChild(li);
    });

    menu.appendChild(ul);
    document.body.appendChild(ball);
    document.body.appendChild(menu);

    // Mostrar/ocultar el menú al hacer clic en la bolita
    ball.addEventListener('click', (event) => {
        event.stopPropagation(); // Detener la propagación del clic

        hideMoveAlert(); // Ocultar el aviso si se toca la bolita

        const isMenuOpen = menu.style.display === 'block';
        menu.style.display = isMenuOpen ? 'none' : 'block';
        ball.classList.toggle('menu-open', !isMenuOpen);

        // Calcular la posición del menú para centrarlo en la pantalla
        const viewportHeight = window.innerHeight;
        const viewportWidth = window.innerWidth;

        const menuHeight = menu.offsetHeight;
        const menuWidth = menu.offsetWidth;

        menu.style.top = `${(viewportHeight - menuHeight) / 2}px`; // Centrar verticalmente
        menu.style.left = `${(viewportWidth - menuWidth) / 2}px`; // Centrar horizontalmente
    });

    // Cerrar el menú al hacer clic fuera de él
    document.addEventListener('click', (event) => {
        if (!menu.contains(event.target)) {
            menu.style.display = 'none'; // Cierra el menú si haces clic fuera de él
            ball.classList.remove('menu-open'); // Quita la clase abierta
        }
    });

    // Hacer la bolita movible
    ball.addEventListener('mousedown', (event) => {
        let shiftX = event.clientX - ball.getBoundingClientRect().left;
        let shiftY = event.clientY - ball.getBoundingClientRect().top;

        const moveBall = (e) => {
            ball.style.left = `${e.clientX - shiftX}px`;
            ball.style.top = `${e.clientY - shiftY}px`;
        };

        document.addEventListener('mousemove', moveBall);

        document.addEventListener('mouseup', () => {
            document.removeEventListener('mousemove', moveBall);
        }, { once: true });
    });

    // Soporte táctil para dispositivos móviles
    ball.addEventListener('touchstart', (event) => {
        const touch = event.touches[0];
        let shiftX = touch.clientX - ball.getBoundingClientRect().left;
        let shiftY = touch.clientY - ball.getBoundingClientRect().top;

        const moveBall = (e) => {
            const touch = e.touches[0];
            ball.style.left = `${touch.clientX - shiftX}px`;
            ball.style.top = `${touch.clientY - shiftY}px`;
        };

        document.addEventListener('touchmove', moveBall);

        document.addEventListener('touchend', () => {
            document.removeEventListener('touchmove', moveBall);
        }, { once: true });
    });
})();

// Variables globales
const manualBtns = document.querySelectorAll('.manual-btn');
const slider = document.querySelector('.slider');
const totalSlides = manualBtns.length;
const slideTitle = document.getElementById('slide-title');
const slideDescription = document.getElementById('slide-description');
let currentIndex = 0;
let autoSlideInterval;
let pauseTimeout;
let isScrolling = false;

const titles = [
    "Capitan América: Brave New World",
    "Contraataque",
    "Daredevil: Born Again",
    "Erase Una Vez El Oeste",
    "El Pingüino",
    "Culpa Mia: Londres",
    "Compañera Perfecta",
    "Paradise",
    "LOTR: La Guerra De Los Rohirrim",
    "Criaturas: Linea De Extinción"
];

const descriptions = [
    "Tras reunirse con el recién elegido presidente de Estados Unidos Thaddeus Ross, Sam se verá envuelto en un incidente internacional.",
    "Tras rescatar a dos rehenes y hacerse de un nuevo enemigo, el capitán Guerrero y su escuadrón, se enfrentan a la emboscada de un grupo criminal.",
    "Un abogado ciego con habilidades especiales, lucha por la justicia, mientras que Wilson Fisk persigue sus propios objetivos políticos en NY.",
    "Miniserie Abientada en el Viejo Oeste. Sigue a una madre y su hijo mientras luchan por sobrevivir en un mundo hostil.",
    "Miniserie de DC que sigue el ascenso de Oswald Cobblepot en el inframundo criminal de Gotham tras los eventos de The Batman.",
    "Noah, quien se muda a Londres con su madre, conoce a Nick, su nuevo hermanastro. Entre ellos surge una intensa y peligrosa atracción.",
    "Un thriller de ciencia ficción donde Iris, un robot acompañante, lucha por su libertad mientras descubre la verdad sobre su existencia.",
    "Es un thriller ambientado en un búnker tras un evento apocalíptico, donde un agente del Servicio Secreto investiga el asesinato del presidente.",
    "Película animada que explora la épica defensa de Helm contra los invasores dunlendinos, siglos antes de los eventos de *El Señor de los Anillos*.",
    "Sigue a un padre y dos mujeres que enfrentan monstruosas criaturas para salvar la vida de un niño en un mundo postapocalíptico."
];

// Función para mover el carrusel
const moveSlide = () => {
    slider.style.transition = 'transform 0.5s ease-in-out';
    slider.style.transform = `translateX(-${currentIndex * 100}vw)`;
    updateButtons();
    updateTitleAndDescription();
};

// Función para reiniciar el carrusel
const resetSlider = () => {
    if (currentIndex !== totalSlides) return; // Evitamos resetear si no es necesario
    slider.style.transition = 'none';
    currentIndex = 0;
    slider.style.transform = `translateX(0)`;
    updateButtons();
    updateTitleAndDescription();
};

// Función para actualizar los botones activos
const updateButtons = () => {
    manualBtns.forEach((btn, index) => {
        btn.classList.toggle('active', index === currentIndex % totalSlides);
    });
};

// Función para actualizar título y descripción del carrusel
const updateTitleAndDescription = () => {
    const index = currentIndex % titles.length;
    slideTitle.textContent = titles[index];
    slideDescription.textContent = descriptions[index];
};

// Función para iniciar el auto-deslizamiento
const startAutoSlide = () => {
    clearInterval(autoSlideInterval); // Limpiamos cualquier intervalo anterior
    autoSlideInterval = setInterval(() => {
        if (isScrolling) return; // No hacemos nada si está interactuando
        if (currentIndex === totalSlides) {
            resetSlider();
        } else {
            currentIndex++;
            moveSlide();
        }
    }, 7000);
};

// Función para detener el auto-deslizamiento
const stopAutoSlide = () => {
    clearInterval(autoSlideInterval);
    clearTimeout(pauseTimeout);
    pauseTimeout = setTimeout(() => {
        if (!isScrolling) startAutoSlide();
    }, 7000);
};

// Gestión de clics en los botones manuales
manualBtns.forEach((btn, index) => {
    btn.addEventListener('click', () => {
        currentIndex = index;
        moveSlide();
        stopAutoSlide();
    });
});

// Evento de desplazamiento para manejar el auto-deslizamiento
window.addEventListener('scroll', () => {
    isScrolling = true;
    clearTimeout(pauseTimeout);
    pauseTimeout = setTimeout(() => {
        isScrolling = false;
        startAutoSlide();
    }, 1500);
});

// Clonación del primer elemento para efecto de continuidad
slider.appendChild(slider.firstElementChild.cloneNode(true));

slider.addEventListener('transitionend', () => {
    if (currentIndex === totalSlides) resetSlider();
});

// Función para inicializar Local Storage con imágenes cargadas
function initializeImageStorage() {
    const images = document.querySelectorAll('.contenedor-imagen a img');
    const imageData = [];

    images.forEach(img => {
        const parentLink = img.parentElement.href;
        imageData.push({
            url: img.src,
            alt: img.alt,
            link: parentLink
        });
    });

    localStorage.setItem('imageData', JSON.stringify(imageData));
}

// Función para obtener las imágenes marcadas como favoritas
function getFavorites() {
    return JSON.parse(localStorage.getItem('favorites')) || [];
}

// Función para mostrar mensajes en pantalla
function showMessage(message, icon) {
    const messageContainer = document.createElement('div');
    messageContainer.className = 'favorite-message';
    messageContainer.innerHTML = `<i class="${icon}"></i> ${message}`;
    document.body.appendChild(messageContainer);

    setTimeout(() => {
        messageContainer.remove();
    }, 3000); // El mensaje desaparece después de 3 segundos
}

// Función para agregar/quitar imágenes favoritas de Local Storage
function toggleFavorite(element) {
    const favorites = getFavorites();
    const imgElement = element.parentElement.querySelector('img');
    const parentLink = imgElement.parentElement.href;

    const favoriteData = {
        url: imgElement.src,
        alt: imgElement.alt,
        link: parentLink
    };

    const isAlreadyFavorite = favorites.some(fav => fav.url === favoriteData.url);

    if (isAlreadyFavorite) {
        const updatedFavorites = favorites.filter(fav => fav.url !== favoriteData.url);
        localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
        element.classList.remove('marcado');
        showMessage(`${imgElement.alt} se ha quitado de la lista de favoritos`, 'fa-regular fa-heart');
    } else {
        favorites.push(favoriteData);
        localStorage.setItem('favorites', JSON.stringify(favorites));
        element.classList.add('marcado');
        showMessage(`${imgElement.alt} se ha agregado a la lista de favoritos`, 'fa-solid fa-heart');
    }
}

// Función para restaurar favoritos desde Local Storage
function restoreFavorites() {
    const favorites = getFavorites();
    const favoritos = document.querySelectorAll('.favoritos');

    favoritos.forEach(fav => {
        const imgElement = fav.parentElement.querySelector('img');
        const isFavorite = favorites.some(favItem => favItem.url === imgElement.src);

        if (isFavorite) {
            fav.classList.add('marcado');
        }
    });
}

// Función para cargar datos dinámicos (fetch) y actualizar favoritos
function updateDynamicContentAndFavorites() {
    const dynamicContainer = document.getElementById('contenedor-dinamico');

    const favoritos = dynamicContainer.querySelectorAll('.favoritos');
    favoritos.forEach(fav => {
        fav.onclick = function () {
            toggleFavorite(fav);
        };
    });

    restoreFavorites();
}

// Función para cargar datos de favoritos y todo en inicialización
function initializeFavoritesAndData() {
    initializeImageStorage();

    const favoritos = document.querySelectorAll('.favoritos');
    favoritos.forEach(fav => {
        fav.addEventListener('click', () => toggleFavorite(fav));
    });

    restoreFavorites();
}

// Función del menú dinámico
function selectMenu(selectedItem, contentUrl) {
    const menuItems = document.querySelectorAll('.opcion-menu');
    menuItems.forEach(item => item.classList.remove('activa'));
    selectedItem.classList.add('activa');

    // Detenemos el carrusel mientras navegamos
    stopAutoSlide();

    if (selectedItem.textContent === "Sagas") {
        window.location.href = "go:Sagas";
        return;
    }

    if (selectedItem.textContent === "Sagas Animadas") {
        window.location.href = "go:SagasA";
        return;
    }

    if (!contentUrl) {
        const dynamicContainer = document.getElementById('contenedor-dinamico');
        dynamicContainer.innerHTML = `<p>No hay contenido disponible para esta sección.</p>`;
        // Reanudar carrusel cuando no hay contenido
        startAutoSlide();
        return;
    }

    fetch(contentUrl)
        .then(response => {
            if (!response.ok) throw new Error('Error al cargar el contenido.');
            return response.text();
        })
        .then(html => {
            const dynamicContainer = document.getElementById('contenedor-dinamico');
            dynamicContainer.innerHTML = html;

            // Actualizamos favoritos y contenido dinámico
            updateDynamicContentAndFavorites();

            // Reanudar carrusel después de completar la carga
            startAutoSlide();
        })
        .catch(error => {
            console.error('Error al cargar el contenido:', error);
            startAutoSlide(); // Reanudar carrusel incluso si hay un error
        });
}

// Inicialización
document.addEventListener('DOMContentLoaded', () => {
    const initialMenuItem = document.querySelector('.opcion-menu.activa');
    const contentUrl = 'https://raw.githubusercontent.com/BrayanJhx/NETTV-CSS-Codes/refs/heads/main/Dinamico/Accion.html'; // Enlace de GitHub
    selectMenu(initialMenuItem, contentUrl);
    startAutoSlide();
    updateTitleAndDescription();
    initializeFavoritesAndData();
});
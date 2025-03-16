const manualBtns = document.querySelectorAll('.manual-btn');
const slider = document.querySelector('.slider');
const totalSlides = manualBtns.length;
const slideTitle = document.getElementById('slide-title');
const slideDescription = document.getElementById('slide-description');

let isScrolling = false; // Detectar si el usuario está desplazándose
let currentIndex = 0;
let autoSlideInterval;
let pauseTimeout;

const titles = [
    /* 1 */ "Capitan América: Brave New World",
    /* 2 */ "Contraataque",
    /* 3 */ "Daredevil: Born Again",
    /* 4 */ "Erase Una Vez El Oeste",
    /* 5 */ "El Pingüino",
    /* 6 */ "Culpa Mia: Londres",
    /* 7 */ "Compañera Perfecta",
    /* 8 */ "Paradise",
    /* 9 */ "LOTR: La Guerra De Los Rohirrim",
    /* 10 */ "Criaturas: Linea De Extinción"
];

const descriptions = [
    /* 1 */ "Tras reunirse con el recién elegido presidente de Estados Unidos Thaddeus Ross, Sam se verá envuelto en un incidente internacional.",
    /* 2 */ "Tras rescatar a dos rehenes y hacerse de un nuevo enemigo, el capitán Guerrero y su escuadrón, se enfrentan a la emboscada de un grupo criminal.",
    /* 3 */ "Un abogado ciego con habilidades especiales, lucha por la justicia, mientras que Wilson Fisk persigue sus propios objetivos políticos en NY.",
    /* 4 */ "Miniserie Abientada en el Viejo Oeste. Sigue a una madre y su hijo mientras luchan por sobrevivir en un mundo hostil.",
    /* 5 */ "Miniserie de DC que sigue el ascenso de Oswald Cobblepot en el inframundo criminal de Gotham tras los eventos de The Batman.",
    /* 6 */ "Noah, quien se muda a Londres con su madre, conoce a Nick, su nuevo hermanastro. Entre ellos surge una intensa y peligrosa atracción.",
    /* 7 */ "Un thriller de ciencia ficción donde Iris, un robot acompañante, lucha por su libertad mientras descubre la verdad sobre su existencia.",
    /* 8 */ "Es un thriller ambientado en un búnker tras un evento apocalíptico, donde un agente del Servicio Secreto investiga el asesinato del presidente.",
    /* 9 */ "Película animada que explora la épica defensa de Helm contra los invasores dunlendinos, siglos antes de los eventos de *El Señor de los Anillos*.",
    /* 10 */ "Sigue a un padre y dos mujeres que enfrentan monstruosas criaturas para salvar la vida de un niño en un mundo postapocalíptico."
];

const updateButtons = () => {
    manualBtns.forEach((btn, index) => {
        if (index === currentIndex % totalSlides) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });
};

const updateTitleAndDescription = () => {
    const index = currentIndex % titles.length;
    slideTitle.textContent = titles[index];
    slideDescription.textContent = descriptions[index];
};

const startAutoSlide = () => {
    autoSlideInterval = setInterval(() => {
        if (isScrolling) return; // Detener transiciones mientras hay scroll

        if (currentIndex === totalSlides) {
            slider.style.transition = 'transform 0.5s ease-in-out';
            currentIndex++;
            slider.style.transform = `translateX(-${currentIndex * 100}vw)`;

            setTimeout(() => {
                slider.style.transition = 'none';
                currentIndex = 0;
                slider.style.transform = `translateX(0)`;
                updateButtons();
                updateTitleAndDescription();
            }, 500);
        } else {
            currentIndex++;
            slider.style.transition = 'transform 0.5s ease-in-out';
            slider.style.transform = `translateX(-${currentIndex * 100}vw)`;
            updateButtons();
            updateTitleAndDescription();
        }
    }, 7000); // Mantiene un intervalo de 7 segundos
};

const stopAutoSlide = () => {
    clearInterval(autoSlideInterval);
    clearTimeout(pauseTimeout);
    pauseTimeout = setTimeout(() => {
        if (!isScrolling) {
            startAutoSlide();
        }
    }, 7000); // Espera antes de reiniciar
};

manualBtns.forEach((btn, index) => {
    btn.addEventListener('click', () => {
        manualBtns[currentIndex % totalSlides].classList.remove('active');
        currentIndex = index;
        manualBtns[currentIndex].classList.add('active');
        slider.style.transition = 'transform 0.5s ease-in-out';
        slider.style.transform = `translateX(-${currentIndex * 100}vw)`;
        stopAutoSlide();
        updateTitleAndDescription();
    });
});

// Detectar el evento scroll y manejar el parpadeo
window.addEventListener('scroll', () => {
    if (!isScrolling) {
        isScrolling = true; // Bandera activa mientras se hace scroll
        clearInterval(autoSlideInterval); // Detener el carrusel automático
    }

    clearTimeout(pauseTimeout); // Reinicia el temporizador tras detener el scroll
    pauseTimeout = setTimeout(() => {
        isScrolling = false; // Marca que el scroll ha terminado
        startAutoSlide(); // Reinicia el carrusel
    }, 1500); // Tiempo de espera tras terminar de hacer scroll
});

const firstSlide = slider.firstElementChild.cloneNode(true);
slider.appendChild(firstSlide);

slider.addEventListener('transitionend', () => {
    if (currentIndex === totalSlides) {
        slider.style.transition = 'none';
        currentIndex = 0;
        slider.style.transform = `translateX(0)`;
        updateTitleAndDescription();
    }
});

startAutoSlide();
updateTitleAndDescription();

// Selección de elementos del DOM
const manualBtns = document.querySelectorAll('.manual-btn'); // Selecciona todos los botones manuales de navegación del slider
const slider = document.querySelector('.slider'); // Selecciona el contenedor del slider para moverlo
const totalSlides = manualBtns.length; // Obtiene la cantidad total de diapositivas según el número de botones manuales

let currentIndex = 0; // Variable para rastrear la diapositiva actualmente activa

// Evento de clic en los botones manuales
manualBtns.forEach((btn, index) => {
    btn.addEventListener('click', () => {
        manualBtns[currentIndex].classList.remove('active'); // Elimina la clase "active" del botón actualmente activo
        currentIndex = index; // Actualiza el índice de la diapositiva activa según el botón clicado
        manualBtns[currentIndex].classList.add('active'); // Agrega la clase "active" al botón correspondiente
        const translateXValue = `-${currentIndex * 10}%`; // Calcula la posición del slider basándose en el índice actual
        slider.style.transform = `translateX(${translateXValue})`; // Desplaza el slider a la posición calculada
        slider.style.animation = 'none'; // Desactiva la animación automática temporalmente al usar los botones manuales
    });
});

// Configuración de animación automática
setInterval(() => {
    manualBtns[currentIndex].classList.remove('active'); // Elimina la clase "active" del botón actualmente activo
    currentIndex = (currentIndex + 1) % totalSlides; // Pasa al siguiente índice (o vuelve al inicio si llega al final)
    manualBtns[currentIndex].classList.add('active'); // Agrega la clase "active" al botón correspondiente
    const translateXValue = `-${currentIndex * 10}%`; // Calcula la nueva posición del slider
    slider.style.transform = `translateX(${translateXValue})`; // Desplaza el slider a la nueva posición
}, 4000); // Cambia de diapositiva automáticamente cada 4 segundos

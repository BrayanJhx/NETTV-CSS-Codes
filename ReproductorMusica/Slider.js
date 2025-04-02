document.addEventListener("DOMContentLoaded", () => {
    new Slider(".slider", ".slider-control.left", ".slider-control.right", ".slider-title");
    new Menu(".menu-button", ".menu-options");
});

class Slider {
    constructor(sliderSelector, leftButtonSelector, rightButtonSelector, titleSelector) {
        this.slider = document.querySelector(sliderSelector);
        this.items = this.slider.querySelectorAll(".slider-item");
        this.titles = document.querySelectorAll(titleSelector);
        this.leftButton = document.querySelector(leftButtonSelector);
        this.rightButton = document.querySelector(rightButtonSelector);
        this.currentIndex = 0;
        this.autoSlide = true;
        this.autoSlideInterval = null;

        this.init();
    }

    updateTitleVisibility() {
        this.titles.forEach((title, index) => {
            title.style.display = index === this.currentIndex ? "block" : "none";
        });
    }

    slideToIndex(index) {
        const offset = -index * this.slider.clientWidth; // Calcula el desplazamiento basado en el ancho del slider
        this.slider.style.transform = `translateX(${offset}px)`; // Aplica la transición de desplazamiento
        this.currentIndex = index;
        this.updateTitleVisibility();
    }

    slideNext() {
        const nextIndex = (this.currentIndex + 1) % this.items.length;
        this.slideToIndex(nextIndex);
    }

    slidePrev() {
        const prevIndex = (this.currentIndex - 1 + this.items.length) % this.items.length;
        this.slideToIndex(prevIndex);
    }

    startAutoSlide() {
        this.autoSlideInterval = setInterval(() => {
            if (this.autoSlide) this.slideNext();
        }, 7000);
    }

    stopAutoSlide() {
        this.autoSlide = false;
        clearInterval(this.autoSlideInterval);
    }

    resumeAutoSlide() {
        this.autoSlide = true;
        this.startAutoSlide();
    }

    init() {
        // Inicializa el slider sin recordar el último índice
        this.updateTitleVisibility();

        // Inicia el auto-slide al cargar la página
        this.startAutoSlide();

        // Configuración de los botones de control
        [this.leftButton, this.rightButton].forEach(button => {
            button.addEventListener("click", () => {
                this.stopAutoSlide(); // Detiene el auto-slide al interactuar
                button === this.leftButton ? this.slidePrev() : this.slideNext();
            });
        });
    }
  }

document.addEventListener("DOMContentLoaded", () => {
    // Función para inicializar el efecto de focus
    const initializeFocusEffect = () => {
        // Seleccionar imágenes y favoritos
        const focusableElements = document.querySelectorAll(
            ".contenedor-imagen img, .favoritos"
        );

        // Iterar sobre los elementos y añadir los eventos
        focusableElements.forEach(element => {
            element.tabIndex = 0; // Hacer enfocables con teclado

            // Agregar efecto de focus
            element.addEventListener("focus", () => {
                element.style.boxShadow = "0 0 10px 3px #1e90ff";
                element.style.border = "2px solid #1e90ff";
                element.style.transform = "scale(1.05)";

                // En caso de imágenes en carruseles horizontales
                const contenedorHorizontal = element.closest(".contenedor-horiz");
                if (contenedorHorizontal) {
                    element.scrollIntoView({
                        behavior: "smooth",
                        block: "nearest",
                        inline: "center"
                    });
                }
            });

            // Remover efecto al perder foco
            element.addEventListener("blur", () => {
                element.style.boxShadow = "none";
                element.style.border = "none";
                element.style.transform = "scale(1)";
            });
        });
    };

    // Observador de cambios en el DOM para manejar contenido dinámico
    const observer = new MutationObserver(() => {
        initializeFocusEffect(); // Reaplicar los efectos en nuevos elementos
    });

    // Iniciar el observador en el contenedor principal
    const mainContainer = document.querySelector("body");
    if (mainContainer) {
        observer.observe(mainContainer, { childList: true, subtree: true });
    }

    // Inicialización principal para elementos estáticos
    initializeFocusEffect();
});
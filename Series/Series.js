// Lógica para desplegar/ocultar dropdowns
document.querySelectorAll(".menu > button").forEach(button => {
    button.addEventListener("click", event => {
        const dropdownId = button.getAttribute("data-dropdown");
        const dropdown = document.getElementById(dropdownId);

        // Alterna el estado del dropdown actual
        if (dropdown.style.display === "block") {
            dropdown.style.display = "none"; // Oculta el dropdown
        } else {
            // Cierra otros dropdowns antes de abrir el actual
            document.querySelectorAll(".dropdown").forEach(d => d.style.display = "none");
            dropdown.style.display = "block"; // Muestra el dropdown
        }

        // Posiciona dinámicamente el dropdown
        const rect = button.getBoundingClientRect();
        dropdown.style.position = "absolute";
        dropdown.style.top = `${rect.bottom + window.scrollY}px`;
        dropdown.style.left = `${rect.left + window.scrollX}px`;

        // Evita que se cierre inmediatamente al hacer clic en el botón
        event.stopPropagation();
    });
});

// Lógica para evitar cierre al interactuar con el dropdown
document.querySelectorAll(".dropdown").forEach(dropdown => {
    dropdown.addEventListener("click", event => {
        // Permite interactuar con el contenido del dropdown sin cerrarlo
        event.stopPropagation();
    });
});

// Lógica para cerrar todos los dropdowns al hacer clic fuera
document.addEventListener("click", event => {
    const isMenuButton = event.target.closest(".menu > button");
    const isDropdown = event.target.closest(".dropdown");

    if (!isMenuButton && !isDropdown) {
        document.querySelectorAll(".dropdown").forEach(dropdown => {
            dropdown.style.display = "none"; // Oculta todos los dropdowns
        });
    }
});
    
// Lógica para ajustar los botones dinámicamente
function ajustarBotones() {
    const menuSlider = document.querySelector(".menu-slider");
    const botones = document.querySelectorAll(".menu > button");
    const cantidadBotones = botones.length;

    // Si hay solo un botón, se centra
    if (cantidadBotones === 1) {
        menuSlider.style.justifyContent = "center";
    } else if (menuSlider.scrollWidth > menuSlider.offsetWidth) {
        // Si sobrepasan el ancho de la pantalla, alineación inicial con scroll
        menuSlider.style.justifyContent = "flex-start";
    } else {
        // Si hay más botones pero caben en pantalla, se distribuyen centrados
        menuSlider.style.justifyContent = "space-evenly";
    }
}

// Llama a la función cuando se cargue el DOM
document.addEventListener("DOMContentLoaded", ajustarBotones);

// Escucha cambios en la cantidad de botones (por ejemplo, al agregar dinámicamente)
const observer = new MutationObserver(() => ajustarBotones());
observer.observe(document.querySelector(".menu-slider"), {
    childList: true // Observa cambios en los hijos (botones)
});

// Lógica para soporte de navegación en TV Android

let currentIndex = 0; // Índice actual del foco
const buttons = document.querySelectorAll(".menu > button"); // Botones del slider

document.addEventListener("keydown", (event) => {
    switch (event.key) {
        case "ArrowRight": // Mover a la derecha
            if (currentIndex < buttons.length - 1) {
                currentIndex++;
                buttons[currentIndex].focus(); // Lleva el foco al siguiente botón
            }
            break;
        case "ArrowLeft": // Mover a la izquierda
            if (currentIndex > 0) {
                currentIndex--;
                buttons[currentIndex].focus(); // Lleva el foco al botón previo
            }
            break;
        case "ArrowDown": // Opcional para manejar interacciones en dropdowns
            const dropdownId = buttons[currentIndex].getAttribute("data-dropdown");
            const dropdown = document.getElementById(dropdownId);
            if (dropdown) {
                const links = dropdown.querySelectorAll("a");
                if (links.length > 0) {
                    links[0].focus(); // Mueve el foco al primer enlace dentro del dropdown
                }
            }
            break;
        case "Enter": // Seleccionar el botón actual
            buttons[currentIndex].click(); // Simula un clic en el botón enfocado
            break;
        default:
            break;
    }
});

    document.addEventListener("DOMContentLoaded", () => {
    // Función para inicializar el efecto de focus
    const initializeFocusEffect = () => {
        // Seleccionar imágenes y favoritos
        const focusableElements = document.querySelectorAll(
            ".dropdown a"
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
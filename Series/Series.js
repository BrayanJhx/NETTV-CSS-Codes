// Lógica para desplegar/ocultar dropdowns

// Selecciona todos los botones dentro de elementos con la clase "menu"
document.querySelectorAll(".menu > button").forEach(button => {
    // Agrega un evento 'click' a cada botón
    button.addEventListener("click", event => {
        // Obtiene el valor del atributo 'data-dropdown' del botón actual
        const dropdownId = button.getAttribute("data-dropdown");
        // Selecciona el dropdown correspondiente usando su ID
        const dropdown = document.getElementById(dropdownId);

        // Cierra todos los dropdowns abiertos, excepto el actual
        document.querySelectorAll(".dropdown").forEach(d => {
            if (d !== dropdown) d.style.display = "none"; // Oculta todos menos el que se está activando
        });

        // Alterna el estado de visibilidad del dropdown actual
        dropdown.style.display = dropdown.style.display === "block" ? "none" : "block";

        // Posiciona dinámicamente el dropdown según la posición del botón
        const rect = button.getBoundingClientRect(); // Obtiene la posición del botón en la pantalla
        dropdown.style.position = "absolute"; // Asegura que el dropdown tenga posición absoluta
        dropdown.style.top = `${rect.bottom + window.scrollY}px`; // Calcula la posición superior del dropdown
        dropdown.style.left = `${rect.left + window.scrollX}px`; // Calcula la posición izquierda del dropdown
    });
});

// Lógica para cerrar todos los dropdowns al hacer clic fuera de ellos
document.addEventListener("click", event => {
    // Verifica si el clic no fue en un botón del menú
    if (!event.target.matches(".menu > button")) {
        // Cierra todos los dropdowns
        document.querySelectorAll(".dropdown").forEach(dropdown => {
            dropdown.style.display = "none"; // Oculta cada dropdown
        });
    }
});

// Lógica para cerrar los dropdowns al hacer scroll
document.addEventListener("scroll", () => {
    document.querySelectorAll(".dropdown").forEach(dropdown => {
        dropdown.style.display = "none"; // Oculta todos los dropdowns mientras se hace scroll
    });
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
// Lógica para desplegar/ocultar dropdowns
document.querySelectorAll(".menu > button").forEach(button => {
    button.addEventListener("click", event => {
        const dropdownId = button.getAttribute("data-dropdown");
        const dropdown = document.getElementById(dropdownId);

        if (dropdown.style.display === "block") {
            dropdown.style.display = "none";
        } else {
            document.querySelectorAll(".dropdown").forEach(d => d.style.display = "none");
            dropdown.style.display = "block";
        }

        posicionarDropdown(button, dropdown);
        event.stopPropagation();
    });
});

document.querySelectorAll(".dropdown").forEach(dropdown => {
    dropdown.addEventListener("click", event => event.stopPropagation());
});

document.addEventListener("click", event => {
    const isMenuButton = event.target.closest(".menu > button");
    const isDropdown = event.target.closest(".dropdown");

    if (!isMenuButton && !isDropdown) {
        document.querySelectorAll(".dropdown").forEach(dropdown => {
            dropdown.style.display = "none";
        });
    }
});

function posicionarDropdown(button, dropdown) {
    const rect = button.getBoundingClientRect();
    dropdown.style.position = "absolute";
    dropdown.style.top = `${rect.bottom + window.scrollY}px`;
    dropdown.style.left = `${rect.left + window.scrollX}px`;
}

// Ajuste dinámico de botones
function ajustarBotones() {
    const menuSlider = document.querySelector(".menu-slider");
    const botones = document.querySelectorAll(".menu > button");
    const cantidadBotones = botones.length;

    if (cantidadBotones === 1) {
        menuSlider.style.justifyContent = "center";
    } else if (menuSlider.scrollWidth > menuSlider.offsetWidth) {
        menuSlider.style.justifyContent = "flex-start";
    } else {
        menuSlider.style.justifyContent = "space-evenly";
    }
}

document.addEventListener("DOMContentLoaded", ajustarBotones);

const observerBotones = new MutationObserver(() => ajustarBotones());
observerBotones.observe(document.querySelector(".menu-slider"), { childList: true });

// Navegación para TV
let currentIndex = 0;
const buttons = document.querySelectorAll(".menu > button");

document.addEventListener("keydown", event => {
    switch (event.key) {
        case "ArrowRight":
            if (currentIndex < buttons.length - 1) currentIndex++;
            buttons[currentIndex].focus();
            break;
        case "ArrowLeft":
            if (currentIndex > 0) currentIndex--;
            buttons[currentIndex].focus();
            break;
        case "ArrowDown":
            const dropdownId = buttons[currentIndex].getAttribute("data-dropdown");
            const dropdown = document.getElementById(dropdownId);
            if (dropdown) {
                const links = dropdown.querySelectorAll("a");
                if (links.length > 0) links[0].focus();
            }
            break;
        case "Enter":
            buttons[currentIndex].click();
            break;
    }
});

document.addEventListener("DOMContentLoaded", () => {
    const initializeFocusEffect = () => {
        const focusableElements = document.querySelectorAll(".dropdown a");

        focusableElements.forEach(element => {
            element.tabIndex = 0;

            element.addEventListener("focus", () => {
                element.style.boxShadow = "0 0 10px 3px #1e90ff";
                element.style.border = "2px solid #1e90ff";
                element.style.transform = "scale(1.05)";

                const contenedorHorizontal = element.closest(".contenedor-horiz");
                if (contenedorHorizontal) {
                    element.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
                }
            });

            element.addEventListener("blur", () => {
                element.style.boxShadow = "none";
                element.style.border = "none";
                element.style.transform = "scale(1)";
            });
        });
    };

    const observerFocus = new MutationObserver(() => initializeFocusEffect());
    const mainContainer = document.querySelector("body");
    if (mainContainer) observerFocus.observe(mainContainer, { childList: true, subtree: true });

    initializeFocusEffect();
});

// Recalcula posición de dropdowns al redimensionar la ventana
window.addEventListener("resize", () => {
    document.querySelectorAll(".menu > button").forEach(button => {
        const dropdownId = button.getAttribute("data-dropdown");
        const dropdown = document.getElementById(dropdownId);
        if (dropdown && dropdown.style.display === "block") {
            posicionarDropdown(button, dropdown);
        }
    });
});
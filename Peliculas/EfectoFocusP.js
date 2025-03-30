document.addEventListener("DOMContentLoaded", () => {
    const initializeFocusEffect = () => {
        const images = document.querySelectorAll(".contenedor-imagen img");

        images.forEach(img => {
            img.tabIndex = 0;

            img.addEventListener("focus", () => {
                img.style.boxShadow = "0 0 10px 3px #1e90ff";
                img.style.border = "2px solid #1e90ff";
                img.style.transform = "scale(1.05)";

                const contenedorHorizontal = img.closest(".contenedor-horiz");
                if (contenedorHorizontal) {
                    img.scrollIntoView({
                        behavior: "smooth",
                        block: "nearest",
                        inline: "center"
                    });
                }
            });

            img.addEventListener("blur", () => {
                img.style.boxShadow = "none";
                img.style.border = "none";
                img.style.transform = "scale(1)";
            });
        });
    };

    const observer = new MutationObserver(() => {
        initializeFocusEffect();
    });

    const mainContainer = document.querySelector("body");
    if (mainContainer) {
        observer.observe(mainContainer, { childList: true, subtree: true });
    }

    // Inicialización principal
    initializeFocusEffect();
});

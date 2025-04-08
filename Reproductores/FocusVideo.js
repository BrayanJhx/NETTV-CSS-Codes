document.addEventListener("DOMContentLoaded", () => {
    const initializeFocusEffect = () => {
        const focusableElements = document.querySelectorAll("#playMessage, #playPause, #fullscreen, #pip, #time, #mute, #lock, .dropdown a");

        focusableElements.forEach(element => {
            element.tabIndex = 0;

            element.addEventListener("focus", () => {
                element.style.boxShadow = "0 0 3px 3px #005EFF";
                element.style.border = "2px solid #21233D";

                const contenedorHorizontal = element.closest(".contenedor-horiz");
                if (contenedorHorizontal) {
                    element.scrollIntoView({
                        behavior: "smooth",
                        block: "nearest",
                        inline: "center"
                    });
                }
            });

            element.addEventListener("blur", () => {
                element.style.boxShadow = "none";
                element.style.border = "none";
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

    initializeFocusEffect();
});
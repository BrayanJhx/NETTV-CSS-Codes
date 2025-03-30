document.addEventListener("DOMContentLoaded", () => {
    const initializeFocusEvents = () => {
        const images = document.querySelectorAll(".contenedor-imagen img");

        images.forEach(img => {
            img.tabIndex = 0; // Habilitar tabulación para el enfoque

            img.addEventListener("focus", () => {
                img.style.boxShadow = "0 0 10px 3px #1e90ff, 0 0 20px #00FFFF, 0 0 30px #00FFFF";
                img.style.border = "2px solid #1e90ff";
                img.style.transform = "scale(1.05)";
                img.style.animation = "none"; // Suspender animación de neón
            });

            img.addEventListener("blur", () => {
                img.style.boxShadow = "none";
                img.style.border = "3px solid black"; // Restaurar borde negro
                img.style.transform = "scale(1)";
                img.style.animation = "neon-border 1.5s infinite"; // Reactivar efecto neón
            });
        });
    };

    initializeFocusEvents();
});

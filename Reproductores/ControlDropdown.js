document.addEventListener("DOMContentLoaded", () => {
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

    // Lógica para esconder el menú al seleccionar una opción del menú
    document.querySelectorAll(".dropdown a").forEach(link => {
        link.addEventListener("click", () => {
            const dropdown = link.closest(".dropdown");
            if (dropdown) {
                dropdown.style.display = "none"; // Oculta el dropdown al seleccionar una opción
            }
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
});
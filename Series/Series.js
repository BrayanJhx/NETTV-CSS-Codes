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
          

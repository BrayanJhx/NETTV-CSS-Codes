(function () {
    const dayLogo = "https://i.ibb.co/S7Ps5hrb/NETTV-Logo-White.png";
    const nightLogo = "https://i.ibb.co/4Rp287S2/NETTVLogo.png";

    // Crear la cabecera
    const header = document.createElement("div");
    header.id = "custom-header";
    Object.assign(header.style, {
        position: "fixed",
        top: "0",
        left: "0",
        width: "100%",
        height: "40px",
        background: "linear-gradient(to bottom, rgba(33, 35, 61, 0.8), rgba(33, 35, 61, 0))",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-around",
        padding: "0 10px",
        zIndex: "1000",
        boxSizing: "border-box",
        transition: "transform 0.3s ease-in-out", // Transición suave para ocultar
    });

    // Crear el elemento de hora
    const timeElement = document.createElement("div");
    timeElement.id = "header-time";
    Object.assign(timeElement.style, {
        color: "#c2c2c2",
        fontSize: "0.9em",
        textAlign: "center",
    });

    const updateTime = () => {
        const now = new Date();
        const hours = now.getHours() % 12 || 12;
        const minutes = String(now.getMinutes()).padStart(2, "0");
        const period = now.getHours() >= 12 ? "PM" : "AM";
        timeElement.innerHTML = `
            <div style="font-weight: bold; font-size: 1.1em;">${hours}:${minutes}</div>
            <div style="font-size: 0.8em;">${period}</div>
        `;
    };
    setInterval(updateTime, 1000);
    updateTime();

    // Crear el logotipo
    const logoContainer = document.createElement("div");
    Object.assign(logoContainer.style, {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "120px",
        height: "50px",
    });

    const logoImage = document.createElement("img");
    logoImage.src = new Date().getHours() >= 6 && new Date().getHours() < 18 ? dayLogo : nightLogo;
    Object.assign(logoImage.style, {
        width: "100%",
        height: "100%",
        objectFit: "contain",
        opacity: "0.8",
        transition: "opacity 0.3s ease-in-out",
    });

    logoContainer.appendChild(logoImage);

    // Crear el input del buscador
    const searchInput = document.createElement("input");
    searchInput.id = "search-input";
    searchInput.placeholder = "Buscar Contenido...";
    Object.assign(searchInput.style, {
        width: "50%",
        height: "30px",
        padding: "0 8px",
        fontSize: "12px",
        border: "1.5px solid #21233D",
        borderRadius: "7px",
        backgroundColor: "rgba(33, 35, 61, 0.9)", // Semi-transparente para el input
        color: "white",
        outline: "none",
        textAlign: "center",
        cursor: "pointer",
    });

    searchInput.addEventListener("focus", () => {
        window.location.href = "http://action_search"; // Llama al buscador integrado
    });

    // Añadir los elementos a la cabecera
    header.appendChild(logoContainer);
    header.appendChild(searchInput);
    header.appendChild(timeElement);

    // Insertar la cabecera en el body
    document.body.insertAdjacentElement("afterbegin", header);

    // Ajustar el margen superior del body
    document.body.style.marginTop = "0"; // Asegurarnos de eliminar el espacio oscuro

    // --- Detectar desplazamiento ---
    let lastScrollY = window.scrollY;

    window.addEventListener("scroll", () => {
        if (window.scrollY > lastScrollY) {
            // Desplazamiento hacia abajo: ocultar cabecera
            header.style.transform = "translateY(-100%)"; // Mover hacia arriba
        } else {
            // Desplazamiento hacia arriba: mostrar cabecera
            header.style.transform = "translateY(0)"; // Restaurar posición
        }
        lastScrollY = window.scrollY;
    });
})();

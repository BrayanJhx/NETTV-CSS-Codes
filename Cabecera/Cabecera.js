(function () {
    const dayLogo = "https://i.ibb.co/S7Ps5hrb/NETTV-Logo-White.png";
    const nightLogo = "https://i.ibb.co/4Rp287S2/NETTVLogo.png";
    const searchIconURL = "https://i.ibb.co/chTYKNNg/Busqueda-Contenido.png"; // URL del nuevo ícono

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
        transition: "transform 0.3s ease-in-out",
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

    // Crear el ícono del buscador
    const searchIcon = document.createElement("div");
    searchIcon.id = "search-icon";
    searchIcon.tabIndex = 0; // Habilitar el foco para controles TV y navegación con teclado
    Object.assign(searchIcon.style, {
        width: "180px",
        height: "50px",
        backgroundImage: `url('${searchIconURL}')`, // Ruta del nuevo ícono
        backgroundSize: "contain",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        cursor: "pointer",
        outline: "none", // Quitar borde predeterminado
        borderRadius: "5px", // Bordes redondeados
    });

    // Redirigir a action_search al presionar Enter
    searchIcon.addEventListener("keydown", (event) => {
        if (event.key === "Enter") {
            window.location.href = "action_search"; // Redirección a action_search
        }
    });

    // Implementar doble toque para abrir el enlace en dispositivos táctiles
    let touchTimeout = null;
    searchIcon.addEventListener("click", () => {
        if (touchTimeout === null) {
            // Primer toque: configurar un tiempo de espera
            touchTimeout = setTimeout(() => {
                touchTimeout = null; // Reiniciar si no hay segundo toque
            }, 300);
        } else {
            // Segundo toque: redirigir a action_search
            clearTimeout(touchTimeout);
            touchTimeout = null;
            window.location.href = "http://action_search"; // Redirección a action_search
        }
    });

    // Agregar efecto azul en el estado de enfoque (Focus)
    searchIcon.addEventListener("focus", () => {
        searchIcon.style.boxShadow = "0 0 5px 2px #005EFF"; // Efecto azul brillante alrededor
    });

    searchIcon.addEventListener("blur", () => {
        searchIcon.style.boxShadow = "none"; // Eliminar el efecto al perder el foco
    });

    // Añadir los elementos a la cabecera
    header.appendChild(logoContainer);
    header.appendChild(searchIcon); // Ícono del buscador
    header.appendChild(timeElement);

    // Insertar la cabecera en el body
    document.body.insertAdjacentElement("afterbegin", header);

    // Ajustar el margen superior del body
    document.body.style.marginTop = "0";

    // Detectar desplazamiento
    let lastScrollY = window.scrollY;

    window.addEventListener("scroll", () => {
        if (window.scrollY > lastScrollY) {
            // Desplazamiento hacia abajo: ocultar cabecera
            header.style.transform = "translateY(-100%)";
        } else {
            // Desplazamiento hacia arriba: mostrar cabecera
            header.style.transform = "translateY(0)";
        }
        lastScrollY = window.scrollY;
    });
})();
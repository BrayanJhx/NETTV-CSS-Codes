document.addEventListener("DOMContentLoaded", () => {
    // Asegurar configuración principal de body para el layout de la página
    document.body.style.display = "flex";
    document.body.style.flexDirection = "column";
    document.body.style.minHeight = "100vh";
    document.body.style.margin = "0";
    document.body.style.padding = "0";

    // Crear el elemento <main> si no existe
    let mainWrapper = document.querySelector("main");
    if (!mainWrapper) {
        mainWrapper = document.createElement("main");
        mainWrapper.style.flexGrow = "1"; // Toma el espacio restante
        document.body.prepend(mainWrapper); // Colocar al inicio del body
    } else {
        mainWrapper.style.flexGrow = "1"; // Asegura flexibilidad
    }

    // Crear la sección de contacto
    const contactSection = document.createElement("div");
    contactSection.className = "contact-section";
    Object.assign(contactSection.style, {
        textAlign: "center",
        padding: "15px 0",
        backgroundColor: "#21233D",
    });

    // Título de la sección de contacto
    const contactTitle = document.createElement("h2");
    contactTitle.textContent = "Contáctanos a través de los siguientes chats:";
    Object.assign(contactTitle.style, {
        fontFamily: "PT Sans, sans-serif",
        fontSize: "0.8em",
        color: "white",
        marginBottom: "10px",
    });

    // Contenedor de iconos de contacto
    const contactIcons = document.createElement("div");
    contactIcons.className = "contact-icons";
    Object.assign(contactIcons.style, {
        display: "flex",
        justifyContent: "center",
        gap: "20px",
        marginBottom: "1px",
    });

    // Icono de WhatsApp
    const whatsappLink = document.createElement("a");
    whatsappLink.href = "https://wa.me/+584129342583";
    whatsappLink.target = "_blank";
    const whatsappIcon = document.createElement("img");
    whatsappIcon.src = "https://i.ibb.co/ynjCq66k/ico-W-Whats-App.png";
    whatsappIcon.alt = "WhatsApp";
    Object.assign(whatsappIcon.style, {
        width: "40px",
        height: "auto",
        transition: "transform 0.3s ease, filter 0.3s ease",
    });
    whatsappIcon.addEventListener("mouseover", () => whatsappIcon.style.transform = "scale(1.1)");
    whatsappIcon.addEventListener("mouseout", () => whatsappIcon.style.transform = "scale(1)");
    whatsappLink.appendChild(whatsappIcon);

    // Icono de Telegram
    const telegramLink = document.createElement("a");
    telegramLink.href = "https://t.me/BrayanJhx";
    telegramLink.target = "_blank";
    const telegramIcon = document.createElement("img");
    telegramIcon.src = "https://i.ibb.co/b961Lg5/ico-W-Telegram.png";
    telegramIcon.alt = "Telegram";
    Object.assign(telegramIcon.style, {
        width: "40px",
        height: "auto",
        transition: "transform 0.3s ease, filter 0.3s ease",
    });
    telegramIcon.addEventListener("mouseover", () => telegramIcon.style.transform = "scale(1.1)");
    telegramIcon.addEventListener("mouseout", () => telegramIcon.style.transform = "scale(1)");
    telegramLink.appendChild(telegramIcon);

    // Agregar los iconos al contenedor
    contactIcons.appendChild(whatsappLink);
    contactIcons.appendChild(telegramLink);

    // Agregar título y iconos al contacto
    contactSection.appendChild(contactTitle);
    contactSection.appendChild(contactIcons);

    // Crear el footer
    const footer = document.createElement("footer");
    Object.assign(footer.style, {
        backgroundColor: "#21233D",
        textAlign: "center",
        padding: "2px 0",
        width: "100%",
    });

    // Contenedor del logo en el footer
    const logoContainer = document.createElement("div");
    logoContainer.className = "logo-container";
    Object.assign(logoContainer.style, {
        margin: "5px 0",
        padding: "0",
        display: "flex",
        justifyContent: "center",
    });
    const logoImage = document.createElement("img");
    logoImage.src = "https://i.ibb.co/4Rp287S2/NETTVLogo.png";
    logoImage.alt = "Logo de la aplicación";
    Object.assign(logoImage.style, {
        maxWidth: "150px",
        height: "auto",
    });
    logoContainer.appendChild(logoImage);

    // Texto del footer
    const footerText = document.createElement("p");
    footerText.textContent = "© 2021-2025 NETTV. Todos los derechos reservados.";
    Object.assign(footerText.style, {
        fontSize: "0.8em",
        color: "#aaa",
    });

    // Agregar elementos al footer
    footer.appendChild(logoContainer);
    footer.appendChild(footerText);

    // Inyectar la sección de contacto y el footer al cuerpo
    document.body.appendChild(contactSection);
    document.body.appendChild(footer);
});

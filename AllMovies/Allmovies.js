document.addEventListener("DOMContentLoaded", () => {
    // Inicializar imágenes en localStorage
    const initializeImageStorage = () => {
        const images = document.querySelectorAll(".contenedor-imagen a img");
        const imageData = [];

        images.forEach(img => {
            const parentLink = img.parentElement.href;
            imageData.push({
                url: img.src,
                alt: img.alt,
                link: parentLink
            });
        });

        localStorage.setItem("imageData", JSON.stringify(imageData));
    };

    // Obtener imágenes favoritas desde localStorage
    const getFavorites = () => {
        return JSON.parse(localStorage.getItem("favorites")) || [];
    };

    // Mostrar mensajes en pantalla
    const showMessage = (message, icon) => {
        const messageContainer = document.createElement("div");
        messageContainer.className = "favorite-message";
        messageContainer.innerHTML = `<i class="${icon}"></i> ${message}`;
        Object.assign(messageContainer.style, {
            position: "fixed",
            top: "20px",
            right: "20px",
            backgroundColor: "#1A374D",
            color: "#ffffff",
            padding: "10px 15px",
            fontSize: "14px",
            borderRadius: "5px",
            zIndex: "10000",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.3)",
        });

        document.body.appendChild(messageContainer);
        setTimeout(() => {
            messageContainer.remove();
        }, 3000);
    };

    // Agregar o quitar favoritos
    const toggleFavorite = (element) => {
        const favorites = getFavorites();
        const imgElement = element.parentElement.querySelector("img");
        const parentLink = imgElement.parentElement.href;

        const favoriteData = {
            url: imgElement.src,
            alt: imgElement.alt,
            link: parentLink
        };

        const isAlreadyFavorite = favorites.some(fav => fav.url === favoriteData.url);

        if (isAlreadyFavorite) {
            const updatedFavorites = favorites.filter(fav => fav.url !== favoriteData.url);
            localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
            element.classList.remove("marcado");
            showMessage(`${imgElement.alt} se ha quitado de la lista de favoritos`, "fa-regular fa-heart");
        } else {
            favorites.push(favoriteData);
            localStorage.setItem("favorites", JSON.stringify(favorites));
            element.classList.add("marcado");
            showMessage(`${imgElement.alt} se ha agregado a la lista de favoritos`, "fa-solid fa-heart");
        }
    };

    // Restaurar favoritos al cargar la página
    const restoreFavorites = () => {
        const favorites = getFavorites();
        const favoritosElements = document.querySelectorAll(".favoritos");

        favoritosElements.forEach(fav => {
            const imgElement = fav.parentElement.querySelector("img");
            const isFavorite = favorites.some(favItem => favItem.url === imgElement.src);

            if (isFavorite) {
                fav.classList.add("marcado");
            } else {
                fav.classList.remove("marcado");
            }
        });
    };

    // Delegar eventos de clic en los botones de favoritos
    const initializeFavoriteEvents = () => {
        document.body.addEventListener("click", (event) => {
            const favoriteElement = event.target.closest(".favoritos");
            if (favoriteElement) {
                toggleFavorite(favoriteElement);
            }
        });
    };

    // Navegación con control de TV: flechas y enfoque automático
    const addFocusNavigationForTV = () => {
        const images = document.querySelectorAll(".contenedor-imagen img");

        images.forEach(img => {
            img.tabIndex = 0; // Habilitar focus para navegación
        });

        document.addEventListener("keydown", (event) => {
            const focusedElement = document.activeElement; // Elemento actualmente enfocado

            if (focusedElement.tagName === "IMG") {
                let currentIndex = Array.from(images).indexOf(focusedElement);

                if (event.key === "ArrowRight" && currentIndex < images.length - 1) {
                    images[currentIndex + 1].focus();
                } else if (event.key === "ArrowLeft" && currentIndex > 0) {
                    images[currentIndex - 1].focus();
                } else if (event.key === "ArrowDown") {
                    const cols = Math.floor(document.getElementById("image-container").offsetWidth / focusedElement.offsetWidth);
                    const nextIndex = currentIndex + cols;
                    if (nextIndex < images.length) images[nextIndex].focus();
                } else if (event.key === "ArrowUp") {
                    const cols = Math.floor(document.getElementById("image-container").offsetWidth / focusedElement.offsetWidth);
                    const prevIndex = currentIndex - cols;
                    if (prevIndex >= 0) images[prevIndex].focus();
                }
            }
        });
    };

    // Inicializar toda la aplicación
    const initializeApp = () => {
        initializeImageStorage();
        restoreFavorites();
        initializeFavoriteEvents();
        addFocusNavigationForTV(); // Activar navegación con control remoto
    };

    // Llamar a la inicialización
    initializeApp();
});

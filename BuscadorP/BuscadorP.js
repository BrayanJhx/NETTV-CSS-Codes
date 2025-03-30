document.addEventListener("DOMContentLoaded", () => {
    const searchInput = document.getElementById('search-input');
    const imageContainers = document.querySelectorAll('.contenedor-imagen');

    // Inicializar imágenes en localStorage
    const initializeImageStorage = () => {
        const images = document.querySelectorAll(".contenedor-imagen img");
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

    // Mostrar mensajes en pantalla al agregar/quitar favoritos
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
            opacity: "1",
            transition: "opacity 0.5s ease"
        });

        document.body.appendChild(messageContainer);

        setTimeout(() => {
            messageContainer.style.opacity = "0";
            setTimeout(() => {
                messageContainer.remove();
            }, 500);
        }, 3000);
    };

    // Mostrar imágenes según la búsqueda
    const searchImages = (query) => {
        imageContainers.forEach(container => {
            const imgElement = container.querySelector('img');
            if (imgElement.alt.toLowerCase().includes(query)) {
                container.style.display = 'block'; // Mostrar imágenes coincidentes
                imgElement.tabIndex = 0; // Habilitar navegación con teclado/control remoto
                imgElement.addEventListener("focus", () => {
                    imgElement.style.boxShadow = "0 0 10px 3px #1e90ff";
                    imgElement.style.border = "2px solid #1e90ff";
                    imgElement.style.transform = "scale(1.05)";
                });
                imgElement.addEventListener("blur", () => {
                    imgElement.style.boxShadow = "none";
                    imgElement.style.border = "none";
                    imgElement.style.transform = "scale(1)";
                });
            } else {
                container.style.display = 'none'; // Ocultar las imágenes restantes
            }
        });
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

    // Manejar entrada en el buscador
    searchInput.addEventListener('input', () => {
        const query = searchInput.value.toLowerCase().trim();
        if (query === '') {
            imageContainers.forEach(container => {
                container.style.display = 'none'; // Ocultar todas las imágenes si el campo está vacío
            });
            return;
        }
        searchImages(query); // Mostrar imágenes coincidentes
    });

    // Delegar eventos de clic en los botones de favoritos
    document.body.addEventListener("click", (event) => {
        const favoriteElement = event.target.closest(".favoritos");
        if (favoriteElement) {
            toggleFavorite(favoriteElement);
        }
    });

    // Inicialización principal
    const initializeApp = () => {
        initializeImageStorage();
        restoreFavorites();
    };

    initializeApp();
});

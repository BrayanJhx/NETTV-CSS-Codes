document.addEventListener("DOMContentLoaded", () => {
        const mensaje = document.getElementById("mensaje");

        // Función para mostrar mensajes con un ícono
        const showMessage = (text, iconClass) => {
            mensaje.innerHTML = `<i class="${iconClass}" style="margin-right: 5px;"></i>${text}`;
            mensaje.style.display = "block";

            // Ocultar mensaje después de 2 segundos
            setTimeout(() => {
                mensaje.style.display = "none";
            }, 2000);
        };

        // Registrar imágenes en localStorage
        const initializeImageStorage = () => {
            const images = document.querySelectorAll(".contenedor-imagen img");
            const imageData = [];

            images.forEach(img => {
                const parentLink = img.closest("a").href;
                imageData.push({
                    url: img.src,
                    alt: img.alt,
                    link: parentLink
                });
            });

            localStorage.setItem("imageData", JSON.stringify(imageData));
        };

        // Restaurar el estado de favoritos al cargar la página
        const restoreFavorites = () => {
            const favoriteData = JSON.parse(localStorage.getItem("favorites")) || [];
            favoriteData.forEach(fav => {
                document.querySelectorAll(".contenedor-imagen").forEach(container => {
                    const img = container.querySelector("img");
                    if (img.alt === fav.alt) {
                        const icon = container.querySelector(".favoritos");
                        icon.classList.add("marcar");
                    }
                });
            });
        };

        // Marcar y registrar favoritos
        const toggleFavorite = (icon) => {
            const parentImage = icon.closest(".contenedor-imagen").querySelector("img");
            const favoriteData = JSON.parse(localStorage.getItem("favorites")) || [];

            const isAlreadyFavorite = favoriteData.some(fav => fav.url === parentImage.src);

            if (isAlreadyFavorite) {
                // Quitar de favoritos
                const updatedFavorites = favoriteData.filter(fav => fav.url !== parentImage.src);
                localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
                icon.classList.remove("marcar");
                showMessage(`${parentImage.alt} se ha quitado de la lista de favoritos`, 'fa-regular fa-heart'); // Ícono de corazón vacío
            } else {
                // Agregar a favoritos
                favoriteData.push({
                    url: parentImage.src,
                    alt: parentImage.alt,
                    link: parentImage.closest("a").href
                });
                localStorage.setItem("favorites", JSON.stringify(favoriteData));
                icon.classList.add("marcar");
                showMessage(`${parentImage.alt} se ha agregado a la lista de favoritos`, 'fa-solid fa-heart'); // Ícono de corazón lleno
            }
        };

        // Agregar eventos a los corazones
        document.querySelectorAll(".favoritos").forEach(fav => {
            fav.addEventListener("click", (e) => {
                e.stopPropagation(); // Evita que el click afecte el enlace
                toggleFavorite(fav);
            });
        });

        // Inicializar registro de imágenes y restaurar favoritos
        initializeImageStorage();
        restoreFavorites();
    });

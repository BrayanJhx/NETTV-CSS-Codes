class VideoController {
    constructor(videoElement, playPauseButton, loader) {
        this.video = videoElement;
        this.playPauseButton = playPauseButton;
        this.loader = loader; // Referencia al loader
        this.liveIndicator = document.getElementById('liveIndicator'); // Indicador LIVE

        this.init();
    }

    init() {
        // Asegurar que el loader esté oculto al inicio
        if (this.loader) {
            this.hideLoader();
        } else {
            console.error("Loader no definido. Verifica si el elemento existe en el DOM.");
        }

        this.updatePlayPauseIcons();

        // Eventos para manejar el loader y el indicador LIVE
        this.video.addEventListener('waiting', () => {
            this.showLoader(); // Mostrar el loader si el video está esperando
            this.updateLiveIndicator(false);
        });
        this.video.addEventListener('canplay', () => {
            this.hideLoader(); // Ocultar el loader cuando el video esté listo
            this.updateLiveIndicator(true);
        });
        this.video.addEventListener('canplaythrough', () => {
            this.hideLoader(); // Ocultar el loader cuando el video se haya cargado completamente
            this.updateLiveIndicator(true);
        });
        this.video.addEventListener('play', () => {
            this.hideLoader(); // Ocultar el loader al iniciar reproducción
            this.updateLiveIndicator(true);
            this.updatePlayPauseIcons();
        });
        this.video.addEventListener('pause', () => {
            this.updateLiveIndicator(false);
            this.updatePlayPauseIcons();
        });

        // Botón de Play/Pause
        this.playPauseButton.addEventListener('click', () => this.togglePlay());

        // Actualización del tiempo del video
        this.video.addEventListener('timeupdate', () => this.updateTime());

        // Manejo de enlaces del menú
        this.handleMenuLinks();
    }

    togglePlay() {
        if (this.video.paused) {
            this.video.play().catch((error) =>
                console.error("Error al reproducir el video:", error)
            );
        } else {
            this.video.pause();
        }
    }

    showLoader() {
        if (this.loader) {
            this.loader.classList.remove('hidden'); // Hace visible el loader
        } else {
            console.warn("Loader no definido. No se puede mostrar.");
        }
    }

    hideLoader() {
        if (this.loader) {
            this.loader.classList.add('hidden'); // Oculta el loader
        } else {
            console.warn("Loader no definido. No se puede ocultar.");
        }
    }

    updateLiveIndicator(isActive) {
        if (isActive) {
            this.liveIndicator.classList.add('active');
        } else {
            this.liveIndicator.classList.remove('active');
        }
    }

    updatePlayPauseIcons() {
        const playIconHTML = '<i class="fas fa-play"></i>'; // Icono de play
        const pauseIconHTML = '<i class="fas fa-pause"></i>'; // Icono de pause

        this.playPauseButton.innerHTML = this.video.paused ? playIconHTML : pauseIconHTML;
    }

    updateTime() {
        const timeDisplay = document.getElementById('time');
        const minutes = Math.floor(this.video.currentTime / 60)
            .toString()
            .padStart(2, '0');
        const seconds = Math.floor(this.video.currentTime % 60)
            .toString()
            .padStart(2, '0');
        timeDisplay.textContent = `${minutes}:${seconds}`;
    }

    handleMenuLinks() {
        const menuLinks = document.querySelectorAll('.dropdown a');
        menuLinks.forEach((link) => {
            link.addEventListener('click', (event) => {
                event.preventDefault(); // Previene el comportamiento predeterminado
                const videoSrc = link.getAttribute('href'); // Obtiene la URL del video
                this.changeVideoSource(videoSrc);
            });
        });
    }

    changeVideoSource(src) {
        if (!src) {
            console.error("La fuente del video está vacía.");
            return;
        }
        this.showLoader(); // Muestra el loader al seleccionar un nuevo video
        this.video.src = src; // Cambia la fuente del video
        this.video
            .play()
            .then(() => this.hideLoader()) // Oculta el loader al comenzar la reproducción
            .catch((error) => {
                console.error("Error al iniciar el video:", error);
                this.hideLoader(); // Oculta el loader si ocurre un error
            });
    }
}
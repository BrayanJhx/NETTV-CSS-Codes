class ControlsController {
    constructor(videoElement, controlsElement, lockButton, fullscreenButton, pipButton, playPauseButton) {
        this.video = videoElement;
        this.controls = controlsElement;
        this.lockButton = lockButton;
        this.fullscreenButton = fullscreenButton;
        this.pipButton = pipButton;
        this.playPauseButton = playPauseButton; // Reemplaza la referencia a playButton
        this.isLocked = false;
        this.inactivityTimeout = null; // Temporizador para inactividad

        this.init();
    }

    init() {
        this.lockButton.addEventListener('click', () => this.toggleLock());
        this.fullscreenButton.addEventListener('click', () => this.toggleFullscreen());
        this.pipButton.addEventListener('click', () => this.togglePIP());

        // Detectar movimiento del mouse o toque para reiniciar el temporizador
        document.addEventListener('mousemove', () => this.resetInactivityTimeout());
        document.addEventListener('touchstart', () => this.resetInactivityTimeout());

        // Inicia el temporizador de inactividad
        this.resetInactivityTimeout();
    }

    toggleLock() {
    this.isLocked = !this.isLocked;

    const controlButtons = this.controls.querySelectorAll(".control");

    controlButtons.forEach(button => {
        // Asegura que el botón de bloqueo no sea afectado
        if (button === this.lockButton) return;

        button.disabled = this.isLocked; // Deshabilitar/habilitar botones
        button.style.pointerEvents = this.isLocked ? "none" : "auto"; // Controla interacción
        button.style.opacity = this.isLocked ? 0.5 : 1; // Cambia opacidad según estado
    });

    this.lockButton.innerHTML = this.isLocked
        ? '<i class="fas fa-lock"></i>'
        : '<i class="fas fa-lock-open"></i>';
}

    toggleFullscreen() {
        if (!document.fullscreenElement) {
            this.video.parentElement.requestFullscreen();
        } else {
            document.exitFullscreen();
        }
    }

    async togglePIP() {
    try {
        if (!document.pictureInPictureEnabled) {
            throw new Error("La API de Picture-in-Picture no está habilitada en este navegador.");
        }

        if (document.pictureInPictureElement) {
            await document.exitPictureInPicture();
        } else {
            await this.video.requestPictureInPicture();
        }
    } catch (error) {
        console.error("Error al activar/desactivar Picture-in-Picture:", error.message);
    }
}

    hideControls() {
        // Ocultar controles si no están bloqueados
        if (!this.isLocked) {
            this.controls.classList.add('hidden'); // Oculta controles
        }
    }

    showControls() {
        // Mostrar controles
        this.controls.classList.remove('hidden'); // Muestra controles
    }

    resetInactivityTimeout() {
        // Mostrar controles y reiniciar el temporizador
        this.showControls();

        // Limpia cualquier temporizador previo
        clearTimeout(this.inactivityTimeout);

        // Configura un nuevo temporizador para ocultar controles tras 2.5 segundos
        this.inactivityTimeout = setTimeout(() => {
            this.hideControls();
        }, 2500);
    }
}
document.addEventListener("DOMContentLoaded", () => {
    const video = document.getElementById('video');
    const playButton = document.getElementById('playButton');
    const playPause = document.getElementById('playPause');
    const mute = document.getElementById('mute');
    const volumeSlider = document.querySelector('.slider');
    const volumeThumb = document.querySelector('.thumb');
    const time = document.getElementById('time');
    const pip = document.getElementById('pip');
    const lock = document.getElementById('lock');
    const fullscreen = document.getElementById('fullscreen');
    const controls = document.getElementById('controls');
    let controlsTimeout;
    let isLocked = false;
const liveIndicator = document.getElementById('liveIndicator');
const updateLiveIndicator = () => {
    if (!video.paused && video.readyState >= 2) {
        liveIndicator.classList.add('active'); // Se conecta: letras en rojo
    } else {
        liveIndicator.classList.remove('active'); // No conectado: letras en blanco
    }
};

// Eventos del video para actualizar el indicador LIVE
video.addEventListener('play', updateLiveIndicator);
video.addEventListener('pause', updateLiveIndicator);
video.addEventListener('waiting', updateLiveIndicator);
video.addEventListener('canplay', updateLiveIndicator);
video.addEventListener('canplaythrough', updateLiveIndicator);

// Inicializa el estado del indicador
updateLiveIndicator();

    // Función para mostrar controles y botón de reproducción
    const showControls = () => {
        controls.classList.remove('hidden');
        playButton.style.opacity = '1';
        playButton.style.pointerEvents = 'auto';
    };

    // Función para ocultar controles y botón de reproducción
    const hideControls = () => {
        controls.classList.add('hidden');
        playButton.style.opacity = '0';
        playButton.style.pointerEvents = 'none';
    };

    // Restablecer el temporizador para ocultar controles
    const resetControlsTimeout = () => {
        clearTimeout(controlsTimeout);
        controlsTimeout = setTimeout(() => {
            if (!video.paused && !isLocked) hideControls();
        }, 2000);
    };

    // Función para sincronizar el volumen y la posición del control deslizante
    const syncVolumeThumb = () => {
        const currentVolume = video.muted ? 0 : video.volume;
        volumeThumb.style.left = `${currentVolume * 100}%`;
    };

    // Guardar el volumen en localStorage
    const saveVolumeToLocalStorage = () => {
        localStorage.setItem('videoVolume', video.volume);
    };

    // Cargar el volumen desde localStorage
    const loadVolumeFromLocalStorage = () => {
        const savedVolume = localStorage.getItem('videoVolume');
        if (savedVolume !== null) {
            video.volume = parseFloat(savedVolume);
            syncVolumeThumb();
        }
    };

    // Actualizar el volumen al arrastrar la bolita o al hacer clic en el control deslizante
    const updateVolume = (xPosition) => {
        const rect = volumeSlider.getBoundingClientRect();
        let percentage = (xPosition - rect.left) / rect.width;
        percentage = Math.max(0, Math.min(1, percentage));
        video.volume = percentage;
        video.muted = percentage === 0;
        mute.innerHTML = video.muted
            ? '<i class="fas fa-volume-mute"></i>'
            : '<i class="fas fa-volume-up"></i>';
        syncVolumeThumb();
        saveVolumeToLocalStorage(); // Guarda el volumen cada vez que cambia
    };

    // Iniciar el arrastre del control de volumen
    const startDragging = (startEvent) => {
        const moveHandler = (moveEvent) => {
            const clientX = moveEvent.touches
                ? moveEvent.touches[0].clientX
                : moveEvent.clientX;
            updateVolume(clientX);
        };

        const stopDragging = () => {
            document.removeEventListener('mousemove', moveHandler);
            document.removeEventListener('mouseup', stopDragging);
            document.removeEventListener('touchmove', moveHandler);
            document.removeEventListener('touchend', stopDragging);
        };

        document.addEventListener('mousemove', moveHandler);
        document.addEventListener('mouseup', stopDragging);
        document.addEventListener('touchmove', moveHandler);
        document.addEventListener('touchend', stopDragging);
    };

    // Configurar eventos para el control de volumen
    volumeThumb.addEventListener('mousedown', (e) => startDragging(e));
    volumeThumb.addEventListener('touchstart', (e) => startDragging(e));
    volumeSlider.addEventListener('click', (e) => {
        const clientX = e.touches ? e.touches[0].clientX : e.clientX;
        updateVolume(clientX);
    });

    // Cambiar ícono de play/pause
    const updatePlayPauseIcons = () => {
        const playIconHTML = '<i class="fas fa-play"></i>';
        const pauseIconHTML = '<i class="fas fa-pause"></i>';
        playButton.innerHTML = video.paused ? playIconHTML : pauseIconHTML;
        playPause.innerHTML = video.paused ? playIconHTML : pauseIconHTML;
    };

    // Actualizar el contador de tiempo transcurrido
    const updateTime = () => {
        const minutes = Math.floor(video.currentTime / 60).toString().padStart(2, '0');
        const seconds = Math.floor(video.currentTime % 60).toString().padStart(2, '0');
        time.textContent = `${minutes}:${seconds}`;
    };

    // Actualizar el estado del borde azul del botón de reproducción
    const updateLoadingState = () => {
        if (video.readyState < 3 || video.networkState === 2) {
            playButton.classList.add('loading'); // Mostrar borde azul
        } else {
            playButton.classList.remove('loading'); // Ocultar borde azul
        }
    };

    // Activar Picture-in-Picture (PIP)
    pip.addEventListener('click', async () => {
        try {
            if (document.pictureInPictureElement) {
                await document.exitPictureInPicture();
            } else {
                await video.requestPictureInPicture();
            }
        } catch (error) {
            console.error('Error al activar/desactivar Picture-in-Picture:', error);
        }
    });

    // Alternar entre bloquear y desbloquear los controles
    lock.addEventListener('click', () => {
        isLocked = !isLocked;
        lock.innerHTML = isLocked
            ? '<i class="fas fa-lock"></i>'
            : '<i class="fas fa-lock-open"></i>';
        controls.style.pointerEvents = isLocked ? 'none' : 'all';
        controls.style.opacity = isLocked ? '0.5' : '1';
    });

    // Alternar entre pantalla completa y modo normal
    fullscreen.addEventListener('click', () => {
        if (!document.fullscreenElement) {
            video.parentElement.requestFullscreen();
            fullscreen.innerHTML = '<i class="fas fa-compress"></i>';
        } else {
            document.exitFullscreen();
            fullscreen.innerHTML = '<i class="fas fa-expand"></i>';
        }
    });

    // Eventos del video para mostrar el borde azul cuando carga/interrumpe
    video.addEventListener('waiting', updateLoadingState); // Video está cargando
    video.addEventListener('canplay', updateLoadingState); // Video listo para reproducir
    video.addEventListener('progress', updateLoadingState); // Progreso de carga
    video.addEventListener('timeupdate', updateTime); // Actualizar tiempo
    video.addEventListener('volumechange', syncVolumeThumb);

    // Evento al hacer clic en el botón central de reproducción
    playButton.addEventListener('click', () => {
        if (video.paused) {
            video.play().catch(error => console.error(error));
        } else {
            video.pause();
        }
        updatePlayPauseIcons();
        resetControlsTimeout();
    });

    // Alternar entre play y pause al hacer clic en el ícono playPause
    playPause.addEventListener('click', () => {
        if (video.paused) {
            video.play().catch(error => console.error(error));
        } else {
            video.pause();
        }
        updatePlayPauseIcons();
        resetControlsTimeout();
    });

    // Alternar entre mute y volumen activado
    mute.addEventListener('click', () => {
        video.muted = !video.muted;
        mute.innerHTML = video.muted
            ? '<i class="fas fa-volume-mute"></i>'
            : '<i class="fas fa-volume-up"></i>';
        syncVolumeThumb();
    });

    // Mostrar controles al tocar la pantalla en dispositivos móviles
    document.addEventListener('touchstart', () => {
        showControls();
        resetControlsTimeout();
    });

    // Mostrar controles al mover el mouse en dispositivos de escritorio
    document.addEventListener('mousemove', () => {
        showControls();
        resetControlsTimeout();
    });

    // Inicializar volumen, controles e íconos
    loadVolumeFromLocalStorage();
    syncVolumeThumb();
    showControls();
    updatePlayPauseIcons();
    updateTime(); // Inicializar el tiempo al cargar la página
    updateLoadingState(); // Estado inicial del borde azul
});

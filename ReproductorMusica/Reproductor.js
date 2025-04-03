const progressBar = document.querySelector('.progress-bar');
const progress = document.getElementById('progress');
const progressThumb = document.getElementById('progressThumb');
const audioPlayer = document.getElementById('audioPlayer');
const playPauseButton = document.getElementById('playPauseButton');
const equalizerBars = document.querySelectorAll('.bar');
const liveLabel = document.querySelector('.live-label');
const elapsedTimeDisplay = document.getElementById('elapsedTime');

let isPlaying = false;
let isDragging = false;
let equalizerInterval = null; // Para controlar el intervalo de las barras del ecualizador

// Preloader al cargar la página
window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');
    preloader.style.opacity = '0';
    setTimeout(() => {
        preloader.style.display = 'none';
    }, 500);
});

// Evitar selección de texto en los botones
document.querySelectorAll('button').forEach(button => {
    button.addEventListener('mousedown', e => e.preventDefault());
});

// Alternar reproducción y pausa
function togglePlayPause() {
    if (isPlaying) {
        audioPlayer.pause();
        resetVisualState(); // Resetea estados visuales al pausar
    } else {
        playPauseButton.classList.add('loading');
        audioPlayer.play().then(() => {
            activateVisualState(); // Activa los estados visuales al reproducir
        }).catch(() => {
            alert('No se pudo reproducir la estación.');
            playPauseButton.classList.remove('loading');
        });
    }
    isPlaying = !isPlaying;
}

// Simular movimiento sincronizado en las barras del ecualizador
function simulateEqualizer() {
    equalizerBars.forEach(bar => {
        const randomHeight = Math.random() * 100; // Altura simulada entre 0% y 100%
        bar.style.height = `${randomHeight}%`; // Aplica la altura dinámica
    });
}

// Activar efectos visuales al reproducir
function activateVisualState() {
    playPauseButton.classList.remove('loading');
    playPauseButton.classList.add('pause');

    liveLabel.classList.add('active');

    // Iniciar simulación de barras del ecualizador
    equalizerInterval = setInterval(simulateEqualizer, 200); // Cambios cada 200ms
}

// Resetear efectos visuales al pausar
function resetVisualState() {
    playPauseButton.classList.remove('pause');
    liveLabel.classList.remove('active');

    clearInterval(equalizerInterval); // Detener simulación de barras
    equalizerBars.forEach(bar => bar.style.height = '10%'); // Restaurar altura inicial
}

// Aumentar volumen
function increaseVolume() {
    if (audioPlayer.volume < 1) {
        audioPlayer.volume = Math.min(1, audioPlayer.volume + 0.1);
        updateVolumeIndicator();
    }
}

// Disminuir volumen
function decreaseVolume() {
    if (audioPlayer.volume > 0) {
        audioPlayer.volume = Math.max(0, audioPlayer.volume - 0.1);
        updateVolumeIndicator();
    }
}

// Mostrar porcentaje de volumen
function updateVolumeIndicator() {
    const volumePercentage = Math.round(audioPlayer.volume * 100);
    document.getElementById('volumeIndicator').textContent = `${volumePercentage}%`;
}

// Actualizar progreso de reproducción manualmente
function updateProgress(e) {
    const rect = progressBar.getBoundingClientRect();
    const offsetX = e.clientX - rect.left;
    const percentage = Math.max(0, Math.min(offsetX / rect.width, 1));
    progress.style.width = `${percentage * 100}%`;
    progressThumb.style.left = `${percentage * 100}%`;
    audioPlayer.currentTime = percentage * audioPlayer.duration;
}

// Control de progreso al arrastrar el pulgar
progressThumb.addEventListener('mousedown', () => {
    isDragging = true;
    document.body.style.cursor = 'grabbing';
});

document.addEventListener('mouseup', () => {
    if (isDragging) {
        isDragging = false;
        document.body.style.cursor = 'default';
    }
});

document.addEventListener('mousemove', (e) => {
    if (isDragging) {
        updateProgress(e);
    }
});

progressBar.addEventListener('click', (e) => {
    updateProgress(e);
});

// Actualizar progreso y tiempo transcurrido automáticamente
audioPlayer.addEventListener('timeupdate', () => {
    if (!isDragging) {
        const percentage = audioPlayer.currentTime / audioPlayer.duration;
        progress.style.width = `${percentage * 100}%`;
        progressThumb.style.left = `${percentage * 100}%`;
    }

    const elapsedTime = Math.floor(audioPlayer.currentTime);
    elapsedTimeDisplay.textContent = formatTime(elapsedTime);
});

// Formatear el tiempo en minutos y segundos
function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
}

// Integración con el menú desplegable
document.querySelectorAll('.menu-options a').forEach(link => {
    link.addEventListener('click', (event) => {
        event.preventDefault();
        const stationUrl = link.getAttribute('data-station');
        if (stationUrl) {
            playPauseButton.classList.add('loading');
            audioPlayer.src = stationUrl;
            audioPlayer.play().then(() => {
                isPlaying = true;
                activateVisualState(); // Asegura que el reproductor reaccione visualmente
            }).catch(() => {
                alert('No se pudo reproducir la estación seleccionada.');
                playPauseButton.classList.remove('loading');
            });
        }
    });
});
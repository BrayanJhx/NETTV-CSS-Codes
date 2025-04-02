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

window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');
    preloader.style.opacity = '0';
    setTimeout(() => {
        preloader.style.display = 'none';
    }, 500);
});

document.querySelectorAll('button').forEach(button => {
    button.addEventListener('mousedown', e => e.preventDefault());
});

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

function increaseVolume() {
    if (audioPlayer.volume < 1) {
        audioPlayer.volume = Math.min(1, audioPlayer.volume + 0.1);
        updateVolumeIndicator();
    }
}

function decreaseVolume() {
    if (audioPlayer.volume > 0) {
        audioPlayer.volume = Math.max(0, audioPlayer.volume - 0.1);
        updateVolumeIndicator();
    }
}

function updateVolumeIndicator() {
    const volumePercentage = Math.round(audioPlayer.volume * 100);
    document.getElementById('volumeIndicator').textContent = `${volumePercentage}%`;
}

function updateProgress(e) {
    const rect = progressBar.getBoundingClientRect();
    const offsetX = e.clientX - rect.left;
    const percentage = Math.max(0, Math.min(offsetX / rect.width, 1));
    progress.style.width = `${percentage * 100}%`;
    progressThumb.style.left = `${percentage * 100}%`;
    audioPlayer.currentTime = percentage * audioPlayer.duration;
}

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

audioPlayer.addEventListener('timeupdate', () => {
    if (!isDragging) {
        const percentage = audioPlayer.currentTime / audioPlayer.duration;
        progress.style.width = `${percentage * 100}%`;
        progressThumb.style.left = `${percentage * 100}%`;
    }

    const elapsedTime = Math.floor(audioPlayer.currentTime);
    elapsedTimeDisplay.textContent = formatTime(elapsedTime);
});

function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
}

function activateVisualState() {
    playPauseButton.classList.remove('loading');
    playPauseButton.classList.add('pause');
    equalizerBars.forEach(bar => bar.style.animationPlayState = 'running');
    liveLabel.classList.add('active');
}

function resetVisualState() {
    playPauseButton.classList.remove('pause');
    equalizerBars.forEach(bar => bar.style.animationPlayState = 'paused');
    liveLabel.classList.remove('active');
}

// Integración con el menú desplegable
document.querySelectorAll('.menu-options a').forEach(link => {
    link.addEventListener('click', (event) => {
        event.preventDefault();
        const stationUrl = link.getAttribute('data-station');
        if (stationUrl) {
            playPauseButton.classList.add('loading'); // Activa el estado de carga al seleccionar
            audioPlayer.src = stationUrl;
            audioPlayer.play().then(() => {
                isPlaying = true;
                activateVisualState(); // Asegura que el reproductor reaccione visualmente
            }).catch(() => {
                alert('No se pudo reproducir la estación seleccionada.');
                playPauseButton.classList.remove('loading'); // Desactiva el loader si falla
            });
        }
    });
});

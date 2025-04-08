class VolumeController {
    constructor(videoElement, muteButton, volumeSlider, volumeThumb) {
        this.video = videoElement;
        this.muteButton = muteButton;
        this.volumeSlider = volumeSlider;
        this.volumeThumb = volumeThumb;

        this.init();
    }

    init() {
        this.loadVolume();
        this.syncVolumeThumb();
        this.updateMuteButton(); // Asegura que el botón de silencio esté sincronizado

        this.muteButton.addEventListener('click', () => this.toggleMute());
        this.volumeSlider.addEventListener('click', (e) => this.updateVolume(e));
        this.volumeThumb.addEventListener('mousedown', (e) => this.startDragging(e));
        this.volumeThumb.addEventListener('touchstart', (e) => this.startDragging(e));
    }

    toggleMute() {
        this.video.muted = !this.video.muted;
        this.updateMuteButton();
    }

    updateMuteButton() {
        this.muteButton.innerHTML = this.video.muted
            ? '<i class="fas fa-volume-mute"></i>'
            : '<i class="fas fa-volume-up"></i>';
    }

    updateVolume(event) {
        const rect = this.volumeSlider.getBoundingClientRect();
        let clientX = event.touches ? event.touches[0].clientX : event.clientX;
        let percentage = (clientX - rect.left) / rect.width;
        percentage = Math.max(0, Math.min(1, percentage));
        this.video.volume = percentage;
        this.video.muted = percentage === 0;
        this.updateMuteButton();
        this.syncVolumeThumb();
        localStorage.setItem('videoVolume', this.video.volume); // Guarda el volumen
    }

    startDragging(startEvent) {
        const moveHandler = (moveEvent) => {
            const clientX = moveEvent.touches ? moveEvent.touches[0].clientX : moveEvent.clientX;
            this.updateVolume({ clientX });
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
    }

    loadVolume() {
        const savedVolume = localStorage.getItem('videoVolume');
        if (savedVolume !== null) {
            this.video.volume = parseFloat(savedVolume);
            this.video.muted = parseFloat(savedVolume) === 0; // Sincroniza el estado de silencio
        }
    }

    syncVolumeThumb() {
        const currentVolume = this.video.muted ? 0 : this.video.volume;
        this.volumeThumb.style.left = `${currentVolume * 100}%`;
    }
}
document.addEventListener("DOMContentLoaded", () => {
    const video = document.getElementById('video');
    const loader = document.getElementById('threeDotsLoader'); // Referencia al loader
    const playPause = document.getElementById('playPause');
    const mute = document.getElementById('mute');
    const volumeSlider = document.querySelector('.slider');
    const volumeThumb = document.querySelector('.thumb');
    const controls = document.getElementById('controls');
    const lock = document.getElementById('lock');
    const fullscreen = document.getElementById('fullscreen');
    const pip = document.getElementById('pip');

    // Asegúrate de pasar 'loader' al VideoController
    new VideoController(video, playPause, loader);
    new VolumeController(video, mute, volumeSlider, volumeThumb);
    new ControlsController(video, controls, lock, fullscreen, pip, playPause);
});
const openSearchModal = () => {
    const searchModal = document.getElementById('search-modal');
    searchModal.style.display = 'flex'; // Mostrar el modal
    const searchInput = document.getElementById('search-input');
    const searchResults = document.getElementById('search-results');

    searchInput.value = ''; // Limpia el campo de búsqueda
    searchResults.innerHTML = ''; // Limpia los resultados previos
};

// Evento para cerrar el modal
document.addEventListener('DOMContentLoaded', () => {
    const closeModalBtn = document.getElementById('close-modal');
    const searchModal = document.getElementById('search-modal');

    closeModalBtn.addEventListener('click', () => {
        searchModal.style.display = 'none'; // Ocultar el modal
    });
});

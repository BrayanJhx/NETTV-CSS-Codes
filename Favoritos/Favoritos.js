let sortOrder = 'asc';
let customLists = {};
let currentImageToMove = null;
let currentlyOpenList = null;

function loadFavorites() {
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    const favoritesContainer = document.getElementById('favorites-container');
    favoritesContainer.innerHTML = '';
    if (favorites.length === 0) {
        favoritesContainer.innerHTML = '<p style="text-align: center;">No hay favoritos guardados.</p>';
        return;
    }
    const sortedFavorites = sortOrder === 'asc' ? favorites : [...favorites].reverse();
    sortedFavorites.forEach(favorite => {
        const favoriteItem = document.createElement('div');
        favoriteItem.classList.add('favorite-item');
        const link = document.createElement('a');
        link.href = favorite.link;
        link.target = '_blank';
        const img = document.createElement('img');
        img.src = favorite.url;
        img.alt = favorite.alt;
        img.title = favorite.alt;
        link.appendChild(img);
        const moveIcon = document.createElement('i');
        moveIcon.classList.add('fas', 'fa-arrow-up-right-from-square', 'icon');
        moveIcon.onclick = () => showMenuOverlay(favorite);
        const deleteButton = document.createElement('button');
        deleteButton.classList.add('delete-button');
        deleteButton.innerHTML = '&times;';
        deleteButton.addEventListener('click', () => {
            showCustomDialog(`¿Estás seguro(a de que deseas eliminar este contenido de tu lista de favoritos?`, () => {
                removeFavorite(favorite.url);
                loadFavorites();
            });
        });
        favoriteItem.appendChild(link);
        favoriteItem.appendChild(moveIcon);
        favoriteItem.appendChild(deleteButton);
        favoritesContainer.appendChild(favoriteItem);
    });
}

function removeFavorite(imageUrl) {
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    favorites = favorites.filter(favorite => favorite.url !== imageUrl);
    localStorage.setItem('favorites', JSON.stringify(favorites));
}

function saveToFavorites(image) {
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    favorites.push(image);
    localStorage.setItem('favorites', JSON.stringify(favorites));
    loadFavorites();
}

function saveCustomLists() {
    localStorage.setItem('customLists', JSON.stringify(customLists));
}

function loadCustomLists() {
    const storedLists = JSON.parse(localStorage.getItem('customLists')) || {};
    customLists = storedLists;
    renderCustomLists();
}

function showCreateListDialog() {
    const createListDialog = document.getElementById('create-list-dialog');
    const listInput = document.getElementById('list-name-input');
    createListDialog.style.display = 'block';
    document.getElementById('list-create').onclick = () => {
        const listName = listInput.value.trim();
        if (listName && !customLists[listName]) {
            customLists[listName] = [];
            saveCustomLists();
            renderCustomLists();
            createListDialog.style.display = 'none';
            listInput.value = '';
        } else {
            alert('El nombre está vacío o ya existe una lista con ese nombre.');
        }
    };
    document.getElementById('list-cancel').onclick = () => {
        createListDialog.style.display = 'none';
        listInput.value = '';
    };
}

function showMenuOverlay(favorite) {
    currentImageToMove = favorite;
    const menuOverlay = document.getElementById('menu-overlay');
    const menuList = document.getElementById('menu-list');
    menuList.innerHTML = '';

    const listNames = Object.keys(customLists);
    if (listNames.length === 0) {
        alert('No tienes listas personalizadas creadas.');
        return;
    }

    listNames.forEach(listName => {
        const listButton = document.createElement('button');
        listButton.textContent = listName;
        listButton.onclick = () => {
            customLists[listName].push(currentImageToMove);
            removeFavorite(currentImageToMove.url);
            saveCustomLists();
            loadFavorites();
            renderCustomLists();
            menuOverlay.style.display = 'none';
        };
        menuList.appendChild(listButton);
    });

    menuOverlay.style.display = 'block';

    // Evento para el botón "Cancelar"
    const menuCancelButton = document.getElementById('menu-cancel');
    menuCancelButton.onclick = () => {
        menuOverlay.style.display = 'none'; // Cierra el menú
    };
}

function renderCustomLists() {
    const listContainer = document.getElementById('list-container');
    listContainer.innerHTML = '';
    for (const listName in customLists) {
        const listElement = document.createElement('div');
        listElement.classList.add('list');
        listElement.textContent = listName;
        listElement.onclick = () => toggleListDisplay(listName);
        listElement.oncontextmenu = (e) => {
            e.preventDefault();
            showListOptions(listName);
        };
        listContainer.appendChild(listElement);
    }
}

function toggleListDisplay(listName) {
    const favoritesContainer = document.getElementById('favorites-container');

    if (currentlyOpenList === listName) {
        favoritesContainer.innerHTML = '';
        currentlyOpenList = null;
        loadFavorites(); // Recarga favoritos cuando se cierra la lista
        return;
    }

    currentlyOpenList = listName;
    const listImages = customLists[listName];
    favoritesContainer.innerHTML = '';
    const imagesContainer = document.createElement('div');
    imagesContainer.classList.add('images-container');

    listImages.forEach(image => {
        const favoriteItem = document.createElement('div');
        favoriteItem.classList.add('favorite-item');
        const link = document.createElement('a');
        link.href = image.link;
        link.target = '_blank';
        const img = document.createElement('img');
        img.src = image.url;
        img.alt = image.alt;
        img.title = image.alt;
        link.appendChild(img);

        const removeIcon = document.createElement('i');
        removeIcon.classList.add('fas', 'fa-times-circle', 'icon-remove');
        removeIcon.onclick = () => {
            showCustomDialog(`¿Estás seguro(a de que deseas eliminar este contenido de la lista "${listName}"?`, () => {
                removeImageFromList(listName, image);
            });
        };

        const returnIcon = document.createElement('i');
        returnIcon.classList.add('fas', 'fa-minus-circle', 'icon-return');
        returnIcon.onclick = () => {
            customLists[listName] = customLists[listName].filter(item => item.url !== image.url);
            saveToFavorites(image); // Regresa a favoritos generales
            saveCustomLists();
            renderCustomLists();
            toggleListDisplay(listName); // Refresca la lista actual
        };

        favoriteItem.appendChild(link);
        favoriteItem.appendChild(removeIcon);
        favoriteItem.appendChild(returnIcon);
        imagesContainer.appendChild(favoriteItem);
    });

    favoritesContainer.appendChild(imagesContainer);
}

function removeImageFromList(listName, image) {
    customLists[listName] = customLists[listName].filter(item => item.url !== image.url);
    saveCustomLists();
    renderCustomLists();
    toggleListDisplay(listName);
}

function showListOptions(listName) {
    const favoritesContainer = document.getElementById('favorites-container');
    favoritesContainer.innerHTML = '';

    const optionsContainer = document.createElement('div');
    optionsContainer.classList.add('options-container');

    const renameButton = document.createElement('button');
    renameButton.textContent = 'Renombrar';
    renameButton.classList.add('boton-renombrar');
    renameButton.onclick = () => showRenameDialog(listName);

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Eliminar';
    deleteButton.classList.add('boton-eliminar');
    deleteButton.onclick = () => {
        showCustomDialog(`¿Estás seguro(a de que deseas eliminar la lista "${listName}"?`, () => {
            delete customLists[listName];
            saveCustomLists();
            renderCustomLists();
            loadFavorites();
        });
    };

    const cancelButton = document.createElement('button');
    cancelButton.textContent = 'Cancelar';
    cancelButton.classList.add('boton-cancelar');
    cancelButton.onclick = loadFavorites;

    optionsContainer.appendChild(renameButton);
    optionsContainer.appendChild(deleteButton);
    optionsContainer.appendChild(cancelButton);
    favoritesContainer.appendChild(optionsContainer);
}

function showRenameDialog(listName) {
    const createListDialog = document.getElementById('create-list-dialog');
    const listInput = document.getElementById('list-name-input');
    const confirmButton = document.getElementById('list-create');
    listInput.value = listName;
    confirmButton.textContent = 'Renombrar';
    createListDialog.style.display = 'block';
    confirmButton.onclick = () => {
        const newName = listInput.value.trim();
        if (newName && !customLists[newName]) {
            customLists[newName] = customLists[listName];
            delete customLists[listName];
            saveCustomLists();
            renderCustomLists();
            loadFavorites();
            createListDialog.style.display = 'none';
            listInput.value = '';
            confirmButton.textContent = 'Crear';
        } else {
            alert('El nombre está vacío o ya existe una lista con ese nombre.');
        }
    };
    document.getElementById('list-cancel').onclick = () => {
        createListDialog.style.display = 'none';
        listInput.value = '';
        confirmButton.textContent = 'Crear';
    };
}

function showCustomDialog(message, onConfirm) {
    const dialogOverlay = document.getElementById('custom-dialog');
    const dialogMessage = document.getElementById('dialog-message');
    dialogMessage.textContent = message;
    dialogOverlay.style.display = 'block';
    document.getElementById('dialog-confirm').onclick = () => {
        dialogOverlay.style.display = 'none';
        onConfirm();
    };
    document.getElementById('dialog-cancel').onclick = () => {
        dialogOverlay.style.display = 'none';
    };
}

function toggleSortOrder() {
    sortOrder = sortOrder === 'asc' ? 'desc' : 'asc';
    loadFavorites();
}

document.addEventListener('DOMContentLoaded', () => {
    loadFavorites();
    loadCustomLists();
    document.getElementById('create-list-button').addEventListener('click', showCreateListDialog);
    document.getElementById('sort-button').addEventListener('click', toggleSortOrder);
});

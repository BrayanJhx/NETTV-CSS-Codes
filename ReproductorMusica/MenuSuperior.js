class Menu {
    constructor(menuButtonSelector, menuOptionsSelector) {
        this.menuButtons = document.querySelectorAll(menuButtonSelector);
        this.menus = document.querySelectorAll(menuOptionsSelector);

        if (this.menuButtons.length === 0) {
            console.error("No se encontraron botones de menú.");
        }
        if (this.menus.length === 0) {
            console.error("No se encontraron menús.");
        }

        this.init();
    }

    toggleMenu(button) {
        const menu = button.nextElementSibling;

        if (menu) {
            const isOpen = menu.classList.contains("open");

            if (isOpen) {
                this.closeMenu(menu);
            } else {
                this.closeAllMenus();
                this.openMenu(menu);
            }
        } else {
            console.error("No se encontró el menú asociado al botón:", button);
        }
    }

    openMenu(menu) {
        menu.classList.add("open");
        menu.style.pointerEvents = "auto";
        menu.style.position = "absolute";
        menu.style.zIndex = "99999";

        const menuItems = menu.querySelectorAll("li");
        menuItems.forEach((item, index) => {
            item.setAttribute("tabindex", index + 1); // Habilita el enfoque de las estaciones
            item.addEventListener("click", () => {
                this.selectMenuItem(item, menu); // Selecciona estación y cierra el menú
            });
        });
    }

    closeMenu(menu) {
        menu.classList.remove("open");
        menu.style.pointerEvents = "none";
        menu.style.zIndex = ""; // Resetea z-index
    }

    closeAllMenus() {
        this.menus.forEach(menu => {
            this.closeMenu(menu);
        });
    }

    selectMenuItem(menuItem, menu) {
        // Resetea todas las estaciones seleccionadas
        this.menus.forEach(menu => {
            const items = menu.querySelectorAll("li");
            items.forEach(item => {
                item.classList.remove("selected");
            });
        });

        // Marca la estación actual como seleccionada
        menuItem.classList.add("selected");

        // Cierra el menú al seleccionar una estación
        this.closeMenu(menu);
    }

    init() {
        this.menuButtons.forEach(button => {
            button.addEventListener("click", (event) => {
                event.stopPropagation();
                this.toggleMenu(button);
            });

            button.setAttribute("tabindex", "0"); // Permite navegar los botones con el control
        });

        document.addEventListener("click", (event) => {
            const clickedInsideMenuButton = event.target.closest(".menu-button");
            const clickedInsideMenuOptions = event.target.closest(".menu-options");

            if (!clickedInsideMenuButton && !clickedInsideMenuOptions) {
                this.closeAllMenus(); // Cierra los menús si se hace clic fuera
            }
        });
    }
              }

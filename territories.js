document.addEventListener('DOMContentLoaded', () => {

    // =========================================================================
    // 1. HEADER MENU & DRAWER TOGGLE
    // =========================================================================
    const menuToggleBtn = document.getElementById('menu-toggle');
    const sideMenu = document.getElementById('side-menu');

    if (menuToggleBtn && sideMenu) {
        // Toggle menu open/close state on button click
        menuToggleBtn.addEventListener('click', (event) => {
            event.stopPropagation();
            menuToggleBtn.classList.toggle('active');
            sideMenu.classList.toggle('open');
        });

        // Close drawer when clicking outside the header/menu area
        document.addEventListener('click', (event) => {
            if (!menuToggleBtn.contains(event.target) && !sideMenu.contains(event.target)) {
                menuToggleBtn.classList.remove('active');
                sideMenu.classList.remove('open');
            }
        });

        // Prevent drawer clicks from bubbling up to document and closing the menu
        sideMenu.addEventListener('click', (event) => {
            event.stopPropagation();
        });
    }

    // =========================================================================
    // 2. FLYOUT MENU TAB NAVIGATION
    // =========================================================================
    const sidebarItems = document.querySelectorAll('.drawer-sidebar .menu-item');
    const contentPanes = document.querySelectorAll('.menu-pane-content');

    if (sidebarItems.length > 0 && contentPanes.length > 0) {
        sidebarItems.forEach(item => {
            const handleTabSwitch = () => {
                const targetTab = item.getAttribute('data-tab');

                // Update sidebar active states
                sidebarItems.forEach(el => el.classList.remove('active'));
                item.classList.add('active');

                // Update content pane active states
                contentPanes.forEach(pane => {
                    if (pane.id === `pane-${targetTab}`) {
                        pane.classList.add('active');
                    } else {
                        pane.classList.remove('active');
                    }
                });
            };

            // Switch tabs on hover for desktop experience
            item.addEventListener('mouseenter', handleTabSwitch);

            // Switch tabs on click (and prevent default link behavior)
            item.addEventListener('click', (e) => {
                e.preventDefault();
                handleTabSwitch();
            });
        });
    }

    // =========================================================================
    // 3. TERRITORIES PAGE SPECIFIC LOGIC (Add custom scripts below if needed)
    // =========================================================================

});
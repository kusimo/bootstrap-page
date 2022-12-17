document.addEventListener('DOMContentLoaded', () => {
    // Header
    const toggleButton = document.querySelector('.navbar-toggler') || null,
        headerNavbar = document.querySelector('#navbar_main.navbar-collapse');

    // Toggle the nav toggler (hambuger)
    if (toggleButton) {
        toggleButton.addEventListener('click', function (e) {
            let classes = headerNavbar.classList;
            classes.toggle('show')
        })
    }

    // Toggle mobile menu child list display
    let subMenuButton = document.querySelectorAll('#navbar_main .sub-menu-button');
    let menuTitle = document.querySelectorAll('#navbar_main .menu-title');
    if (subMenuButton.length > 0) {
        for (let i = 0; i < subMenuButton.length; i++) {
            subMenuButton[i].removeAttribute('tabIndex');
            toggleMenu(subMenuButton[i]);
        }
    }

    if (menuTitle.length > 0) {
        for (let i = 0; i < menuTitle.length; i++) {
            menuTitle[i].removeAttribute('tabIndex');
            toggleMenu(menuTitle[i]);
        }
    }

    // Footer Toggle links on mobile
    let footerToggler = document.querySelectorAll('.footer-block__heading');
    if (footerToggler.length > 0) {
        footerToggler.forEach(item => {
            item.addEventListener('click', function (e) {
                if (item.classList.contains('active')) {
                    item.classList.remove('active')
                } else {
                    item.classList.add('active');
                }
            })
        })
    }

    // Helper
    function toggleMenu(menu) {
        menu.addEventListener('click', function (event) {
            event.preventDefault();
            menu.classList.toggle('active');
            menu.parentNode.classList.toggle("is-active");
            let panel = menu.parentNode.nextElementSibling || null;
            if (panel)
                panel.classList.toggle("active-panel");
        });
    }
})



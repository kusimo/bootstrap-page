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

    /*********************************************
     * SWIPER JS
     */
    var swiper = new Swiper(".swiperBottom", {
        loop: true,
        spaceBetween: 10,
        slidesPerView: 4,
        freeMode: true,
        watchSlidesProgress: true,
      });
      var swiper2 = new Swiper(".swiperTop", {
        loop: true,
        spaceBetween: 10,
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
        thumbs: {
          swiper: swiper,
        },
      });
})


/***********************************
 * CART NOTIFICATION
 */
class CartNotification extends HTMLElement {
    constructor() {
      super();
  
      this.notification = document.getElementById('cart-notification-popup');
      this.header = document.querySelector('.section-header');
      this.onBodyClick = this.handleBodyClick.bind(this);
  
      this.checkoutBtn = document.querySelector('cart-notification-popup #check-checkout');
  
  
      this.notification.addEventListener('keyup', (evt) => evt.code === 'Escape' && this.close());
      this.querySelectorAll('button[type="button.close-btn"]').forEach((closeButton) =>
        closeButton.addEventListener('click', this.close.bind(this))
      );
  
      this.toggleMiniCart();
      this.handleCloseBtn();
    }
  
    open() {
      this.notification.classList.add('animate', 'active');  
      this.notification.addEventListener('transitionend', () => {
        this.notification.focus();
      }, { once: true });
      document.body.addEventListener('click', this.onBodyClick);
    }
  
    close() {
      document.body.removeEventListener('click', this.onBodyClick);
      this.notification.classList.remove('active');
  
    }
  
    toggleMiniCart() {
      this.getSectionsToRender().forEach((section => {
        let elem = document.querySelector(section.id);
        if (elem) {
          elem.addEventListener('click', (e) => {
            e.preventDefault();
  
            this.handleActive(elem)
          })
        }
  
      }));
    }
  
    handleActive(elem) {
        if(elem) {
            if (elem.classList.contains('active')) {
                elem.classList.remove('active');
                this.close();
              } else {
                this.open();
                elem.classList.add('active');
              }
        }
    }
  
    getSectionsToRender() {
      return [
        {
          id: '#cart-notification-button'
        },
        {
          id: '#cart-icon-bubble'
        },
        {
          id: 'cart-notification__close'
        }
      ];
    }
  
    handleBodyClick(evt) {
      const target = evt.target;
      if (target !== this.notification && !target.closest('#cart-icon-bubble') && !target.closest('#cart-notification-popup')) {
        this.close();
        document.getElementById('cart-icon-bubble').classList.remove('active');
      }
  
    }
  
    handleCloseBtn() {
      var self = this;
      document.querySelector('.cart-notification__close').addEventListener('click', function() {
        if(document.querySelector('#cart-icon-bubble')) {
            self.handleActive(document.querySelector('#cart-icon-bubble'));
        }
      })
    }
  
  }
  
  customElements.get('cart-notification-popup') || customElements.define('cart-notification-popup', CartNotification);


  
  (function() {
    /** Dummy Add to cart. Update  & show notification */

    const addToCartBtn = document.querySelector('.add-to-basket') || null;
    if (addToCartBtn) {
        addToCartBtn.addEventListener('click', (e) => {
            e.preventDefault();
            const selectedColor = document.querySelector('#selected-color span') ? document.querySelector('#selected-color span').textContent : null,
            selectedSize = document.querySelector('#selected-size span') ? document.querySelector('#selected-size span').textContent : null,
            notification = document.querySelector('#cart-notification-popup'),
            cartBubble = document.querySelector('#cart-icon-bubble'),
            summary = document.querySelector('.cart-notification-summary'),
            summaryContainer = document.querySelector('.cart-notification-product'),
            cartEmptyMsg = document.querySelector('.cart-is-empty');

            if (notification) {
                summaryContainer.innerHTML = '';

                cartEmptyMsg.classList.add('d-none')
                summaryContainer.innerHTML += `<p class="mb-4"><span class="font-bold">${selectedSize}</span> (${selectedColor})</p>`
                summary.classList.add('d-block')
                summaryContainer.classList.add('d-block')

                notification.classList.add('animate', 'active');  
                cartBubble.classList.add('active');  
                notification.addEventListener('transitionend', () => {
                    notification.focus();
                  }, { once: true });
            }

        })
    }

    /* Dummy color change and set active color */
    const colorSwatches = document.querySelectorAll('.swatch-element'),
    selectedColor = document.querySelector('#selected-color span');
    if (colorSwatches.length > 0 ) {
        colorSwatches.forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                selectedColor? selectedColor.textContent = button.dataset.color : null;
                colorSwatches.forEach(elem => elem.classList.remove('active'));
                button.classList.add('active')
            })
        })
    }

    /* Dummy change size */
    const selectElement = document.querySelector('.size-variant');

    selectElement.addEventListener('change', (event) => {
    const result = document.querySelector('#selected-size span');
    result.textContent = `${event.target.value}`;
    });

    /* Dummy count down timer */
    const timerContainer = document.getElementById("next-day-ending");
    //consttimerCounter;
    clockStart(timerContainer, '3610');

    function clockStart(elem, setHours) {
        const timerCounter = setInterval(timerClock, 1000);
        let c = parseInt(setHours) * 2; //Initially set to 2 hour
    
    
        function timerClock() {
            --c
            const seconds = c % 60; 
            const secondsInMinutes = (c - seconds) / 60; 
            const minutes = secondsInMinutes % 60; 
            const hours = (secondsInMinutes - minutes) / 60;
            elem.innerHTML = hours + ":" + minutes + ":" + seconds
            if (c == 0) {
                clearInterval(timerCounter);
                elem.parentNode ?  elem.parentNode.remove() : '';
            }
        }
    }

    /*************************************
     * PRODUCT TABS
     */
    let tabSection = document.querySelector("#tab-section-4");

    if (tabSection) {
      let tabUl = tabSection.getElementsByTagName("ul");
      let contents = tabSection.querySelectorAll(
        ".adp-tab-content .adp-tab-pane"
      );
      if (tabUl.length > 0) {
        let tabLi = "#" + tabSection.getAttribute("id") + " ul li";
        let tabLiItem = document.querySelectorAll(tabLi);

        for (let i = 0; i < tabLiItem.length; i++) {
          tabLiItem[i].addEventListener("click", function (e) {
            e.preventDefault();
            for (let b = 0; b < tabLiItem.length; b++) {
              tabLiItem[b].classList.remove("active");
            }
            this.classList.add("active");

            // change content
            for (i = 0; i < contents.length; i++) {
              contents[i].classList.remove("active");
            }

            let tabId = this.getAttribute("data-id");

            document.querySelector(tabId).classList.toggle("active");
          });
        }
      }
    }




  }) ();
  
  







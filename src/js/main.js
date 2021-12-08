const anons = []; //массив кратких заголовков для навигации в слайдере
const banners = document.querySelectorAll(".anons");
if (banners.length > 0) {
    for (let i = 0; i < banners.length; i++) {
        anons[i] = banners[i].innerHTML.toUpperCase();
    }
}

const swiper = new Swiper(".swiper-container", {
    // Optional parameters
    // autoplay: {
    //     delay: 7000,
    // },
    //loop: true,
    // Отступ между слайдами
    spaceBetween: 30,
    observer: true,
    observeParents: true,
    slidesPerView: 1,
    preloadImages: false,
    lazy: true,
    navigation: false,

    pagination: {
        el: ".swiper-pagination",
        clickable: true,
        renderBullet: function (index, className) {
            return (
                '\
		  <div class="news ' +
                className +
                '">\
		  <div class="text">' +
                anons[index] +
                "</div>\
		  </div>"
            );
        },
    },

    // And if we need scrollbar
    scrollbar: {
        el: ".swiper-scrollbar",
    },
});

let unlock = true;

//=================
//Menu
let iconMenu = document.querySelector(".header__menu-icon");
let menuBody = document.querySelector(".nav");
let body = document.querySelector("body");

if (iconMenu != null) {
    let delay = 500;
    iconMenu.addEventListener("click", function (e) {
        if (unlock) {
            body.classList.toggle("_lock");
            iconMenu.classList.toggle("_active");
            menuBody.classList.toggle("_active");
        }
    });
}

/*==================== REMOVE MENU MOBILE ====================*/
const navLink = document.querySelectorAll(".nav__link");

navLink.forEach((n) =>
    n.addEventListener("click", () => {
        body.classList.remove("_lock");
        menuBody.classList.remove("_active");
        iconMenu.classList.remove("_active");
    })
);

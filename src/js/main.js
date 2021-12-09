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
const iconMenu = document.querySelector(".header__menu-icon");
const menuBody = document.querySelector(".nav");
const body = document.querySelector("body");

if (iconMenu != null) {
    iconMenu.addEventListener("click", function (e) {
        if (unlock) {
            body.classList.toggle("_lock");
            iconMenu.classList.toggle("_active");
            menuBody.classList.toggle("_active");
        }
    });
}

/*==================== REMOVE MENU MOBILE ====================*/
const navLinks = document.querySelectorAll(".nav__link");

navLinks.forEach((n) =>
    n.addEventListener("click", () => {
        body.classList.remove("_lock");
        menuBody.classList.remove("_active");
        iconMenu.classList.remove("_active");
    })
);
/*=================== ACTIVE MENU SCROLL ==========================*/
window.addEventListener("scroll", () => {
    let scrollDistance = window.scrollY;

    if (window.innerWidth > 768) {
        document.querySelectorAll("section").forEach((el, i) => {
            if (
                el.offsetTop - document.querySelector(".header").clientHeight <=
                scrollDistance
            ) {
                navLinks.forEach((el) => {
                    if (el.classList.contains("_active")) {
                        el.classList.remove("_active");
                    }
                });

                navLinks[i].classList.add("_active");
            }
        });
    }
});

// показываем или убираем плашку вверху при скроле
const scrollableElement = document.body; //document.getElementById('scrollableElement');
const topPanel = document.querySelector(".header");
const pageMain = document.querySelector(".main");

scrollableElement.addEventListener("wheel", checkScrollDirection);

function checkScrollDirection(event) {
    if (checkScrollDirectionIsUp(event)) {
        topPanel.classList.add("_active");
    } else {
        topPanel.classList.remove("_active");
    }
}

function checkScrollDirectionIsUp(event) {
    if (event.wheelDelta) {
        return event.wheelDelta > 0;
    }
    return event.deltaY < 0;
}

//  тоже самое для планшетов и мобилок
//Чувствительность — количество пикселей, после которого жест будет считаться свайпом
const sensitivity = 20;

var touchStart = null; //Точка начала касания
var touchPosition = null; //Текущая позиция

//Перехватываем события
scrollableElement.addEventListener("touchstart", function (e) {
    TouchStart(e);
}); //Начало касания
scrollableElement.addEventListener("touchmove", function (e) {
    TouchMove(e);
}); //Движение пальцем по экрану
//Пользователь отпустил экран
scrollableElement.addEventListener("touchend", function (e) {
    TouchEnd(e, "green");
});
//Отмена касания
scrollableElement.addEventListener("touchcancel", function (e) {
    TouchEnd(e, "red");
});

function TouchStart(e) {
    //Получаем текущую позицию касания
    touchStart = {
        x: e.changedTouches[0].clientX,
        y: e.changedTouches[0].clientY,
    };
    touchPosition = { x: touchStart.x, y: touchStart.y };
}

function TouchMove(e) {
    //Получаем новую позицию
    touchPosition = {
        x: e.changedTouches[0].clientX,
        y: e.changedTouches[0].clientY,
    };
}

function TouchEnd(e, color) {
    CheckAction(); //Определяем, какой жест совершил пользователь

    //Очищаем позиции
    touchStart = null;
    touchPosition = null;
}

function CheckAction() {
    var d = {
        //Получаем расстояния от начальной до конечной точек по обеим осям
        x: touchStart.x - touchPosition.x,
        y: touchStart.y - touchPosition.y,
    };

    var msg = ""; //Сообщение

    if (Math.abs(d.x) > Math.abs(d.y)) {
        //Проверяем, движение по какой оси было длиннее
        if (Math.abs(d.x) > sensitivity) {
            //Проверяем, было ли движение достаточно длинным
            if (d.x > 0) {
                //Если значение больше нуля, значит пользователь двигал пальцем справа налево
                msg = "Swipe Left";
            } else {
                //Иначе он двигал им слева направо
                msg = "Swipe Right";
            }
        }
    } else {
        //Аналогичные проверки для вертикальной оси
        if (Math.abs(d.y) > sensitivity) {
            if (d.y > 0) {
                topPanel.classList.remove("_active"); //Свайп вверх
            } else {
                topPanel.classList.add("_active"); //Свайп вниз
            }
        }
    }
}

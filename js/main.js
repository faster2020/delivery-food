// Отслеживаемые элементы
// Кнопка открытия модального окна "Корзина"
const cartButton = document.querySelector("#button-cart");
// Кнопка "Отмена" закрытия модального окна "Корзина"
const cancelButton = document.querySelector("#button-cancel");
// Модальное окно "Корзина"
const modal = document.querySelector(".modal");
// Кнопка "Х" закрытия модального окна "Корзина"
const modalClose = document.querySelector(".modal__close");

// Окрытие модального окна "Корзина"
cartButton.addEventListener("click", ToogleModal);

// Закрытие модального окна "Корзина"
// С помощью кнопки "Х"
modalClose.addEventListener("click", ToogleModal);
// С помощью кнопки "Отмена"
cancelButton.addEventListener("click", ToogleModal);
// С помощью клика на подложку
modal.addEventListener("click", CloseModal);

// Функция открытия и закрытия окна "Корзина"
function ToogleModal () {
    modal.classList.toggle("is-active");
    event.stopPropagation();
};

// Функция закрытия окна кликом на подлолжку
function CloseModal () {
  if (event.target.className == modal.className) {
    modal.classList.remove("is-active");
  }
};

// Инициализация WOW.js
new WOW().init();
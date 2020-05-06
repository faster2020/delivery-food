'use strict';

const BIRTHDAY = '02 february';

// Кнопка открытия модального окна "Корзина"
const buttonCart = document.querySelector('.button-cart');
// Модальное окно "Корзина"
const modalCart = document.querySelector('.modal-cart');
// Кнопка "Х" закрытия модального окна "Корзина"
const closeCart = document.querySelector('.modal-cart__close');
// Кнопка "Отмена" закрытия модального окна "Корзина"
const buttonCancelCart = document.querySelector('.button-cancel-cart');

const buttonAuth = document.querySelector('.button-auth');
const modalAuth = document.querySelector('.modal-auth');
const closeAuth = document.querySelector('.modal-auth__close');
const buttonCancelAuth = document.querySelector('.button-cancel-auth');
const logInForm = document.querySelector('#logInForm');
const loginInput = document.querySelector('#login');
const userName = document.querySelector('.user-name');
const buttonOut = document.querySelector('.button-out');
const restaurantsCards = document.querySelector('.restaurants__cards');
const containerPromo = document.querySelector('.container-promo');
const restaunts = document.querySelector('.restaurants');
const products = document.querySelector('.products');
const headerLogo = document.querySelector('.header__logo');
const productsCards = document.querySelector('.products__cards');

let login = localStorage.getItem('myDelivery');
console.log(login);

// Функция открытия и закрытия окна "Корзина"
function toggleModalCart() {
  modalCart.classList.toggle('is-active');
  event.stopPropagation();
}

// Функция закрытия окна кликом на подлолжку
function closeModalCart() {
  if (event.target.className == modal.className) {
    modalCart.classList.remove('is-active');
  }
}

function cleanLogInForm() {
  loginInput.style.borderColor = '';
  loginInput.placeholder = '';
  logInForm.reset();
}

function toggleModalAuth() {
  cleanLogInForm();
  modalAuth.classList.toggle('is-active');
  loginInput.focus();
}

function closeModalAuth() {
  if (event.target.className === modalAuth.className) {
    modalAuth.classList.remove('is-active');
  }
}

function authorized() {
  function logOut() {
    login = null;

    buttonAuth.style.display = '';
    userName.style.display = '';
    buttonOut.style.display = '';

    buttonOut.removeEventListener('click', logOut);

    localStorage.removeItem('myDelivery');

    checkAuth();
  }

  userName.textContent = login;

  buttonAuth.style.display = 'none';
  userName.style.display = 'inline';
  buttonOut.style.display = 'block';

  buttonOut.addEventListener('click', logOut);
}

function maskInput(string) {
  return string.trim();
}

function notAuthorized() {
  function logIn(event) {
    event.preventDefault();

    loginInput.value = maskInput(loginInput.value);

    if (loginInput.value) {
      login = loginInput.value;

      localStorage.setItem('myDelivery', login);

      buttonAuth.removeEventListener('click', toggleModalAuth);
      closeAuth.removeEventListener('click', toggleModalAuth);
      buttonCancelAuth.removeEventListener('click', toggleModalAuth);
      modalAuth.removeEventListener('click', closeModalAuth);
      logInForm.removeEventListener('submit', logIn);

      logInForm.reset();

      checkAuth();
      toggleModalAuth();
    } else {
      loginInput.style.borderColor = 'tomato';
      loginInput.placeholder = 'Обязательное поле!';
    }
  }

  buttonAuth.addEventListener('click', toggleModalAuth);
  closeAuth.addEventListener('click', toggleModalAuth);
  buttonCancelAuth.addEventListener('click', toggleModalAuth);
  modalAuth.addEventListener('click', closeModalAuth);
  logInForm.addEventListener('submit', logIn);
}

function checkAuth() {
  if (login) {
    authorized();
  } else {
    notAuthorized();
  }
}

function createRestaurantCard() {
  const card = `
    <a class="restaurant__card wow fadeInUp" data-wow-delay="0.2s" href="#">
      <!-- Фотография карточки -->
      <img class="restaurant__card-img" src="img/pizza-plus-plus.jpg" alt="Пицца Плюс" />
      <!-- Текстовая часть карточки -->
      <div class="restaurant__card-text">
        <!-- Верхняя часть текстовой части карточки -->
        <div class="restaurant__card-heading">
          <!-- Заголовок карточки -->
          <h3 class="restaurant__card-title">
            Пицца++
          </h3>
          <!-- /.restaurant__card-title -->
          <!-- Тег или среднее время ожидания заказа -->
          <div class="restaurant__card-tag">
            50 мин
          </div>
          <!-- /.restaurant__card-tag -->
        </div>
        <!-- /.restaurant__card-heading -->
        <!-- Информация карточки -->
        <div class="restaurant__card-info">
          <!-- Рейтинг в карточке -->
          <div class="restaurant__card-rating">
            <img class="restaurant__icon" src="img/rating.svg" alt="Рейтинг" />
            4.5
          </div>
          <!-- /.restaurant__card-rating -->
          <!-- Цена в карточке -->
          <div class="restaurant__card-price">От 900 ₽</div>
          <!-- /.restaurant__card-price -->
          <!-- Категория в карточке-->
          <div class="restaurant__card-category">
            Пицца
          </div>
          <!-- /.restaurant__card-category -->
        </div>
        <!-- /.restaurant__card-info -->
      </div>
      <!-- /.restaurant__card-text -->
    </a>
    <!-- /.restaurant__card -->
  `;

  restaurantsCards.insertAdjacentHTML('beforeend', card);
}

function createProductCard() {
  const card = document.createElement('div');
  card.className = 'product__card wow fadeInUp';
  // card.dataWowDelay = '0.2s';

  card.insertAdjacentHTML(
    'beforeend',
    `
    <!-- Изображение карточки -->
    <img class="product__card-img" src="img/eel-fish.jpg" alt="Угорь" />
    <!-- Текст карточки -->
    <div class="product__card-text">
      <!-- Верхняя часть карточки -->
      <div class="product__card-heading">
        <!-- Заголовок карточки -->
        <h3 class="product__card-title">
          Ролл Угорь стандарт
        </h3>
        <!-- /.product__card-title -->
      </div>
      <!-- /.product__card-heading -->
      <!-- Информация карточки -->
      <div class="product__card-info">
        <!-- Ингредиенты в карточке -->
        <div class="product__card-ingredients">
          Рис, угорь, соус унаги, кунжут, водоросли нори.
        </div>
        <!-- /.product__card-ingredients -->
      </div>
      <!-- /.product__card-info -->
      <!-- Кнорпка "В корзину" и цена -->
      <div class="product__card-buttons">
        <!-- Кнопка "В корзину" -->
        <button class="button button-primary">
          <span class="button__text">В корзину</span>
          <img class="button__icon button__icon_right" src="img/shopping-cart-white.svg" alt="Корзина" />
        </button>
        <!-- /.button button-primary -->
        <!-- Цена в карточке -->
        <span class="product__card-price">250 ₽</span>
      </div>
      <!-- /.product__card-buttons -->
    </div>
    <!-- /.product__card-text -->
  `
  );

  productsCards.insertAdjacentElement('beforeend', card);
}

function openProducts(event) {
  event.preventDefault();

  const target = event.target;
  const restaurant = target.closest('.restaurant__card');

  if (restaurant) {
    if (login) {
      productsCards.textContent = '';

      containerPromo.classList.add('hide');
      restaunts.classList.add('hide');
      products.classList.remove('hide');

      createProductCard();
      createProductCard();
      createProductCard();
    } else {
      toggleModalAuth();
    }
  }
}

// Окрытие модального окна "Корзина"
buttonCart.addEventListener('click', toggleModalCart);

// Закрытие модального окна "Корзина"
// С помощью кнопки "Х"
closeCart.addEventListener('click', toggleModalCart);
// С помощью кнопки "Отмена"
buttonCancelCart.addEventListener('click', toggleModalCart);
// С помощью клика на подложку
modalCart.addEventListener('click', closeModalCart);

restaurantsCards.addEventListener('click', openProducts);
headerLogo.addEventListener('click', function (event) {
  event.preventDefault();

  containerPromo.classList.remove('hide');
  restaunts.classList.remove('hide');
  products.classList.add('hide');
});

checkAuth();

createRestaurantCard();
createRestaurantCard();
createRestaurantCard();

// Инициализация WOW.js
new WOW().init();

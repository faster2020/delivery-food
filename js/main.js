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

const buttonAuth = document.querySelector('.button-auth'),
  modalAuth = document.querySelector('.modal-auth'),
  closeAuth = document.querySelector('.modal-auth__close'),
  buttonCancelAuth = document.querySelector('.button-cancel-auth'),
  logInForm = document.querySelector('#logInForm'),
  loginInput = document.querySelector('#login'),
  userName = document.querySelector('.user-name'),
  buttonOut = document.querySelector('.button-out'),
  restaurantsCards = document.querySelector('.restaurants__cards'),
  promoContainer = document.querySelector('.promo-container'),
  restaunts = document.querySelector('.restaurants'),
  products = document.querySelector('.products'),
  headerLogo = document.querySelector('.header__logo'),
  restaurantHeading = document.querySelector('.restaurant__heading'),
  productsCards = document.querySelector('.products__cards');

let login = localStorage.getItem('myDelivery');
console.log(login);

const getData = async function (url) {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Ошибка по адресу: "${url}", статус ошибки: "${response.status}"`);
  }

  return await response.json();
};

const validLogin = function (str) {
  const regName = /^[a-zA-Z][a-zA-Z0-9-_.]{2,20}$/;
  return regName.test(str);
};

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
    returnMain();
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

    // loginInput.value = maskInput(loginInput.value);

    if (validLogin(loginInput.value)) {
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

function createRestaurantCard(restaurant) {
  const { name, image, time_of_delivery: timeOfDelivery, stars, price, kitchen, products } = restaurant;

  const card = `
    <a class="restaurant__card wow fadeInUp" data-name="${name}" data-products="${products}" data-wow-delay="0.2s" href="#">
      <!-- Фотография карточки -->
      <img class="restaurant__card-img" src="${image}" alt="${name}" />
      <!-- Текстовая часть карточки -->
      <div class="restaurant__card-text">
        <!-- Верхняя часть текстовой части карточки -->
        <div class="restaurant__card-heading">
          <!-- Заголовок карточки -->
          <h3 class="restaurant__card-title">
            ${name}
          </h3>
          <!-- /.restaurant__card-title -->
          <!-- Тег или среднее время ожидания заказа -->
          <div class="restaurant__card-tag">
            ${timeOfDelivery} мин
          </div>
          <!-- /.restaurant__card-tag -->
        </div>
        <!-- /.restaurant__card-heading -->
        <!-- Информация карточки -->
        <div class="restaurant__card-info">
          <!-- Рейтинг в карточке -->
          <div class="restaurant__card-rating">
            <img class="restaurant__icon" src="img/rating.svg" alt="Рейтинг" />
            ${stars}
          </div>
          <!-- /.restaurant__card-rating -->
          <!-- Цена в карточке -->
          <div class="restaurant__card-price">От ${price} ₽</div>
          <!-- /.restaurant__card-price -->
          <!-- Категория в карточке-->
          <div class="restaurant__card-category">
            ${kitchen}
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

function createRestaurantHeading({ name, stars, price, kitchen }) {
  const heading = `
    <!-- Заголовок ресторана -->
    <h2 class="restaurant__title">
      ${name}
    </h2>
    <!-- /.restaurant__title -->
    <!-- Информация о ресторане -->
    <div class="restaurant__card-info restaurant__card-info_margins">
      <!-- Рейтинг ресторана -->
      <div class="restaurant__card-rating restaurant__card-rating_basis_auto">
        <img class="restaurant__icon" src="img/rating.svg" alt="Рейтинг" />
      ${stars}
      </div>
      <!-- /.restaurant__card-rating restaurant__card-rating_basis_auto -->
      <!-- Начальная цена в ресторане -->
      <div class="restaurant__card-price restaurant__card-price_size_big">${price}</div>
      <!-- /.restaurant__card-price restaurant__card-price_size_big -->
      <!-- Категория ресторана -->
      <div class="restaurant__card-category restaurant__card-category_size_big restaurant__card-category_long">
        ${kitchen}
      </div>
      <!-- /.restaurant__card-category restaurant__card-category_size_big -->
    </div>
    <!-- /.product__card-info -->
  `;

  restaurantHeading.insertAdjacentHTML('afterbegin', heading);
}

function createProductCard({ id, name, image, description, price }) {
  const card = document.createElement('div');
  card.className = 'product__card wow fadeInUp';
  // card.attributes.setNamedItem('dataWowDelay', '0.2s');
  // card.dataWowDelay = '0.2s';

  // const { id, name, image, description, price } = product;

  card.insertAdjacentHTML(
    'beforeend',
    `
    <!-- Изображение карточки -->
    <img class="product__card-img" src="${image}" alt="${name}" />
    <!-- Текст карточки -->
    <div class="product__card-text">
      <!-- Верхняя часть карточки -->
      <div class="product__card-heading">
        <!-- Заголовок карточки -->
        <h3 class="product__card-title">
          ${name}
        </h3>
        <!-- /.product__card-title -->
      </div>
      <!-- /.product__card-heading -->
      <!-- Информация карточки -->
      <div class="product__card-info">
        <!-- Ингредиенты в карточке -->
        <div class="product__card-ingredients">
          ${description}
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
        <span class="product__card-price">${price} ₽</span>
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
      restaurantHeading.textContent = '';
      productsCards.textContent = '';

      promoContainer.classList.add('hide');
      restaunts.classList.add('hide');
      products.classList.remove('hide');

      const restaurantObject = {
        name: restaurant.dataset.name,
        stars: restaurant.querySelector('.restaurant__card-rating').textContent.trim(),
        price: restaurant.querySelector('.restaurant__card-price').textContent.trim(),
        kitchen: restaurant.querySelector('.restaurant__card-category').textContent.trim(),
      };

      createRestaurantHeading(restaurantObject);

      getData(`./db/${restaurant.dataset.products}`).then(function (data) {
        data.forEach(createProductCard);
      });
    } else {
      toggleModalAuth();
    }
  }
}

function returnMain() {
  event.preventDefault();

  promoContainer.classList.remove('hide');
  restaunts.classList.remove('hide');
  products.classList.add('hide');
}

function init() {
  getData('db/partners.json').then(function (data) {
    data.forEach(createRestaurantCard);
  });

  // Окрытие модального окна "Корзина"
  buttonCart.addEventListener('click', toggleModalCart);
  // Вариант с передачей конкретного элемента
  // buttonCart.addEventListener('click', toggleModal.bind(null, modalCart));

  // Закрытие модального окна "Корзина"
  // С помощью кнопки "Х"
  closeCart.addEventListener('click', toggleModalCart);
  // С помощью кнопки "Отмена"
  buttonCancelCart.addEventListener('click', toggleModalCart);
  // С помощью клика на подложку
  modalCart.addEventListener('click', closeModalCart);

  restaurantsCards.addEventListener('click', openProducts);

  headerLogo.addEventListener('click', returnMain);

  checkAuth();

  new Swiper('.swiper-container', {
    loop: true,
    slidesPerView: 1,
    speed: 800,
    autoplay: {
      delay: 4000,
    },
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
  });

  // Инициализация WOW.js
  new WOW().init();
}

init();

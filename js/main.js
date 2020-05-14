'use strict';

const BIRTHDAY = '02 february';

// Кнопка открытия модального окна "Корзина"
const buttonCart = document.querySelector('.button-cart');
// Модальное окно "Корзина"
const modalCart = document.querySelector('.modal-cart');
// Кнопка "Х" закрытия модального окна "Корзина"
const closeCart = document.querySelector('.modal-cart__close');
// Кнопка "Отмена" закрытия модального окна "Корзина"
const buttonClearCart = document.querySelector('.button-clear-cart');

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
  restaurantsWrapper = document.querySelector('.restaurants'),
  productsWrapper = document.querySelector('.products'),
  headerLogo = document.querySelector('.header__logo'),
  restaurantHeading = document.querySelector('.restaurant__heading'),
  restaurantInfo = restaurantHeading.querySelector('.restaurant__card-info'),
  restaurantTitle = restaurantHeading.querySelector('.restaurant__title'),
  restaurantStars = restaurantHeading.querySelector('.restaurant__card-rating'),
  restaurantPrice = restaurantHeading.querySelector('.restaurant__card-price'),
  restaurantCategory = restaurantHeading.querySelector('.restaurant__card-category'),
  productsCards = document.querySelector('.products__cards'),
  restaurantsInputSearch = document.querySelector('.restaurants__input-search'),
  modalCartProducts = document.querySelector('.products__rows'),
  modalCartTotalPrice = document.querySelector('.modal-cart-footer__price-tag'),
  cartIsClear = document.querySelector('.cart-is-clear'),
  modalCartFooter = document.querySelector('.modal-cart__footer'),
  cart = [];

let count = 0;
let login = localStorage.getItem('myDelivery');
console.log(login);

const loadCart = () => {
  if (localStorage.getItem(login)) {
    JSON.parse(localStorage.getItem(login)).forEach(item => cart.push(item));
  }
};

const saveCart = () => {
  localStorage.setItem(login, JSON.stringify(cart));
};

const getData = async url => {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Ошибка по адресу: "${url}", статус ошибки: "${response.status}"`);
  }

  return await response.json();
};

const validLogin = str => {
  const regName = /^[a-zA-Z][a-zA-Z0-9-_.]{2,20}$/;
  return regName.test(str);
};

// Функция открытия и закрытия окна "Корзина"
const toggleModalCart = () => {
  modalCart.classList.toggle('is-active');
  event.stopPropagation();
};

// Функция закрытия окна кликом на подлолжку
const closeModalCart = () => {
  if (event.target.className == modalCart.className) {
    modalCart.classList.remove('is-active');
  }
};

const cleanLogInForm = () => {
  loginInput.style.borderColor = '';
  loginInput.placeholder = '';
  logInForm.reset();
};

const toggleModalAuth = () => {
  cleanLogInForm();
  modalAuth.classList.toggle('is-active');
  loginInput.focus();
};

const closeModalAuth = () => {
  if (event.target.className === modalAuth.className) {
    modalAuth.classList.remove('is-active');
  }
};

const authorized = () => {
  const logOut = () => {
    login = null;
    cart.length = 0;

    buttonAuth.style.display = '';
    userName.style.display = '';
    buttonCart.style.display = '';
    buttonOut.style.display = '';

    buttonOut.removeEventListener('click', logOut);

    localStorage.removeItem('myDelivery');

    checkAuth();
    returnMain();
  };

  userName.textContent = login;

  buttonAuth.style.display = 'none';
  userName.style.display = 'inline';
  buttonCart.style.display = 'flex';
  buttonOut.style.display = 'flex';

  loadCart();

  buttonOut.addEventListener('click', logOut);
};

const maskInput = string => {
  return string.trim();
};

const notAuthorized = () => {
  const logIn = event => {
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
  };

  buttonAuth.addEventListener('click', toggleModalAuth);
  closeAuth.addEventListener('click', toggleModalAuth);
  buttonCancelAuth.addEventListener('click', toggleModalAuth);
  modalAuth.addEventListener('click', closeModalAuth);
  logInForm.addEventListener('submit', logIn);
};

const checkAuth = () => (login ? authorized() : notAuthorized());

const createRestaurantCard = restaurant => {
  const { name, image, time_of_delivery: timeOfDelivery, stars, price, kitchen, products } = restaurant;

  const card = document.createElement('a');
  card.className = 'restaurant__card wow fadeInUp';
  card.dataset.wowDelay = '0.2s';
  card.href = '#';
  card.products = products;
  card.info = [name, stars, price, kitchen];

  card.insertAdjacentHTML(
    'afterbegin',
    `
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
    `
  );

  restaurantsCards.insertAdjacentElement('beforeend', card);
};

const createProductCard = ({ id, name, image, description, price }) => {
  const card = document.createElement('div');
  card.className = 'product__card wow fadeInUp';
  card.id = id;
  card.dataset.wowDelay = '0.2s';

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
        <button class="button button-primary button-add-cart">
          <span class="button__text">В корзину</span>
          <span class="button-cart__svg"></span>
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

  // console.log(count++);
  productsCards.insertAdjacentElement('beforeend', card);
};

const openProducts = event => {
  event.preventDefault();

  const target = event.target;

  if (login) {
    const restaurant = target.closest('.restaurant__card');

    if (restaurant) {
      const [name, stars, price, kitchen] = restaurant.info;

      productsCards.textContent = '';
      restaurantStars.textContent = '';

      promoContainer.classList.add('hide');
      restaurantsWrapper.classList.add('hide');
      productsWrapper.classList.remove('hide');
      restaurantInfo.classList.remove('hide');

      restaurantTitle.textContent = name;
      restaurantStars.insertAdjacentHTML(
        'afterbegin',
        `
        <img class="restaurant__icon" src="img/rating.svg" alt="Рейтинг" />
        ${stars}
        `
      );
      restaurantPrice.textContent = `От ${price} ₽`;
      restaurantCategory.textContent = kitchen;

      getData(`./db/${restaurant.products}`).then(data => data.forEach(createProductCard));
    }
  } else {
    toggleModalAuth();
  }
};

const returnMain = () => {
  event.preventDefault();

  promoContainer.classList.remove('hide');
  restaurantsWrapper.classList.remove('hide');
  productsWrapper.classList.add('hide');
};

const addToCart = event => {
  const target = event.target;
  const buttonAddToCart = target.closest('.button-add-cart');

  if (buttonAddToCart) {
    const card = target.closest('.product__card');

    const id = card.id;
    const title = card.querySelector('.product__card-title').textContent.trim();
    const cost = card.querySelector('.product__card-price').textContent;

    const productDouble = cart.find(item => item.id === id);

    if (productDouble) {
      productDouble.count += 1;
    } else {
      cart.push({
        id,
        title,
        cost,
        count: 1,
      });
    }

    saveCart();
  }
};

const renderCart = () => {
  modalCartProducts.textContent = '';

  if (cart.length === 0) {
    cartIsClear.classList.remove('hide');
    modalCartFooter.classList.add('hide');
    return;
  } else {
    cartIsClear.classList.add('hide');
    modalCartFooter.classList.remove('hide');
  }

  cart.forEach(({ id, title, cost, count }) => {
    const cartItem = `
      <div class="product__row">
        <!-- Заголовок продукта -->
        <span class="product__row-title">${title}</span>
        <!-- Цена продукта -->
        <strong class="product__row-price">${cost}</strong>
        <!-- Блок счётчика -->
        <div class="product__row-counter-block">
          <!-- Кнопка "-" -->
          <button class="product__row-button counter-minus" data-id="${id}">-</button>
          <!-- Счётчик -->
          <span class="product__row-counter">${count}</span>
          <!-- Кнопка "+" -->
          <button class="product__row-button counter-plus" data-id="${id}">+</button>
        </div>
        <!-- /.product__row-counter-block -->
      </div>
      <!-- /.product__row -->
    `;

    modalCartProducts.insertAdjacentHTML('beforeend', cartItem);
  });

  const totalPrice = cart.reduce((result, item) => {
    return result + parseFloat(item.cost) * item.count;
  }, 0);

  modalCartTotalPrice.textContent = totalPrice + ' ₽';
};

const changeProductCount = event => {
  const target = event.target;

  console.log(target);

  if (target.classList.contains('product__row-button')) {
    const product = cart.find(item => item.id === target.dataset.id);

    if (target.classList.contains('counter-minus')) {
      product.count--;
      if (product.count === 0) {
        cart.splice(cart.indexOf(product), 1);
      }
    }
    if (target.classList.contains('counter-plus')) product.count++;

    saveCart();
    renderCart();
  }
};

function init() {
  getData('./db/partners.json').then(data => {
    data.forEach(createRestaurantCard);
  });

  modalCartProducts.addEventListener('click', changeProductCount);

  // Окрытие модального окна "Корзина"
  buttonCart.addEventListener('click', renderCart);
  buttonCart.addEventListener('click', toggleModalCart);

  // Вариант с передачей конкретного элемента
  // buttonCart.addEventListener('click', toggleModal.bind(null, modalCart));

  // Закрытие модального окна "Корзина"
  // С помощью кнопки "Х"
  closeCart.addEventListener('click', toggleModalCart);
  // С помощью кнопки "Отмена"
  buttonClearCart.addEventListener('click', () => {
    cart.length = 0;
    saveCart();
    renderCart();
    toggleModalCart();
  });
  // С помощью клика на подложку
  modalCart.addEventListener('click', closeModalCart);

  restaurantsCards.addEventListener('click', openProducts);

  headerLogo.addEventListener('click', returnMain);

  productsCards.addEventListener('click', addToCart);

  restaurantsInputSearch.addEventListener('keydown', event => {
    if (event.keyCode === 13) {
      count = 0;
      const target = event.target;
      const value = target.value.toLowerCase().trim();
      target.value = '';

      if (!value || value.length < 3) {
        target.style.backgroundColor = 'tomato';
        setTimeout(() => {
          target.style.backgroundColor = '';
        }, 2000);

        return;
      }

      const products = [];

      getData('./db/partners.json')
        .then(restaurants => {
          const productsUrls = restaurants.map(restaurant => restaurant.products);

          return productsUrls;
        })
        .then(productsUrls => {
          const arrayOfPromises = productsUrls.map(productsUrl => {
            return getData(`./db/${productsUrl}`);
          });

          return Promise.all(arrayOfPromises);
        })
        .then(resultsGetData => {
          resultsGetData.forEach(resultGetData => {
            products.push(...resultGetData);
          });

          const searchProducts = products.filter(product => product.name.toLowerCase().includes(value));

          // console.log(searchProducts);

          promoContainer.classList.add('hide');
          restaurantsWrapper.classList.add('hide');
          restaurantInfo.classList.add('hide');
          productsWrapper.classList.remove('hide');

          productsCards.textContent = '';
          restaurantTitle.textContent = 'Результаты поиска';

          searchProducts.forEach(createProductCard);
        });
    }
  });

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

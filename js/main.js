// Отслеживаемые элементы
// Кнопка открытия модального окна "Корзина"
const cartButton = document.querySelector('#button-cart');
// Кнопка "Отмена" закрытия модального окна "Корзина"
const cancelButton = document.querySelector('#button-cancel');
// Модальное окно "Корзина"
const modal = document.querySelector('.modal');
// Кнопка "Х" закрытия модального окна "Корзина"
const modalClose = document.querySelector('.modal__close');

// Окрытие модального окна "Корзина"
cartButton.addEventListener('click', toggleModal);

// Закрытие модального окна "Корзина"
// С помощью кнопки "Х"
modalClose.addEventListener('click', toggleModal);
// С помощью кнопки "Отмена"
cancelButton.addEventListener('click', toggleModal);
// С помощью клика на подложку
modal.addEventListener('click', closeModal);

// Функция открытия и закрытия окна "Корзина"
function toggleModal() {
  modal.classList.toggle('is-active');
  event.stopPropagation();
}

// Функция закрытия окна кликом на подлолжку
function closeModal() {
  if (event.target.className == modal.className) {
    modal.classList.remove('is-active');
  }
}

const buttonAuth = document.querySelector('.button-auth');
const modalAuth = document.querySelector('.modal-auth');
const closeAuth = document.querySelector('.modal-auth__close');
const buttonCancelAuth = document.querySelector('.button-cancel-auth');
const logInForm = document.querySelector('#logInForm');
const loginInput = document.querySelector('#login');
const userName = document.querySelector('.user-name');
const buttonOut = document.querySelector('.button-out');

let login = localStorage.getItem('myDelivery');
console.log(login);

// localStorage.setItem('test', [{ a: 4 }, 2, 3]);
localStorage.setItem('test', { a: 2, b: 4 });
console.log(localStorage.getItem('test'));

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

checkAuth();

// Инициализация WOW.js
new WOW().init();

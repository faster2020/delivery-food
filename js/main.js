const cartButton = document.querySelector("#button-cart");
const cancelButton = document.querySelector("#button-cancel");
const modal = document.querySelector(".modal");
const modalClose = document.querySelector(".modal__close");

cartButton.addEventListener("click", ToogleModal);

modalClose.addEventListener("click", ToogleModal);
cancelButton.addEventListener("click", ToogleModal);
modal.addEventListener("click", CloseModal);

function ToogleModal () {
    modal.classList.toggle("is-active");
    event.stopPropagation();
};

function CloseModal () {
  if (event.target.className == modal.className) {
    modal.classList.remove("is-active");
  }
};

new WOW().init();
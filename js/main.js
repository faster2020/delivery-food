const cartButton = document.querySelector("#cart-button");
const modal = document.querySelector(".modal");
const modalClose = document.querySelector(".modal__close");

cartButton.addEventListener("click", ToogleModal);

modalClose.addEventListener("click", ToogleModal);

function ToogleModal () {
  modal.classList.toggle("is-active");
};

new WOW().init();

const burger = document.getElementById('burger');

function menu() {
    console.log('click');
  // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
  this.classList.toggle("is-active");
  // You can also toggle the visibility of the menu items here
  document.getElementById("navbarBasicExample").classList.toggle("is-active");
};


burger.addEventListener('click', menu);
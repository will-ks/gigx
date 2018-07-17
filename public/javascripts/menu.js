'use strict';

function main () {
  // --- Burger Menu --- //
  const middle = document.getElementById('middle-bun');
  const icon = document.getElementById('complete-icon');
  const menu = document.querySelector('.menu-list');

  const deleteMiddle = function () {
    middle.classList.toggle('hidden-bun');
    updateTransition();
    menuTransition();
  };

  icon.addEventListener('click', deleteMiddle);

  function updateTransition () {
    const top = document.querySelector('div.top-burguer');
    const bottom = document.querySelector('div.bottom-burguer');
    top.classList.toggle('rotate-top');
    bottom.classList.toggle('rotate-bottom');
  }

  function displayMenu () {
    menu.classList.toggle('menu-hidden');
  }

  icon.addEventListener('click', displayMenu);

  function menuTransition () {
    menu.classList.toggle('slide-menu');
  }

  icon.addEventListener('click', menuTransition);

  // --- Desktop Menu --- //

  const profileMenu = document.querySelector('.dropdown-menu');
  const profileIcon = document.getElementById('profile-icon');

  function profileMenuTransition () {
    profileMenu.classList.toggle('not-shown');
  }

  profileIcon.addEventListener('click', profileMenuTransition);

  document.getElementById('logout-link').onclick = () => {
    document.getElementById('logout-form').submit();
    return false;
  };
}

window.onload = main;

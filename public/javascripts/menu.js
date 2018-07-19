'use strict';

// --- Desktop Menu --- //

const profileMenu = document.querySelector('.dropdown-menu');
const profileIcon = document.getElementById('profile-icon');

function profileMenuTransition() {
  profileMenu.classList.toggle('not-shown');
}

profileIcon.addEventListener('click', profileMenuTransition);

document.getElementById('logout-link').onclick = () => {
  document.getElementById('logout-form').submit();
  return false;
};
}

window.onload = main;

'use strict';

// --- Desktop Menu --- //

const profileMenu = document.getElementById('profile-dropdown');
const profileIcon = document.getElementById('profile-icon');
const exploreLink = document.getElementById('explore-link');
const exploreMenu = document.getElementById('explore-dropdown');

profileIcon.addEventListener('click', () => {
  if (!exploreMenu.classList.contains('not-shown')) {
    exploreMenu.classList.add('not-shown');
  };
  profileMenu.classList.toggle('not-shown');
});

exploreLink.addEventListener('click', (e) => {
  if (!profileMenu.classList.contains('not-shown')) {
    profileMenu.classList.add('not-shown');
  };
  e.preventDefault();
  exploreMenu.classList.toggle('not-shown');
});

document.getElementById('logout-link').onclick = () => {
  document.getElementById('logout-form').submit();
  return false;
};

window.onload = main;

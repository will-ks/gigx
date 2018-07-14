'use script';

const urlString = window.location.href;
const url = new URL(urlString);
const mode = url.searchParams.get('mode');
const signupSection = document.getElementById('signup');
const loginSection = document.getElementById('login');

if (mode === 'login') {
  loginSection.classList.remove('hidden');
} else {
  signupSection.classList.remove('hidden');
}

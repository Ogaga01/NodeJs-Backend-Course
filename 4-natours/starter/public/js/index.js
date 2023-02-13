import '@babel/polyfill';
import { login } from './login';
import { displayMap } from './mapbox';

const mapbox = document.getElementById('map');
const loginForm = document.querySelector('.form');

if (mapbox) {
  const locations = JSON.parse(mapbox.dataset.locations);
  displayMap(locations);
}

if (loginForm) {
  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    login(email, password);
  });
}

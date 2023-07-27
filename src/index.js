import Network from './modules/network.js';
import './index.css';

const network = new Network(document.querySelector('.list ul'));
const refreshElement = document.querySelector('.list button');
const insertElement = document.querySelector('.form form');

const buttonEvent = () => {
  network.loadList();
};

const insertEvent = (event) => {
  event.preventDefault();
  network.insertPlayer({ user: insertElement.name.value, score: insertElement.score.value });
  insertElement.reset();
};

refreshElement.addEventListener('click', buttonEvent);
insertElement.addEventListener('submit', insertEvent);
import Game from './game.js';

export default class {
  constructor(container) {
    this.game = new Game(container);
    this.api = 'https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/';
    if (this.game.notCreated()) {
      this.createGame('Mahammad Game');
    }
  }

  createGame = (name) => {
    this.action = 'create';
    this.sendRequest(`${this.api}`, this.buildHeaders('post', { name }));
  }

  loadList = () => {
    this.action = 'load';
    this.sendRequest(`${this.api}${this.game.id}/scores/`);
  }

  insertPlayer = ({ user, score }) => {
    this.action = 'insert';
    this.sendRequest(`${this.api}${this.game.id}/scores/`, this.buildHeaders('post', { user, score }));
  }

  buildHeaders = (method, body) => ({ method, body: JSON.stringify(body), headers: { 'content-type': 'application/json' } });

  sendRequest = async (url, options = {}) => {
    const response = await fetch(url, options);
    const result = await response.json();
    this.handleResults(result.result);
  }

  extractId = (string) => {
    const result = string.split(' ');
    return result[result.length - 2];
  }

  handleResults = (result) => {
    switch (this.action) {
      case 'create':
        this.game.storeId(this.extractId(result));
        break;
      case 'load':
        this.game.setList(result);
        break;
      case 'insert':
        this.loadList();
        break;
      default:
    }
  }
}
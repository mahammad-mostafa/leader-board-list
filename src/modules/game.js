export default class {
  constructor(container) {
    this.players = [];
    this.container = container;
    this.id = localStorage.getItem('game') || null;
  }

  notCreated = () => {
    if (this.id === null) return false;
    return true;
  }

  storeId = (id) => {
    this.id = id;
    localStorage.setItem('game', this.id);
    this.displayItems();
  }

  setList = (players) => {
    this.players = players;
    this.displayItems();
  }

  displayItems = () => {
    if (this.players.length === 0) {
      this.container.innerHTML = '<li><h3>No Players!</h3></li>';
    } else {
      this.container.innerHTML = '';
      const fragment = new DocumentFragment();
      this.players.forEach((player) => {
        const item = document.createElement('li');
        item.textContent = `${player.user}: ${player.score}`;
        fragment.appendChild(item);
      });
      this.container.appendChild(fragment);
    }
  }
}
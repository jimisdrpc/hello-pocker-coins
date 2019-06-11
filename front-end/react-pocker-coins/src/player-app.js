const template = document.createElement("template");
template.innerHTML = `
<h1>Players</h1>

<input type="text" placeholder="Add a new player"></input>
<button>Add</button>

<ul id="players"></ul>
`;

class PlayerApp extends HTMLElement {
  constructor() {
    super();

    this._shadowRoot = this.attachShadow({ mode: "open" });
    this._shadowRoot.appendChild(template.content.cloneNode(true));
    this.$playersList = this._shadowRoot.querySelector("ul");

    this.$input = this._shadowRoot.querySelector("input");

    this.$submitButton = this._shadowRoot.querySelector("button");
    this.$submitButton.addEventListener("click", this._addPlayer.bind(this));

    this.players = [];
  }

  _addPlayer() {
    if (this.$input.value.length > 0) {
      this._players.push({ text: this.$input.value, checked: false });
      this._renderPlayerList();
      this.$input.value = "";
    }
  }

  _renderPlayerList() {
    this.$playersList.innerHTML = "";
    this._players.forEach((player, index) => {
      let $playerItem = document.createElement("div");
      $playerItem.innerHTML = player.text;
      this.$playersList.appendChild($playerItem);
    });
  }

  set players(value) {
    this._players = value;
    this._renderPlayerList();
  }

  get players() {
    return this._players;
  }
}

window.customElements.define("player-app", PlayerApp);
export { PlayerApp };

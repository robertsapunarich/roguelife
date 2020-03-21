export default class Player {

  _game = null;

  _position = { x: -1, y: -1 };

  constructor({ game, position: { x, y } }) {
    this._game = game;
    this._position = { x, y };
    this._draw();
  }

  _draw() {
    const { x, y } = this._position;
    this._game.display.draw(x, y, '@', '#ff0');
  }
}

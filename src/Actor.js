export default class Actor {

  _game = null;

  _position = { x: -1, y: -1 };

  _char = 'x';

  _color = 'white';

  get _key() {
    const { x, y } = this._position;
    return `${x},${y}`;
  }

  get position() {
    return this._position;
  }

  constructor({ game, position: { x, y }, char, color }) {
    this._game = game;
    this._position = { x, y };
    this._char = char;
    this._color = color;
    this._draw();
  }

  _draw() {
    const { _char, _color } = this;
    const { x, y } = this._position;
    this._game.display.draw(x, y, _char, _color);
  }

  act() {
    this._game.engine.lock();
    window.addEventListener('keydown', this);
  }

  handleEvent(e) {
    this.onEvent(e.keyCode);
    window.removeEventListener('keydown', this);
    this._game.engine.unlock();
  }
}

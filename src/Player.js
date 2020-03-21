import { DIRS } from 'rot-js';
import Game from './Game';

const KeyMap = {
  38: 0,
  33: 1,
  39: 2,
  34: 3,
  40: 4,
  35: 5,
  37: 6,
  36: 7
};

export default class Player {

  _game = null;

  _position = { x: -1, y: -1 };

  get _key() {
    const { x, y } = this._position;
    return `${x},${y}`;
  }

  constructor({ game, position: { x, y } }) {
    this._game = game;
    this._position = { x, y };
    this._draw();
  }

  _draw() {
    const { x, y } = this._position;
    this._game.display.draw(x, y, '@', '#ff0');
  }

  act() {
    this._game.engine.lock();
    window.addEventListener('keydown', this);
  }

  handleEvent(e) {
    const code = e.keyCode;
    if ([13, 32].includes(code)) {
      this._checkBox();
      return;
    }

    const key = KeyMap[code];

    if (typeof key === 'undefined') return;

    const { x, y } = this._position;
    const [ diffX, diffY ] = DIRS[8][key];
    const newX = x + diffX;
    const newY = y + diffY;
    const newKey = `${newX},${newY}`;

    if (typeof this._game.map[newKey] === 'undefined') return;

    const { _game, _key } = this;
    _game.display.draw(x, y, _game.map[_key]);
    this._position = { x: newX, y: newY };
    this._draw();
    window.removeEventListener('keydown', this);
    _game.engine.unlock();
  }

  _checkBox() {
    const { _game, _key } = this;
    if (_game.map[_key] !== '*') {
      alert('There is no box here!');
    } else if (_key === _game.ananas) {
      alert('Hooray! You found an ananas and won this game.');
      _game.engine.lock();
      window.removeEventListener('keydown', this);
    } else {
      alert('This box is empty...');
    }
  }
}

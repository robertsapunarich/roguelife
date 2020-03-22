import Actor from './Actor';
import { DIRS } from 'rot-js';

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

export default class Player extends Actor {

  constructor(args) {
    super({ ...args, char: '@', color: '#5bc3eb' });
  }

  public onEvent(code: number | string): void {
    if ([13, 32].includes(+code)) {
      this.checkBox();
      return;
    }

    if (!(code in KeyMap)) return;

    const { x, y } = this.position;
    const [ diffX, diffY ] = DIRS[8][KeyMap[code]];
    const newX = x + diffX;
    const newY = y + diffY;
    const newKey = `${newX},${newY}`;

    if (!(newKey in this.game.map)) return;

    const { game, key } = this;
    game.display.draw(x, y, game.map[key]);
    this.position = { x: newX, y: newY };
    this.draw();
  }

  private checkBox(): void {
    const { game, key } = this;
    if (game.map[key] !== '*') {
      alert('There is no box here!');
    } else if (key === game.ananas) {
      alert('Hooray! You found an ananas and won this game.');
      game.engine.lock();
      window.removeEventListener('keydown', this);
    } else {
      alert('This box is empty...');
    }
  }
}

import Actor from './Actor';
import { Path } from 'rot-js';

export default class Pedro extends Actor {

  constructor(args) {
    super({ ...args, char: 'P', color: 'red' });
  }

  act() {
    const { _game, _key } = this;
    const path = this._findPath();
    if (path.length == 1) {
      _game.engine.lock();
      alert('Game over - you were captured by Pedro!');
    } else {
      const { x, y } = this.position;
      _game.display.draw(x, y, _game.map[_key]);

      const [nextX, nextY] = path[0];
      this._position = { x: nextX, y: nextY}
      this._draw();
    }
  }

  _findPath() {
    const { x, y } = this.position;
    const path = [];

    this._generatePathfinder().compute(x, y, (x, y) => {
      path.push([x, y]);
    });

    path.shift(); // remove Pedro's position

    return path;
  }

  _generatePathfinder() {
    const { x, y } = this._game.player.position;
    const { map } = this._game;
    const config = { topology: 4 };
    return new Path.AStar(x, y, (x, y) => `${x},${y}` in map, config);
  }
}

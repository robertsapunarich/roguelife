import Actor from './Actor';
import AStar from 'rot-js/lib/path/astar';
import { Options } from 'rot-js/lib/fov/fov';

export default class Pedro extends Actor {

  constructor(args) {
    super({ ...args, char: 'P', color: '#f06449' });
  }

  public act(): void {
    const { game, key } = this;
    const path = this.findPath();
    if (path.length == 1) {
      game.engine.lock();
      alert('Game over - you were captured by Pedro!');
    } else {
      const { x, y } = this.position;
      game.display.draw(x, y, game.map[key]);

      const [nextX, nextY] = path[0];
      this.position = { x: nextX, y: nextY}
      this.draw();
    }
  }

  private findPath(): [number[]] {
    const { x, y } = this.position;
    const path = [];

    this.generatePathfinder().compute(x, y, (x, y) => {
      path.push([x, y]);
    });

    path.shift(); // remove Pedro's position

    return path as [number[]];
  }

  private generatePathfinder(): AStar {
    const { x, y } = this.game.player.position;
    const { map } = this.game;
    const options: Partial<Options> = { topology: 4 };
    return new AStar(x, y, (x, y) => `${x},${y}` in map, options);
  }
}

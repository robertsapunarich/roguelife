import { Map, RNG } from 'rot-js';
import { times } from './utils';
import Game from './Game';
import Pedro from './Pedro';
import Player from './Player';

export default class TutorialGame extends Game {

  public ananas = null;

  constructor({ el }) {
    super({ el });
  }

  protected init(): { map: object; actors: object; items: object } {
    const { width, height } = Game;
    const digger = new Map.Digger(width, height, { dugPercentage: 1.0 });
    const freeCells = [];
    digger.create((x, y, value) => {
      if (!value) {
        const key = `${x},${y}`;
        this.map[key] = '.';
        freeCells.push(key);
      }
    });

    this.generateBoxes(freeCells);
    const player = this.createActor(Player, freeCells);
    const pedro = this.createActor(Pedro, freeCells);

    return {
      map: this.map,
      actors: { player, pedro },
      items: { ananas: this.ananas }
    };
  }

  private generateBoxes(cells): void {
    times(10, (i) => {
      const index = Math.floor(RNG.getUniform() * cells.length);
      const key = cells.splice(index, 1)[0];
      this.map[key] = '*';

      if (!i) {
        this.ananas = key;
      }
    });
  }
}

import { Display, Map, RNG } from "rot-js";
import { times } from './utils';

export default class Game {

  display = null;

  map = {};

  constructor({ el }) {
    this.display = new Display();
    el.appendChild(this.display.getContainer());
  }

  init() {
    this._generateMap();
  }

  _generateMap() {
    const digger = new Map.Digger();
    const freeCells = [];
    digger.create((x, y, value) => {
      if (!value) {
        const key = `${x},${y}`;
        this.map[key] = '.';
        freeCells.push(key);
      }
    });

    this._generateBoxes(freeCells);
    this._drawWholeMap();
  }

  _generateBoxes(cells) {
    times(10, () => {
      const index = Math.floor(RNG.getUniform() * cells.length);
      const key = cells.splice(index, 1)[0];
      this.map[key] = '*';
    });
  }

  _drawWholeMap() {
    Object.keys(this.map).forEach((key) => {
      const parts = key.split(',');
      const x = parseInt(parts[0], 10);
      const y = parseInt(parts[1], 10);
      this.display.draw(x, y, this.map[key]);
    })
  }
}

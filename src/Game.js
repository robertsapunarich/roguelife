import { Display, Map, RNG, Scheduler, Engine } from "rot-js";
import { times } from './utils';
import Pedro from './Pedro';
import Player from './Player';

export default class Game {

  display = null;

  map = {};

  engine = null;

  player = null;

  pedro = null;

  ananas = null;

  constructor({ el }) {
    this.display = new Display();
    el.appendChild(this.display.getContainer());
  }

  init() {
    this._generateMap();
    const scheduler = new Scheduler.Simple();
    scheduler.add(this.player, true);
    scheduler.add(this.pedro, true);
    this.engine = new Engine(scheduler);
    this.engine.start();
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
    this.player = this._createActor(Player, freeCells);
    this.pedro = this._createActor(Pedro, freeCells);
  }

  _generateBoxes(cells) {
    times(10, (i) => {
      const index = Math.floor(RNG.getUniform() * cells.length);
      const key = cells.splice(index, 1)[0];
      this.map[key] = '*';

      if (!i) {
        this.ananas = key;
      }
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

  _createActor(what, cells) {
    const index = Math.floor(RNG.getUniform() * cells.length);
    const key = cells.splice(index, 1)[0];
    const parts = key.split(',');
    const x = parseInt(parts[0], 10);
    const y = parseInt(parts[1], 10);
    return new what({ game: this, position: { x, y } });
  }
}

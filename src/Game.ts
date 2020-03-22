import { Display, Map, RNG, Scheduler, Engine } from 'rot-js';
import { times } from './utils';
import Pedro from './Pedro';
import Player from './Player';
import Actor from './Actor';

export default class Game {

  public display = null;

  public map = {};

  public engine = null;

  public player = null;

  public pedro = null;

  public ananas = null;

  constructor({ el }) {
    this.display = new Display();
    el.appendChild(this.display.getContainer());
  }

  public init(): void {
    this.generateMap();
    const scheduler = new Scheduler.Simple();
    scheduler.add(this.player, true);
    scheduler.add(this.pedro, true);
    this.engine = new Engine(scheduler);
    this.engine.start();
  }

  private generateMap(): void {
    const digger = new Map.Digger(400, 600);
    const freeCells = [];
    digger.create((x, y, value) => {
      if (!value) {
        const key = `${x},${y}`;
        this.map[key] = '.';
        freeCells.push(key);
      }
    });

    this.generateBoxes(freeCells);
    this.drawWholeMap();
    this.player = this.createActor(Player, freeCells);
    this.pedro = this.createActor(Pedro, freeCells);
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

  private drawWholeMap(): void {
    Object.keys(this.map).forEach((key) => {
      const parts = key.split(',');
      const x = parseInt(parts[0], 10);
      const y = parseInt(parts[1], 10);
      this.display.draw(x, y, this.map[key]);
    })
  }

  private createActor(what, cells): Actor {
    const index = Math.floor(RNG.getUniform() * cells.length);
    const key = cells.splice(index, 1)[0];
    const parts = key.split(',');
    const x = parseInt(parts[0], 10);
    const y = parseInt(parts[1], 10);
    return new what({ game: this, position: { x, y } });
  }
}

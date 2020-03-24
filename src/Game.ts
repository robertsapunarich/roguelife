import { Display, Scheduler, Engine, RNG } from 'rot-js';
import Actor from './Actor';
import { times } from './utils';

export default abstract class Game {

  public static width = 34;

  public static height = 21;

  public map = {};

  public actors = {};

  public items = {};

  public display = null;

  public engine = null;

  protected scheduler = null;

  constructor({ el }) {
    const { width, height } = Game;
    this.display = new Display({
      width,
      height,
      bg: '#36382E',
      fontSize: 24,
      forceSquareRatio: true
    });
    el.appendChild(this.display.getContainer());

    this.scheduler = new Scheduler.Simple();
    this.engine = new Engine(this.scheduler);
    const { map, actors, items } = this.init();
    this.map = map;
    this.drawWholeMap();
    this.actors = actors;
    const actorList = Object.values(actors);
    actorList.forEach(a => {
      this.scheduler.add(a, true);
      a.draw();
    });
    this.items = items;

    this.engine.start();
  }

  protected abstract init(): { map: object; actors: object; items: object };

  protected drawWholeMap(): void {
    const points = Object.keys(this.map).map((key) => {
      const parts = key.split(',');
      const x = parseInt(parts[0], 10);
      const y = parseInt(parts[1], 10);
      return { x, y, key };
    });

    points.forEach(({ x, y, key }) => {
      this.display.draw(x, y, this.map[key], '#dadad9');
    });
  }

  protected createActor(what, cells, index = -1): Actor {
    const i = index > -1 ? index : Math.floor(RNG.getUniform() * cells.length);
    const key = cells.splice(i, 1)[0];
    const parts = key.split(',');
    const x = parseInt(parts[0], 10);
    const y = parseInt(parts[1], 10);
    return new what({ game: this, position: { x, y } });
  }

  protected spacingFromFontSize(x: number): number {
    return 0.05 + (134 * (10**5) - 0.05) / (1 + (x / 0.0000023)**1.02);
  }

  protected setFontSize(x: number): void {
    this.display.setOptions({
      fontSize: x,
      spacing: this.spacingFromFontSize(x)
    });
  }
}

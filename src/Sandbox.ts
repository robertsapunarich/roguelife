import Game from './Game';
import { times } from './utils';

export default class Sandbox extends Game {
  public shrinking = true;

  protected init(): { map: object; actors: object; items: object } {
    const { width, height } = Game;
    const map = {};
    const actors = {};
    const items = {};

    times(width, (x) => {
      times(height, (y) => {
        map[`${x},${y}`] =  Math.random().toString(36).substring(12);;
      });
    });

    return { map, actors, items };
  }

  private updateDisplay(x = 24): void {
    this.setFontSize(x);
    this.drawWholeMap();
    if (this.shrinking) {
      this.shrinking = x !== 3;
      setTimeout(() => this.updateDisplay(--x), 10);
    } else if (!this.shrinking) {
      this.shrinking = x === 36;
      setTimeout(() => this.updateDisplay(++x), 10);
    }
  }
}

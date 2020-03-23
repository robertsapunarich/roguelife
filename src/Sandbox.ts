import Game from './Game';
import { times } from './utils';

export default class Sandbox extends Game {
  protected init(): { map: object; actors: object; items: object } {
    const { width, height } = Game;
    const map = {};
    const actors = {};
    const items = {};

    times(width, (x) => {
      times(height, y => {
        map[`${x},${y}`] =  Math.random().toString(36).substring(12);;
      });
    });

    return { map, actors, items };
  }
}

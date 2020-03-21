import { Display, Map } from "rot-js";

export default class Game {

  display = null;

  map = {};

  constructor({ el }) {
    this.display = new Display();
    el.appendChild(this.display.getContainer());
  }

  generateMap() {
    const digger = new Map.Digger();
    digger.create((x, y, value) => {
      if (!value) {
        this.map[`${x},${y}`] = 'x';
      }
    });
  }

  drawWholeMap() {
    Object.keys(this.map).forEach((key) => {
      const parts = key.split(',');
      const x = parseInt(parts[0], 10);
      const y = parseInt(parts[1], 10);
      this.display.draw(x, y, this.map[key]);
    })
  }
}

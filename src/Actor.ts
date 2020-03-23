export default class Actor {

  protected game = null;

  protected position: { x: number; y: number } = { x: -1, y: -1 };

  protected char = 'x';

  protected color = 'white';

  protected get key(): string {
    const { x, y } = this.position;
    return `${x},${y}`;
  }

  constructor({ game, position: { x, y }, char, color }) {
    this.game = game;
    this.position = { x, y };
    this.char = char;
    this.color = color;
  }

  protected draw(): void {
    const { char, color } = this;
    const { x, y } = this.position;
    this.game.display.draw(x, y, char, color);
  }

  public act(): void {
    this.game.engine.lock();
    window.addEventListener('keydown', this);
  }

  public handleEvent(e): void {
    this.onEvent(e.keyCode);
    window.removeEventListener('keydown', this);
    this.game.engine.unlock();
  }

  public onEvent(e): void {
    console.info('default keydown event handler - override this method', e);
  }
}

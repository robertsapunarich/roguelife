import Actor from './Actor';

export default class Pedro extends Actor {

  constructor(args) {
    super({ ...args, char: 'P', color: 'red' });
  }
}

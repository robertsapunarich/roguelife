import { times } from './utils';

describe('times', () => {
  test('should call the callback param the number of times specified', () => {
    let foo = 0;
    times(3, () => foo++);
    expect(foo).toEqual(3);
  });

  test('should pass the index in the callback param', () => {
    let index = 0;
    times(3, (i) => {
      expect(i).toEqual(index++);
    });
  });
});

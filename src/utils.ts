// Repeat a provided function a certain amount of times
export const times = (count, fn): void => Array(count).fill(null).forEach((v,i) => fn(i));

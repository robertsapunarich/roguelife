// Repeat a provided function a certain amount of times
export const times = (count, fn) => Array(count).fill().forEach((v,i) => fn(i));

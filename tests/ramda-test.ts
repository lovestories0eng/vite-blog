import * as R from 'ramda';

const add = R.curry((a: number, b: number): number => {
  return a + b;
});

const add5 = add(5);
const sum = add5(3); // 8

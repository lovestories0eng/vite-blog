function curry<A, B, R>(fn: (a: A, b: B) => R): (a: A) => (b: B) => R {
    return (a: A) => (b: B) => fn(a, b);
}

const add = curry((a: number, b: number): number => {
    return a + b;
});

const add5 = add(5);
const sum = add5(3); // 8
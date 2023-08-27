function curry(fn) {
    return function (a) 
        { 
            return function (b) { 
                return fn(a, b); 
            }; 
        };
}
var add = curry(function (a, b) {
    return a + b;
});
var add5 = add(5);
var sum = add5(3); // 8

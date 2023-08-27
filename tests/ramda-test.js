"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var R = require("ramda");
var add = R.curry(function (a, b) {
    return a + b;
});
var add5 = add(5);
var sum = add5(3); // 8
console.log(sum)
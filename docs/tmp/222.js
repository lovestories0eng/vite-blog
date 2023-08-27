let m = {}

m.hasOwnProperty = function() {
    return false;
}

console.log(m.hasOwnProperty)
console.log(Object.hasOwnProperty)
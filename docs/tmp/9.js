var foo = '林一一';
(function(f){
    console.log(foo);
    var foo = f || 'hello';
    console.log(foo)
})(foo);
console.log(foo)

// undefined， 林一一，林一一
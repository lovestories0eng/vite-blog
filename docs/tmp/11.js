console.log(a)
var a = 10;
(function a(){
    console.log(a)
    a = 20
    console.log(a)
    console.log(this)
})()
console.log(a)
console.log(this)
// ƒ a(){a = 20 console.log(a)}  ƒ a(){a = 20 console.log(a)}
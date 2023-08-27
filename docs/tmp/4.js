// var m = 1
// n = 2
// function foo() {
//     console.log(m, n)
// }
// foo()

console.log(a, b)
var a = 12
var b = '林一一'
function foo(){
    console.log(a, b)
    var a = b =13
    console.log(a, b)
}
foo()
console.log(a, b)

/* 输出：
    undefined undefined
    undefined "林一一"
    13 13
    12 13
*/
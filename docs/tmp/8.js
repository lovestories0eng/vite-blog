var a = 1;
function foo(a) {
    console.log(a)
    var a
    console.log(a)
}
foo(a);
// 输出 1 1
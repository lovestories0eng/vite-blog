# 详解 js 函数中的 arguments

## 什么 arguments
简单来说：`arguments` 是一个对应于传递给函数的参数的类数组对象
`arguments` 对象是所有（非箭头）函数中都可用的局部变量。你可以使用`arguments` 对象在函数中引用函数的参数。此对象包含传递给函数的每个参数，第一个参数在索引`0`处。例如，如果一个函数传递了三个参数，你可以以如下方式引用他们：

```JavaScript
arguments[0]
arguments[1]
arguments[2]
```

参数也可以被设置：
```JavaScript
arguments[0] = 'value';
```

`arguments` 是一个对象，不是一个 `Array` 。它类似于`Array` ，但除了`length`属性和索引元素之外没有任何`Array` 属性。例如，它没有 `pop` 方法。但是它可以被转换为一个真正的`Array` ：

所以经常能看到这样的代码：

```JavaScript
// 由于arguments不是 Array，所以无法使用 Array 的方法，所以通过这种方法转换为数组
 
var args = [].slice.call(arguments);  // 方式一
var args = Array.prototype.slice.call(arguments); // 方式二
 
// 下面是 es6 提供的语法
let args = Array.from(arguments)   // 方式一
let args = [...arguments]; // 方式二
```

## arguments上的属性
* arguments.callee：指向当前执行的函数（在 严格模式 下，第5版 ECMAScript (ES5) 禁止使用 arguments.callee() ）
* argunments.length：指向传递给当前函数的参数数量
* arguments.caller：已移除

## arguments与剩余参数、默认参数和解构赋值参数的结合使用
在严格模式下，`剩余参数`、`默认参数`和`解构赋值`参数的存在不会改变 `arguments`对象的行为，但是在非严格模式下就有所不同了
```JavaScript
function func(a) { 
  arguments[0] = 99;   // 更新了arguments[0] 同样更新了a
  console.log(a);
}
func(10); // 99
 
// 并且
 
function func(a) { 
  a = 99;              // 更新了a 同样更新了arguments[0] 
  console.log(arguments[0]);
}
func(10); // 99
```

当非严格模式中的函数包含`剩余参数`、`默认参数`和`解构赋值`，那么`arguments`对象中的值不会跟踪参数的值（反之亦然）。看下面的代码：
```JavaScript
function func(a = 55) { 
  arguments[0] = 99; // updating arguments[0] does not also update a
  console.log(a);
}
func(10); // 10
 
//
 
function func(a = 55) { 
  a = 99; // updating a does not also update arguments[0]
  console.log(arguments[0]);
}
func(10); // 10
 
 
function func(a = 55) { 
  console.log(arguments[0]);
}
func(); // undefined
```
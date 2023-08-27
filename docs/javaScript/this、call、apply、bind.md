# this、call、apply、bind

原文链接：https://juejin.cn/post/6844904009308831751。

## 前言
在讲`this`之前，先得说说环境 这个概念。一门语言在运行的时候，需要一个环境，叫做宿主环境。对于`JavaScript`，宿主环境最常见的是`web`浏览器，另一个最为常见的就是 `Node` 了，同样作为宿主环境，`node` 也有自己的 `JavaScript` 引擎：`V8`（目前最快`JavaScript`引擎、`Google`生产）。
### this的初衷
`this`设计的初衷是在函数内部使用，用来指代当前的运行环境。为什么这么说呢？
`JavaScript`中的对象的赋值行为是将地址赋给一个变量，引擎在读取变量的时候其实就是要了个地址然后再从原始地址中读取对象。而`JavaScript` 允许函数体内部引用当前环境的其他变量，而这个变量是由运行环境提供的。由于函数又可以在不同的运行环境执行（如全局作用域内执行，对象内执行...），所以需要一个机制来表明代码到底在哪里执行！于是`this`出现了，它的设计目的就是在函数体内部，指代函数当前的运行环境。
### global this
在浏览器里，在全局范围内：

`this`等价于`window`对象；
用`var`声明一个变量和给`this`或者`window`添加属性是等价的；
如果你在声明一个变量的时候没有使用`var`或者`let`、`const(es6)`,你就是在给全局的`this`添加或者改变属性值。

```JavaScript
// 1
console.log(this === window); //true
//2
var name = "Jake";
console.log(this.name ); // "Jake"
console.log(window.name ); // "Jake"

//3
age = 23;
function testThis() {
    age = 18;
}
console.log(this.age ); // 23
testThis();
console.log(this.age ); // 18
```
总结起来就是：在全局范围内`this`是大哥大，它等价于`window`对象（即指向`window`），如果你声明一些全局变量(不管在任何地方)，这些变量都会作为`this`的属性。
### function  this
对于函数中的`this`的指向问题，有一句话很好用：运行时`this`永远指向最后调用它的那个对象。

举一个栗子
```JavaScript
var name = "windowsName";
function sayName() {
    var name = "Jake";
    console.log(this.name);   // windowsName
    console.log(this);    // Window
}
sayName();
console.log(this) // Window
```
我们看最后调用 `sayName`的地方 `sayName()`;，前面没有调用的对象那么就是全局对象 `window`，这就相当于是 `window.sayName()`。

> 需要注意的是，对于严格模式来说，默认绑定全局对象是不合法的，`this`被置为`undefined`。会报错 `Uncaught TypeError: Cannot read property 'name' of undefined`。

再看下面这个栗子

```JavaScript
function foo() {
    console.log( this.age );
}

var obj1 = {
    age : 23,
    foo: foo
};

var obj2 = {
    age : 18,
    obj1: obj1
};

obj2.obj1.foo(); // 23

```
还是开头的那句话，最后调用`foo()`的是`obj1`，所以`this`指向`obj1`，输出`23`。

构造函数中的`this`
所谓构造函数，就是通过这个函数生成一个新对象`（object）`。当一个函数作为构造器使用时(通过 `new` 关键字), 它的 `this` 值绑定到新创建的那个对象。如果没使用 `new` 关键字, 那么他就只是一个普通的函数, `this` 将指向 `window` 对象。
这又是另一个经典话题：`new` 的过程
```JavaScript
var a = new Foo("zhang","jake");

new Foo{
    var obj = {};
    obj.__proto__ = Foo.prototype;
    var result = Foo.call(obj,"zhang","jake");
    return typeof result === 'obj'? result : obj;
}
```
若执行 `new Foo()`，过程如下：
* 创建新对象 `obj`；
* 给新对象的内部属性赋值，构造原型链（将新对象的隐式原型指向其构造函数的显示原型）；
* 执行函数 `Foo`，执行过程中内部 `this` 指向新创建的对象 `obj`（这里使用了`call`改变`this`指向）；
* 如果 `Foo` 内部显式返回对象类型数据，则返回该数据，执行结束；否则返回新创建的对象 `obj`。

```JavaScript
var name = "Jake";
function testThis(){
    this.name = 'jakezhang';
    this.sayName = function () {
	    return this.name;
	}
}
console.log(this.name); // Jake

new testThis(); 
console.log(this.name); // Jake

var result = new testThis();
console.log(result.name); // jakezhang
console.log(result.sayName()); // jakezhang

testThis();  
console.log(this.name); // jakezhang
```
很显然，谁被`new`了，`this`就指向谁。
### `class`中的`this`

在`es6`中，类，是 `JavaScript` 应用程序中非常重要的一个部分。类通常包含一个 `constructor` ， `this`可以指向任何新创建的对象。
不过在作为方法时，如果该方法作为普通函数被调用， `this`也可以指向任何其他值。与方法一样，类也可能失去对接收器的跟踪。

```JavaScript
class Hero {
    constructor(heroName) {
        this.heroName = heroName;
    }
    dialogue() {
        console.log(`I am ${this.heroName}`)
    }
}
const batman = new Hero("Batman");
batman.dialogue();
```
构造函数里的 `this`指向新创建的类实例。当我们调用 `batman.dialogue()` 时，`dialogue()`作为方法被调用， `batman`是它的接收器。
但是如果我们将 `dialogue()` 方法的引用存储起来，并稍后将其作为函数调用，我们会丢失该方法的接收器，此时 `this` 参数指向 `undefined`。

```JavaScript
const say = batman.dialogue;
say();
```
出现错误的原因是`JavaScript`类是隐式的运行在严格模式下的。我们是在没有任何自动绑定的情况下调用 `say()` 函数的。要解决这个问题，我们需要手动使用 `bind()` 将 `dialogue()` 函数与`batman`绑定在一起。
```JavaScript
const say = batman.dialogue.bind(batman);
say();
```
### call、apply和bind中的this
`call`、`apply`、`bind` 被称之为 `this` 的强绑定，用来改变函数执行时的`this`指向，目前所有关于它们的运用，都是基于这一点来进行的。
```JavaScript
var name = 'zjk';
function fun() {
    console.log (this.name);
}

var obj= {
    name: 'jake'
};
fun(); // zjk
fun.call(obj); //Jake
```
上面的`fun.call(obj)`等价于`fun.apply(obj)`和`fun.bind(obj)()`

### 箭头函数中的this
`es5`中的`this`要看函数在什么地方调用（即要看运行时），通过谁是最后调用它该函数的对象来判断`this`指向。但`es6`的箭头函数中没有 `this` 绑定，必须通过查找作用域链来决定其值，如果箭头函数被非箭头函数包含，则 `this` 绑定的是最近一层非箭头函数的 `this`，否则，`this` 为 `undefined`。箭头函数的 `this` 始终指向函数定义时的 `this`，而非执行时。
```JavaScript
let name = "zjk";
let o = {
    name : "Jake",
    sayName: function () {
        console.log(this.name)     
    },
    func: function () {
        setTimeout(() => {
            this.sayName()
        },100);
    }
};
o.func()     // Jake
```
使用 `call` 、 `apply`或`bind`等方法给`this`传值，箭头函数会忽略。箭头函数引用的是箭头函数在创建时设置的`this`值。
```JavaScript
var name = "a"
let obj = {
    name: "Jake",
    func: (a,b) => {
        console.log(this.name, a, b);
    }
};
obj.func.call(obj,1,2);
var name = "b"
let obj2 = {
    name: "Lucy",
    func: (a,b) => {
        console.log(this.name, a, b);
    }
};

obj2.func.apply(obj2,[1,2]);
```

最后放一道常见的`this`面试题
```JavaScript
var number = 1;
var obj = {
	number: 2,
	showNumber: function(){
	    this.number = 3;

	    (function(){
            // 闭包，指向window.this
	        console.log(this.number); // 1
        })();
        // 指向函数中的this
	    console.log(this.number); // 3
    }
};
obj.showNumber();// 答案就欢迎留在评论区囖~
```
### call & apply
每个函数都包含两个非继承而来的方法：`apply()`和 `call()`。这两个方法的用途都是在特定的作用域中调用函数，实际上等于设置函数体内 `this` 对象的值。
#### apply()
`apply()`方法接收两个参数：一个是在其中运行函数的作用域，另一个是参数数组。其中，第二个参数可以是 `Array` 的实例，也可以是`arguments`对象。
```JavaScript
function sum(num1, num2){ 
    return num1 + num2; 
} 
function callSum1(num1, num2){ 
    return sum.apply(this, arguments); // 传入 arguments 对象
} 
function callSum2(num1, num2){ 
    return sum.apply(this, [num1, num2]); // 传入数组
} 
console.log(callSum1(10,10)); //20
console.log(callSum2(10,10)); //20
```
在严格模式下，未指定环境对象而调用函数，则 `this` 值不会转型为 `window`。除非明确把函数添加到某个对象或者调用`apply()`或`call()`，否则 `this` 值将是`undefined`。

#### call()
`call()`方法与`apply()`方法的作用相同，它们的唯一区别在于接收参数的方式不同。在使用`call()`方法时，传递给函数的参数必须逐个列举出来。
```JavaScript
function sum(num1, num2){ 
    return num1 + num2; 
}
function callSum(num1, num2){ 
    return sum.call(this, num1, num2); 
} 
console.log(callSum(10,10)); //20
```
`call()`方法与`apply()`方法返回的结果是完全相同的，至于是使用`apply()`还是`call()`，完全取决于你采取哪种给函数传递参数的方式最方便。

参数数量/顺序确定就用`call`，参数数量/顺序不确定的话就用`apply`。
考虑可读性：参数数量不多就用`call`，参数数量比较多的话，把参数整合成数组，使用`apply`。

#### bind()
`bind()`方法会创建一个函数的实例，其 `this` 值会被绑定到传给`bind()`函数的值。意思就是`bind()`会返回一个新函数。例如：
```JavaScript
window.color = "red"; 
var o = { 
    color: "blue" 
}; 
function sayColor(){ 
    alert(this.color); 
} 
var objectSayColor = sayColor.bind(o); 
objectSayColor(); //blue
```
#### call/apply与bind的区别
*执行：*
* `call/apply`改变了函数的`this`上下文后马上执行该函数
* `bind`则是返回改变了上下文后的函数,不执行该函数
```JavaScript
function add (a, b) {
    return a + b;
}

function sub (a, b) {
    return a - b;
}

add.bind(sub, 5, 3); // 这时，并不会返回 8
add.bind(sub, 5, 3)(); // 调用后，返回 8
```
*返回值:*

* call/apply 返回fun的执行结果
* bind返回fun的拷贝，并指定了fun的this指向，保存了fun的参数。

### call/apply/bind的核心理念
从上面几个简单的例子可以看出`call/apply/bind`是在向其他对象借用方法，这也符合我们的正常思维，举个简单的栗子。
我和我高中一个同学玩的超级好，衣服鞋子都是共穿的，去买衣服的时候，他买衣服，我买鞋子；回来后某天我想穿他买的衣服了，但是我没有，于是我就借用他的穿。这样我就既达到了穿新衣服的目的，又节省了money~
A对象有个方法，B对象因为某种原因也需要用到同样的方法，这时候就可以让B借用 A 对象的方法啦，既达到了目的，又节省了内存。
这就是call/apply/bind的核心理念：借。
call/apply/bind的应用场景
关于call/apply/bind的用法因篇幅有限就不做展开了，可以看看下面这篇，个人觉得写得超级棒！

*细说 call、apply 以及 bind 的区别和用法*

### 手写实现apply、call、bind
#### apply
* 1、先给Function原型上扩展个方法并接收2个参数,
```JavaScript
Function.prototype.myApply = function (context, args) {}
```
* 2、因为不传`context`的话,`this`会指向`window`,所以这里将`context`和`args`做一下容错处理。
```JavaScript
Function.prototype.myApply = function (context, args) { 
    // 处理容错
    context = (typeof context === 'object' ? context : window)
    args = args ? args : []
}
```
* 3、使用隐式绑定去实现显式绑定
```JavaScript
Function.prototype.myApply = function (context, args) {
    // 处理容错
    context = (typeof context === 'object' ? context : window)
    args = args ? args : []
    //给context新增一个独一无二的属性以免覆盖原有属性
    const key = Symbol()
    context[key] = this
    //通过隐式绑定的方式调用函数
    context[key](...args)
}
```
* 4、最后一步要返回函数调用的返回值,并且把context上的属性删了才不会造成影响
```JavaScript
Function.prototype.myApply = function (context, args) {
   // 处理容错
    context = (typeof context === 'object' ? context : window)
    args = args ? args : []
    //给context新增一个独一无二的属性以免覆盖原有属性
    const key = Symbol();
    context[key] = this;
    //通过隐式绑定的方式调用函数
    const result = context[key](...args);
    //删除添加的属性
    delete context[key]
    //返回函数调用的返回值
    return result
}
```
这样一个乞丐版的`apply`就实现了,至于优化，网上有很多大牛写的很好，可以去找找，这里就不做继续优化了。
验证走一波~
```JavaScript

function fun(...args) {
  console.log(this.name,...args)
}
const result = { 
name: 'Jake' 
}
// 参数为数组;方法立即执行
fun.myApply (result, [1, 2])
```
搞定～

#### call
`call`的实现几乎和`apply`一模一样，就直接上代码了。
```JavaScript
//传递参数从一个数组变成逐个传参了,不用...扩展运算符的也可以用arguments代替
Function.prototype.NealCall = function (context, ...args) {
    //这里默认不传就是给window,也可以用es6给参数设置默认参数
     context = (typeof context === 'object' ? context : window)
    args = args ? args : []
    //给context新增一个独一无二的属性以免覆盖原有属性
    const key = Symbol();
    context[key] = this;
    //通过隐式绑定的方式调用函数
    const result = context[key](...args);
    //删除添加的属性
    delete context[key];
    //返回函数调用的返回值
    return result;
}
```
#### bind
`bind`的实现要稍微麻烦一点，因为`bind`是返回一个绑定好的函数,`apply`是直接调用.但其实简单来说就是返回一个函数,里面执行了`apply`上述的操作而已.不过有一个需要判断的点,因为返回新的函数,要考虑到使用`new`去调用,并且`new`的优先级比较高,所以需要判断`new`的调用,还有一个特点就是`bind`调用的时候可以传参,调用之后生成的新的函数也可以传参,效果是一样的,所以这一块也要做处理。
```JavaScript
Function.prototype.myBind = function (objThis, ...params) {
    const thisFn = this; // 存储源函数以及上方的params(函数参数)
    // 对返回的函数 secondParams 二次传参
    let fToBind = function (...secondParams) {
        const isNew = this instanceof fToBind // this是否是fToBind的实例 也就是返回的fToBind是否通过new调用
        const context = isNew ? this : Object(objThis) // new调用就绑定到this上,否则就绑定到传入的objThis上
        return thisFn.call(context, ...params, ...secondParams); // 用call调用源函数绑定this的指向并传递参数,返回执行结果
    };
    if (thisFn.prototype) {
        // 复制源函数的prototype给fToBind 一些情况下函数没有prototype，比如箭头函数
        fToBind.prototype = Object.create(thisFn.prototype);
    }
    return fToBind; // 返回拷贝的函数
};
```
总结
* 在浏览器里，在全局范围内`this`指向`window`对象；
* 在函数中，`this`永远指向最后调用他的那个对象；
* 构造函数中，`this`指向`new`出来的那个新的对象；
* `call、apply、bind`中的`this`被强绑定在指定的那个对象上；
* 箭头函数中`this`比较特殊,箭头函数`this`为父作用域的`this`，不是调用时的`this`.要知道前四种方式,都是调用时确定,也就是动态的,而箭头函数的`this`指向是静态的,声明的时候就确定了下来；
* `apply、call、bind`都是`js`给函数内置的一些`API`，调用他们可以为函数指定`this`的执行,同时也可以传参。
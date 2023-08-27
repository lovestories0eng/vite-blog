# JavaScript构造函数
典型的面向对象编程语言（比如`C++`和`Java`），存在“类”（`class`）这个概念。所谓“类”就是对象的模板，对象就是“类”的实例。但是，在`JavaScript`语言的对象体系，不是基于“类”的，而是基于构造函数（`constructor`）和原型链（`prototype`）。

## 构造函数
  ‘面向对象编程’的第一步，就是要生成对象。而js中面向对象编程是基于构造函数（`constructor`）和原型链（`prototype`）的。 　　

前面说过，“对象”是单个实物的抽象。通常需要一个模板，表示某一类实物的共同特征，然后“对象”根据这个模板生成。 　　

  `js`语言中使用构造函数（`constructor`）作为对象的模板。所谓构造函数，就是提供一个生成对象的模板，并描述对象的基本结构的函数。一个构造函数，可以生成多个对象，每个对象都有相同的结构。 
  　　
看一下构造函数的基本结构。  

```JavaScript
var Keith = function() {
    this.height = 180;
};
//两种写法相同。
function Keith() {
     this.height = 180;
}
```

上面代码中，Keith就是构造函数，它提供模板，用来生成对象实例。为了与普通函数区别，构造函数名字的第一个字母通常大写。 　　

构造函数的三大特点： 　　
* a：构造函数的函数名的第一个字母通常大写。 　　
* b：函数体内使用`this`关键字，代表所要生成的对象实例。 　　
* c：生成对象的时候，必须使用`new`命令来调用构造函数。

```JavaScript
function Parent(age) {
    this.age = age;
}

var p = new Parent(50);
p.constructor === Parent; // true
p.constructor === Object; // false
```
构造函数和普通函数的区别在于，使用 new 生成实例的函数就是构造函数，直接调用的就是普通函数。

那是不是意味着普通函数创建的实例没有 constructor 属性呢？不一定。

```JavaScript
// 普通函数
function parent2(age) {
    this.age = age;
}
var p2 = parent2(50);
// undefined

// 普通函数
function parent3(age) {
    return {
        age: age
    }
}
var p3 = parent3(50);
p3.constructor === Object; // true
```
在这里，普通函数`parent3`给我们返回一个`Object`对象，因此他的构造函数就是`Object`。

那么问题又来了，如果普通函数不返回一个对象的话，他的构造函数是什么呢？
```JavaScript
function test() {
    console.log("function test executed.")
}
console.log(test.constructor) // ƒ Function() { [native code] }
test.constructor === Function // true
test.constructor.prototype == Function.prototype // true
test.constructor.prototype == Function.constructor.prototype // true
```
可以看到，普通函数的`constructor`就是`Function`，同时这里还有一个奇怪的现象，就是`Function`的`contructor`就是`Function`自己。

## `new`命令
`new`命令的作用，就是执行一个构造函数，并且返回一个对象实例。使用new命令时，它后面的函数调用就不是正常的调用，而是依次执行下面的步骤。 　　
* a：创建一个空对象，作为将要返回的对象实例。 　　
* b：将空对象的原型指向了构造函数的prototype属性。 　　
* c：将空对象赋值给构造函数内部的this关键字。 　　
* d：开始执行构造函数内部的代码。 　　

也就是说，构造函数内部，`this`指向的是一个新生成的空对象，所有针对`this`的操作，都会发生在这个空对象上。构造函数之所谓构造函数，意思是这个函数的目的就是操作一个空对象（即`this`对象），将其构造为需要的样子。 　　
以上是`new`命令的基本原理，这个很重要。以下会用具体实例来验证该原理的过程。

`new`命令的作用，就是调用一个构造函数，并且返回一个对象实例。
```JavaScript
function Keith() {
    this.height = 180;
}
var boy = new Keith();
console.log(boy.height);　　//180
```

上面代码中通过`new`命令，让构造函数`Keith`生成一个对象实例，并赋值给全局变量`boy`。这个新生成的对象实例，从构造函数`Keith`中继承了`height`属性。也就说明了这个对象实例是没有`height`属性的。在`new`命令执行时，就代表了新生成的对象实例`boy`。`this.height`表示对象实例有一个`height`属性，它的值是`180`。

使用`new`命令时，根据需要，构造函数也可以接受参数。
```JavaScript
function Person(name, height) {
    this.name = name;
    this.height = height;
}

var boy = new Person('Keith', 180);
console.log(boy.name); //'Keith'
console.log(boy.height); //180

var girl = new Person('Samsara', 160);
console.log(girl.name); //'Samsara'
console.log(girl.height); //160
```
用以上的一个例子，来对构造函数的特点和`new`基本原理进行一个梳理。 　　

上面代码中，首先，我们创建了一个构造函数`Person`，传入了两个参数`name`和`height`。构造函数`Person`内部使用了`this`关键字来指向将要生成的对象实例。

然后，我们使用`new`命令来创建了两个对象实例`boy`和`girl`。 　　

当我们使用`new`来调用构造函数时，`new`命令会创建一个空对象`boy`，作为将要返回的实例对象。接着，这个空对象的原型会指向构造函数`Person`的`prototype`属性。也就是`boy.__proto__===Person.prototype`。要注意的是空对象指向构造函数`Person`的`prototype`属性，而不是指向构造函数本身。然后，我们将这个空对象赋值给构造函数内部的`this`关键字。也就是说，让构造函数内部的`this`关键字指向一个对象实例。最后，开始执行构造函数内部代码。 　　

因为对象实例`boy`和`girl`是没有`name`和`height`属性的，所以对象实例中的两个属性都是继承自构造函数`Person`中的。这也就说明了构造函数是生成对象的函数，是给对象提供模板的函数。 　　
一个问题，如果我们忘记使用`new`命令来调用构造函数，直接调用构造函数了，会发生什么？ 　　

这种情况下，构造函数就变成了普通函数，并不会生成实例对象。而且由于后面会说到的原因，`this`这时代表全局对象，将造成一些意想不到的结果。  

```JavaScript
function Keith() {
    this.height = 180;
}
var person = Keith();
console.log(person.height); //TypeError: person is undefined
console.log(window.height); //180
```

上面代码中，当在调用构造函数`Keith`时，忘记加上`new`命令。结果是`this`指向了全局作用域，`height`也就变成了全局变量。而变量`person`变成了`undefined`。 　　

因此，应该非常小心，避免出现不使用`new`命令、直接调用构造函数的情况。 　　

为了保证构造函数必须与`new`命令一起使用，一个解决办法是，在构造函数内部使用严格模式，即第一行加上`use strict`。

```JavaScript
function Person(name, height) {
     'use strict';
     this.name = name;
     this.height = height;
}
var boy = Person();
console.log(boy) //TypeError: name is undefined
```

上面代码的`Person`为构造函数，`use strict`命令保证了该函数在严格模式下运行。由于在严格模式中，函数内部的`this`不能指向全局对象。如果指向了全局，`this`默认等于`undefined`，导致不加`new`调用会报错（`JavaScript`不允许对`undefined`添加属性）。 　　

另一个解决办法，是在构造函数内部判断是否使用`new`命令，如果发现没有使用，则直接返回一个实例对象。

```JavsScript
function Person(name, height) {
    if (!(this instanceof Person)) {
        return new Person(name, height);
    }
    this.name = name;
    his.height = height;
}
var boy = Person('Keith');
console.log(boy.name) //'Keith'
```

上面代码中的构造函数，不管加不加`new`命令，都会得到同样的结果。

如果构造函数内部有`return`语句，而且`return`后面跟着一个复杂数据类型（对象，数组等），`new`命令会返回`return`语句指定的对象；如果`return`语句后面跟着一个简单数据类型（字符串，布尔值，数字等），则会忽略`return`语句，返回`this`对象。

```JavaScript
function Keith() {
    this.height = 180;
    return {
        height: 200
    };
}
var boy = new Keith();
console.log(boy.height); //200
 
function Keith() {
    this.height = 100;
    return 200;
}
var boy = new Keith();
console.log(boy.height); //100
```

另一方面，如果对普通函数（内部没有`this`关键字的函数）使用`new`命令，则会返回一个空对象。
```JavaScript
function Keith() {
    return 'this is a message';
}
var boy = new Keith();
console.log(boy); // Keith {}
```
上面代码中，对普通函数Keith使用new命令，会创建一个空对象。这是因为`new`命令总是返回一个对象，要么是实例对象，要么是`return`语句指定的对象或数组。本例中，`return`语句返回的是字符串，所以`new`命令就忽略了该语句。

## `constructor`值只读吗
这个得分情况，对于引用类型来说 `constructor` 属性值是可以修改的，但是对于基本类型来说是只读的。

引用类型情况其值可修改这个很好理解，比如原型链继承方案中，就需要对 `constructor` 重新赋值进行修正。

```JavaScript
function Foo() {
    this.value = 42;
}
Foo.prototype = {
    method: function() {}
};

function Bar() {}

// 设置 Bar 的 prototype 属性为 Foo 的实例对象
Bar.prototype = new Foo();
Bar.prototype.foo = 'Hello World';

Bar.prototype.constructor === Object;
// true

// 修正 Bar.prototype.constructor 为 Bar 本身
Bar.prototype.constructor = Bar;

var test = new Bar() // 创建 Bar 的一个新实例
console.log(test);  // Bar {}
```

对于基本类型来说是只读的，比如 `1`、`muyiy`、`true`、`Symbol`，当然 `null` 和 `undefined` 是没有 `constructor` 属性的。
```JavaScript
function Type() { };
var	types = [1, "muyiy", true, Symbol(123)];

for(var i = 0; i < types.length; i++) {
	types[i].constructor = Type;
	types[i] = [ types[i].constructor, types[i] instanceof Type, types[i].toString() ];
};

console.log( types.join("\n") );
// function Number() { [native code] }, false, 1
// function String() { [native code] }, false, muyiy
// function Boolean() { [native code] }, false, true
// function Symbol() { [native code] }, false, Symbol(123)
```
为什么呢？因为创建他们的是只读的原生构造函数`（native constructors）`，这个例子也说明了依赖一个对象的 `constructor` 属性并不安全。

## 模拟实现`new`
说到这里就要聊聊 `new` 的实现了，实现代码如下。
```JavaScript
function create() {
	// 1、创建一个空的对象
    var obj = new Object(),
	// 2、获得构造函数，同时删除 arguments 中第一个参数
    Con = [].shift.call(arguments);
	// 3、链接到原型，obj 可以访问构造函数原型中的属性
    Object.setPrototypeOf(obj, Con.prototype);
	// 4、绑定 this 实现继承，obj 可以访问到构造函数中的属性
    var ret = Con.apply(obj, arguments);
	// 5、优先返回构造函数返回的对象
	return ret instanceof Object ? ret : obj;
};
```
# JavaScript五个常见错误

## 默认函数参数和函数长度属性
```JavaScript
function foo(a, b = 10, c) {
 console.log(foo.length);
}
 
foo(1, 2, 3);
```
这里的关键点是函数的 `length` 属性应该提供有关函数参数的信息，该信息计算是它的形参数量。

`ES2015` 中引入了默认参数功能。 在此之前，所有函数参数都被视为形式参数，函数长度属性用于返回所有函数参数数。

随着默认参数的引入，长度属性的行为发生了变化。 因为很明显带有默认值的参数是可选的，所以这样的参数不计入函数的长度。 按照常识，带默认值的参数后面的所有参数也是可选的。 因此，它们也不包含在函数的长度属性中。

## Object.defineProperty的参数
```JavaScript
const obj = {};
 
Object.defineProperty(obj, 'myCompany', {
 value: 'intspirit'
});
 
console.log(obj.myCompany);
delete obj.myCompany;
console.log(obj.myCompany);
```
大多数人对该测验的回答是不确定的。 原因：不知道 `Object.defineProperty()` 方法是如何工作的。

`Object.defineProperty()` 方法定义对象的新属性，或修改对象的现有属性。

语法：`Object.defineProperty(obj, prop, descriptors)`

* obj — 要在其上定义或修改属性的对象
* prop — 要定义或修改的属性的名称
* descriptors — 属性的描述符
  
属性描述符是一组配置该属性的标志。

有两种类型的描述符：数据描述符（value, writable, enumerable, configurable）和访问描述符（get and set）。 在此示例的上下文中，我们对数据描述符感兴趣。

默认情况下，使用 `Object.defineProperty()` 添加的属性`not writable, not enumerable, and not configurable`。

可配置属性指定是否可以从对象中删除该属性，以及将来是否可以更改属性描述符。 如果为 `true`，则该属性将可用于删除和修改其描述符，如果为 `false`，则不能。 默认值将设置为 `false`。

因此，本题的正确答案是`intspirit`。 将忽略删除属性的尝试。 如果你在严格模式下运行代码，你会得到一个错误：
> TypeError: Cannot delete property ‘myCompany’ of #`<Object>`

## Array.map & parseInt
```JavaScript
const numbers = ['9', '10', '11'].map(parseInt);
 
console.log(numbers);
```

Array.map() 方法接受一个带有 3 个参数的回调函数。 我们只会对前两个感兴趣：(value, index)。 parseInt 函数有两个参数：一个要转换为数字的字符串和一个基数。

所以在我们的例子中 parseInt 将使用以下参数调用：

* parseInt(‘9’, 0);
* parseInt(‘10’, 1);
* parseInt(‘11’, 2);

>radix — an integer between 2 and 36 that represents the radix (the base in mathematical numeral systems) of the string. If outside this range, the function will always return NaN. If 0 or not provided, JavaScript assumes the following:
>1. If the input string, with leading whitespace and possible +/- signs removed, begins with 0x or 0X (a zero, followed by lowercase or uppercase X), radix is assumed to be 16 and the rest of the string is parsed as a hexadecimal number.
>2. If the input string begins with any other value, the radix is 10 (decimal).

根据这个定义，我们得到以下结果：
* parseInt(‘9’, 0) -> radix 0 等同于没有 radix 的调用。 因为第一个参数不是以 0x 或 0X 开头，所以 radix 将默认为
10 -> parseInt('9', 10) -> 9
* parseInt(‘10’, 1)-> 1 — 基数无效（超出范围）-> NaN
* parseInt(‘11’, 2) -> 2 — 有效基数，二进制中的 11 是 3 -> 3

## Object.create 与 Object.assign

```JavaScript
function User() {
 this.verified = true;
}
 
const user = new User();
const admin = Object.create(user);
 
const clone1 = { ...admin };
const clone2 = Object.assign({}, admin);
 
console.log(admin.verified, clone1.verified, clone2.verified);
```

让我们了解这个例子中发生了什么

* `verified`属性设置为 `true` 的用户构造函数及其实例已创建：
```JavaScript
function User() {
 this.verified = true;
}
 
const user = new User();
```

* 使用`admin`对象作为原型创建管理对象

根据`mdn`
>The Object.create() method creates a new object, using an existing object as the prototype of the newly created object.
```JavaScript
const admin = Object.create(user);
```

* 创建了两个克隆：一个使用` …` 运算符，另一个使用 `Object.assign`：

```JavaScript
const clone1 = { ...admin };
const clone2 = Object.assign({}, admin);
```

* 查看`verified`的属性是否被克隆

`admin` 对象显然将其 `verified` 属性设置为 `true`，因为它使用`user`作为其原型。 但是，如您所见，没有一个克隆具有`verified`的属性。 这是因为 `…` 运算符和 `Object.assign` 在克隆时都忽略了原型。

这些对象的原型：
```JavaScript
admin.__proto__ User { verified: true },
clone1.__proto__ [Object: null prototype] {},
clone2.__proto__ [Object: null prototype] {}
```

要克隆一个对象，包括它的原型：
```JavaScript
const clone1 = { __proto__: Object.getPrototypeOf(obj), ...obj };
const clone2 = Object.assign(Object.create(Object.getPrototypeOf(obj)), obj);
```

## String function & instanceof

```JavaScript
var str = 'Hello';
var str2 = String('Hello');
 
console.log(str instanceof String);
console.log(str2 instanceof String);
```

两种表达的返回值都是`false`的。 因为：
* `instanceof` 运算符仅适用于对象。
* 字符串文字`Hello`是原始属性。
* 非构造函数上下文中，字符串的调用（不使用 `new` 关键字调用）返回原始字符串。

## 结论
看来不管我们学多少 `JavaScript`，还是学到了一些新东西。 一如既往，我们希望鼓励您继续学习您每天编写的语言，让我们让它变得更好！
# Symbol应用场景与使用方法

ES6中引入了一种新的基础数据类型：`Symbol，不过很多开发者可能都不怎么了解它，或者觉得在实际的开发工作中并没有什么场景应用到它，那么今天我们来讲讲这个数据类型，并看看我们怎么来利用它来改进一下我们的代码。

## 新的基础数据类型
`Symbol`是由ES6规范引入的一项新特性，它的功能类似于一种标识唯一性的`ID`。通常情况下，我们可以通过调用`Symbol()`函数来创建一个`Symbol`实例：
```JavaScript
let s1 = Symbol()
```
或者，你也可以在调用`Symbol()`函数时传入一个可选的字符串参数，相当于给你创建的`Symbol`实例一个描述信息：
```JavaScript
let s2 = Symbol('another symbol')
```
如果用当下比较流行的`TypeScript`的方式来描述这个`Symbol()`函数的话，可以表示成：
```TypeScript
/**
 * @param  {any} description 描述信息。可以是任何可以被转型成字符串的值，如：字符串、数字、对象、数组等
 */
function Symbol(description?: any): symbol
```
由于`Symbol`是一种基础数据类型，所以当我们使用`typeof`去检查它的类型的时候，它会返回一个属于自己的类型`symbol`，而不是什么`string`、`object`之类的：
```JavaScript
typeof s1  // 'symbol'
```
另外，我们需要重点记住的一点是：每个`Symbol`实例都是唯一的。因此，当你比较两个`Symbol`实例的时候，将总会返回`false`：
```JavaScript
let s1 = Symbol()
let s2 = Symbol('another symbol')
let s3 = Symbol('another symbol')

s1 === s2 // false
s2 === s3 // false
```
## 应用场景1：使用Symbol来作为对象属性名(key)
在这之前，我们通常定义或访问对象的属性时都是使用字符串，比如下面的代码：
```JavaScript
let obj = {
  abc: 123,
  "hello": "world"
}

obj["abc"] // 123
obj["hello"] // 'world'
// 而现在，Symbol可同样用于对象属性的定义和访问：

const PROP_NAME = Symbol()
const PROP_AGE = Symbol()

let obj = {
  [PROP_NAME]: "一斤代码"
}
obj[PROP_AGE] = 18

obj[PROP_NAME] // '一斤代码'
obj[PROP_AGE] // 18
```
随之而来的是另一个非常值得注意的问题：就是当使用了`Symbol`作为对象的属性`key`后，在对该对象进行`key`的枚举时，会有什么不同？在实际应用中，我们经常会需要使用`Object.keys()`或者`for...in`来枚举对象的属性名，那在这方面，`Symbol`类型的`key`表现的会有什么不同之处呢？来看以下示例代码：
```JavaScript
let obj = {
   [Symbol('name')]: '一斤代码',
   age: 18,
   title: 'Engineer'
}

Object.keys(obj)   // ['age', 'title']

for (let p in obj) {
   console.log(p)   // 分别会输出：'age' 和 'title'
}

Object.getOwnPropertyNames(obj)   // ['age', 'title']
```
由上代码可知，`Symbol`类型的`key`是不能通过`Object.keys()`或者`for...in`来枚举的，它未被包含在对象自身的属性名集合`(property names)`之中。所以，利用该特性，我们可以把一些不需要对外操作和访问的属性使用`Symbol`来定义。
也正因为这样一个特性，当使用`JSON.stringify()`将对象转换成`JSON`字符串的时候，`Symbol`属性也会被排除在输出内容之外：
```JavaScript
JSON.stringify(obj)  // {"age":18,"title":"Engineer"}
```
我们可以利用这一特点来更好的设计我们的数据对象，让`对内操作`和`对外选择性输出`变得更加优雅。
然而，这样的话，我们就没办法获取以`Symbol`方式定义的对象属性了么？非也。还是会有一些专门针对`Symbol`的`API`，比如：
```JavaScript
// 使用Object的API
Object.getOwnPropertySymbols(obj) // [Symbol(name)]
// 使用新增的反射API
Reflect.ownKeys(obj) // [Symbol(name), 'age', 'title']
```
## 应用场景2：使用Symbol来替代常量
先来看一下下面的代码，是不是在你的代码里经常会出现？
```JavaScript
const TYPE_AUDIO = 'AUDIO'
const TYPE_VIDEO = 'VIDEO'
const TYPE_IMAGE = 'IMAGE'

function handleFileResource(resource) {
  switch(resource.type) {
    case TYPE_AUDIO:
      playAudio(resource)
      break
    case TYPE_VIDEO:
      playVideo(resource)
      break
    case TYPE_IMAGE:
      previewImage(resource)
      break
    default:
      throw new Error('Unknown type of resource')
  }
}
```
如上面的代码中那样，我们经常定义一组常量来代表一种业务逻辑下的几个不同类型，我们通常希望这几个常量之间是唯一的关系，为了保证这一点，我们需要为常量赋一个唯一的值（比如这里的`AUDIO`、`VIDEO`、 `IMAGE`），常量少的时候还算好，但是常量一多，你可能还得花点脑子好好为他们取个好点的名字。
现在有了`Symbol`，我们大可不必这么麻烦了：
```JavaScript
const TYPE_AUDIO = Symbol()
const TYPE_VIDEO = Symbol()
const TYPE_IMAGE = Symbol()
```
这样定义，直接就保证了三个常量的值是唯一的了！是不是挺方便的呢。
## 应用场景3：使用Symbol定义类的私有属性/方法
我们知道在`JavaScript`中，是没有如`Java`等面向对象语言的访问控制关键字`private`的，类上所有定义的属性或方法都是可公开访问的。因此这对我们进行`API`的设计时造成了一些困扰。
而有了`Symbol`以及模块化机制，类的私有属性和方法才变成可能。例如：
在文件 a.js中
```JavaScript
const PASSWORD = Symbol()

class Login {
  constructor(username, password) {
    this.username = username
    this[PASSWORD] = password
  }

  checkPassword(pwd) {
      return this[PASSWORD] === pwd
  }
}

export default Login
```
在文件 b.js 中
```JavaScript
import Login from './a'

const login = new Login('admin', '123456')

login.checkPassword('123456')  // true

login.PASSWORD  // oh!no!
login[PASSWORD] // oh!no!
login["PASSWORD"] // oh!no!
```
由于`Symbol`常量`PASSWORD`被定义在`a.js`所在的模块中，外面的模块获取不到这个`Symbol`，也不可能再创建一个一模一样的`Symbol`出来（因为`Symbol`是唯一的），因此这个`PASSWORD`的`Symbol`只能被限制在`a.js`内部使用，所以使用它来定义的类属性是没有办法被模块外访问到的，达到了一个私有化的效果。
注册和获取全局`Symbol`

通常情况下，我们在一个浏览器窗口中（`window`），使用`Symbol()`函数来定义和`Symbol`实例就足够了。但是，如果你的应用涉及到多个`window`（最典型的就是页面中使用了`iframe`），并需要这些`window`中使用的某些`Symbol`是同一个，那就不能使用`Symbol()`函数了，因为用它在不同`window`中创建的`Symbol`实例总是唯一的，而我们需要的是在所有这些`window`环境下保持一个共享的`Symbol`。这种情况下，我们就需要使用另一个`API`来创建或获取`Symbol`，那就是`Symbol.for()`，它可以注册或获取一个`window`间全局的`Symbol`实例：

```JavaScript
let gs1 = Symbol.for('global_symbol_1')  //注册一个全局Symbol
let gs2 = Symbol.for('global_symbol_1')  //获取全局Symbol

gs1 === gs2  // true
```
这样一个`Symbol`不光在单个`window`中是唯一的，在多个相关`window`间也是唯一的了。

原理:
> `Symbol.for(key)` 方法会根据给定的键 `key`，来从运行时的 `symbol`注册表中找到对应的`symbol`，如果找到了，则返回它，否则，新建一个与该键关联的 `symbol`，并放入全局 `symbol` 注册表中。
> 和 `Symbol() `不同的是，用 `Symbol.for()`方法创建的的 `symbol` 会被放入一个全局 `symbol` 注册表中。`Symbol.for()` 并不是每次都会创建一个新的 `symbol`，它会首先检查给定的 `key` 是否已经在注册表中了。假如是，则会直接返回上次存储的那个。否则，它会再新建一个。

示例：
```JavaScript
Symbol.for("foo"); // 创建一个 symbol 并放入 symbol 注册表中，键为 "foo"
Symbol.for("foo"); // 从 symbol 注册表中读取键为"foo"的 symbol


Symbol.for("bar") === Symbol.for("bar"); // true，证明了上面说的
Symbol("bar") === Symbol("bar"); // false，Symbol() 函数每次都会返回新的一个 symbol


var sym = Symbol.for("mario");
sym.toString();
// "Symbol(mario)"，mario 既是该 symbol 在 symbol 注册表中的键名，又是该 symbol 自身的描述字符串
```
为了防止冲突，最好给你要放入 `symbol` 注册表中的 `symbol` 带上键前缀。
```JavaScript
Symbol.for("mdn.foo");
Symbol.for("mdn.bar");
```

## Symbol是构造函数吗？
> The Symbol() function returns a value of type symbol, has static properties that expose several members of built-in objects, has static methods that expose the global symbol registry, and resembles a built-in object class but is incomplete as a constructor because it does not support the syntax "new Symbol()".

`Symbol` 是基本数据类型，但作为构造函数来说它并不完整，因为它不支持语法 `new Symbol()`，`Chrome` 认为其不是构造函数，如果要生成实例直接使用 `Symbol()` 即可。（来自 `MDN`）

```JavaScript
new Symbol(123); // Symbol is not a constructor 
Symbol(123); // Symbol(123)
```
虽然是基本数据类型，但 `Symbol(123)` 实例可以获取 `constructor` 属性值。
```JavaScript
var sym = Symbol(123); 
console.log( sym );
// Symbol(123)

console.log( sym.constructor );
// ƒ Symbol() { [native code] }
```
这里的 `constructor` 属性来自哪里？其实是 `Symbol` 原型上的，即 `Symbol.prototype.constructor` 返回创建实例原型的函数， 默认为 `Symbol` 函数。

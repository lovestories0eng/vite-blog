# 失败率最高的JavaScript面试题
如果你不时以 `JavaScript` 开发人员的身份进行面试，那么你就会知道此类面试中的问题总是相似的（或多或少，好吧！）。 在不同的主题下，面试官测试你对相同主题的了解。 尽管如此，正如您将看到的，正确回答此类问题的统计数据非常低。

如何改变现状？ 小菜一碟——在这些主题上做尽可能多的练习——最重要的是，理解结果。 从我们为本文选择的那些开始。

## 时间循环
很难想象没有提到事件循环的 `JavaScript` 面试。这个主题真的很基础，每个 `React`、`Angular` 和 `Vue` 开发人员每天都在使用它。

### 示例1
```JavaScript
setTimeout(() => console.log(1), 0);

console.log(2);

new Promise(res => {
  console.log(3)
  res();
}).then(() => console.log(4));

console.log(5);
```

解释：
在示例中，我们看到了 `setTimeout`、`Promise` 和一些同步代码。

正确回答此测验的开发人员的内部对话可能如下所示。

* 给定`setTimeout`零延迟，我们传递给 `setTimeout` 的函数将被同步调用还是异步调用？
* 尽管 `setTimeout` 函数具有零延迟，但异步调用回调函数。 引擎会将回调函数放入回调队列`（macrotask queue）`中，当为空时将其移至调用栈。 因此，数字 1 将被跳过，数字 2 将首先显示在控制台中。
* 我们作为参数传递给 `Promise` 构造函数的函数是同步调用还是异步调用？
* `Promise` 构造函数作为参数的函数是同步执行的。 因此，控制台中显示的下一个数字是 3。
* 给定`setTimeout`零延迟，我们作为参数传递给 `promise` 的 `then` 处理程序的函数将被同步调用还是异步调用？
* `then` 方法中的回调是异步执行的，即使 `promise` 立即解析。 与 `setTimeout` 的不同之处在于，引擎会将 `promise` 回调放在另一个队列中——作业队列（微任务队列），它会在那里等待轮到它执行。 因此，下一个进入控制台的数字是 5。
* 哪个优先级更高——微任务队列还是宏任务队列，或者换句话说——`promises` 还是 `setTimeout`？
* 微任务（`Promise`）比宏任务（setTimeout）具有更高的优先级，因此控制台中的下一个数字将是 4，最后一个是 1。
分析响应，我们可以得出结论，大多数受访者错误地认为作为参数传递给 Promise 构造函数的执行程序函数是异步调用的。

## 上下文

### 示例1
```JavaScript
'use strict';

function foo() {
  console.log(this);
}

function callFoo(fn) {
  fn();
}

let obj = { foo };

callFoo(obj.foo);
```

解释：
`this` 的值在调用函数时设置。

在示例中，`obj.foo` 函数作为参数传递给另一个 `callFoo` 函数，该函数在没有上下文的情况下调用它。

在普通模式下，当没有执行上下文，代码运行在浏览器环境时，`this`指的是`window`对象，在严格模式下是`undefined`。

正确答案是`undefined`。

另一个常见的面试问题是箭头函数中 `this` 的值。

```JavaScript
'use strict';
var x = 5;
var y = 5;

function Operations(op1 = x, op2 = y) {
  this.x = op1;
  this.y = op2;
};

Operations.prototype.sum = () => this.x + this.y;

const op = new Operations(10, 20);

console.log(op.sum());
```

解释：
箭头函数没有自己的 `this`。 相反，箭头函数体内的 `this` 指向箭头函数定义范围内的 `this` 值。

我们的功能是在全局范围内定义的。

`this` 在全局范围内指的是全局对象（即使在严格模式下）。 所以答案是10。

## 箭头函数
```JavaScript
function Operations(coef) {
  return {
    sum: (...args) => arguments[0] + coef
  }
}

const ops = Operations(0.1);

console.log(ops.sum(1, 2, 3));
```

解释：
箭头函数没有自己的`arguments`对象。 相反，参数是对封闭范围参数的引用。

因此 `arguments[0]` 指的是 `coef` 参数，测验的结果是 `0.2`。

关于箭头函数的另一个问题可能如下所示。
```JavaScript
const Num = () => {
  this.getNum = () => 10;
}

Num.prototype.getNum = () => 20;

const num = new Num();

console.log(num.getNum());
```

解释：
箭头函数不能用作构造函数，并且在使用 `new` 调用时会抛出错误。 它们也没有`prototype`属性：
TypeError: Cannot set properties of undefined (setting ‘getNum’)

## 变量作用域
如果你很好地理解变量作用域，你会从调试代码中节省很多时间。
```JavaScript
'use strict';

console.log(foo());

let bar = 'bar';

function foo() {
  return bar;
}

bar = 'baz';
```

解释：
作用域中 `let / const` 变量定义之前的位置称为临时死区。

如果我们尝试在定义之前访问 `let / const` 变量，将抛出引用错误。

要轻松记住一种语言是如何工作的，理解它为什么这样工作是很有帮助的（这么简单，哈？！）。

选择此行为是因为 `const` 变量。 在定义之前访问 `var` 变量时，我们得到未定义。 这对于 `const` 变量来说是不可接受的，因为那样它就不是常量了。

`let` 变量的行为以类似的方式完成，因此您可以轻松地在这两种类型的变量之间切换。

回到我们的例子。

因为函数调用在 `bar` 变量的定义之上，变量处于临时死区。

代码抛出错误：
ReferenceError: Cannot access ‘bar’ before initialization

```JavaScript
let func = function foo() {
  return 'hello';
}

console.log(typeof foo);
```
解释：
在命名函数表达式中，`name`仅对函数体而言是局部的，无法从外部获得。 所以 `foo` 在全局范围内不存在。

`typeof` 运算符为未定义的变量返回 `undefined`。

下面的例子不建议在现实生活中使用，但至少要知道这段代码是如何工作的，才能满足面试官的兴趣。

```JavaScript
function foo(bar, getBar = () => bar) {
  var bar = 10;
  console.log(getBar());
}

foo(5);
```
解释：
对于具有复杂参数（解构、默认值）的函数，参数列表包含在它自己的范围内。

因此，在函数体中创建 `bar` 变量不会影响参数列表中的同名变量，`getBar()` 函数通过闭包从其参数中获取 `bar`。

总的来说，我们注意到尽管 `ES6` 已经发布 7 年多了，但开发人员对它的特性仍然知之甚少。 当然，每个人都知道这个版本中特性的语法，但只有少数人理解得更深。

## ES6 modules
如果您是一名面试官，并且出于某种原因您不喜欢应聘者，那么这些模块肯定会帮助您让任何人失望。

出于本文的目的，我们选择了关于该主题的最简单的任务之一。 但是请相信我们，`ES6` 模块要复杂得多。

我们收集了 13 个关于模块主题的测验，涵盖了该主题所有最复杂和鲜为人知的方面。 如果你能正确回答（并解释你的答案）至少一半的这些测验，你就已经是一个超级英雄了。 自行检查：

index.js
```JavaScript
console.log('index.js');

import { sum } from './helper.js';

console.log(sum(1, 2));
```

helper.js
```JavaScript
console.log('helper.js');
export const sum = (x, y) => x + y;
```

解释：
import的变量会被提升。
提升是 `JS` 中的一种机制，在执行代码之前，变量和函数声明被移动到它们作用域的顶部。

在代码运行之前将加载所有依赖项。

所以，答案是：helper.js index.js 3

## 变量提升
```JavaScript
'use strict';

var num = 8;

function num() {
  return 10;
}

console.log(num);
```
解释：
函数和变量声明放在它们作用域的顶部，变量的初始化发生在脚本执行时。

跳过同名变量的重复声明。

函数总是首先被提升。 无论函数和同名变量的声明在您的代码中出现的顺序如何，函数都优先，因为它上升得更高。

示例1:
```JavaScript
function num() {}
var num;
console.log(typeof num); // function
```

示例2:
```JavaScript
var num;
function num() {}
console.log(typeof num); // function
```

变量总是在最后初始化。
```JavaScript
var num = 8;
function num() {}
```

将转化为：

```JavaScript
function num() {}
var num; // repeated declaration is ignored
num = 8;
```

结果：`num = 8`

## mjs
index.mjs
```JavaScript
import foo from './module.mjs';

console.log(typeof foo);
```

module.mjs
```JavaScript
foo = 25;

export default function foo() {}
```

解释：
```JavaScript
export default function foo() {}
```

等价于：
```JavaScript
function foo() {}
export { foo as default }
```

是时候记住函数被提升了，变量初始化总是发生在函数/变量声明之后。

引擎处理完模块代码后，您可以将其想象成以下形式：

```JavaScript
function foo() {}
foo = 25;
export { foo as default }
```

## Promises
```JavaScript
Promise.resolve(1)
  .then(x => { throw x })
  .then(x => console.log(`then ${x}`))
  .catch(err => console.log(`error ${err}`))
  .then(() => Promise.resolve(2))
  .catch(err => console.log(`error ${err}`))
  .then(x => console.log(`then ${x}`));
```

解释：
让我们看看这段代码是如何一步步执行的。

1. 第一个 `then` 处理程序抛出一个错误（意味着——返回被`rejected`的承诺）。

2. 下一个 `then` 处理程序不会触发，因为已抛出错误，而是继续执行下一个 `catch`。

3. `catch` 处理程序打印错误并返回空的`promise`。 `catch` 处理程序与 `then` 处理程序一样，总是返回一个`promise`。

4. 因为 `catch` 处理程序返回了一个 `promise`，所以调用下一个 `then` 处理程序并返回一个值为 `2` 的 `promise`。

5. 调用最后一个 `then` 处理程序并打印 `2`。
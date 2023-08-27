# JavaScript-functions

## 示例1
```JavaScript
const user = {
    email: 'my@email.com',
    update: email => { this.email = email }
}
user.update('newEmail@email.com')
console.log(user.email)
```

> 结果：my@email.com。
> 为什么 ？ => 使用箭头函数 => 这并不指向用`user`对象，而是指向用户所在的执行上下文。
> 这里，`this`指向`Window`。
> 可以通过使用普通函数来替代箭头函数来解决这个问题。

## 示例2
```JavaScript
greetings()
var greetings = function() {
    console.log('First Greetings')
}

greetings()
function greetings() {
    console.log('Second Greetings')
}

greetings()
```

>答案：
>Second Greetings（因为在变量提升时，函数的变量最先提升）
>First Greetings（第 2 行的初始化覆盖提升的定义）
>First Greetings

## 示例3
```JavaScript
var variable = 10
(() => {
    console.log(variable)
    variable = 20
    console.log(variable)
})()

console.log(variable)
var variable = 30
console.log(variable)
```

> 答案：
> 10
> 20
> 20
> 30

## 示例4
```JavaScript
var variable = 10
(() => {
    console.log(variable)
    var variable = 20
    console.log(variable)
})()

console.log(variable)
var variable = 30
console.log(variable)
```

> 答案：
> undefined
> 20
> 10
> 30

## 示例5
```JavaScript
var var1 = 10
(() => {
    var3 = 35
    console.log(var3)
    var var3 = 45
    var2 = 15
    console.log(var1)
})()

console.log(var2)
console.log(var3)
var var1 = 30
console.log(var1)
```

>答案：
>35（var3 在 立即执行函数 作用域的第 3 行被提升和启动）
>10（全局变量）
>15（全局变量）
>Uncaught ReferenceError: var3 is not defined

## 示例5
```JavaScript
let counter = function() {
    let k = 0
    return () => k++
}

console.log(counter())
console.log(counter())
console.log(counter())
```

>答案：
>0
>1
>2

## 示例6
```JavaScript
var fullName = 'John Doe'
var obj = {
    fullName: 'Colin Ihrig',
    prop: {
        fullName: 'Aurelio de Rose',
        getFullName: function() {
            return this.fullName
        }
    },
    getMyName: function() {
        return this.fullName
    },
    getFirstName: () => {
        return this.fullName.split(' ')[0]
    },
    // 立即执行函数能防止污染全局作用域，同时其中的this会指向window
    getLastName: (function() {
        return this.fullName.split(' ')[1]
    })()
}

console.log(obj.prop.getFullName())
console.log(obj.getFirstName())
console.log(obj.getMyName())
console.log(obj.getLastName())
```

> 答案：
> Aurelio de Rose
> John
> Colin Ihrig
> Doe

## 示例8
```JavaScript
const fn = (a, ...numbers, x, y) => {
    console.log(x, y)
}
```

> Answer：
> SyntaxError: Rest parameter must be last formal parameter

## 示例9
```JavaScript
var hero = {
    _name: 'John Doe',
    getSecretIdentity: function() {
        return this._name
    }
}

var stoleSecretIdentity = hero.getSecretIdentity
console.log(stoleSecretIdentity())
console.log(hero.getSecretIdentity)
```

>答案：
>undefined
>John Doe


## 示例10
```JavaScript
function greet() {
    console.log(this.name)
}
const sayHello1 = greet.bind({ name: 'Tom Cruise' })
sayHello1()
const sayHello2 = sayHello1.bind({ name: 'Zac Efron' })
sayHello2()
```

>答案：
>Tom Cruise
>Tom Cruise
>(Binding an already bound function does not change the execution context.)

## 示例11
```JavaScript
function greet() {
    // setTimeout中的this指向Window
    // 因为setTimeout是异步代码，等到执行回调函数的时候不知道程序执行到哪里了
    // 所以this是无法确定的，只能绑定到window对象中
    setTimeout(function() {
        console.log(this.name)
    }, 500)
}
greet.call({ name: 'Daniel Craig' })
```
>答案：
>undefined

## 示例12
```JavaScript
function greet() {
    setTimeout(() => {
        // 箭头函数没有自己的作用域，引用的this是上一层的
        console.log(this.name)
    }, 500)
}
greet.call({ name: 'Daniel Craig' })
```
>答案：
>Daniel Craig

## 示例13
```JavaScript
function Employee(name) {
    this.name = name
}

// 箭头函数没有自己的this，this指向外层作用域
Employee.prototype.getName = () => {
    return this.name
}
const jason = new Employee('Jason')
console.log(jason.getName())
```

>答案：
>undefined

## 示例14
```JavaScript
function Employee(name) {
    this.name = name
}

Employee.prototype.getName = function () {
    return this.name
}
const jason = new Employee('Jason')
console.log(jason.getName())
```

>答案：
>Jason

## 示例
```JavaScript
display()
var display = function() {
    console.log('var')
}

function display() {
    console.log('JS')
}
display()
```

>答案：
>JS
>var
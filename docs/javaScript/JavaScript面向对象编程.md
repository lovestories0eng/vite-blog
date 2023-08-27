# JavaScript面向对象编程
在我们讨论 `JavaScript` 中的 `OOP` 之前，我们需要解决一个更重要的问题，即 `OOP` 到底是什么，为什么我们需要它？

`OOP`，即`Object Oriented Programming`，是一个编程概念。在这种类型的编程中，一切都被视为一个对象，数据围绕这些对象进行操作。

你会看到在构建现实生活中的项目时，代码变得更加混乱和重复。伴随着集成部署调试等其他问题，管理和维护变得很麻烦……

要更好地理解 OOP，您需要熟悉对象和类。

## 对象和类
简而言之，`OOP` 中的对象是我们在 `Javascript` 中拥有的简单普通对象。但是，我仍然会尝试对它们进行更多解释。

在 `OOP` 中，每个有生命或无生命的事物都可以被视为对象，只要它具有分配给它的某些特征（键和值）。

```JavaScript
const person = {
    name : "suraj",
    is_an_adult: true,
    is_employed: true,
    getName(){
        console.log(this.name);
    }
}
```

这里我们有一个叫做人的对象，我们有它的一些特征，例如姓名、他是否成年以及他的就业状况。这个对象也可以有一些我们可以使用的方法。

一个对象必须有两个东西：

特征或属性或键
由对象执行或对其执行的操作（我们可以称它们为方法）
想象一下，您正在尝试制作一个真实世界的项目，它处理一些现实生活中的问题，您需要用您的代码来处理这些问题。如果没有完美实施，可能会导致无组织、不可读和大量重复代码。

编程中有一个重要的概念是`DRY` `(DO NOT REPEAT YOURSELF)`

`OOP`，帮我们完美实现这个概念。现在让我们看看类到底是什么。

类是定义对象可以具有什么样的特征和方法的模板。类是封装数据和行为的用户定义数据类型。

```JavaScript
class Human {
    constructor(name, age, gender, adult) {
        this.name = name;
        this.age = age;
        this.gender = gender;
        this.is_adult = adult;
    }
}

const humanInstance = new Human('suraj', 24, 'male', true);
console.log(humanInstance);
//Human { name: 'suraj', age: 24, gender: 'male', is_adult: true }
```

我们创建了一个人或用户的模版，以及他可能拥有的属性。然后我们可以使用这些类来创建用户对象。我们也可以像这样定义一些方法

```JavaScript
class Human {
    constructor(name, age, gender, adult) {
        this.name = name;
        this.age = age;
        this.gender = gender;
        this.is_adult = adult;
    }
    
    myName() {
        console.log(this.name)
    }
}

const humanInstance = new Human('suraj', 24, 'male', true)
humanInstance.myName();
// suraj
console.log(humanInstance);
// Human { name: 'suraj', age: 24, gender: 'male', is_adult: true }
```

如果我们这样做，那么使用这些类（也称为此类的实例）创建的所有对象都将具有相同的属性和方法。

`Javascript` 类需要一个特殊的构造函数,创建对象。构造函数只不过是一个简单的 `JavaScript` 函数。我们只是用大写字母声明函数名称，这样我们就知道它是一个构造函数。

```JavaScript
function Person(firstName, lastName, age) {
  this.firstName = firstName;
  this.lastName = lastName;
  this.age = age;

  this.sayHello = function() {
    console.log(`Hello, my name is ${this.firstName} ${this.lastName} and I am ${this.age} years old.`);
  }
}

// Create a new Person object
const john = new Person('John', 'Doe', 30);

// Call the sayHello method
john.sayHello(); 
// Output: "Hello, my name is John Doe and I am 30 years old."
```

## OOP 的四大特性
为了解面向对象编程，有四个重要的特性。类赋予我们所有这四个概念，它们在构建事物时非常有用。

### 封装
封装是我们将所有数据和方法包装到一个单元或盒子中的过程。我们这样做是为了保护数据免受外部访问。

一个现实生活中的例子就是胶囊。它的工作方式与胶囊的工作方式相同。因此得名封装。

### 抽象
这是 `OOP` 遵循的另一个重要概念。

这是一个只显示需要显示的过程。用户不需要关心的任何事情，我们都对他隐藏。例如，您只关心手机的工作情况，而不关心它的工作方式。
只要一切都呈现在屏幕上，您就不需要知道电路在幕后是如何工作的。

```JavaScript
class User{
    #password;
    constructor(name, email, password) {
        this.name = name
        this.email = email;
        this.#password = password
    }
    
    login(email, password) {
        if(email === this.email && password === this.#password) {
            return 'true'
        } 
        return false
    }
}

const suraj = new User('suraj', "suraj@example.com", "1234567");
const loggedIn = suraj.login("suraj@example.com", "1234567")
console.log(suraj) // User { name: 'suraj', email: 'suraj@example.com' }
console.log(loggedIn)// true;
```

### 继承
顾名思义就是如此。借助继承，子类可以获得其父类的方法。有了这个，我们可以重用现有代码，并根据自己的喜好修改和增强它。有助于减少开发时间。

让我举个例子，你有没有在 `javascript` 中定义数组并直接开始使用 `push`、`pop`、`map` 或 `sort` 等方法？有没有想过这些方法是从哪里来的，因为你没有写过这些方法？

```JavaScript
let array = [23,22,14,-23,2,2,6,75,8,8]
array.sort();
console.log(array)

// [ -23, 14,  2, 2, 22, 23,  6, 75, 8,  8 ]
```

如果您想知道为什么它没有正确排序，那意味着您需要多读一点 `javascript`(默认按照首字母字典序排序)。

我们如何使用这种方法，而不必编写它们？这是因为有人在 Array 类中为我们编写了这个方法。

```JavaScript
let array = [23,22,14,-23,2,2,6,75,8,8]
console.log(array instanceof Array) // true
```

### 多态
多态 意味着很多，多态性允许一个类拥有自己独特的行为，同时仍然继承父类/基类的属性。

```JavaScript
class Animal {
  constructor(name) {
    this.name = name;
  }
  
  speak() {
    console.log(`${this.name} makes a noise.`);
  }
}

class Dog extends Animal {
  speak() {
    console.log(`${this.name} barks.`);
  }
}

class Cat extends Animal {
  speak() {
    console.log(`${this.name} meows.`);
  }
}

const animal = new Animal('Animal');
const dog = new Dog('Dog');
const cat = new Cat('Cat');

animal.speak(); // Output: "Animal makes a noise."
dog.speak(); // Output: "Dog barks."
cat.speak(); // Output: "Cat meows.
```

`OOPS`是一个重要的概念，可以帮助我们创建现实生活中的应用程序来轻松解决一些现实生活中的问题。

通过`函数重载`和`函数覆盖`可以更好地理解多态性.

现在让我们讨论一下使用 Oops 时的一些好处。

* 代码复用性：我们可以复用已经编写好的代码，而不是从头开始重写整个代码。我们也可以在其他项目中使用整个模块。
* 调试：如果我们使用 `OOP` 概念，调试应用程序的错误会更容易。
* 安全性：当我们实施抽象化时，我们的数据对普通用户是隐藏的，这为我们提供了一个安全的系统。
* 改进的代码组织和结构：`OOP` 鼓励使用可重用的代码组件和模块化设计，这使得组织和维护复杂的代码库变得更加容易。

`Conclusions`如果你的目标是成为一名软件工程师，那么你不可能不了解面向对象编程。但是`javascript`在`es6`中引入了类，在此之前我们不能在`javascript`中使用类。


原文链接：https://medium.com/@codecript/object-oriented-programming-in-javascript-dbc920e54d1c
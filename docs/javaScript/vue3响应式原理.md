# vue3响应式原理

## vue3比vue2好在哪
* `Vue2`的响应式是基于`Object.defineProperty`实现的
* `Vue3`的响应式是基于`ES6`的`Proxy`来实现的

是的，虽然上面的回答抽象了点，但是确实是回答出了Vue的两个版本的响应式的核心原理，并且`Vue`的两个版本响应式的好坏，也确实就是体现在`Object.defineProperty`和`Proxy`的差异上。

### vue2
大家都知道`Vue2`的响应式是基于`Object.defineProperty`的，那我就拿`Object.defineProperty`来举个例子
```JavaScript
// 响应式函数
function reactive(obj, key, value) {
  Object.defineProperty(data, key, {
    get() {
      console.log(`访问了${key}属性`)
      return value
    },
    set(val) {
      console.log(`将${key}由->${value}->设置成->${val}`)
      if (value !== val) {
        value = val
      }
    }
  })
}


const data = {
  name: '林三心',
  age: 22
}
Object.keys(data).forEach(key => reactive(data, key, data[key]))
console.log(data.name)
// 访问了name属性
// 林三心
data.name = 'sunshine_lin' // 将name由->林三心->设置成->sunshine_lin
console.log(data.name)
// 访问了name属性
// sunshine_lin
```

通过上面的例子，我想大家都对`Object.defineProperty`有了一个了解，那问题来了？它到底有什么弊端呢？使得尤大大在`Vue3`中抛弃了它，咱们接着看：
```JavaScript
// 接着上面代码

data.hobby = '打篮球'
console.log(data.hobby) // 打篮球
data.hobby = '打游戏'
console.log(data.hobby) // 打游戏
```

这下大家可以看出`Object.defineProperty`有什么弊端了吧？咱们可以看到，`data`新增了`hobby`属性，进行访问和设值，但是都不会触发`get`和`set`，所以弊端就是：`Object.defineProperty`只对初始对象里的属性有监听作用，而对新增的属性无效。这也是为什么`Vue2`中对象新增属性的修改需要使用`Vue.$set`来设值的原因。

### vue3
从上面，咱们知道了`Object.defineProperty`的弊端，咱们接着讲`Vue3`中响应式原理的核心`Proxy`是怎么弥补这一缺陷的，老样子，咱们还是举例子(先粗略讲，具体参数下面会细讲)：
```JavaScript
const data = {
  name: '林三心',
  age: 22
}

function reactive(target) {
  const handler = {
    get(target, key, receiver) {
      console.log(`访问了${key}属性`)
      return Reflect.get(target, key, receiver)
    },
    set(target, key, value, receiver) {
      console.log(`将${key}由->${target[key]}->设置成->${value}`)
      Reflect.set(target, key, value, receiver)
    }
  }

  return new Proxy(target, handler)
}

const proxyData = reactive(data)

console.log(proxyData.name)
// 访问了name属性
// 林三心
proxyData.name = 'sunshine_lin'
// 将name由->林三心->设置成->sunshine_lin
console.log(proxyData.name)
// 访问了name属性
// sunshine_lin
```
可以看到，其实效果与上面的`Object.defineProperty`没什么差别，那为什么尤大大要抛弃它，选择`Proxy`呢？注意了，最最最关键的来了，那就是对象新增属性，来看看效果吧：

```JavaScript
proxyData.hobby = '打篮球'
console.log(proxyData.hobby)
// 访问了hobby属性
// 打篮球
proxyData.hobby = '打游戏'
// 将hobby由->打篮球->设置成->打游戏
console.log(proxyData.hobby)
// 访问了hobby属性
// 打游戏
```
总结：使用`Object.defineProperty`无法使得新添加进来的属性也变成响应式的，使用`proxy`可以使得新添加进来的属性也变成响应式的。

## vue3响应式原理
说完`Proxy`的好处，咱们正式来讲讲`Vue3`的响应式原理的核心部分吧。
### 前言
先看看下面这段代码
```JavaScript
let name = '林三心', age = 22, money = 20
let myself = `${name}今年${age}岁，存款${money}元`

console.log(myself) // 林三心今年22岁，存款20元

money = 300

// 预期：林三心今年22岁，存款300元
console.log(myself) // 实际：林三心今年22岁，存款20元
```
大家想一下，我想要让`myself`跟着`money`变，怎么办才行？嘿嘿，其实，只要让`myself = '${name}今年${age}岁，存款${money}元'`再执行一次就行，如下

```JavaScript
let name = '林三心', age = 22, money = 20
let myself = `${name}今年${age}岁，存款${money}元`

console.log(myself) // 林三心今年22岁，存款20元

money = 300

myself = `${name}今年${age}岁，存款${money}元` // 再执行一次

// 预期：林三心今年22岁，存款300元
console.log(myself) // 实际：林三心今年22岁，存款300元
```

### effect
上面说了，每一次`money`改变就得再执行一次`myself = '${name}今年${age}岁，存款${money}元'`，才能使`myself`更新，其实这么写不优雅，咱们可以封装一个`effect`函数
```JavaScript
let name = '林三心', age = 22, money = 20
let myself = ''
const effect = () => myself = `${name}今年${age}岁，存款${money}元`

effect() // 先执行一次
console.log(myself) // 林三心今年22岁，存款20元
money = 300

effect() // 再执行一次

console.log(myself) // 林三心今年22岁，存款300元
```
其实这样也是有坏处的，不信你可以看看下面这种情况

```JavaScript
let name = '林三心', age = 22, money = 20
let myself = '', ohtherMyself = ''
const effect1 = () => myself = `${name}今年${age}岁，存款${money}元`
const effect2 = () => ohtherMyself = `${age}岁的${name}居然有${money}元`

effect1() // 先执行一次
effect2() // 先执行一次
console.log(myself) // 林三心今年22岁，存款20元
console.log(ohtherMyself) // 22岁的林三心居然有20元
money = 300

effect1() // 再执行一次
effect2() // 再执行一次

console.log(myself) // 林三心今年22岁，存款300元
console.log(ohtherMyself) // 22岁的林三心居然有300元
```
增加了一个`ohtherMyself`，就得再写一个`effect`，然后每次更新都执行一次，那如果增加数量变多了，那岂不是每次都要写好多好多的`effect`函数执行代码？

### track和trigger
针对上面的问题，咱们可以这样解决：用`track`函数把所有依赖于`money`变量的`effect`函数都收集起来，放在`dep`里，`dep`为什么用`Set`呢？因为`Set`可以自动去重。搜集起来之后，以后只要`money`变量一改变，就执行`trigger`函数通知`dep`里所有依赖`money`变量的`effect`函数执行，实现依赖变量的更新。
```JavaScript
let name = '林三心', age = 22, money = 20
let myself = '', ohtherMyself = ''
const effect1 = () => myself = `${name}今年${age}岁，存款${money}元`
const effect2 = () => ohtherMyself = `${age}岁的${name}居然有${money}元`

const dep = new Set()
function track () {
    dep.add(effect1)
    dep.add(effect2)
}
function trigger() {
    dep.forEach(effect => effect())
}
track() //收集依赖
effect1() // 先执行一次
effect2() // 先执行一次
console.log(myself) // 林三心今年22岁，存款20元
console.log(ohtherMyself) // 22岁的林三心居然有20元
money = 300

trigger() // 通知变量myself和otherMyself进行更新

console.log(myself) // 林三心今年22岁，存款300元
console.log(ohtherMyself) // 22岁的林三心居然有300元
```

### 对象呢
上面都是讲基础数据类型的，那咱们来讲讲对象吧，我先举个例子，用最原始的方式去实现他的响应
```JavaScript
const person = { name: '林三心', age: 22 }
let nameStr1 = ''
let nameStr2 = ''
let ageStr1 = ''
let ageStr2 = ''

const effectNameStr1 = () => { nameStr1 = `${person.name}是个大菜鸟` }
const effectNameStr2 = () => { nameStr2 = `${person.name}是个小天才` }
const effectAgeStr1 = () => { ageStr1 = `${person.age}岁已经算很老了` }
const effectAgeStr2 = () => { ageStr2 = `${person.age}岁还算很年轻啊` }

effectNameStr1()
effectNameStr2()
effectAgeStr1()
effectAgeStr2()
console.log(nameStr1, nameStr2, ageStr1, ageStr2)
// 林三心是个大菜鸟 林三心是个小天才 22岁已经算很老了 22岁还算很年轻啊

person.name = 'sunshine_lin'
person.age = 18

effectNameStr1()
effectNameStr2()
effectAgeStr1()
effectAgeStr2()

console.log(nameStr1, nameStr2, ageStr1, ageStr2)
// sunshine_lin是个大菜鸟 sunshine_lin是个小天才 18岁已经算很老了 18岁还算很年轻啊
```

上面的代码，咱们也看出来了，感觉写的很无脑。。还记得前面讲的`dep`收集`effect`吗？咱们暂且把`person`对象里的`name`和`age`看成两个变量，他们都有各自的依赖变量

* name：nameStr1和nameStr2
* age：ageStr1和ageStr2

所以`name`和`age`应该拥有自己的`dep`，并收集各自依赖变量所对应的`effect`

前面说了`dep`是使用`Set`，由于`person`拥有`age`和`name`两个属性，所以拥有两个`dep`，那用什么来储存这两个`dep`呢？咱们可以用`ES6`的另一个数据结构`Map`来储存

```JavaScript
const person = { name: '林三心', age: 22 }
let nameStr1 = ''
let nameStr2 = ''
let ageStr1 = ''
let ageStr2 = ''

const effectNameStr1 = () => { nameStr1 = `${person.name}是个大菜鸟` }
const effectNameStr2 = () => { nameStr2 = `${person.name}是个小天才` }
const effectAgeStr1 = () => { ageStr1 = `${person.age}岁已经算很老了` }
const effectAgeStr2 = () => { ageStr2 = `${person.age}岁还算很年轻啊` }

const depsMap = new Map()
function track(key) {
    let dep = depsMap.get(key)
    if (!dep) {
        depsMap.set(key, dep = new Set())
    }
    // 这里先暂且写死
    if (key === 'name') {
        dep.add(effectNameStr1)
        dep.add(effectNameStr2)
    } else {
        dep.add(effectAgeStr1)
        dep.add(effectAgeStr2)
    }
}
function trigger (key) {
    const dep = depsMap.get(key)
    if (dep) {
        dep.forEach(effect => effect())
    }
}

track('name') // 收集person.name的依赖
track('age') // 收集person.age的依赖



effectNameStr1()
effectNameStr2()
effectAgeStr1()
effectAgeStr2()
console.log(nameStr1, nameStr2, ageStr1, ageStr2)
// 林三心是个大菜鸟 林三心是个小天才 22岁已经算很老了 22岁还算很年轻啊

person.name = 'sunshine_lin'
person.age = 18

trigger('name') // 通知person.name的依赖变量更新
trigger('age') // 通知person.age的依赖变量更新

console.log(nameStr1, nameStr2, ageStr1, ageStr2)
// sunshine_lin是个大菜鸟 sunshine_lin是个小天才 18岁已经算很老了 18岁还算很年轻啊
```

上面咱们是只有一个`person`对象，那如果有多个对象呢？怎么办？我们都知道，每个对象会建立一个`Map`来存储此对象里属性的`dep`(使用`Set`来存储)，那如果有多个对象，该用什么来存储每个对象对应的`Map`呢？

其实`ES6`还有一个新的数据结构，叫做`WeakMap`的，咱们就用它来存储这些对象的`Map`吧。所以咱们得对`track`函数和`trigger`函数进行改造，先看看之前他们长啥样

```JavaScript
const depsMap = new Map()
function track(key) {
    let dep = depsMap.get(key)
    if (!dep) {
        depsMap.set(key, dep = new Set())
    }
    // 这里先暂且写死
    if (key === 'name') {
        dep.add(effectNameStr1)
        dep.add(effectNameStr2)
    } else {
        dep.add(effectAgeStr1)
        dep.add(effectAgeStr2)
    }
}
function trigger (key) {
    const dep = depsMap.get(key)
    if (dep) {
        dep.forEach(effect => effect())
    }
}
```
之前的代码只做了单个对象的处理方案，但是现在如果要多个对象，那就得使用`WeakMap`进行改造了(接下来代码可能有点啰嗦，但都会为了照顾基础薄弱的同学)
```JavaScript
const person = { name: '林三心', age: 22 }
const animal = { type: 'dog', height: 50 }

const targetMap = new WeakMap()
function track(target, key) {
    let depsMap = targetMap.get(target)
    if (!depsMap) {
        targetMap.set(target, depsMap = new Map())
    }

    let dep = depsMap.get(key)
    if (!dep) {
        depsMap.set(key, dep = new Set())
    }
    // 这里先暂且写死
    if (target === person) {
        if (key === 'name') {
            dep.add(effectNameStr1)
            dep.add(effectNameStr2)
        } else {
            dep.add(effectAgeStr1)
            dep.add(effectAgeStr2)
        }
    } else if (target === animal) {
        if (key === 'type') {
            dep.add(effectTypeStr1)
            dep.add(effectTypeStr2)
        } else {
            dep.add(effectHeightStr1)
            dep.add(effectHeightStr2)
        }
    }
}

function trigger(target, key) {
    let depsMap = targetMap.get(target)
    if (depsMap) {
        const dep = depsMap.get(key)
        if (dep) {
            dep.forEach(effect => effect())
        }
    }
}
```
经过了上面的改造，咱们终于实现了多对象的依赖收集，咱们来试一试吧

```JavaScript
const person = { name: '林三心', age: 22 }
const animal = { type: 'dog', height: 50 }
let nameStr1 = ''
let nameStr2 = ''
let ageStr1 = ''
let ageStr2 = ''
let typeStr1 = ''
let typeStr2 = ''
let heightStr1 = ''
let heightStr2 = ''

const effectNameStr1 = () => { nameStr1 = `${person.name}是个大菜鸟` }
const effectNameStr2 = () => { nameStr2 = `${person.name}是个小天才` }
const effectAgeStr1 = () => { ageStr1 = `${person.age}岁已经算很老了` }
const effectAgeStr2 = () => { ageStr2 = `${person.age}岁还算很年轻啊` }
const effectTypeStr1 = () => { typeStr1 = `${animal.type}是个大菜鸟` }
const effectTypeStr2 = () => { typeStr2 = `${animal.type}是个小天才` }
const effectHeightStr1 = () => { heightStr1 = `${animal.height}已经算很高了` }
const effectHeightStr2 = () => { heightStr2 = `${animal.height}还算很矮啊` }

track(person, 'name') // 收集person.name的依赖
track(person, 'age') // 收集person.age的依赖
track(animal, 'type') // animal.type的依赖
track(animal, 'height') // 收集animal.height的依赖



effectNameStr1()
effectNameStr2()
effectAgeStr1()
effectAgeStr2()
effectTypeStr1()
effectTypeStr2()
effectHeightStr1()
effectHeightStr2()

console.log(nameStr1, nameStr2, ageStr1, ageStr2)
// 林三心是个大菜鸟 林三心是个小天才 22岁已经算很老了 22岁还算很年轻啊

console.log(typeStr1, typeStr2, heightStr1, heightStr2)
// dog是个大菜鸟 dog是个小天才 50已经算很高了 50还算很矮啊

person.name = 'sunshine_lin'
person.age = 18
animal.type = '猫'
animal.height = 20

trigger(person, 'name')
trigger(person, 'age')
trigger(animal, 'type')
trigger(animal, 'height')

console.log(nameStr1, nameStr2, ageStr1, ageStr2)
// sunshine_lin是个大菜鸟 sunshine_lin是个小天才 18岁已经算很老了 18岁还算很年轻啊

console.log(typeStr1, typeStr2, heightStr1, heightStr2)
// 猫是个大菜鸟 猫是个小天才 20已经算很高了 20还算很矮啊
```

## Proxy
通过上面的学习，我们已经可以实现当数据更新时，他的依赖变量也跟着改变，但是还是有缺点的，大家可以发现，每次我们总是得自己手动去执行`track`函数进行依赖收集，并且当数据改变时，我么又得手动执行`trigger`函数去进行通知更新
那么，到底有没有办法可以实现，自动收集依赖，以及自动通知更新呢？答案是有的，`Proxy`可以为我们解决这个难题。咱们先写一个`reactive`函数，大家先照敲，理解好`Proxy-track-trigger`这三者的关系，后面我会讲为什么这里`Proxy`需要搭配`Reflect`

```JavaScript
function reactive(target) {
    const handler = {
        get(target, key, receiver) {
            track(receiver, key) // 访问时收集依赖
            return Reflect.get(target, key, receiver)
        },
        set(target, key, value, receiver) {
            Reflect.set(target, key, value, receiver)
            trigger(receiver, key) // 设值时自动通知更新
        }
    }

    return new Proxy(target, handler)
}
```
然后改一改之前的代码，把手动`track`和手动`trigger`去掉，发现也能实现之前的效果
```JavaScript
const person = reactive({ name: '林三心', age: 22 }) // 传入reactive
const animal = reactive({ type: 'dog', height: 50 }) // 传入reactive

// 触发get方法收集依赖
effectNameStr1()
effectNameStr2()
effectAgeStr1()
effectAgeStr2()
effectTypeStr1()
effectTypeStr2()
effectHeightStr1()
effectHeightStr2()

console.log(nameStr1, nameStr2, ageStr1, ageStr2)
// 林三心是个大菜鸟 林三心是个小天才 22岁已经算很老了 22岁还算很年轻啊

console.log(typeStr1, typeStr2, heightStr1, heightStr2)
// dog是个大菜鸟 dog是个小天才 50已经算很高了 50还算很矮啊

person.name = 'sunshine_lin'
person.age = 18
animal.type = '猫'
animal.height = 20

console.log(nameStr1, nameStr2, ageStr1, ageStr2)
// sunshine_lin是个大菜鸟 sunshine_lin是个小天才 18岁已经算很老了 18岁还算很年轻啊

console.log(typeStr1, typeStr2, heightStr1, heightStr2)
// 猫是个大菜鸟 猫是个小天才 20已经算很高了 20还算很矮啊
```

### 解决写死问题
在上面有一处地方，咱们是写死的，大家都还记得吗，就是在`track`函数中
```JavaScript
function track(target, key) {
    let depsMap = targetMap.get(target)
    if (!depsMap) {
        targetMap.set(target, depsMap = new Map())
    }

    let dep = depsMap.get(key)
    if (!dep) {
        depsMap.set(key, dep = new Set())
    }
    // 这里先暂且写死
    if (target === person) {
        if (key === 'name') {
            dep.add(effectNameStr1)
            dep.add(effectNameStr2)
        } else {
            dep.add(effectAgeStr1)
            dep.add(effectAgeStr2)
        }
    } else if (target === animal) {
        if (key === 'type') {
            dep.add(effectTypeStr1)
            dep.add(effectTypeStr2)
        } else {
            dep.add(effectHeightStr1)
            dep.add(effectHeightStr2)
        }
    }
}
```
实际开发中，肯定是不止两个对象的，如果每多加一个对象，就得多加一个`else if`判断，那是万万不行的。那我们要怎么解决这个问题呢？其实说难也不难，`Vue3`的作者们想出了一个非常巧妙的办法，使用一个全局变量`activeEffect`来巧妙解决这个问题，具体是怎么解决呢？其实很简单，就是每一个`effect`函数一执行，就把自身放到对应的`dep`里，这就可以不需要写死了。

我们怎么才能实现这个功能呢？我们需要改装一下`effect`函数才行，并且要修改`track`函数
```JavaScript
let activeEffect = null
function effect(fn) {
    activeEffect = fn
    activeEffect()
    activeEffect = null // 执行后立马变成null
}
function track(target, key) {
    // 如果此时activeEffect为null则不执行下面
    // 这里判断是为了避免例如console.log(person.name)而触发track
    if (!activeEffect) return
    let depsMap = targetMap.get(target)
    if (!depsMap) {
        targetMap.set(target, depsMap = new Map())
    }

    let dep = depsMap.get(key)
    if (!dep) {
        depsMap.set(key, dep = new Set())
    }
    dep.add(activeEffect) // 把此时的activeEffect添加进去
}

// 每个effect函数改成这么执行
effect(effectNameStr1)
effect(effectNameStr2)
effect(effectAgeStr1)
effect(effectAgeStr2)
effect(effectTypeStr1)
effect(effectTypeStr2)
effect(effectHeightStr1)
effect(effectHeightStr2)
```

### 实现ref
咱们在Vue3中是这么使用ref的
```JavaScript
let num = ref(5)

console.log(num.value) // 5
```
然后`num`就会成为一个响应式的数据，而且使用`num`时需要这么写`num.value`才能使用

实现`ref`其实很简单，咱们上面已经实现了`reactive`，只需要这么做就可以实现`ref`
```JavaScript
function ref (initValue) {
    return reactive({
        value: initValue
    })
}
```
咱们可以来试试效果如何
```JavaScript
let num = ref(5)

effect(() => sum = num.value * 100)

console.log(sum) // 500

num.value = 10

console.log(sum) // 1000
```

### 实现computed
咱们顺便简单实现一下`computed`吧，其实也很简单
```JavaScript
function computed(fn) {
    const result = ref()
    effect(() => result.value = fn()) // 执行computed传入函数
    return result
}
```
咱们来看看结果
```JavaScript
let num1 = ref(5)
let num2 = ref(8)
let sum1 = computed(() => num1.value * num2.value)
let sum2 = computed(() => sum1.value * 10)

console.log(sum1.value) // 40
console.log(sum2.value) // 400

num1.value = 10

console.log(sum1.value) // 80
console.log(sum2.value) // 800

num2.value = 16

console.log(sum1.value) // 160
console.log(sum2.value) // 1600
```
自此咱们就实现了本文章所有功能

## 最终代码
```JavaScript
const targetMap = new WeakMap()
function track(target, key) {
    // 如果此时activeEffect为null则不执行下面
    // 这里判断是为了避免例如console.log(person.name)而触发track
    if (!activeEffect) return
    let depsMap = targetMap.get(target)
    if (!depsMap) {
        targetMap.set(target, depsMap = new Map())
    }

    let dep = depsMap.get(key)
    if (!dep) {
        depsMap.set(key, dep = new Set())
    }
    dep.add(activeEffect) // 把此时的activeEffect添加进去
}
function trigger(target, key) {
    let depsMap = targetMap.get(target)
    if (depsMap) {
        const dep = depsMap.get(key)
        if (dep) {
            dep.forEach(effect => effect())
        }
    }
}
function reactive(target) {
    const handler = {
        get(target, key, receiver) {
            track(receiver, key) // 访问时收集依赖
            return Reflect.get(target, key, receiver)
        },
        set(target, key, value, receiver) {
            Reflect.set(target, key, value, receiver)
            trigger(receiver, key) // 设值时自动通知更新
        }
    }

    return new Proxy(target, handler)
}
let activeEffect = null
function effect(fn) {
    activeEffect = fn
    activeEffect()
    activeEffect = null
}
function ref(initValue) {
    return reactive({
        value: initValue
    })
}
function computed(fn) {
    const result = ref()
    effect(() => result.value = fn())
    return result
}
```

## Proxy和Reflect
### Proxy
```JavaScript
const person = { name: '林三心', age: 22 }

const proxyPerson = new Proxy(person, {
    get(target, key, receiver) {
        console.log(target) // 原来的person
        console.log(key) // 属性名
        console.log(receiver) // 代理后的proxyPerson
    },
    set(target, key, value, receiver) {
        console.log(target) // 原来的person
        console.log(key) // 属性名
        console.log(value) // 设置的值
        console.log(receiver) // 代理后的proxyPerson
    }
})

proxyPerson.name // 访问属性触发get方法

proxyPerson.name = 'sunshine_lin' // 设置属性值触发set方法
```

### Reflect
在这列举`Reflect`的两个方法

* `get(target, key, receiver)`：个人理解就是，访问`target`的`key`属性，但是`this`是指向`receiver`，所以实际是访问的值是`receiver`的`key`的值，但是这可不是直接访问`receiver[key]`属性，大家要区分一下
* `set(target, key, value, receiver)`：个人理解就是，设置`target`的`key`属性为`value`，但是`this`是指向`receiver`，所以实际是是设置`receiver`的`key`的值为`value`，但这可不是直接`receiver[key] = value`，大家要区分一下

上面咱们强调了，不能直接`receiver[key]`或者`receiver[key] = value`，而是要通过`Reflect.get`和`Reflect.set`，绕个弯去访问属性或者设置属性，这是为啥呢？下面咱们举个反例

```JavaScript
const person = { name: '林三心', age: 22 }

const proxyPerson = new Proxy(person, {
    get(target, key, receiver) {
        return Reflect.get(receiver, key) // 相当于 receiver[key]
    },
    set(target, key, value, receiver) {
        Reflect.set(receiver, key, value) // 相当于 receiver[key] = value
    }
})

console.log(proxyPerson.name)

proxyPerson.name = 'sunshine_lin' 
// 会直接报错，栈内存溢出 Maximum call stack size exceeded
```
为什么会这样呢？`Reflect.get(receiver, key)`相当于`receiver[key]`，这样操作又会触发get，因此就会无限循环下去。所以正确做法是
```JavaScript
const person = { name: '林三心', age: 22 }

const proxyPerson = new Proxy(person, {
    get(target, key, receiver) {
        return Reflect.get(target, key, receiver)
    },
    set(target, key, value, receiver) {
        Reflect.set(target, key, value, receiver)
    }
})

console.log(proxyPerson.name) // 林三心

proxyPerson.name = 'sunshine_lin'

console.log(proxyPerson.name) // sunshine_lin
```
肯定有的同学就要问了，下面这么写也可以，为什么也不建议呢？我放到下面一起说
```JavaScript
const proxyPerson = new Proxy(person, {
    get(target, key, receiver) {
        return Reflect.get(target, key)
    },
    set(target, key, value, receiver) {
        Reflect.get(target, key, value)
    }
})
```
### 为什么要一起用
其实`Proxy`不搭配`Reflect`也是可以的。咱们可以这么写，也照样能实现想要的效果
```JavaScript
const person = { name: '林三心', age: 22 }

const proxyPerson = new Proxy(person, {
    get(target, key, receiver) {
        return target[key]
    },
    set(target, key, value, receiver) {
        target[key] = value
    }
})

console.log(proxyPerson.name) // 林三心

proxyPerson.name = 'sunshine_lin'

console.log(proxyPerson.name) // sunshine_lin
```
那为什么建议Proxy和Reflect一起使用呢？因为`Proxy`和`Reflect`的方法都是一一对应的，在`Proxy`里使用`Reflect`会提高语义化

* `Proxy`的`get`对应`Reflect.get`
* `Proxy`的set对应`Reflect.set`
还有很多其他方法我就不一一列举，都是一一对应的

还有一个原因就是，尽量把`this`放在`receiver`上，而不放在`target`上
为什么要尽量把`this`放在代理对象`receiver`上，而不建议放原对象`target`上呢？因为原对象`target`有可能本来也是是另一个代理的代理对象，所以如果`this`一直放`target`上的话，出`bug`的概率会大大提高，所以之前的代码为什么不建议，大家应该知道了吧？下面举一个例子：
```JavaScript
let user = {
  _name: "Guest",
  get name() {
    return this._name;
  }
};

let userProxy = new Proxy(user, {
  get(target, prop, receiver) {
    return target[prop]; // (*) target = user
  }
});

let admin = {
  __proto__: userProxy,
  _name: "Admin"
};

// 期望输出：Admin
alert(admin.name); // 输出：Guest (?!?)
```
读取 `admin.name` 应该返回 `Admin`，而不是 `Guest`！
```JavaScript
let user = {
  _name: "Guest",
  get name() {
    return this._name;
  }
};

let userProxy = new Proxy(user, {
  get(target, prop, receiver) { // receiver = admin
    return Reflect.get(target, prop, receiver); // (*)
  }
});


let admin = {
  __proto__: userProxy,
  _name: "Admin"
};

alert(admin.name); // Admin
```
现在 `receiver` 保留了对正确 `this` 的引用（即 `admin`）

原文链接：https://juejin.cn/post/7001999813344493581
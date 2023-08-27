# promise专题

## thenable
如果一个对象有`then`方法，我们也可以对其使用`await`操作

```JavaScript
const thenable = {
    then: function(callback) {
        setTimeout(() => callback(2), 100)
    }
}
```

## 示例2
```JavaScript
const promise = new Promise((resolve, reject) => {
    reject(Error('Some error occured'))
})

promise.catch(error => console.log(error.message))
promise.catch(error => console.log(error.message))
```

输出：
```txt
Some error occured
Some error occured
```

## 示例3
使用`promise`写一个`sleep`函数
```JavaScript
function sleep(ms) {
    return new Promise(res => {
        setTimeout(res, ms)
    })
}
```

## 示例4
```JavaScript
function job() {
    return new Promise(function(resolve, reject) {
        reject()
    })
}

let promise = job()

promise.then(function() {
    console.log('Success 1')
}).then(function() {
    console.log('Success 2')
}).then(function() {
    console.log('Success 3')
}).catch(function() {
    console.log('Error 1')
}).then(function() {
    console.log('Success 4')
})
```

输出:
```txt
Error 1
Success 4
```

## 示例5
```JavaScript
function job(state) {
    return new Promise(function(resolve, reject) {
        if (state) {
            resolve('success')
        } else {
            reject('error')
        }
    })
}

let promise = job(true)

promise.then(function(data) {
    console.log(data)
    return job(false)
}).catch(function(error) {
    console.log(error)

    return 'Error caught'
}).then(function(data) {
    console.log(data)
    return job(true)
}).catch(function(error) {
    console.log(error)
})
```

输出：
```txt
success
error
Error Caught
```

## 示例6
```JavaScript
function job(state) {
    return new Promise(function(Resolve, reject) {
        if (state) {
            resolve('success')
        } else {
            reject('error')
        }
    })
}

let promise = job(true)

promise.then(function(data) {
    console.log(data)
    return job(true)
}).then(function(data) {
    if (data !== 'victory') {
        throw 'Defeat'
    }
    return job(true)
}).then(function(data) {
    console.log(data)
}).catch(function(error) {
    console.log(error)
    return job(false)
}).then(function(data) {
    console.log(data)
    return job(true)
}).catch(function(error) {
    console.log(error)
    // catch也会返回一个新的promise对象
    return 'Error Caught'
}).then(function(data) {
    console.log(data)
    return new Error('test')
}).then(function(data) {
    console.log('Success:', data.message)
}).catch(function(data) {
    console.log('Error:', data.message)
})
```

输出：
```txt
success
Defeat
error
Error caught
Success: test
```

## 示例7
```JavaScript
function job(delay) {
    return new Promise(function(resolve) {
        setTimeout(function() {
            console.log('Resolving', delay)
            resolve('done ' + delay)
        }, delay)
    })
}

var promise = Promise.all([job(1000), job(2000), job(500), job(1500)])

promise.then(function(data) {
    console.log('All Done')
    data.forEach(function(text) {
        console.log(text)
    })
})
```

输出：
```txt
Resolving 500
Resolving 1000
Resolving 1500
Resolving 2000
All done
done 1000
done 2000
done 500
done 1500
```

## 示例8
```JavaScript
let p1 = new Promise(function(resolve, reject) {
    setTimeout(resolve, 500, 'p1')
})

let p2 = new Promise(function(resolve, reject) {
    setTimeout(resolve, 1000, 'p2')
})

let p3 = new Promise(function(resolve, reject) {
    setTimeout(resolve, 1200, 'p3')
})

let p4 = new Promise(function(resolve, reject) {
    setTimeout(reject, 300, 'p4')
})

let p5 = new Promise(function(resolve, reject) {
    setTimeout(resolve, 800, 'p5')
})

let promise = Promise.all([p1, p2, p3, p4, p5])

promise.then(function(data) {
    data.forEach(function(data) {
        console.log(data)
    })
}).catch(function(error) {
    console.log('error', error)
})
```

输出：
```txt
error p4
```

## 示例9
```JavaScript
let p1 = new Promise(function(resolve, reject) {
    setTimeout(resolve, 500, 'p1')
})

let p2 = new Promise(function(resolve, reject) {
    setTimeout(resolve, 1000, 'p2')
})

let p3 = new Promise(function(resolve, reject) {
    setTimeout(resolve, 1200, 'p3')
})

let p4 = new Promise(function(resolve, reject) {
    setTimeout(reject, 300, 'p4')
})

let p5 = new Promise(function(resolve, reject) {
    setTimeout(resolve, 800, 'p5')
})

let promise = Promise.all([
    p1.catch(function() {}),
    p2.catch(function() {}),
    p3.catch(function() {}),
    p4.catch(function() {}),
    p5.catch(function() {})
])
promise.then(function(data) {
    data.forEach(function(data) {
        console.log(data)
    })
}).catch(function(error) {
    console.error('error', error)
})
```

输出：
```txt
p1
p2
p3
undefined
p5
```

## 示例10
```JavaScript
function delay(time) {
    return new Promise(function(resolve) {
        setTimeout(resolve, time, 'success' + time)
    })
}

Promise.race([delay(500), delay(100)]).then(function(data) {
    console.log(data)
})
```

输出；
```txt
success 100
```

## 示例11
```JavaScript
const promise = new Promise(res => res(2))

promise.then(v => {
    console.log(v)
    return v * 2
}).then(v => {
    console.log(v)
    return v * 2
}).finally(v => {
    console.log(v)
    return v * 2
}).then(v => {
    console.log(v)
})
```

输出：
`finally` 处理程序没有参数，`promise` 的结果由下一个处理程序处理
```txt
2
4
undefined
8
```

## 示例12
```JavaScript
console.log('start')

const promise1 = new Promise((resolve, reject) => {
    console.log(1)
})

console.log('end')
```

输出：
```txt
start
1
end
```

## 示例13
```JavaScript
console.log('start')
const promise1 = new Promise((resolve, reject) => {
    console.log(1)
    resolve(2)
})

promise1.then(res => {
    console.log(res)
})

console.log('end')
```

输出：
```txt
start
1
end
2
```

## 示例14
```JavaScript
console.log('start')

const promise1 = new Promise((resolve, reject) => {
    console.log(1)
    resolve(2)
    console.log(3)
})

promise1.then(res => {
    console.log(res)
})

console.log('end')
```

输出：
```txt
start
1
3
end
2
```

## 示例15
```JavaScript
console.log('start')

const promise1 = new Promise((resolve, reject) => {
    console.log(1)
})

promise1.then(res => {
    console.log(2)
})

console.log('end')
```

输出：
```txt
start
1
end
```

`resolve`方法一直没被调用，所以`promise1`一直处于`pending`的状态。`promise1.then`没执行过。因此`2`不会在控制台打印

## 示例16
```JavaScript
console.log('start')

const fn = () => (new Promise((resolve, reject) => {
    console.log(1)
    resolve('success')
}))

console.log('middle')

fn().then(res => {
    console.log(res)
})

console.log('end')
```

输出：
```txt
start
middle
1
end
success
```

先执行同步代码，再执行异步代码。
同步代码按照调用它的顺序执行。

## 示例17
```JavaScript
console.log('start')

Promise.resolve(1).then((res) => {
    console.log(res)
})

Promise.resolve(2).then((res) => {
    console.log(res)
})

console.log('end')
```

输出：
```txt
start
end
1
2
```

## 示例18
```JavaScript
console.log('start')

setTimeout(() => {
    console.log('setTimeout')
})

Promise.resolve().then(() => {
    console.log('resolve')
})

console.log('end')
```

输出：
```txt
start 
end
resolve
setTimeoue
```
具有更高优先级的任务称为微任务。
包括：`Promise`、`ObjectObserver`、`MutationObserver`、`process.nextTick`、`async/await`。

具有较低优先级的任务称为宏任务。
包括：`setTimeout`、`setInterval` 和 `XHR`。

执行顺序：
* 同步任务
* 微任务 - `promise`
* 宏任务 - `setTimeout`

## 示例19
```JavaScript
const promise = new Promise((resolve, reject) => {
    console.log(1)
    setTimeout(() => {
        console.log('timerStart')
        resolve('success')
        console.log('timerEnd')
    }, 0)
    console.log(2)
})

promise.then((res) => {
    console.log(res)
})

console.log(4)
```

输出：
```txt
1
2
4
timeStart
timeEnd
success
```

## 示例20
```JavaScript
const timer1 = setTimeout(() => {
    console.log('timer1')
    const promise1 = Promise.resolve().then(() => {
        console.log('promise1')
    })
}, 0)

const timer2 = setTimeout(() => {
    console.log('timer2')
}, 0)
```

输出：
```txt
timer1
promise1
timer2
```

## 示例21
```JavaScript
console.log('start')

const promise1 = Promise.resolve().then(() => {
    console.log('promise1')
    const timer2 = setTimeout(() => {
        console.log('timer2')
    }, 0)
})

const timer1 = setTimeout(() => {
    console.log('timer1')
    const promise2 = Promise.resolve().then(() => {
        console.log('promise2')
    })
}, 0)

console.log('end')
```

输出：
```txt
start
end
promise1
timer1
promise2
timer2
```

## 示例22
```JavaScript
let p = new Promise(function(resolve) {
    console.log(1)
    resolve(2)
})

p.then(result => {
    console.log(result)
    return result + 1
})

p.then(result => console.log(result))
setTimeout(() => console.log(4))
console.log(5)
```

输出：
```txt
1 5 2 2 4
```

## 示例23
```JavaScript
Promise.resolve('JS').then().then(console.log)
```

输出：
```txt
JS
```

## 示例24
```JavaScript
console.log(1)
setTimeout(() => console.log(2), 0)
setTimeout(() => console.log(3), 1)
let p = Promise.resolve()
for (let i = 0; i < 3; i++) {
    p.then(() => {
        setTimeout(() => {
            console.log(4)
            setTimeout(() => console.log(5), 0)
            p.then(() => console.log(6))
        }, 0)
        console.log(7)
    })
}
console.log(8)
```

输出：
```txt
1 8 7 7 7 2 3 4 6 4 6 4 6 5 5 5
```

## 示例25
```JavaScript
function processing() {
    return new Promise((resolve, reject) => {
        resolve(1)
        reject('Failed')
        resolve(2)
        cnosole.log('After resolve/reject')
    })
}

function init() {
    processing().then((v) => console.log(v + 1))
                .catch((err) => console.log(err))
}

init()
```

输出：
```txt
After resolve/reject
2
```

## 示例26
```JavaScript
let p = new Promise(function (resolve) {
    resolve(1)
    console.log(2)
})

p.then(result => {
    console.log(result)
    return result + 1
})

p.then(result => console.log(result))
setTimeout(() => console.log(4))
console.log(5)
```

输出：
```txt
2 5 1 1 4
```
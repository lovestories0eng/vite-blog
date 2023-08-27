// const a = 1;

// let flag = 0;
// for (let index = 0; index < 10; index++) {
//     if (!flag) {
//         let index = 4;
//         flag = 1;
//     }
//     console.log(index);
//     // index = 'absd'
// }

// let promise = new Promise((resolve, reject) => {
//         console.log("a new promise start");
//             resolve("resolved")
//         console.log("a new promise end")
//     }); 
// console.log(promise.then(console.log))

// let p;
// (async function() {
//     p = await promise()
//     console.log(p)
// })()
// console.log(p)

// let promise = new Promise((resolve, reject) => {
//     console.log("a new promise start");
//     setTimeout(() => {
//         reject("error")
//         return new Promise((resolve, reject) => {})
//     }, 1000)
//     console.log("a new promise end")
// }); 
// let p;
// (async function() {
//     p = await promise.catch(console.log)
//     console.log(p)
// })()

// let promise = new Promise((resolve, reject) => {
//     console.log("a new promise start");
//         return 1;
//     console.log("a new promise end")
// }); 
// promise.then(console.log)

// 如何在外部终止promise
// 如何自己实现一个axios拦截器
// 洋葱模型，中间件如何实现


// let promise = () => new Promise((resolve, reject) => {
//     console.log("a new promise start");
//     setTimeout(() => {
//         reject("error")
//     }, 1000)
//     console.log("a new promise end")
// }); 
// let p;
// (async function() {
//     p = await promise()
//     console.log(p)
// })()

// let promise = () => new Promise((resolve, reject) => {
//     console.log("a new promise start");
//     setTimeout(() => {
//         reject("error")
//     }, 1000)
//     console.log("a new promise end")
// }).catch(console.log); 
// let p;
// (async function() {
//     p = await promise()
//     console.log(p)
// })()

// let promise = new Promise((resolve, reject) => {
//     console.log("a new promise start");
//     setTimeout(() => {
//         return 10;
//         reject("error")
        
//     }, 1000)
//     console.log("a new promise end")
// }); 
// console.log(promise.then(console.log))
// console.log(promise)

// let promise = () => new Promise((resolve, reject) => {
//     console.log("a new promise start");
//     setTimeout(() => {
//         resolve("resolved")
//     }, 1000)
//     console.log("a new promise end")
// }).catch(console.log); 
// let p;
// (async function() {
//     p = await promise()
//     console.log(p)
// })()

let promise = () => new Promise((resolve, reject) => {
    console.log("a new promise start");
    setTimeout(() => {
        resolve("resolved")
    }, 1000)
    console.log("a new promise end")
}).then(res => res); 
let p;
(async function() {
    p = await promise()
    console.log(p)
})()
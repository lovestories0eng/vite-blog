function fn() {
    return new Promise((resolve, reject) => {
        let rd = Math.random()
        if (rd < 0.5) {
            setTimeout(() => {
                console.log("inner success")
                resolve("success")
            }, 5000 * Math.random())
        } else {
            setTimeout(() => {
                console.log("inner error")
                reject("fail")
            }, 5000 * Math.random())
        }
    })
}


// function asyncFn(fn, retryTimes, timeout = 2500) {
//     let p1, p2;
//     let rejectPromise = () => new Promise((resolve, reject) => {
//         p1 = resolve
//         p2 = reject
//         setTimeout(() => {
//             console.log("timeout")
//             reject("timeout error")
//         }, timeout)
//     })

//     function retry(t) {
//         console.log("正在执行第" + t + "次请求")
//         return Promise.race([fn(), rejectPromise()])
//             .then((res) => {
//                 console.log(res)
//                 p1("complete")
//                 return res
//             })
//             .catch((e) => {
//                 console.log("第" + t + "次请求失败。" + "错误:" + e)
//                 if (t == retryTimes)  {
//                     p1("complete")
//                     console.log("超过限定重连次数")
//                     return e
//                 }
//                 retry(t + 1)
//             })
//     }
//     return retry(1)
// }

// asyncFn(fn, 5, 2500000)

function asyncFn(fn, retryTimes, timeout = 2500) {
    let rejectPromise = function() {
        let _resolve;
        let promise = new Promise((resolve, reject) => {
            _resolve = resolve;
            setTimeout(() => {
                console.log("timeout")
                reject("timeout error")
            }, timeout)
        })
        return {
            promise,
            _resolve
        }
    } 

    function retry(t) {
        console.log("正在执行第" + t + "次请求")
        
        let { promise, _resolve } = rejectPromise()
        return Promise.race([fn(), promise])
            .then((res) => {
                console.log(res)
                _resolve("竞速失败或者另一请求执行成功")
                console.log(promise)
                return res
            })
            .catch((e) => {
                console.log("第" + t + "次请求失败。" + "错误:" + e)
                if (t == retryTimes)  {
                    console.log("超过限定重连次数")
                    _resolve("竞速失败或者另一请求执行成功")
                    console.log(promise)
                    return e
                }
                retry(t + 1)
            })
    }
    return retry(1)
}

asyncFn(fn, 5, 2500)

// function asyncFn(fn, retryTimes, timeout = 2500) {
//     let rejectPromise = function() {
//         return new Promise((resolve, reject) => {
//             _resolve = resolve;
//             setTimeout(() => {
//                 console.log("timeout")
//                 reject("timeout error")
//             }, timeout)
//         })
//     } 

//     function retry(t) {
//         console.log("正在执行第" + t + "次请求")
//         return Promise.race([fn(), rejectPromise()])
//             .then((res) => {
//                 console.log(res)
//                 return res
//             })
//             .catch((e) => {
//                 console.log("第" + t + "次请求失败。" + "错误:" + e)
//                 if (t == retryTimes)  {
//                     console.log("超过限定重连次数")
//                     return e
//                 }
//                 retry(t + 1)
//             })
//     }
//     return retry(1)
// }

// asyncFn(fn, 5, 2500)
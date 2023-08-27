// function change() {
//     // let tmp = person;
//     person.a = 2
//     console.log(person)
//     // 为什么这里可以让person指向一个新的对象呢？person对象明明是一个const常量
//     person = { a: 4 }
//     console.log(person)
//     // console.log(tmp == person)
// }

// const person = { a: 3 }
// change(person)
// console.log(person)

async function add(...arr) {
    let tmpArr = Array.from(arr)
    return new Promise(resolve => setTimeout(() => resolve(tmpArr.reduce((a, b) => a + b)), 200))
}

add(1, 2, 3).then(console.log)
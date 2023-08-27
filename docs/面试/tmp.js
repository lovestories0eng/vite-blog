const formatMobile = (mobile) => {
    return String(mobile).slice(0, 11)
        // match：匹配到的结果
        // key：分组内容，这里指的是索引
        // key1：原来的字符串
        .replace(/(?<=\d{3})\d+/, (match, key, key1) => {
            console.log('-' + match, key, key1)
            return '-' + match
        })
        .replace(/(?<=[\d-]{8})\d{1,4}/, (match, key, key1) => {
            console.log('-' + match, key, key1)
            return '-' + match
        })
}

// console.log(formatMobile(123)) // 123
// console.log(formatMobile(1234)) // 123-4
// console.log(formatMobile(12345)) // 123-45
// console.log(formatMobile(123456)) // 123-456
// console.log(formatMobile(1234567)) // 123-4567
// console.log(formatMobile(12345678)) // 123-4567-8
// console.log(formatMobile(123456789)) // 123-4567-89
console.log(formatMobile('12345678911')) // 123-4567-8911
console.log(formatMobile('19357523498')) // 193-5752-3498

// let context = {
//     name: "Alice",
//     age: 18
// }

// let str = "Her name is {{ name }} and her age is {{ age }}"

// function templateReplace(str, context) {
//     return str.replace(/{{\s(\w+)\s}}/g, (match, key) => {
//         console.log(match, key)
//         let value = context[key.trim()]
//         return value ? value : ''
//     })
// }

// function templateReplace(str, context) {
//     return str.replace(/{{\s(\w+)\s}}/g, ($0, $1) => {
//         console.log($0, $1)
//         let value = context[$1.trim()]
//         return value ? value : ''
//     })
// }

// console.log(templateReplace(str, context))

// console.log(str.match(/{{\s(\w+)\s}}/g))

// 'base-act-tab'.replace(/(?:^|-)(\w)/g, ($0, $1) => {
//     console.log($0)
//     console.log($1)
//     return $1.toUpperCase()
// }) // BaseActTab

// my name is epeli

// const titleize = (str) => {
//     return str.toLowerCase().replace(/(?:^|\s)\w/g, (c) => {
//         console.log(c)
//         return c.toUpperCase()
//     })
// }

// console.log(titleize('my name is epeli')) // My Name Is Epeli
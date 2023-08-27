# JS面试常问题---1
`JavaScript` 最好的部分总是让我感到惊讶，那就是它周围总是有新的东西发生。 无论您对它了解多少，您总能从中学到新的东西。

这些问题我收集了很长时间。 在大多数问题中，我真的不知道输出是什么，直到我自己尝试了它们。

所以我在这里记录它们，以便其他人可以利用它来学习新概念：

```JavaScript
const person = { name: "Lydia" }

Object.defineProperty(person, "age", { value: 21 })

console.log(person.age)
console.log(Object.keys(person))
```

输出：
```txt
21
{name: “Lydia”} // age won’t be included. Because property defined with defineProperty are non enumerable by default.
```

```JavaScript
const name = "Noren Red"
age = 21
console.log(delete name)
console.log(delete age)
console.log(typeof age)
```

输出：
```txt
false // delete operator only deletes a key in object
true // when we don't use any declaration before any variable, it will be treated as a global variable, and will be added as deletable entity in window object.
undefined
```

```JavaScript
let person = { name: "Noren Red" }
const members = [person]
person = null
console.log(members)
```
```txt
[ { name: "Noren Red"} ] 
Initially I thought it will log [ null ] because we have initialised person with null
But in reality, we are only setting new reference to person variable. Previous reference will be used in members array
In Short, { name: "Noren Red"} lives in some memory space whose address is X201
and this is how referencing is working
let person = X201
const members = [ X201 ]
person = null
```

```JavaScript
function SuperHero() {
    this.make = "Galactus"
    return { make: "Sliver Surfer" }
}

const mySuperhero = new SuperHero()
console.log(mySuperhero.make)
```

输出：
```txt
Silver Surfer 
Because when we return a property, the value of the property is equal to the returned value, not the value set in the constructor function.
```

```JavaScript
const name = "Sliver surfer"
console.log(name.padStart(14))
console.log(name.padStart(2))
```

输出：
```txt
With the padStart method, we can add padding to the beginning of a string.
 
The value passed to this method is the total length of the string together with the padding. 
The string "Silver Surfer" has a length of 13. 
name.padStart(14) inserts 1 space at the start of the string, because 13 + 1 is 13. 
If the argument passed to the padStart method is smaller than the length of the array, no padding will be added.
```

```JavaScript
console.log(parseInt("7"))
console.log(parseInt("7*6"))
console.log(parseInt("7Din"))
```

输出：
```txt
7
7
7
If we pass string and number combination to parseInt, what parseInt does is, it check at which position wrong datatype is getting started, if value before the wrong datatype is a valid number, it will return the valid number.
```

```JavaScript
[1, 2, 3, 4].reduce((x, y) => console.log(x, y))
[1, 2, 3, 4].reduce((x, y) => { console.log(x, y); return x + y; })
```

输出：
```txt
1 2 and undefined 3 and undefined 4 
1 2 and 3 3 and 6 4 

If we don't pass initial value, then by default x will be first value of array, and y will be second value of array.
```

```JavaScript
function getPersonInfo(one, two, three) {
    console.log(one)
    console.log(two)
    console.log(three)
}

const superHero = "Thor"
const age = 1000

getPersonInfo`${superHero} is ${age} years old`
getPersonInfo`hey there, are you amazed`
```
输出：
```txt
one - ["", " is ", " years old"]
two - Thor
three - 1000
one - ["hey there, are you amazed"]
two - undefined
three - undefined
If we use tagged template literals, the value of the first argument is always an array of the string values.
The remaining arguments get the values of the passed expressions!
```

```JavaScript
(() => {
    let x, y
    try {
        throw new Error()
    } catch (x) {
        (x = 1), (y = 2)
        console.log(x)
    }
    console.log(x)
    console.log(y)
})
```
输出：
```txt
1
undefined
2
```

```JavaScript
class Cosmic {

}

console.log(typeof Cosmic)
```

输出：
```txt
function // Classes in JS are functions under the hood
```
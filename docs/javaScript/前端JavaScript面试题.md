# 前端JavaScript面试题

将这些脚本按加载时间顺序排列：
```JavaScript
A. <script async src="app1.js" /> 300
B. <script defer src="app2.js" /> 200
C. <script defer src="app3.js" /> 300
D. <script async src="app4.js" /> 50
E. <script async defer src="app5.js" /> 60
```

结果：
```JavaScript
D. <script async src="app4.js" /> 50
E. <script async defer src="app5.js" /> 60
A. <script async src="app1.js" /> 300
B. <script defer src="app2.js" /> 200
C. <script defer src="app3.js" /> 300
```

每当 HTML 解析器发现`script`标签时，它就会停止解析并下载脚本，运行它，然后继续解析 `HTML`。

如果看到 `async` ，`HTML` 解析器继续解析并在后台下载 `javascript`，一旦 `JS` 下载完毕，解析将停止并在主线程中执行 `JS`，执行后 HTML 解析器将继续执行。

如果看到 `defer` 属性，`HTML` 解析器继续执行并同步下载 JS。 defer 确保下载的顺序。在 `HTML`解析完毕之后按顺序执行`script`里面的内容

如果我们同时使用 `defer` 和 `async` 那么优先级将给予 `async` 。

这段代码行得通吗？
请注意，我们已经使用 `defer` 来加载脚本。
```JavaScript
<html>
    <head>
        <script defer type="text/javascript">
             document.getElementById("root").innerText = "Hello";
        </script>
     </head>
    <body>
        <div id="root"/>
    </body>
</html>
```

这会抛出错误，因为 `defer` 和 `async` 只适用于外部文件。 为了完成这项工作，我们必须使用 `document.ready` 方法或将脚本移动到底部。

```JavaScript
setTimeout(()=> console.log("A));

Promise.resolve().then(()=> console.log("B"));

Promise.resolve().then(()=> setTimeout(()=> console.log("C")));

new Promise(()=> console.log("D"));

setTimeout(()=> console.log("E"));
```

答案 ：
```JavaScript
D
B
A
E
C
```

```JavaScript
const dataMap = new WeakMap();
const person = {name: 'Ram'};

dataMap.set(person, "God");

Statement A: Setting person to null, dataMap returns 0
Statement B: if person object is set to null, its dataMap entry can
             be garbage collected.
Statement C: [...dataMap] returns array of dataMap entries
```

Statement B 是正确的。weekMap是不可迭代的。

让控制台打印`2`，哪个`promise`方法可以做到

```JavaScript
const promises = [
  new Promise((res) => setTimeout(()=> res(1), 200)),
  new Promise((res) => setTimeout(()=> res(2), 100)),
  new Promise((_, rej) => setTimeout(()=> rej(3), 100)),
  new Promise((res) => setTimeout(()=> res(4), 300)),
];

// we want to get 2 in console, out of all, race, any, allSettled which method
// should we use
```

Promise.race or Promise.any

控制台会打印什么？
```JavaScript
setTimeout(() => console.log(1), 0);

(async () => {
  console.log("2");
  await Promise.resolve();
  console.log("3");
})();

console.log("4");

Promise.resolve().then(() => Promise.resolve().then(() => console.log("5")));
```

```txt
2
4
3
5
1
```

这里要注意的关键是，在 await 关键字之后的代码，都不会直接运行，而是会被推送到微任务队列。
这就是我们在 3 之前得到 4 的原因。

控制台会打印什么？
```JavaScript
const personA = {
  name: "Ram",
  showName() {
    console.log(this.name);
  },
};

const personB = {
  name: "Laxman",
  showName: personA.showName,
  showBrotherName: () => personA.showName(),
  directlyShowBroName() {
    personA.showName();
  },
};

personB.showName();
personB.showBrotherName();
personB.directlyShowBroName();
```

```txt
Laxman
Ram
Ram
```

`font-display: swap`与`font-display: block`的区别

`font-display:block` 暂时呈现一个不可见的字体，直到自定义字体下载完毕。

`font-display:swap` 呈现后备字体，同时正在下载自定义字体，当自定义字体下载完毕进行替换。

使用CSS选择器使得给定行的颜色变成红色
```html
<div>
    <ul>
        <li>One</li> <!-- Make background color red, no classes or ids-->
        <ul>
            <li>Two</li>
            <li>Three</li>
        </ul>
    </ul>
    <ul>
        <li>Four</li>
    </ul>
</div>
```

答案：
```css
div ul:first-child > li {
  background-color: red;
}
```
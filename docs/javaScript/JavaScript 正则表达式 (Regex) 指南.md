# JavaScript 正则表达式 (Regex) 指南

当您第一次遇到正则表达式时，它们可能看起来像是一串乱码。 虽然它们可能看起来很笨拙并且语法有些混乱，但它们也非常有用。

>JAVASCRIPT REGULAR EXPRESSIONS (REGEX) DEFINED
Regular expressions (Regex) are a way of describing patterns in a string of data, which allows you to search for data strings, like email addresses or passwords, that match that pattern. They’re an important part of programming languages like JavaScript, Python, Php and Java, among others. 

事实上，正确理解正则表达式会让你成为一个更高效的程序员。 为了完全理解正则表达式，您首先需要学习基本概念，您以后可以在此基础上构建。 让我们开始吧。

## 什么是正则表达式
正则表达式是一种描述数据字符串中的模式的方法。 它们形成了自己的小型语言，是许多编程语言（如 JavaScript、Perl、Python、PHP 和 Java）的一部分。

正则表达式允许您检查一串字符（如电子邮件地址或密码）的模式，以查看它们是否与该正则表达式定义的模式匹配并生成可操作的信息。

## 在`JavaScript`中如何创建正则比表达式
有两种方法可以在 `JavaScript` 中创建正则表达式。 它可以使用 `RegExp` 构造函数创建，也可以使用正斜杠 (`/`) 将模式括起来。

### 正则表达式构造器
语法：`new RegExp(pattern[, flags])`
示例：
```JavaScript
var regexConst = new RegExp('abc');
```

### regex literal
语法：`/pattern/flags`
示例：
```JavaScript
var regexLiteral = /abc/;
```

在这里，标志是可选的。 我将在本文后面解释这些。

在某些情况下，您可能希望动态创建正则表达式，在这种情况下，`regex literal` 将不起作用。 因此，您必须使用正则表达式构造函数。

无论您选择哪种方法，结果都将是一个正则表达式对象。 两个正则表达式对象都将具有相同的方法和属性。

由于在上面的示例中使用正斜杠来括起模式，如果要将正斜杠 (`/`) 用作正则表达式的一部分，则必须使用反斜杠 (`\`) 对正斜杠 (`/`) 进行转义。

## 正则表达式方法

### REGEXP.PROTOTYPE.TEST()
此方法用于测试是否找到匹配项。 它接受一个字符串，我们必须根据正则表达式对其进行测试，并根据是否找到匹配项返回 `true` 或 `false`。

示例：
```JavaScript
var regex = /hello/;
var str = 'hello world';
var result = regex.test(str);
console.log(result);
// returns true
```

### REGEXP.PROTOTYPE.EXEC()
此方法返回一个包含所有匹配组的数组。 它接受一个字符串，我们必须根据正则表达式对其进行测试。

示例：
```JavaScript
var regex = /hello/;
var str = 'hello world';
var result = regex.exec(str);
console.log(result);
// returns [ 'hello', index: 0, input: 'hello world', groups: undefined ]
// 'hello' -> is the matched pattern.
// index: -> Is where the regular expression starts.
// input: -> Is the actual string passed.
```

## 简单的 JavaScript 正则匹配
这是最基本的模式，它只是将文字文本与测试字符串进行匹配。
示例：
```JavaScript
var regex = /hello/;
console.log(regex.test('hello world'));
// true
```

### JavaScript 正则表达式 (Regex) 需要了解的特殊字符
到目前为止，我们已经创建了简单的正则表达式模式。 现在，让我们在处理更复杂的情况时利用正则表达式的全部功能。

例如，假设我们想要匹配多个电子邮件地址，而不是匹配特定的电子邮件地址。 这就是特殊角色发挥作用的地方。 为了完全理解正则表达式，您必须记住一些特殊的符号和字符。

### FLAGS
正则表达式有五个可选的标志或修饰符。 让我们讨论两个最重要的标志：

>g: Global search, don’t return after the first match.
>i: Case-insensitive search

您还可以将这些标志组合在一个正则表达式中。 他们的顺序对结果没有任何影响。

### 正则表达式构造函数
语法：new RegExp('pattern', 'flags')
```JavaScript
var regexGlobal = new RegExp('abc','g')
console.log(regexGlobal.test('abc abc'));
// it will match all the occurence of 'abc', so it won't return // after first match.
var regexInsensitive = new RegExp('abc','i')
console.log(regexInsensitive.test('Abc'));
// returns true, because the case of string characters don't matter // in case-insensitive search.
```

### regex literal
语法：`/pattern/flags`
```JavaScript
var regexGlobal = /abc/g;
console.log(regexGlobal.test('abc abc'));
// it will match all the occurence of 'abc', so it won't return 
// after first match.
var regexInsensitive = /abc/i;
console.log(regexInsensitive.test('Abc'));
// returns true, because the case of string characters don't matter 
// in case-insensitive search.
```

## 字符组
下面是一些需要了解的常见正则表达式字符组。
### 字符集[xyz] 
字符集是一种在单个位置匹配不同字符的方法，它从括号内的字符匹配字符串中的任何单个字符。 例如：
```JavaScript
var regex = /[bt]ear/;
console.log(regex.test('tear'));
// returns true
console.log(regex.test('bear'));
// return true
console.log(regex.test('fear'));
// return false
```

除了脱字符号 (`^`) 在字符集中具有完全不同的含义之外的所有特殊字符在字符集中都失去了它们的特殊含义。

### 否定字符集 [^xyz]
这匹配任何未包含在括号中的内容。 例如：
```JavaScript
var regex = /[^bt]ear/;
console.log(regex.test('tear'));
// returns false
console.log(regex.test('bear'));
// return false
console.log(regex.test('fear'));
// return true
```

### Ranges [a-z]
如果我们想在一个位置匹配字母表中的所有字母，我们可以将所有字母写在括号内。 但是有一种更简单的方法，那就是范围。 例如，[a-h] 将匹配从 a 到 h 的所有字母。 范围也可以是数字，如 [0-9] 或大写字母，如 [A-Z]。

```JavaScript
var regex = /[a-z]ear/;
console.log(regex.test('fear'));
// returns true
console.log(regex.test('tear'));
// returns true
```

### Meta-Characters 
元字符是具有特殊含义的字符。 有很多元字符，但我将在这里介绍最重要的字符。

>* \d：匹配任何数字字符（与 [0-9] 相同）。
>* \w：匹配任意单词字符。 单词字符是任何字母、数字和下划线。 这与 [a-zA-Z0–9_] 相同，即字母数字字符。
>* \s：匹配空白字符（空格、制表符等）。
>* \t：只匹配制表符。
>* \b：查找单词开头或结尾的匹配项。 也称为单词边界。
>* . （句点）：匹配除换行符之外的任何字符。
>* \D：匹配任何非数字字符。 这与 [^0–9] 相同。
>* \W：匹配任何非单词字符。 这与 [^a-zA-Z0–9_] 相同。
>* \S：匹配一个非空白字符。

### 量词
量词是在正则表达式中具有特殊含义的符号。
>* +：匹配前面的表达式一次或多次。
```JavaScript
var regex = /\d+/;
console.log(regex.test('8'));
// true
console.log(regex.test('88899'));
// true
console.log(regex.test('8888845'));
// true
```

>* *：匹配前面的表达式零次或多次。
```JavaScript
var regex = /go*d/;
console.log(regex.test('gd'));
// true
console.log(regex.test('god'));
// true
console.log(regex.test('good'));
// true
console.log(regex.test('goood'));
// true
```

>* ?：匹配前面的表达式零次或一次，即前面的模式是可选的。
```JavaScript
var regex = /goo?d/;
console.log(regex.test('god'));
// true
console.log(regex.test('good'));
// true
console.log(regex.test('goood'));
// false
```

>* ^：匹配字符串的开头，它后面的正则表达式应该在测试字符串的开头，即插入符（\^）匹配字符串的开头。
```JavaScript
var regex = /^g/;
console.log(regex.test('good'));
// true
console.log(regex.test('bad'));
// false
console.log(regex.test('tag'));
// false
```

>* $：匹配字符串的结尾。 也就是说，它前面的正则表达式应该在测试字符串的末尾。 美元 (\$) 符号匹配字符串的末尾。
```JavaScript
var regex = /.com$/;
console.log(regex.test('test@testmail.com'));
// true
console.log(regex.test('test@testmail'));
// false
```
>* {N}：恰好匹配 N 次前面的正则表达式。
```JavaScript
var regex = /go{2}d/;
console.log(regex.test('good'));
// true
console.log(regex.test('god'));
// false
```

>* {N,}：匹配前面正则表达式至少出现 N 次。
```JavaScript
var regex = /go{2,}d/;
console.log(regex.test('god'));
// false
console.log(regex.test('good'));
// true
console.log(regex.test('goood'));
// true
console.log(regex.test('gooood'));
// true
```

>* {N,M}：匹配前面的正则表达式至少出现 N 次，最多出现 M 次，其中 M > N。
```JavaScript
var regex = /go{1,2}d/;
console.log(regex.test('god'));
// true
console.log(regex.test('good'));
// true
console.log(regex.test('goood'));
// false
```

>* Alternation X|Y：匹配 X 或 Y。例如：
```JavaScript
var regex = /(green|red) apple/;
console.log(regex.test('green apple'));
// true
console.log(regex.test('red apple'));
// true
console.log(regex.test('blue apple'));
// false
```
如果您想使用任何特殊字符作为表达式的一部分，例如您想要匹配文字 + 或 .，那么您必须使用反斜杠 (\\) 对它们进行转义。
示例：
```JavaScript
var regex = /a+b/;  // This won't work
var regex = /a\+b/; // This will work
console.log(regex.test('a+b')); // true
```

## 高级元字符
`(X)`：匹配 x 并记住匹配。 这些称为捕获组。 这也用于在正则表达式中创建子表达式。 
例如 ：
```JavaScript
var regex = /(foo)bar\1/;
console.log(regex.test('foobarfoo'));
// true
console.log(regex.test('foobar'));
// false
```
`\1`: 记住并使用括号内第一个子表达式的匹配项。

`(?:x)`：匹配 `x` 并且不记得匹配。 这些称为非捕获组。 这里 `\1` 不起作用，它将匹配文字 `\1`。

```JavaScript
var regex = /(?:foo)bar\1/;
console.log(regex.test('foobarfoo'));
// false
console.log(regex.test('foobar'));
// false
console.log(regex.test('foobar\1'));
// true
```

`x(?=y)`：仅当 x 后跟 y 时才匹配 x。 例如：
```JavaScript
var regex = /Red(?=Apple)/;
console.log(regex.test('RedApple'));
// true
```

在上面的示例中，只有当 Red 后面跟着 Apple 时才会发生匹配。

## 练习JavaScript正则表达式
让我们练习上面学到的一些概念。

对于第一个问题，让我们匹配任何 10 位数字：
```JavaScript
var regex = /^\d{10}$/;
console.log(regex.test('9995484545'));
// true
```

让我们分解一下，看看发生了什么。
>* 如果我们想强制匹配必须跨越整个字符串，我们可以添加量词 \^ 和 \$。 插入符号 \^ 匹配输入字符串的开头，而美元符号 \$ 匹配结尾。 因此，如果字符串包含超过 10 个数字，它将不匹配。
>* \d 匹配任何数字字符。
>* {10} 匹配前面的表达式。 在这种情况下，\d 正好是 10 次。 因此，如果测试字符串包含少于或多于 10 位数字，则结果将为假。

现在，让我们用以下格式匹配日期 `DD-MM-YYYY` 或 `DD-MM-YY`

```JavaScript
var regex = /^(\d{1,2}-){2}\d{2}(\d{2})?$/;
console.log(regex.test('01-01-1990'));
// true
console.log(regex.test('01-01-90'));
// true
console.log(regex.test('01-01-190'));
// false
```

让我们分解一下，看看发生了什么。

>* 同样，我们将整个正则表达式包裹在 ^ 和 $ 中，以便匹配跨越整个字符串。
>* ( 第一个子表达式的开始。
>* \d{1,2} 至少匹配一位数字，最多匹配两位数字。
>* \- 匹配文字连字符。
>* ) 第一个子表达式的结尾。
>* {2} 恰好匹配第一个子表达式两次。
>* \d{2} 恰好匹配两位数字。
>* (\d{2})? 恰好匹配两位数字。 但它是可选的，因此年份包含两位数或四位数字。

对于我们的第三个挑战，让我们匹配除换行符之外的任何内容。
表达式应匹配任何格式如 `abc.def.ghi.jkl` 的字符串，其中每个变量 `a`、`b`、`c`、`d`、`e`、`f`、`g`、`h`、`i`、`j`、`k`、`l` 可以是除 换行符 之外的任何字符。

```JavaScript
var regex = /^(.{3}\.){3}.{3}$/;
console.log(regex.test('123.456.abc.def'));
// true
console.log(regex.test('1243.446.abc.def'));
// false
console.log(regex.test('abc.def.ghi.jkl'));
// true
```

让我们分解一下，看看上面发生了什么。

>* 我们已将整个正则表达式包裹在 \^ 和 \$ 中，以便匹配跨越整个字符串。
>* ( 第一个子表达式的开始。
>* .{3} 匹配除换行符以外的任何字符恰好三次。
>* \. 匹配文字 `.` 字符。
>* ) 第一个子表达式的结尾。
>* {3} 匹配第一个子表达式恰好三次。
>* .{3} 匹配除新行之外的任何字符恰好三次。


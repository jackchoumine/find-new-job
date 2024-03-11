# 面试中遇到的问题

## JS

1. 实现原型继承？它和 ES6 有何异同？

2. 考察常见数组方法的使用
多去熟悉数组方法就好。

相关题目：以下代码输出什么？
```js
['1','2','3'].map(parseInt) 
```
答案：`[1,NaN,NaN]`。
分析：map 的回调函数：`callback(item,index,arr,thisArr)`,第一个是当前元素，第二是当前元素的下标，第三个是遍历的数组，第四个是会调函数的this。1 传入时，`parseInt("1", 0)` 解析为 1 ,传入`parseInt("2", 1);`，解析为 NaN，传入 3 时，`parseInt("3", 2)`，解析为NaN。
```js
['1','2','3'].map((item,index)=>parseInt(item,index))
```
要想得到正确的结果，如何改进？
```js
['1','2','3'].map(item => parseInt(item,10))
['1','2','3'].map(Number)
```
举一反三：
输出什么？
```js
['10','10','10'].map(parseInt) //10 NaN 2
```
3. 防抖和节流的区别？

4. 如何判断一个变量是否为数组？

① `Array.isArray(value)`

② `Object.prototype.toString.call(vall).slice(8,-1) === 'Array'`

③ `typeof value === 'object' && value instanceof Array`

5. 浅拷贝和深拷贝

浅拷贝：基本类型变量存放在`栈内存`，拷贝前后互不影响，引用类型变量存放在`堆内存`，拷贝前后两个变量指向相同内存，会相互影响。
深拷贝：能实现引用类型的变量拷贝后的各自指向独立的内存的拷贝叫深拷贝，这才是开发中常见的常见。

`Object.assign`、`...`、`=` 是深拷贝吗？
```js
let a = {
    name: "muyiy",
    book: {
        title: "You Don't Know JS",
        price: "45"
    }
}
let b = Object.assign({}, a)
console.log(a)
console.log(b)
console.log(a === b) // false
// ... 操作前后，两个变量指向不同的地址。
a.name = 'dog'
console.log(a)
console.log(b) // b 没有变化
a.book.price = 40
console.log(a)
console.log(b) // b 改变
// ... 只能实现属性为基本类型的深拷贝，当前属性有引用类型值时，会相互影响。
```
> `=` 完全是浅拷贝，`assign`、`...` 能实现基本类型属性的深拷贝，嵌套引用不能实现深拷贝。

> 数组方法 `slice`、`contact` 也是浅拷贝。

如何实现深拷贝：

- JSON.parse(JSON.stringify(object))

缺点：

忽略值的`undefined`、`symbole`类型的属性和`symbol` 属性以及函数；

不能处理正则、时间`对象`、set等类型的属性；

循环引用报错。

为何有这些缺点？因为 `JSON.parse`、`JSON.stringify` 只能处理符合 JSON 规范的数据。

JSON 格式要求：

1. 引用类型的值只能是数组或对象，不能是函数、正则表达式对象、日期对象;
2. 简单类型的值只有四种：字符串、数值（必须以十进制表示）、布尔值和 null（不能使用 NaN, Infinity, -Infinity 和 undefined);
3. 字符串必须有双引号，属性双引号；
4. 数组和对象不能用末尾逗号。

> 当不存在以上缺点时使用其实现深拷贝，很多场景下可以满足。

实现深拷贝：

```js
let smybolKey = Symbol('symbolKey')
let a = {
    name: "jackchou",
    [smybolKey]: 'symbolKey',
    symbolKey: Symbol('symbolKey'),
    unValue: undefined,
    test() { },
    newDate: new Date(),
    newDate1: +new Date(),
    regexp: new RegExp('test'),
    regexp1: /test/,
    set: new Set([1, 2]),
    objKey: {
        age: 24
    }
}
```
先实现一个浅拷贝：
```js
function shallowClone(source) {
    var target = {};
    for(var i in source) {
        if (source.hasOwnProperty(i)) {
            target[i] = source[i];
        }
    }
    return target;
}
let b = shallowClone(a)
console.log(a === b)
a.objKey.age = 25
console.log(b) // b 改变 
```
> 最简单的深拷贝：浅拷贝 + 递归
```js
function clone(source) {
    var target = {};
    for(var i in source) {
        if (source.hasOwnProperty(i)) { // 值拷贝对象自有的属性
            if (typeof source[i] === 'object') {
                target[i] = clone(source[i]); // 注意这里
            } else {
                target[i] = source[i];
            }
        }
    }
    return target;
}
```
缺陷：不能处理循环引用；不兼容数组、set等

> MessageChannel 实现数据传递，浏览器兼容性好。缺点：不能处理函数和 symbol类型值、node 不不支持。

```js
let smybolKey = Symbol('symbolKey')
let obj = {
    a: 1,
    b: {
        c: 2,
        d: 3,
    },
    name: "jackchou",
    [smybolKey]: 'symbolKey',
    // symbolKey: Symbol('symbolKey'),// NOTE 不能处理 symbol
    unValue: undefined,
    // test() { }, // NOTE 不能处理函数
    newDate: new Date(),
    newDate1: +new Date(),
    regexp: new RegExp('test'),
    regexp1: /test/,
    set: new Set([1, 2]),
    objKey: {
        age: 24
    }
}
obj.c = obj.b;
obj.e = obj.a
obj.b.c = obj.c
obj.b.d = obj.b
obj.b.e = obj.b.c

function messageDeepClone(source) {
    return new Promise(resolve => {
        // NOTE messageChannel 是异步，事件是异步的宏任务
        // 新建一个消息通道，port1 和 port2 和一个 MessagePort 对象，其原型上有
        /*
        close: ƒ close()
        onmessage:
        onmessageerror:
        postMessage: ƒ postMessage()
        start: ƒ start()
        */
        const { port1, port2 } = new MessageChannel()
        port1.onmessage = event => resolve(event.data) // 从 data 属性中获取数据
        port2.postMessage(source) // 给 port1 发送信息，会触发 message 事件
    })
}
messageDeepClone(obj)
    .then(c => {
        console.log(obj === c)
        obj.objKey.age = 26
        console.log(c) // c 没有改变
    }).catch(e => {
        console.log(e)
    })
```

## ES6 

0. 全局声明的 let 去哪儿了？
没有弄明白。
```js
var a = 'a'
let b = 'b'
console.log(window.a) // a
console.log(window.b) // undefined
```
1. ES5 和 ES6 定义对象有何不同？

① class 会提升，但不会初始化，类似 let const。
```js
const bar = new Bar()
function Bar() {
    this.age = 24
}
const foo = new Foo() // 引用错误 Uncaught ReferenceError: Cannot access 'Foo' before initialization
class Foo {
    constructor () {
        this.age = 24
    }
}
```

② class 的所有方法（静态方法和实例方法）不可枚举。设置成不可枚举什么好处？
```js
function Bar() {
    this.age = 24
    // 实例方法
    this.run = function () {
        console.log('run')
    }
}
const bar = new Bar()

// 静态方法
Bar.speak = function () {
    console.log('helo')
}
// 原型方法
Bar.prototype.eat = function () {
    console.log('eat')
}
console.log(bar)
console.log(bar.run())
console.log(Object.keys(Bar)) // ['speak']
console.log(Object.keys(Bar.prototype)) // ['eat']

class Foo {
    constructor () {
        this.age = 24
    }
    // 静态方法
    static speak() {
        console.log('hello')
    }
    // 实例方法
    eat() {
        console.log('eat')
    }
}
const foo = new Foo()
console.log(foo)
console.log(foo.eat())
console.log(Foo.speak())
console.log(Object.keys(foo)) // ['age']
console.log(Object.keys(Foo)) // []
console.log(Object.keys(Foo.prototype)) // []
```

③ class 所有方法没有原型`prototype`，故没有`[[construct]]`，不能用 `new` 调用。
```js
const barEat = new bar.eat() // ok
const fooEat = new foo.eat() // Uncaught TypeError: foo.eat is not a constructor
```
④ class 必须使用 new 调用。

⑤ class 内部启动严格模式。
## HTML

1. 页面引入样式时，`link` 和 `@import` 有什么不同？

| link                                                         | @import                                                      | 备注 |
| ------------------------------------------------------------ | ------------------------------------------------------------ | ---- |
| html 标签，只能在head中                                      | CSS 语法，只在style和css 文件顶部使用                        |      |
| 当一个页面被加载的时候，引用的 CSS 会同时被加载.             | 等页面下载完成再加载，页面可能闪烁                           |      |
| 当使用 javascript 控制 dom 去改变样式的时候，只能使用 link 标签， | @import 不是 dom 可以控制的，又由于 import延迟加载，使用JS修改了dom元素的样式，可能会被后加载的样式覆盖 |      |
|                                                              |                                                              |      |




## CSS

## vue

## node

## 其他

浏览器重绘和回流？

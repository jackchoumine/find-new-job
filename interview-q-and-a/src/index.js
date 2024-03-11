/*
 * @Description:
 * @Date: 2020-07-22 13:27:19
 * @Author: JackChouMine
 * @LastEditTime: 2020-07-31 03:43:55
 * @LastEditors: JackChouMine
 */

/**
 * 原型继承
 */
console.log('%c 考察对继承、JS 面向对象的理解', 'color:dark-yellow;font-size:20px;');
function Animal(name, food, legs) {
    this.food = food
    this.name = name
    this.legs = legs
    this.sleep = () => {
        console.log('zzz')
    }
}
Animal.prototype.legs = 4
Animal.prototype.cry = function () {
    console.log('cry')
}
function Cat(name, food) {
    this.name = name
    this.food = food
    this.eat = () => {
        console.log('fish')
    }
}

const animal = new Animal('小狗', 'bone', 4)
console.log(animal instanceof Animal)
const cat = new Cat('Tom', 'fish')
console.log(cat instanceof Cat);
console.log('继承前，cat instcanceof Animal:', cat instanceof Animal);
Cat.prototype = new Animal('prototype', 'hello')
console.log('继承后没声明，cat instcanceof Animal:', cat instanceof Animal);
const cat2 = new Cat('xiaoHei', 'fish')
console.log('继承后声明，cat instcanceof Animal:', cat2 instanceof Animal);
console.log(cat2.name);
console.log(cat2.legs);

/*************/
//考察类型判断
console.log(typeof {})
console.log(typeof null)
console.log(typeof [])
console.log(typeof console.log)

/**************/
console.log('%c 考察对JS原理、函数和变量', 'color:#f00;font-size:20px;')
var a = function () {
    console.log('1')
}
function a() {
    console.log('2')
}
a()//TODO 为何输出 1
window.a()
console.log(a)

/************/
console.log('%c 考察对构造函数的理解', 'color:#fff;font-size:20px;')
function Foo() {
    return Foo
}
const foo = new Foo()
console.log(foo)
console.log(foo instanceof Foo)
console.log(foo.constructor)
console.log(Foo.constructor)

/*********/
console.log('%c 考察对象作为参数的理解', 'color:black;font-size:20px;');
function testObj(o) { //参数传递引用类型的值，传递的是地址 实参和形参指向同一个地址
    o.a = 'pro'
    o = new Object() // 形参指向另一个地址，形参和实参不再指向同一个地址
    o.b = 'hello'
    return o
}
const obj = new Object()
obj.c = 'c'
console.log(obj) // {c:'c'}
console.log(testObj(obj))// {b:'hello'}
console.log(obj) // {a:'pro', c:'c'}  // TODO

function test2(person) {
    person.age = 26
    person = {
        age: 36,
        name: 'test'
    }
    return person
}
const p1 = {
    name: 'yy',
    age: 10
}
console.log(p1);
console.log(test2(p1));
console.log(p1);

/*****************/
console.log(' %c 考察点：异步，事件循环、宏任务和微任务', 'color:red;font-size:20px;')
setTimeout(() => {
    console.log(1)
}, 0)
new Promise((resolve, reject) => {
    console.log(2)
    for (i = 0; i < 100000; i++) {
        i === 99999 && resolve()
    }
    console.log(3)
}).then(() => {
    console.log(4)
})
console.log(5)// 2 3 5 4 1

/*************/
/**
 * 考察点：解构和默认参数
 */
console.log('%c 解构和默认参数******************', 'color:green;font-size:20px;')
function m1({ x = 0, y = 0 } = {}) {
    console.log(x, y)
}
function m2({ x, y } = { x: 0, y: 0 }) {
    console.log(x, y)
}
m1({ x: 3 })//3 undefined //TODO 3 0
// m2({ x: 3 })// ReferenceError: x is not defined
m2({ x: 3 })

/**
 * 考察点：递归的理解
 * @param {number} input 输入的数字
 */
console.log('%c 递归的理解', 'color:black;font-size:20px;')
function test(input) {
    let sum = 0;
    ('' + input).split('').forEach(i => {
        sum = sum + Number.parseInt(i, 10)
    })
    // console.log('sum', sum);
    if (sum > 9) {
        console.log(sum)
        test(sum)
    } else {
        // console.log(sum);
        return sum
    }
}
console.log('test(38)', test(38))
/******/
/**
 * 考察点：各种循环的不同以及如何跳出
 */
console.log('%c 各种循环的不同以及如何跳出*************', 'color:red;font-size:20px;')
const testArr = [1, 2, 3]
testArr.forEach(i => {
    console.log('forEach', i)
    // if (i === 2) break //  SyntaxError: Illegal break statement
    if (i === 2) return
})
testArr.map(i => {
    console.log('map', i)
    // if (i === 2) break //  SyntaxError: Illegal break statement
    if (i === 2) return
})
for (const value of testArr) {
    console.log('for of', value)
    if (value === 2) break
}
for (let i = 0; i < testArr.length; i++) {
    const element = testArr[i];
    console.log('for', element)
    if (element === 2) break
}

/***********/
/**
 * 考察点：try catch 的执行顺序
 */
console.log('%c try catch 的执行顺序 testError', 'color:blue;font-size:20px;');
function testError() {
    console.log();
    let a, b
    try {
        throw 'wrong!'
    } catch (a) {
        (a = 1), (b = a)
        console.log('wrong error a', a)
        console.log('wrong error b', b)
    }
    console.log(a)
    console.log(b)
}
testError()

/**
 * 手动显示bind
 */
function es6Bind(that, ...args) {
    const fn = this// this 为调用 bind 的函数
    return function (...args2) {
        return fn.apply(that, ...args, ...args2)
    }
}

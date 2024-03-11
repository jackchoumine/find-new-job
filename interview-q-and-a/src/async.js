/*
 * @Description:
 * @Date: 2020-07-25 20:38:23
 * @Author: JackChouMine
 * @LastEditTime: 2020-07-31 03:28:24
 * @LastEditors: JackChouMine
 */

function async1() {
    console.log('async1 start') // 2
    //await async2() // await 使得同步执行 async2   3
    // console.log('async1 end') // 4 // await 后面的代码实际上在 then 方法中执行，属于微任务
    async2().then(() => {  // then  回调进入微任务
        console.log('async1 end')
    })
}
async function async2() {
    console.log('async2')
}
console.log('script start') // 1 
setTimeout(console.log, 0, 'setTimeout') // callback 进入宏任务 10 
async1() // 
new Promise(reslove => {
    console.log('promise1') // 5 
    setTimeout(() => {
        console.log('promise setTimeout')
        reslove('then')
    }, 1000 * 5)
    console.log('new promise end') // 6
}).then(res => {
    console.log(res); // 8 
    return res + 2
}).then(res => {
    console.log(res) // 9 
})
console.log('script end') // 7 

/**
 * script start √
 * async1 start  √
 * async2  √
 *    async1 end
 * promise1
 * new promise end  √
 * script end  √
 *     async1 end
 * then √
 * then2 √
 * setTimeout √ 24
 */

for (let i = 0; i < 2; i++) {
    console.log(i)
    setTimeout(console.log, 0, i)
}

function structalClone(obj) {
    return new Promise(resolve => {
        // TODO 
        const { port1, port2 } = new MessageChannel()
        port1.onmessage = event => resolve(event.data)
        port2.postMessage(obj)
    })
}
const obj = {
    a: 1,
    b: {
        c: 2
    }
}
// obj.b.d = obj.b // 循环引用
const result = async (obj) => {
    const clone = await structalClone(obj).catch(e => {
        console.log(e)
    })
    console.log('clone', clone)
}
result(obj)

var a = 'a'
let b = 'b'
console.log(window.a) // a
console.log(window.b) // undefined


const objTest = {
    a: 'a',
    getA() {
        console.log('a objTest', this.a);
    }
}
const obj2 = {
    a: 'b'
}
const obj2Bind = objTest.getA.bind(obj2)
obj2Bind()

Function.prototype.bindES6 = function (that, ...args) {
    const fn = this // this 是调用 bindES6 的函数
    // 闭包
    return function (...args2) {
        return fn.apply(that, [...args, ...args2])
    }
}
const bind6 = objTest.getA.bindES6(obj2, 'bindES6')
bind6('call')

Function.prototype.myApply = function (obj, ...args) {
    obj = obj || window
    // 给传入的对象添加函数
    obj.fn = this // this 是调用 myApply 的函数 // fn.myApply(obj)
    return obj.fn(args)
}
console.log('myApply')
objTest.getA.myApply(obj2)

Function.prototype.myCall = function (obj, ...args) {
    obj.fn = this
    console.log(...args)
    return obj.fn(...args)
}
console.log('myCall')
objTest.getA.myCall(obj2, 1, 'hello', 'world')
// add(a,b)
// add(a)(b)
// 

function add(a) {
    if (arguments.length > 1) {
        return arguments[0] + arguments[1]
    }
    return function (b) {
        return a + b
    }
}
console.log(add(1)(2))
console.log(add(1, 2))
// var f1 = 
function f1() {
    console.log('听风是风');
};
f1() //听风是风

// var f1 =
function f1() {
    console.log('echo');
}
// console.log(window);

f1() //echo
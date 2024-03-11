/*
 * @Description:
 * @Date: 2020-07-31 03:42:52
 * @Author: JackChouMine
 * @LastEditTime: 2020-07-31 19:08:28
 * @LastEditors: JackChouMine
 */
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
console.log(obj.__proto__)
console.log(Object.getPrototypeOf(obj) === obj.__proto__)


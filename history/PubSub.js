// 发布 订阅模式
const fs = require('fs');

class Events {
    constructor () {
        this.stack = [];
    }
    on (callback) { // 订阅者
        this.stack.push(callback);
    }
    emit () { // 发布者
        this.stack.forEach(callback => callback());
    }
}

let events = new Events();
let school = {}

events.on(function () {
    if (Object.keys(school).length === 2) {
        console.log(school)
    }
})

events.on(function () {
    console.log('当前获取完毕');
})

fs.readFile('./name.txt', 'utf8', function (err, data) {
    school['姓名'] = data;
    events.emit();
})

fs.readFile('./age.txt', 'utf8', function (err, data) {
    school['年龄'] = data;
    events.emit()
})

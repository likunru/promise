// 观察者模式 

// 被观察者
class Subject {
    constructor () {
        this.stack = []; // 观察者列表
        this.state = '开心';
    }
    attach(observer) {
        this.stack.push(observer);
    }
    setState(newState) {
        this.state = newState;
        this.stack.forEach(o => o.update(newState))
    }
}

// 观察者
class Observer {
    constructor (name) {
        this.name = name;
    }
    update (newState) {
        console.log(this.name + 'cc' + newState);
    } 

}

let o1 = new Observer('aa');
let o2 = new Observer('bb');

let a = new Subject();
a.attach(o1);
a.attach(o2);
a.setState('痛苦');
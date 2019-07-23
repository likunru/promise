// transaction作用在目标函数之前或之后进行一些操作，
// 例：在做真正业务之前，需要进行验证、授权或者输出日志的操作。

class Transaction {
    perform (anyMethod, wrappers) {
      wrappers.forEach(wrapper => wrapper.initialize());
      anyMethod();
      wrappers.forEach(wrapper => wrapper.close());
    }
}

let transaction = new Transaction();
let oldFunc = () => {
    console.log('所有的逻辑');
}

transaction.perform(oldFunc,[{
    initialize () {
        console.log('初始化1');
    },
    close () {
        console.log('关闭1');
    }
},{
    initialize () {
        console.log('初始化2');
    },
    close () {
        console.log('关闭2');
    }
}])
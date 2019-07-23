// 1.解决异步回调，回调地域的问题

const Promise = require('./promise');
let fs = require('fs')

let p = new Promise((resolve, reject) => {
    // executor 
    // resolve('成功');
    // reject('失败');
    fs.readFile('name.txt', 'utf8', function (err, data) {
        if (err) {
            reject(err);
        }
        resolve(data);
    })
})

p.then((data) => {
   console.log(22, data);  
//    return new Promise.resolve(2);
}, (err) => {
   console.log(err); 
})
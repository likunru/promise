let fs = require('fs');

function after (times, callback) {
    let school = {};
    return function out (key, value) {
        school[key] = value;
        while(--times === 0) {
            callback(school);
        }
    }
}
let out = after(2, (school) => {
    console.log(school);
})

fs.readFile('./name.txt', 'utf8', function (err, data) {
    out('名字', data);
})

fs.readFile('./age.txt', 'utf8', function (err, data) {
    out('年龄', data);
})
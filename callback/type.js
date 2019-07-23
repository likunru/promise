// 判断数据类型
// typeof instanceof constructor object.prototype.toString.call()

function isType (type) {
    return function (content) {
        return Object.prototype.toString.call(content) === `[object ${type}]`
    }

}
let utils = {};
let types = ['String', 'Number', 'Boolean', 'Null', 'Number'];

types.forEach(item => {
    utils['is' + item] = isType(item);
})
let flag = utils.isString('abd')
console.log(flag)
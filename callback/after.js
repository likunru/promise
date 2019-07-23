// lodash after 在执行多少次之后再执行
// 做异步的并发处理

function after(times, callback) {
  return function () {
      while (--times === 0) {
          callback()
      }
  }
}
// 3次之后执行
let fn = after(3, () => {
    console.log('3次之后执行');
})

fn();
fn();
fn();
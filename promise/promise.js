class Promise {
    constructor (executor) {
      this.status = 'pending';
      this.value = undefined;
      this.reson = undefined;

      this.onResolvedCallbacks = [];
      this.onRejectedCallbacks = [];
      let resolve = (value) => {
          if (this.status === 'pending') {
              this.value = value;
              this.status = 'fulfilled';
              this.onResolvedCallbacks.forEach(callback => {
                  callback(value);
              })
          }
      }
      let reject = (reson) => {
          if (this.status === 'pending') {
              this.reson = reson;
              this.status = 'rejected';
              this.onRejectedCallbacks.forEach(callback => {
                  callback(reson);
              })
          }
      } 
      try {
        executor(resolve, reject);
      } catch (e) {
          reject(e)
      }
    }
    then (onFulfilled, onRejected) {
       let self = this; 
      // 判断then的参数不是function，则忽略它  
      onFulfilled = typeof onFulfilled === 'Function' ? onFulfilled : function (value) {};
      onRejected = typeof onRejected === 'Function' ? onRejected : function (reson) {}; 
      if (self.status === 'fulfilled') {
          
          // promise链式调用，需要返回一个promise,如果当前promise的状态已经确定resolved,我们调用onFulfilled
          // 考虑到有可能throw，所以需要将其包在try/catch块里
          return new Promise(function (resolve, reject) {
              try {
                  let x = onFulfilled(self.value);
                  if (x instanceof Promise) {
                      x.then(resolve, reject);
                  }
                  resolve(self.value);
              } catch (e) {
                  reject()
              }
          })
      }
      if (self.status === 'rejected') {
          return new Promise (function (resolve, reject) {
            try {
                let x = onRejected(self.reson);
                if (x instanceof Promise) {
                    x.then(resolve, reject);
                }
            } catch (e) {
                reject(e);
            }
          })
          onRejected(self.reson);
      }
      if (self.status === 'pending') {
          self.onResolvedCallbacks.push(onFulfilled);
          self.onRejectedCallbacks.push(onRejected);
        //   return new Promise (function (resolve, reject) {
        //     this.onResolvedCallbacks.push(
        //         function (value) {
        //             try {
        //                 let x = onFulfilled(this.value);
        //                 if (x instanceof Promise) {
        //                     x.then(resolve, reject);
        //                 }
        //             } catch (e) {
        //                 reject(e);
        //             }
        //         }
        //     );
        //     this.onRejectedCallbacks.push(function (reson) {
        //         try {
        //             let x = onRejected(this.reson);
        //             if (x instanceof Promise) {
        //                 x.then(resolve, reject);
        //             }
        //         } catch (e) {
        //             reject(e);
        //         }
        //     })
        //   })
      }
    }
}

module.exports = Promise;
/*
  实现一个promise 可以链式调用then 
 */
const PENDING = 'pending';
const FULLED = 'fulled';
const REJECT = 'reject';
class MyPromise {
  constructor(fnc) {
    this.state = PENDING;
    this.value = null;
    this.reason = null;
    this.resloveList = [];
    this.rejectList = [];
    const self = this;
    const reslove = function (value) {
      if (self.state !== PENDING) return;
      self.state = FULLED;
      queueMicrotask(() => {
        self.value = value;
        self.resloveList.forEach(fn => {
          fn.call(self, value);
        });
      });
    }
    const reject = function (error) {
      if (self.state !== PENDING) return;
      self.state = REJECT;
      self.reason = error;
      queueMicrotask(() => {
        self.rejectList.forEach(fn => {
          fn.call(self, error);
        });
      });
    }
    try {
      fnc(reslove, reject);
    } catch (e) {
      reject(e);
    }
  }
  resolvePromise(newPromise, value, resolve, reject) {
    if (newPromise === value) {
      throw '不能等待自己';
    }
    let called = false;
    if (typeof value === 'object' && value !== null || typeof value === 'function') {
      try {
        const then = value.then;
        if (typeof then === 'function') {
          then.call(value,
            (val) => {
              if (called) return;
              called = true;
              this.resolvePromise(newPromise, val, resolve, reject);
            },
            (err) => {
              if (called) return;
              called = true;
              reject(err);
            });
        } else {
          resolve(value);
        }
      } catch (e) {
        if (called) return;
        called = true;
        reject(e)
      }
    } else {
      resolve(value);
    }
  }
  then(succFn, errFn) {
    const _succFn = typeof succFn === 'function' ? succFn : v => v;
    const _errFn = typeof errFn === 'function' ? errFn : e => { throw e };
    const self = this;
    const newPromise = new MyPromise((resolve, reject) => {
      if (self.state === PENDING) {
        self.resloveList.push(function () {
          queueMicrotask(() => {
            try {
              const value = _succFn(self.value);
              self.resolvePromise(newPromise, value, resolve, reject);
            } catch (error) {
              reject(error);
            }
          });
        });
        self.rejectList.push(function () {
          queueMicrotask(() => {
            try {
              const reason = _errFn(self.reason);
              self.resolvePromise(newPromise, reason, resolve, reject);
            } catch (e) {
              reject(e);
            }
          });
        });
      }
      if (self.state === FULLED) {
        try {
          const v = _succFn(self.value);
          self.resolvePromise(newPromise, v, resolve, reject);
        } catch (e) {
          reject(e);
        }
      }
      if (self.state === REJECT) {
        try {
          const v = _errFn(self.reason);
          self.resolvePromise(newPromise, v, resolve, reject);
        } catch (e) {
          reject(e);
        }
      }
    })
    return newPromise;
  }
  catch(fn) {
    return this.then(null, fn);
  }
}

const p = new MyPromise((res, rej) => {
  setTimeout(() => {
    res(2);
  }, 1000)
});
// test MyPromise
{
  p.then((res) => {
    console.log(res, 'then1');
    return res + 1;
  })
    .then(res => {
      console.log(res, 'then2');
      return res + 2;
    }, error => {
      console.log(error, 'err1');
    })
    .then(() => {
      a()
    }, error => {
      console.log(error, 'err2');
    }).catch(error => {
      console.log(error, 'err3');
    });

  p.then(v => {
    console.log(v, 'then outer 1')
    return new MyPromise((res, rej) => {
      setTimeout(() => {
        res(v + 100)
      }, 1000)
    });
  }).then(v => {
    console.log(v, 'then outer 2')
  });
}




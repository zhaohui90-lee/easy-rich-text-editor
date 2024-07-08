type Constructor<T = object> = new (...arg: any[]) => T

// 定义一个混入函数
function Timestamped<TBase extends Constructor>(Base: TBase) {
  return class extends Base {
    timestamp = Date.now()
  }
}

// 基类
class User {
  constructor(public name: string) {

  }
}

const TimestampedUser = Timestamped(User)
const user = new TimestampedUser('Jack')
console.log(user.timestamp);

// 防抖函数
export default function(fn, delay) {
  let timer
  return function() {
    const self = this
    const args = arguments
    if (timer) {
      clearTimeout(timer)
      timer = null
    }
    timer = setTimeout(() => {
      return fn.call(self, ...args)
    }, delay)
  }
}

// 封装操作 localStorage 的方法
const setItem = (name, value) => {
  // 如果是对象或数组类型，则转换为字符串，因为 localStorage 只能存储字符串
  if (typeof value === 'object') {
    value = JSON.stringify(value)
  }
  return window.localStorage.setItem(name, value)
}

const getItem = name => {
  const rst = window.localStorage.getItem(name)
  try {
    return JSON.parse(rst) // 转换对象类型的字符串
  } catch {
    return rst
  }
}

const removeItem = name => {
  window.localStorage.removeItem(name)
}

export {
  setItem,
  getItem,
  removeItem
}

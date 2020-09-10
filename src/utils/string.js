/**
 * 驼峰转换为 短线 分割
 * eg. HelloWorld -> hello-world
 * @param {string} str 字符串
 */
export const cameCaseToShortLine = (str) => {
  let isBigCameCase = false
  if (/[A-Z]/.test(str[0])) {
    // 大驼峰，首字母大写
    isBigCameCase = true
  }

  let res = str.replace(/([A-Z])/g, '-$1').toLowerCase()
  if (isBigCameCase) {
    res = res.slice(1)
  }

  return res
}

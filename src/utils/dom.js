/**
 * 新建含特定 attribute 的DOM元素
 * @param {string} tagName 标签名
 * @param {object} attrObj 属性对象
 * @return {Element}
 */
export const createDomElem = (tagName, attrObj) => {
  const el = document.createElement(tagName)
  for (const [key, val] of Object.entries(attrObj)) {
    el.setAttribute(key, val)
  }
  return el
}

/**
 * 插入元素el作为parentEl的第一个子元素
 * @param {Element} parentEl 父元素
 * @param {Element} el 要插入的子元素
 */
export const prependChild = (parentEl, el) => {
  if (parentEl.firstChild) {
    parentEl.insertBefore(el, parentEl.firstChild)
  } else {
    parentEl.appendChild(el)
  }
}

/**
 * 设置元素样式
 * @param {Element} el
 * @param {object} styleObj 设置元素样式
 */
export const setElemStyle = (el, styleObj) => {
  for (const [key, val] of Object.entries(styleObj)) {
    el.style[key] = val
  }
}

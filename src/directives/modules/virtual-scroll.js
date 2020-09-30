import { debounce } from 'lodash'
import { createDomElem, prependChild, setElemStyle } from '@/utils/dom'

// 设置上下两个撑开元素的高度
function setPadElemStyle(config) {
  const { startIdx, topEl, bottomEl, rowHeight, dataLength, endIdx } = config
  setElemStyle(topEl, { height: `${startIdx * rowHeight}px` })
  setElemStyle(bottomEl, { height: `${rowHeight * (dataLength - endIdx - 1)}px` })
}

// 设置当前要显示那些元素
function setCurrentShowData(el, cb) {
  const {
    wrapperEl,
    rowHeight,
    maxStartIdx,
    cacheSize,
    dataLength,
    showDataLength,
    data,
  } = el.xVirtualScrollConfig
  const { scrollTop } = wrapperEl

  // 可视区最上方元素下标
  let startIdx = Math.min(Math.floor(scrollTop / rowHeight), maxStartIdx)
  startIdx = Math.max(startIdx - cacheSize, 0)

  // 可视区最下方元素下标
  const endIdx = Math.min(startIdx + showDataLength + cacheSize * 2, dataLength - 1)

  el.xVirtualScrollConfig.startIdx = startIdx
  el.xVirtualScrollConfig.endIdx = endIdx

  const start = Math.max(startIdx, 0)
  const end = Math.min(endIdx + 1, dataLength)

  cb(data.slice(start, end))

  // 设置撑开元素的高度
  setPadElemStyle(el.xVirtualScrollConfig)

  // 避免设置高度后又触发滚动事件
  wrapperEl.scrollTop = scrollTop
}

// 新增撑开元素
function initElem(el) {
  const { wrapperEl } = el.xVirtualScrollConfig

  // 上下用来撑开的元素
  const topEl = createDomElem('div', { class: 'top-pad-ele' })
  const bottomEl = createDomElem('div', { class: 'bottom-pad-ele' })
  wrapperEl.appendChild(bottomEl)
  prependChild(wrapperEl, topEl)

  el.xVirtualScrollConfig = {
    ...el.xVirtualScrollConfig,
    topEl,
    bottomEl,
  }
}

// 初始化参数
function initConfig(el, binding) {
  const { data, viewHeight, rowHeight } = binding.value
  const dataLength = data.length
  const showDataLength = Math.ceil(viewHeight / rowHeight)
  el.xVirtualScrollConfig = {
    ...el.xVirtualScrollConfig,
    data,
    dataLength,
    showDataLength,
    maxStartIdx: dataLength - showDataLength - 1,
  }
}

function initData(el, binding) {
  initElem(el)
  initConfig(el, binding)
}

function handleScroll(el, cb) {
  return () => {
    setCurrentShowData(el, cb)
  }
}

export default {
  bind(el, binding) {
    let wrapperEl = el
    const { data, wrapperClass, viewHeight, rowHeight, cacheSize = 20, callback } = binding.value

    if (wrapperClass) {
      wrapperEl = el.querySelector(`.${wrapperClass}`)
    }

    el.xVirtualScrollConfig = {
      data,
      viewHeight,
      rowHeight,
      cacheSize,
      wrapperEl,
      startIdx: 0,
      endIdx: 0,
      onScroll: null,
    }

    initData(el, binding)

    const onScroll = debounce(handleScroll(el, callback), 100)

    el.xVirtualScrollConfig.onScroll = onScroll

    // 添加滚动事件
    wrapperEl.addEventListener('scroll', onScroll)

    onScroll()
  },

  unbind(el) {
    const { wrapperEl, onScroll } = el.xVirtualScrollConfig
    wrapperEl.removeEventListener('scroll', onScroll)
    el.xVirtualScrollConfig = null
  },

  update(el, binding) {
    const { onScroll } = el.xVirtualScrollConfig
    const { value, oldValue } = binding

    if (value.data !== oldValue.data) {
      // 重新设置个数
      initConfig(el, binding)
      el.xVirtualScrollConfig.wrapperEl.scrollTop = 0
      onScroll()
    }
  },
}

import { throttle } from 'lodash'
import ResizeObserver from 'resize-observer-polyfill'

export default {
  bind(el, binding) {
    const { value: cb } = binding
    const handleResize = throttle(() => {
      if (typeof cb === 'function') {
        cb()
      }
    }, 200)

    const observer = new ResizeObserver(handleResize)
    observer.observe(el)
    el.xResizeObserver = observer
  },

  unbind(el) {
    el.xResizeObserver.disconnect()
  },
}

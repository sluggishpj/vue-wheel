<template>
  <div class="virtual-scroll-el-table">
    <el-table
      ref="elTable"
      :data="showData"
      style="width: 100%"
      border
      :height="`${tableHeight}px`"
      row-class-name="per-row"
    >
      <el-table-column prop="idx" label="ID"></el-table-column>
      <el-table-column prop="name" label="顺序"></el-table-column>
    </el-table>
  </div>
</template>
<script>
import { Table, TableColumn } from 'element-ui'
import { debounce } from 'lodash'

export default {
  name: 'VirtualScrollerElTable',
  components: { [Table.name]: Table, [TableColumn.name]: TableColumn },
  props: {
    // 表格高度
    tableHeight: {
      type: Number,
      default: 500,
    },
    // 表头高度
    tableHeaderHeight: {
      type: Number,
      default: 50,
    },
    // 每一行高度
    rowHeight: {
      type: Number,
      default: 120,
    },
    cacheSize: {
      type: Number,
      default: 20,
    },
  },
  created() {
    this.handleScroll = debounce(this.setStartIdx.bind(this), 100)
  },
  data() {
    return {
      data: new Array(10000).fill(0).map((item, idx) => ({ idx, name: `第${idx}个元素` })),
      startIdx: 0,
      beforeEl: null,
      afterEl: null,
      // 固定高度的容器
      wrapperEl: null,
    }
  },
  methods: {
    createElement(tagName = 'div', className) {
      const el = document.createElement(tagName)
      el.setAttribute('class', className)
      return el
    },

    // 设置结点高度
    setNodeHeight(node, height) {
      node.style.height = `${height}px`
    },

    // 从 0 开始
    setStartIdx() {
      const { scrollTop } = this.wrapperEl
      const { maxStartIdx, cacheSize } = this

      const startIdx = Math.min(Math.floor(scrollTop / this.rowHeight), maxStartIdx)
      this.startIdx = Math.max(startIdx - cacheSize, 0)

      this.setBeforeOffset()
      this.setEndOffset()
      // 避免设置高度后又触发滚动事件
      this.wrapperEl.scrollTop = scrollTop
    },

    setBeforeOffset() {
      const { setNodeHeight, startIdx, beforeEl, rowHeight } = this
      setNodeHeight(beforeEl, startIdx * rowHeight)
    },

    setEndOffset() {
      const { setNodeHeight, afterEl, rowHeight, dataLength, endIdx } = this
      setNodeHeight(afterEl, rowHeight * (dataLength - endIdx - 1))
    },
  },
  computed: {
    // 可视区域高度
    wrapperHeight() {
      return this.tableHeight - this.tableHeaderHeight
    },
    // 当前展示的数据
    showData() {
      const { startIdx, endIdx, cacheSize, dataLength } = this
      const start = Math.max(startIdx, 0)
      const end = Math.min(endIdx + 1 + cacheSize * 2, dataLength)
      return this.data.slice(start, end)
    },
    // 全部元素个数
    dataLength() {
      return this.data.length
    },
    // 可视区域展示的元素个数
    showDataLength() {
      return Math.ceil(this.wrapperHeight / this.rowHeight)
    },
    maxStartIdx() {
      return this.dataLength - this.showDataLength - 1
    },
    // 可视区最下方元素下标
    endIdx() {
      const { startIdx, showDataLength, dataLength, cacheSize } = this
      return Math.min(startIdx + showDataLength + cacheSize, dataLength - 1)
    },
  },
  mounted() {
    const beforeEl = this.createElement('div', 'pre-ele')
    const afterEl = this.createElement('div', 'after-ele')
    this.beforeEl = beforeEl
    this.afterEl = afterEl

    const wrapperEl = this.$refs.elTable.bodyWrapper
    this.wrapperEl = wrapperEl

    wrapperEl.appendChild(afterEl)
    wrapperEl.insertBefore(beforeEl, wrapperEl.firstChild)

    // 添加滚动事件
    wrapperEl.addEventListener('scroll', this.handleScroll)
    this.setEndOffset()
  },

  beforeDestroy() {
    this.wrapperEl.removeEventListener('scroll', this.handleScroll)
  },
}
</script>
<style lang="scss">
.virtual-scroll-el-table {
  margin: 20px 0;
  .per-row {
    height: 120px !important;
  }
}
</style>

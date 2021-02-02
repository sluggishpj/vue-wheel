// el-select虚拟滚动实现
<template>
  <el-select
    :value="value"
    @input="$emit('input', $event)"
    v-bind="$attrs"
    v-on="$listeners"
    :filter-method="filterMethod"
    :popper-append-to-body="false"
    v-virtual-scroll="{
      data: filterOptions,
      cacheSize: 10,
      viewHeight: 257,
      wrapperClass: '.el-select-dropdown__wrap',
      rowHeight: 34,
      callback: handleShowData
    }"
    @visible-change="handleVisibleChange"
  >
    <el-option
      v-for="item in currentOptions"
      :key="item.value"
      :label="item.label"
      :value="item.value"
    ></el-option>
  </el-select>
</template>
<script>
import { Select, Option } from 'element-ui'

export default {
  name: 'VirtualScrollElSelect',
  components: {
    [Select.name]: Select,
    [Option.name]: Option,
  },
  props: {
    value: {
      type: [String, Number, Array],
      required: true,
    },
    // 全部下拉数据
    list: {
      type: Array,
      required: true,
    },
    // 显示的最多下拉个数
    count: {
      type: Number,
      default: 50,
    },
  },
  data() {
    return {
      // 可选的所有下拉选项
      filterOptions: this.list,
      // 当前显示的下拉选项
      currentOptions: [],
    }
  },
  methods: {
    setCurrentOptions(list, begin = 0) {
      const { count } = this
      const end = begin + count
      if (Array.isArray(list)) {
        this.currentOptions = list.slice(begin, end)
      } else {
        this.currentOptions = []
      }
    },
    filterMethod(val) {
      const query = val.toLowerCase()
      this.filterOptions = this.list.filter(({ label }) => {
        if (typeof label !== 'string') {
          label += ''
        }
        return label.toLowerCase().includes(query)
      })
    },
    handleShowData(newList) {
      this.currentOptions = newList
    },
    // 是否处于对焦状态
    handleVisibleChange(show) {
      if (!show) {
        this.filterOptions = this.list
      }
    },
  },
  watch: {
    list: {
      handler: 'setCurrentOptions',
      immediate: true,
    },
  },
}
</script>

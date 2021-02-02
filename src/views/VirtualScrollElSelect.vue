<template>
  <div class="test-virtual-scroll-el-table">
    <el-radio v-model="current" label="virtual">虚拟滚动</el-radio>
  <el-radio v-model="current" label="normal">正常滚动</el-radio>

    <VirtualScrollElSelect
      v-if="current==='virtual'"
      filterable
      v-model="selectedData"
      multiple
      :list="dataList"
      :count="50"
    />

    <el-select v-else v-model="selectedData" filterable multiple="">
      <el-option
        v-for="item in dataList"
        :key="item.value"
        :value="item.value"
        :label="item.label"
      ></el-option>
    </el-select>
  </div>
</template>
<script>
import 'element-ui/lib/theme-chalk/index.css'
import VirtualScrollElSelect from '@/components/VirtualScrollElSelect.vue'
import { Radio, Select, Option } from 'element-ui'

export default {
  name: 'test-virtual-scroll-el-table',
  components: {
    VirtualScrollElSelect,
    [Select.name]: Select,
    [Option.name]: Option,
    [Radio.name]: Radio,
  },
  data() {
    return {
      current: 'virtual',
      selectedData: [],
      dataList: Array(10000)
        .fill(0)
        .map((v, i) => ({
          value: i,
          label: i,
        })),
    }
  },
}
</script>

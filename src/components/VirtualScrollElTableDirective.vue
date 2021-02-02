<template>
  <div class="virtual-scroll-el-table">
    <el-table
      ref="elTable"
      :data="showData"
      style="width: 100%"
      border
      :height="`${tableHeight}px`"
      row-class-name="per-row"
      v-virtual-scroll="{
        data,
        viewHeight,
        wrapperClass: '.el-table__body-wrapper',
        rowHeight,
        callback: handleShowData,
      }"
    >
      <el-table-column prop="idx" label="ID"></el-table-column>
      <el-table-column prop="name" label="顺序"></el-table-column>
    </el-table>

    <el-button type="primary" @click="changeData">改变数据</el-button>
  </div>
</template>
<script>
import { Button, Table, TableColumn } from 'element-ui'

export default {
  components: {
    [Button.name]: Button,
    [Table.name]: Table,
    [TableColumn.name]: TableColumn,
  },
  data() {
    return {
      data: new Array(1000).fill(0).map((item, idx) => ({ idx, name: `第${idx}个元素` })),
      tableHeight: 500,
      viewHeight: 451,
      rowHeight: 120,
      showData: [],
      selectedData: '',
      options: [],
    }
  },
  methods: {
    handleShowData(data) {
      this.showData = data
    },

    changeData() {
      const ranNum = Math.random()
      this.data = new Array(Math.round(10000 * ranNum))
        .fill(0)
        .map((item, idx) => ({ idx, name: `第${idx}个元素` }))
    },

    handleOptions(data) {
      this.options = data
    },
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

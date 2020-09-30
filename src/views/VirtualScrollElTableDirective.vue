<template>
  <div class="test-virtual-scroll-el-table">
    <!-- <VirtualScrollElTable /> -->
    <VirtualScrollElTableDirective />
  </div>
</template>
<script>
import 'element-ui/lib/theme-chalk/index.css'
// import VirtualScrollElTable from '@/components/VirtualScrollElTable.vue'
import VirtualScrollElTableDirective from '@/components/VirtualScrollElTableDirective.vue'

export default {
  name: 'test-virtual-scroll-el-table',
  components: {
    // VirtualScrollElTable,
    VirtualScrollElTableDirective,
  },
}
</script>

<template>
  <div class="swing-num-test">
    <template v-for="(num,idx) in numArr">
      <SwingNum
        :key="idx"
        :num="num"
        :duration="600"
        :delay="0"
        fontColor="#FFF"
        numWidth="30px"
        numHeight="30px"
        numPadding="2px"
        wrapperPadding="0px"
        numBg="linear-gradient(to bottom, #000000, #ff9fc0 50%, #000000 0)"
        wrapperBg="#ccc"
        coverBg="linear-gradient(to bottom, transparent 48%, #ccc 0, #ccc 50%, transparent 50%)"
        @onSwingEnd="swingEnd"
      />
      <h4 v-if="idx%2===1 && idx!==5" :key="`:${idx}`">:</h4>
    </template>
  </div>
</template>
<script>
import SwingNum from '@/components/SwingNum.vue'

export default {
  components: {
    SwingNum,
  },

  data() {
    return {
      showNum: 1,
      timer: null,
      numArr: [0, 0, 0, 0, 0, 0],
    }
  },

  methods: {
    swingEnd() {
      console.log('[SwingNum] swing done')
    },
    splitToNumArr(num) {
      if (num < 10) {
        return [0, num]
      }
      return [Math.floor(num / 10), num % 10]
    },
    resolveNow() {
      const now = new Date()
      return [
        ...this.splitToNumArr(now.getHours()),
        ...this.splitToNumArr(now.getMinutes()),
        ...this.splitToNumArr(now.getSeconds()),
      ]
    },
  },

  created() {
    setInterval(() => {
      this.numArr = this.resolveNow()
    }, 1000)
  },

  beforeDestroy() {
    clearInterval(this.timer)
  },
}
</script>
<style lang="scss" scoped>
.swing-num-test {
  display: flex;
}
</style>

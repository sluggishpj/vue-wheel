<template>
  <SwingNum
    :num="showNum"
    fontColor="#FFF"
    numWidth="60px"
    numHeight="60px"
    numPadding="4px"
    wrapperPadding="4px"
    numBg="linear-gradient(to bottom, #000000, #ff9fc0 50%, #000000 0)"
    wrapperBg="#ffffff"
    coverBg="linear-gradient(to bottom, transparent 48%, #ffffff 0, #ffffff 50%, transparent 50%)"
    @onSwingEnd="swingEnd"
  />
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import SwingNum from './XSwingNum.vue'

@Component({
  components: { SwingNum }
})
export default class SwingNumTest extends Vue {
  private showNum = 123456

  private timer: any = null

  public swingEnd(): void {
    console.log('[SwingNum] swing done')
  }

  private created(): void {
    this.timer = setInterval(() => {
      this.showNum = Math.floor(Math.random() * 40000 + 100000)
      console.log('[SwingNum] num', this.showNum)
    }, 14000)
  }

  private beforeDestroy(): void {
    clearInterval(this.timer)
  }
}
</script>
<style scoped>
</style>

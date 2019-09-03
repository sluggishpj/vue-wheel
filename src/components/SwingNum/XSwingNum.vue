// 数字循环往上滚动效果
// 思路是生成需要的所有数字div，然后从最上面滚动到目标数字。滚动完后会$emit('onSwingEnd')事件
// 优点：流畅直观，缺点：暴力
<template>
  <div class="swing-num">
    <div
      class="swing-wrapper"
      :style="{
        height: numHeight,
        border: `${wrapperPadding} solid transparent`,
        background: wrapperBg,
        color: fontColor,
      }"
    >
      <!-- 容器遮罩 -->
      <div class="cover" :style="{
          background: coverBg
        }"></div>

      <!-- 各列数字 -->
      <div
        class="num-list"
        v-for="i in numLen"
        :key="i"
        :style="{
          width: numWidth,
          'border-right': `${numPadding} solid transparent`,
          'transition-duration': `${duration}ms`,
          'transition-property': `${isReset? 'none': 'transform'}`,
          transform: `translateY(${transYList[i-1] || '0px'})`
        }"
        @transitionend="transitionEndHandle"
      >
        <!-- repeat组0-9，结尾再加一个0 -->
        <span
          class="num"
          :key="j"
          v-for="j in ((repeat+1)*10+1)"
          :style="{
            'height':numHeight,
            'background': numBg,
          }"
        >{{(j-1)%10}}</span>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Watch, Vue } from 'vue-property-decorator'

@Component
export default class SwingNum extends Vue {
  // 传入的要显示的数字
  @Prop()
  private num!: number

  // 数字字体颜色
  @Prop({ default: '#fff' })
  fontColor!: string

  // 重复滚动次数，默认3次
  @Prop({ default: 3 })
  repeat!: number

  // 每列滚动所需时间，默认5s
  @Prop({ default: 10000 })
  duration: number

  // 各列开始滚动间隔时间（单位ms)，默认200ms
  @Prop({ default: 300 })
  delay: number

  // 每个数字的宽度
  @Prop({ default: '58px' })
  numWidth: string

  // 每个数字的高度
  @Prop({ default: '58px' })
  numHeight: string

  // 数字与数字之间的间隔
  @Prop({ default: '4px' })
  numPadding: string

  // 数字与显示容器之间的间隔
  @Prop({ default: '4px' })
  wrapperPadding: string

  // 数字的背景
  @Prop({ default: 'transparent' })
  numBg: 'string'

  // 容器背景，因为边框是透明的，所以间隔显示的是容器的背景
  @Prop({ default: 'transparent' })
  wrapperBg: 'string'

  // 遮罩背景
  @Prop({ default: 'transparent' })
  coverBg: 'string'

  // data属性
  animateOverCount: number = 0

  // 每列的transformY值
  transYList: string[] = []

  isReset: boolean = false

  // computed
  // 数字有多少位
  private get numLen() {
    return this.num.toString().length
  }

  // method
  // 获取数字符号串的第idx位，最左边为第0位
  public getIndexOfNum(num: number, idx: number): number {
    return +num.toString().charAt(idx)
  }

  // 带单位的字符串乘以数字，如75px*4=300px
  public unitMulti(unitNum: string, num: number): string {
    const num1: number = parseFloat(unitNum)
    const unit = unitNum.replace(`${num1}`, '')
    return `${num1 * num}${unit}`
  }

  // 开始动画
  public goAnima(): void {
    this.isReset = true
    this.$nextTick(() => {
      this.transYList.splice(0)
      for (let i = 0; i < this.numLen; i++) {
        this.transYList.push('0px')
      }

      setTimeout(() => {
        this.isReset = false
        for (let idx = 0; idx < this.numLen; idx++) {
          setTimeout(() => {
            // 滚动多少个数字高度
            const rowNumLen =
              this.repeat * 10 + this.getIndexOfNum(this.num, idx)
            this.$set(
              this.transYList,
              idx,
              `-${this.unitMulti(this.numHeight, rowNumLen)}`
            )
          }, this.delay * idx)
        }
      }, 0)
    })
  }

  // 每列数字动画结束时进行处理
  public transitionEndHandle(): void {
    this.animateOverCount++
    console.log(`end ${this.animateOverCount}`)
    if (this.animateOverCount === this.numLen) {
      this.animateOverCount = 0
      // 添加全部滚动结束时$emit('onSwingEnd')事件
      this.$emit('onSwingEnd')
    }
  }

  private mounted() {
    this.goAnima()
  }

  @Watch('num')
  private onNumChange(newNum: number) {
    this.goAnima()
  }
}
</script>
<style lang="scss" scoped>
.swing-num {
  display: flex;
  justify-content: center;
  align-items: center;
}

// 所有数字的可视窗口
.swing-wrapper {
  box-sizing: content-box;
  position: relative;
  text-align: center;
  overflow: hidden;
  background-repeat: no-repeat;
  background-origin: border-box;
  background-size: cover;
}

// 遮罩
.cover {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 5;
  background-repeat: no-repeat;
  background-origin: border-box;
  background-size: cover;
}

// 数字容器
.num-list {
  float: left;
  box-sizing: content-box;
  transition-timing-function: cubic-bezier(0.09, 0.66, 0.24, 0.95);
  &:last-child {
    border: none !important;
  }
}

// 每一个数字
.num {
  box-sizing: border-box;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-repeat: no-repeat;
  background-clip: content-box;
  background-size: cover;
}
</style>

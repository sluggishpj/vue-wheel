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

      <!-- 列数字 -->
      <div
        class="num-list"
        :style="{
          width: numWidth,
          'border-right': `${numPadding} solid transparent`,
          'transition-duration': `${duration}ms`,
          'transition-property': `${isReset? 'none': 'transform'}`,
          transform: numTranslateY
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

<script>
export default {
  name: 'SwingNum',
  props: {
    // 传入的要显示的数字
    num: {
      type: Number,
      required: true,
      validator: (value) => Number.isSafeInteger(value) && value >= 0 && value <= 9,
    },
    // 数字字体颜色
    fontColor: {
      type: String,
      required: true,
    },
    // 重复滚动次数
    repeat: {
      type: Number,
      default: 0,
    },
    // 每列滚动所需时间，默认200ms
    duration: {
      type: Number,
      default: 200,
    },
    // 每个数字的宽度
    numWidth: {
      type: String,
      default: '58px',
    },

    // 每个数字的高度
    numHeight: {
      type: String,
      default: '58px',
    },

    // 数字的间隔
    numPadding: {
      type: String,
      default: '2px',
    },

    // 数字与显示容器之间的间隔
    wrapperPadding: {
      type: String,
      default: '4px',
    },

    // 数字的背景
    numBg: {
      type: String,
      default: 'transparent',
    },

    // 容器背景，因为边框是透明的，所以间隔显示的是容器的背景
    wrapperBg: {
      type: String,
      default: 'transparent',
    },

    // 遮罩背景
    coverBg: {
      type: String,
      default: 'transparent',
    },
  },

  data() {
    return {
      animateOverCount: 0,
      isReset: false,
      // 当前数字在所有数字中的位置
      currentIdx: 0,
    }
  },

  mounted() {
    this.goAnima(true)
  },

  computed: {
    numTranslateY() {
      const tHeight = this.unitMulti(this.numHeight, this.currentIdx)
      return `translateY(-${tHeight})`
    },
  },

  methods: {
    // 获取数字符号串的第idx位，最左边为第0位
    getIndexOfNum(num, idx) {
      return +num.toString().charAt(idx)
    },

    // 带单位的字符串乘以数字，如75px*4=300px
    unitMulti(unitNum, num) {
      const num1 = parseFloat(unitNum)
      const unit = unitNum.replace(`${num1}`, '')
      return `${num1 * num}${unit}`
    },

    // 开始动画
    goAnima(isFirst) {
      let { num } = this
      if (num === 0 && !isFirst) {
        num = 10
      }
      this.currentIdx = isFirst ? this.repeat * 10 + num : num
    },

    // 每列数字动画结束时进行处理
    transitionEndHandle() {
      if (this.num === 0) {
        this.isReset = true
        this.currentIdx = 0
        setTimeout(() => {
          this.isReset = false
        }, 0)
      }
      this.$emit('onSwingEnd')
    },
  },

  watch: {
    num() {
      this.goAnima(false)
    },
  },
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

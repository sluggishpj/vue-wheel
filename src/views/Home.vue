<template>
  <div class="home">
    <div>
      <SwingNum />
      <div class="title">SwingNum</div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import viewMap from './viewMap'

interface MyComponent {
  [name: string]: any
}
const components: MyComponent = {}

viewMap.forEach((item) => {
  components[item.name] = () => import(`@/components/${item.path}`)
})

@Component({
  components
})
export default class Home extends Vue {}
</script>
<style lang="scss" scoped>
.home {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  position: relative;
  min-height: 100vh;

  & > div {
    height: 200px;
    width: 400px;
    margin: 10px;
    background: hsla(0, 0%, 100%, 0.8);
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;

    &::before {
      content: '';
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      filter: blur(5px);
    }

    .title {
      position: absolute;
      top: 0;
      color: #fff;
    }
  }
}

.home,
.home > div::before {
  background: url('https://s2.ax1x.com/2019/08/09/ebM55T.jpg') 0 / cover fixed;
}
</style>

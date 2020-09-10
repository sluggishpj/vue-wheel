// 展示预览
<template>
  <div class="gallery">
    <div class="gallery-item" v-for="config in configs" :key="config.name">
      <div class="header">
        <div class="title">{{config.name}}</div>
        <div class="source-link">
          <a :href="resolveSourceLink(config)" target="_blank">source</a>
        </div>
      </div>
      <div class="content">
        <components :is="config.name"></components>
      </div>
    </div>
  </div>
</template>

<script>
import { routes } from '@/router/index'
import { resolveComponents } from '@/utils'

const components = resolveComponents(routes)

export default {
  name: 'Gallery',
  components,
  data() {
    const parentName = this.$parent.$options.name
    return {
      // 为了避免死循环，就不包含调用该组件的父组件了
      configs: routes.filter(({ name }) => name !== parentName),
    }
  },
  methods: {
    resolveSourceLink({ name }) {
      return `https://github.com/sluggishpj/vue-wheel/tree/master/src/components/${name}.vue`
    },
  },
}
</script>

<style lang="scss" scoped>
.gallery {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  position: relative;
  min-height: 100vh;
  background: #dac9a6;
  color: #fff;
}

.gallery,
.gallery-item::before {
  // background: url('https://s2.ax1x.com/2019/08/09/ebM55T.jpg') 0 / cover fixed;
  // background: #60373E;
  background: url('https://s1.ax1x.com/2020/09/10/wJCVN4.jpg') 0 / cover fixed;
}

.gallery-item {
  height: 300px;
  width: 300px;
  margin: 20px;
  padding: 10px;
  background: hsla(0, 0%, 100%, 0.8);
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 8px;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    filter: blur(5px);
  }
}
.header {
  width: 100%;
  height: 40px;
  border-bottom: 1px dashed #ccc;
  display: flex;
  align-items: center;
  justify-content: space-around;
  z-index: 1;
  .title {
    flex: 1;
  }
  .source-link {
    flex: 1;
    border-left: 1px dashed #ccc;
    a {
      color: #fff;
      text-decoration: none;
      &:hover {
        border-bottom: 1px solid #ccc;
      }
    }
  }
}

.content {
  flex: 1;
  z-index: 1;
  padding: 10px;
  overflow: hidden;
  position: relative;
}

.content::before {
  content: '';
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  z-index: 6;
}
</style>

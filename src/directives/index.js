import Vue from 'vue'
import { shortLineToCameCase } from '@/utils/string'

// 匹配JS文件名
const regexp = /^\.\/([^\s]+)\.js$/

const importFiles = (context) => context.keys().map((filePath) => {
    const fileName = filePath.match(regexp)
    return {
      fileName,
      // 带-的文件名转换为驼峰式
      camelFileName: shortLineToCameCase(fileName[1]),
      module: context(filePath).default,
    }
  })

const directives = importFiles(require.context('./modules', false, /\.js$/))

directives.forEach(({ camelFileName, module }) => {
  Vue.directive(camelFileName, module)
})

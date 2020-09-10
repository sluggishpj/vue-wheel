/**
 * 将配置转换为组件中的compoents属性
 * @param {Array} routes 路由配置
 */
export const resolveComponents = (routes) => routes.reduce((result, item) => {
    result[item.name] = item.component
    return result
  }, {})

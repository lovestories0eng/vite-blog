import { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import CustomLayout from './CustomLayout.vue'
import 'virtual:svg-icons-register'
import SvgIcon from './components/SvgIcon.vue'

// override style
import './styles/index.scss'

// element-ui
import 'element-plus/dist/index.css'
import 'element-plus/theme-chalk/dark/css-vars.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

import { withConfigProvider } from './composables/config/blog'

export const BlogTheme: Theme = {
  ...DefaultTheme,
  Layout: withConfigProvider(CustomLayout),
  enhanceApp(ctx) {
    for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
      ctx.app.component(key, component)
    }
    ctx.app.component('svg-icon', SvgIcon)
  }

}

export * from './composables/config/index'
export default BlogTheme
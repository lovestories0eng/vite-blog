// import { defineConfig } from 'vitepress'
import { getThemeConfig, defineConfig } from './theme/node'
import { sidebar } from './utils/autoSideBar'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import path from 'path'

// https://vitepress.dev/guide/extending-default-theme#overriding-internal-components
export default defineConfig({
  title: "Peter Pan的小天地",
  description: "个人技术博客，欢迎大家留言交流。",

  themeConfig: {
    ...getThemeConfig({
      search: 'pagefind',
      friend: [
        {
          nickname: 'Vitepress',
          des: 'Vite & Vue Powered Static Site Generator',
          avatar:
            'https://img.cdn.sugarat.top/mdImg/MTY3NDk5NTI2NzY1Ng==674995267656',
          url: 'https://vitepress.vuejs.org/'
        }
      ]
    }),
    nav: [
      { text: 'Home', link: '/' },
      { text: 'motion', link: '/motion/index' },
      { text: 'About me', link: '/about-me' }
    ],
    
    sidebar: sidebar,
    socialLinks: [
      { icon: 'github', link: 'https://github.com/lovestories0eng' }
    ],
    footer: {
      copyright:
        'MIT Licensed'
    }
  },
  vite: {
    plugins: [
      createSvgIconsPlugin({
        // 指定需要缓存的图标文件夹
        iconDirs: [path.resolve(process.cwd(), 'docs/.vitepress/theme/svg')],
        // 指定symbolId格式
        symbolId: 'icon-[dir]-[name]',
      }),
    ],
    server: {
      fs: {
        allow: [
          '..',
          '/Users/panshihuang/node_modules',
          '.vitepress/theme/styles/beauty.mp4'
        ]
      }
    },
  }
})

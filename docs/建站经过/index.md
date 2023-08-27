# 介绍
这里记录了我在使用`vitepress`的过程中遇到一些坑和我每次增加的新功能。供也想要自己的网友一些参考。

# 建站日志
## 自动根据文件目录提供sideBar
vitepress手动配置sideBar的话，需要在config.ts里面里面一个个手打出来，作为一个程序员怎么能做这么低级的事情呢，因此就写了一个自动生成sideBar的函数。

我想要实现的逻辑是，程序能够自动读取`docs`文件夹下的所有目录，`.vitepress`以及其他隐藏目录文件除外。
同时，每一个目录都对应一个路径，这个路径下的sideBar包括该目录中所有的`.md`文件，如果该目录中还有目录则把路由进行嵌套。

### 读取sideBar类型
由于本项目使用`TypeScript`编写，因此需要导入相关类型，具有用处后面会详细说明。
```TypeScript
import type { DefaultTheme } from "vitepress/types/default-theme"
```

### 导入依赖
由于需要读取文件目录，因此需要`path`模块和`fs`模块。
```TypeScript
const path = require('path')
const fs = require('fs')
```
### 读取`docs`目录下的所有目录
这个文件的位置是`/docs/.vitepress/utils.autoSideBar.ts`，位置不同的读者可以根据需要修改路径。
```TypeScript
function readRootDir(rootDirPath) {
  const fileOrDirList = fs.readdirSync(rootDirPath)
  let dirList = fileOrDirList.filter(item => !/^\./.test(item) && fs.statSync(path.join(rootDirPath, item)).isDirectory())
  dirList = dirList.map(item => '/' + item)
  // console.log(dirList)
  return dirList;
}
// 找到docs全路径
const docsPath = path.resolve(__dirname, '../../../docs')
// 找到docs全路径下所有的目录文件
const rootDirPath = readRootDir(docsPath);
```

### 递归目录，遍历找到所有`.md`文件
具体逻辑和遍历树的逻辑差不多，区别就是只需要找到`.md`文件，`.jpg`，`.png`之类的文件需要过滤掉。
```TypeScript
function genSidebarConfig(dirPath, ref, parentRef, parentRouterPath) {
  try {
    const fileOrDirList = fs.readdirSync(dirPath)
    const newFileOrDirList = fileOrDirList.filter(item =>
      // 过滤 *.png、*.jpg、.DS_Store文件
      !(/\.(png|jpg|DS_Store|gif)/g.test(item))
    )
    if (newFileOrDirList) {
      for (let index = 0; index < newFileOrDirList.length; index++) {
        const fileOrDirName = newFileOrDirList[index];
        const currentPath = path.join(dirPath, fileOrDirName)
        const currentStat = fs.statSync(currentPath)
        // 忽略"."开头的隐藏文件，例如".vitepress"等
        if (/^\./.test(fileOrDirName)) {
          continue
        }
        //顶层 README 匹配以字符串 README 开头的文本
        if (!parentRouterPath && /^\README/.test(fileOrDirName)) {
          continue
        }
        // 文件
        if (currentStat.isFile()) {
          const currentRouterPath = parentRouterPath ? `${parentRouterPath}${fileOrDirName}` : `/${fileOrDirName}`
          if (/^\README/.test(fileOrDirName)) {
            parentRef.path = parentRouterPath
            continue
          }
          const file = {
            text: fileOrDirName,
            link: currentRouterPath
          }
          ref.push(file)
          continue
        }
        // 文件夹
        if (currentStat.isDirectory()) {
          const currentRouterPath = parentRouterPath ? `${parentRouterPath}${fileOrDirName}/` : `/${fileOrDirName}/`
          // 创建分组
          const group = {
            text: fileOrDirName,
            collapsed: false,
            items: []
          }
          ref.push(group)
          genSidebarConfig(currentPath, ref[ref.length - 1].items, ref[ref.length - 1], currentRouterPath)
          // 如果items这个字段没有元素，则删除该节点
          if (ref[ref.length - 1].items.length === 0) ref.pop();
        }
      }
    }
  } catch (error) {
    console.error('💣 ERROR:: genSidebarConfig error', error)
  }
}
```

### 导出SideBar
这里前面的类型就起作用了，这里sideBar的类型是DefaultTheme.SidebarMulti，不规定类型的话TypeScript编译器会报错。
```TypeScript
const sidebar: DefaultTheme.SidebarMulti = {}
for (let dir of rootDirPath) {
  const tmp = [];
  genSidebarConfig(path.join(docsPath, dir), tmp, undefined, dir + '/');
  sidebar[dir + '/'] = tmp;
}
// console.log(sidebar)

export { sidebar };
```

### 遇到的坑
`link`这个字段中，路径前面要加`/`，否则页面的`prev link`与`next link`组件无法指向正确的页面。

例如:`ACM/test`路径不行，但是`/ACM/test`路径可以。

详情请看: https://github.com/vuejs/vitepress/issues/1795

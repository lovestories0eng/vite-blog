// import type { SidebarMulti } from "vitepress/types/default-theme"
import type { DefaultTheme } from "vitepress/types/default-theme"

const path = require('path')
const fs = require('fs')

function genSidebarConfig(dirPath, ref, parentRef, parentRouterPath) {
  try {
    const fileOrDirList = fs.readdirSync(dirPath)
    const newFileOrDirList = fileOrDirList.filter(item =>
      // 过滤 *.png、*.jpg、.DS_Store文件
      !(/\.(png|jpg|DS_Store|gif|jpeg|js)/g.test(item))
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
          if (ref[ref.length - 1].items.length === 0) ref.pop();
        }
      }
    }
  } catch (error) {
    console.error('💣 ERROR:: genSidebarConfig error', error)
  }
}

function readRootDir(rootDirPath) {
  const fileOrDirList = fs.readdirSync(rootDirPath)
  let dirList = fileOrDirList.filter(item => !/^\./.test(item) && fs.statSync(path.join(rootDirPath, item)).isDirectory())
  dirList = dirList.map(item => '/' + item)
  // console.log(dirList)
  return dirList;
}

const sidebar: DefaultTheme.SidebarMulti = {}
// 找到docs全路径
const docsPath = path.resolve(__dirname, '../../../docs')
// 找到docs全路径下所有的目录文件
const rootDirPath = readRootDir(docsPath);
for (let dir of rootDirPath) {
  const tmp = [];
  genSidebarConfig(path.join(docsPath, dir), tmp, undefined, dir + '/');
  if (tmp.length !== 0) sidebar[dir + '/'] = tmp;
}
// console.log(sidebar)

export { sidebar };
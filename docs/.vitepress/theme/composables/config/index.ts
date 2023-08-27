import { DefaultTheme } from 'vitepress'

export namespace Theme {
  export interface PageMeta {
    title: string
    date: string
    tag?: string[]
    description?: string
    cover?: string
    sticky?: number
    author?: string
    hidden?: boolean
    layout?: string
    // old
    categories: string[]
    tags: string[]
    /**
    * 文章首页置顶
    */
    top?: number;
  }
  
  export interface PageData {
    route: string
    meta: PageMeta
  }
  export interface activeTag {
    label: string
    type: string
  }

  export interface HomeBlog {
    name?: string
    motto?: string
    inspiring?: string
    pageSize?: number
    categorySize?: number
  }

  export interface ArticleConfig {
    readingTime?: boolean
  }
  export interface FriendLink {
    nickname: string
    des: string
    url: string
    avatar: string
  }
  export interface BlogConfig {
    blog?: false
    pagesData: PageData[]
    srcDir?: string
    author?: string
    home?: HomeBlog
    // TODO: 本地全文搜索定制 pagefind || minisearch
    search?: boolean | 'pagefind'
    /**
     * 配置评论
     * power by https://giscus.app/zh-CN
     */
    article?: ArticleConfig
    friend?: FriendLink[]
  }

  export interface Config extends DefaultTheme.Config {
    blog: BlogConfig
  }
  export interface HomeConfig {
    handleChangeSlogan?: (oldSlogan: string) => string | Promise<string>
  }
}

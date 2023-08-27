import { DefaultTheme, UserConfig } from 'vitepress';

declare namespace Theme {
  interface PageMeta {
    title: string;
    date: string;
    tag?: string[];
    description?: string;
    cover?: string;
    sticky?: number;
    author?: string;
    hidden?: boolean;
    layout?: string;
    categories: string[];
    tags: string[];
    /**
    * 文章首页置顶
    */
    top?: number;
  }
  interface PageData {
    route: string;
    meta: PageMeta;
  }
  interface HomeBlog {
    name?: string
    motto?: string
    inspiring?: string
    pageSize?: number
    categorySize?: number
  }
  interface FriendLink {
    nickname: string;
    des: string;
    url: string;
    avatar: string;
  }
  interface BlogConfig {
    blog?: false;
    pagesData: PageData[];
    srcDir?: string;
    author?: string;
    search?: boolean | 'pagefind';
    friend?: FriendLink[];
  }
  interface Config extends DefaultTheme.Config {
    blog: BlogConfig;
  }
  interface HomeConfig {
    handleChangeSlogan?: (oldSlogan: string) => string | Promise<string>;
  }
}

declare function getThemeConfig(cfg?: Partial<Theme.BlogConfig>): {
  blog: {
    blog?: false | undefined;
    pagesData: Theme.PageData[];
    srcDir?: string | undefined;
    author?: string | undefined;
    search?: boolean | "pagefind" | undefined;
  };
  sidebar: {
    text: string;
    items: never[];
  }[];
};
declare function getDefaultTitle(content: string): string;
declare function clearMatterContent(content: string): string;
declare function getFileBirthTime(url: string): string;
declare function getGitTimestamp(file: string): Promise<unknown>;
declare function defineConfig(config: UserConfig<Theme.Config>): UserConfig<Theme.Config>;

export { clearMatterContent, defineConfig, getDefaultTitle, getFileBirthTime, getGitTimestamp, getThemeConfig };

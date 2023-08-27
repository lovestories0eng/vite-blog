<!--.vitepress/theme/MyLayout.vue-->
<script setup>
import BlogHomeInfo from './components/BlogHomeInfo.vue'
import BlogHomeBanner from './components/BlogHomeBanner.vue'
import BlogComment from './components/BlogComment.vue'
import BlogImagePreview from './components/BlogImagePreview.vue'
import BlogArticleAnalyze from './components/BlogArticleAnalyze.vue'
import BlogAlert from './components/BlogAlert.vue'
import BlogPopover from './components/BlogPopover.vue'
import BlogCategories from './components/BlogCategories.vue'

import Search from './components/Search.vue'
import BlogList from './components/BlogList.vue'
import DefaultTheme from 'vitepress/theme'

import { useBlogThemeMode } from './composables/config/blog'

const isBlogTheme = useBlogThemeMode()
const { Layout } = DefaultTheme
</script>

<template>
  <Layout>
    <template #layout-top>
      <BlogAlert />
      <BlogPopover />
    </template>
    <template #doc-before>
      <!-- 阅读时间分析 -->
      <ClientOnly>
        <BlogArticleAnalyze />
      </ClientOnly>
      <!-- 图片预览 -->
      <BlogImagePreview />
    </template>

    <!-- 自定义搜索 -->
    <template #nav-bar-content-before>
        <Search />
    </template>
    <!-- 自定义首页 -->
    <template #home-hero-before v-if="isBlogTheme">
      <div class="home">
        <div class="header-banner">
          <BlogHomeBanner />
        </div>
        <div class="content-wrapper">
          <div class="left">
            <div class="category-wrapper"><BlogCategories /></div>
            <div class="blog-list-wrapper"><blog-list /></div>
          </div>
          <div class="blog-info-wrapper"><BlogHomeInfo /></div>
        </div>
      </div>
    </template>
    <!-- 评论 -->
    <template #doc-after>
      <BlogComment />
    </template>
  </Layout>
</template>

<style scoped lang="scss">
.home {
  margin: 0 auto;
  padding: 20px;
  max-width: 1126px;
}

.left {
  width: 100%;
}

@media screen and (min-width: 960px) {
  .home {
    padding-top: var(--vp-nav-height);
  }
}

.header-banner {
  width: 100%;
  padding: 60px 0;
}

.content-wrapper {
  display: flex;
  align-items: flex-start;
  justify-content: center;
}

.category-wrapper {
  display: block;
  width: 100%;
  margin-bottom: 2vh;
  background-color: rgba(var(--bg-gradient));
  border-radius: 1vh;
  box-shadow: var(--box-shadow);
}

.blog-list-wrapper {
  width: 100%;
}
.blog-info-wrapper {
  margin-left: 16px;
  position: sticky;
  top: 100px;
}

@media screen and (max-width: 959px) {
  .blog-info-wrapper {
    margin-left: 16px;
    position: sticky;
    top: 40px;
  }
}

@media screen and (max-width: 767px) {
  .content-wrapper {
    flex-wrap: wrap;
  }

  .blog-info-wrapper {
    margin: 20px 0;
    width: 100%;
  }
}
</style>


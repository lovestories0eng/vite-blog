<template>
  <div>
    <el-card>
      <div class="category-header">
        文章分类
      </div>
      <div v-for="(val, key, index) in sidebar" :key="val" class="category-item" @click="changeHerf(val)">
        <div class="svg-text-wrapper">
          <svg-icon :size="20" class="category-icon svg" :name="metaData[index]"></svg-icon>
          <a  class="category-text">
            {{ key.substr(1, key.length - 2) }} ({{ val.length }})
          </a>
        </div>
        <el-icon :size="20" class="category-icon">
          <DArrowRight />
        </el-icon>
      </div>
    </el-card>
  </div>
</template>
  
<script lang="ts" setup>
import { useData } from 'vitepress'
const { site, frontmatter } = useData()
const categorySize = frontmatter.value.blog.categorySize;
const sidebar = site.value.themeConfig.sidebar

const metaData = ['docker', 'git', 'java', 'javascript', 'emotion', 'site', 'database', 'server', 'algorithm', 'network', 'interview']

const changeHerf = (val) => {
  window.location = val[val.length - 1].link.substr(0, val[val.length - 1].link.length - 3)
} 
</script>
  
<style lang="scss" scoped>
.category-header {
  text-align: center;
  display: block;
  padding: 10px;
  font-size: 30px;
  font-weight: bold;
}

.category-item {
  &:hover {
    .category-text {
      color: #409EFF;
      transform: translateX(1.2vw);
      -webkit-transform: translateX(1.2vw);
      transition: all 0.4s ease;
    }
  
    .category-icon {
      color: #409EFF;
      transform: translateX(-1.2vw);
      -webkit-transform: translateX(-1.2vw);
      transition: all 0.4s ease;
      &.svg {
        color: #409EFF;
        transform: translateX(1.2vw);
        -webkit-transform: translateX(1.2vw);
        transition: all 0.4s ease;
      }
    }

  }
  cursor: pointer;

  width: calc(50% - 1vw);
  display: inline-flex;
  box-shadow: var(--box-shadow-hover);
  background: rgba(var(--bg-gradient));;
  margin: 0.5vh 0.5vw;
  border-radius: 1vh;
  .svg-text-wrapper {
    display: inline-flex;
  }

  .category-text {
    display: inline-flex;
    transform: translateX(0);
    -webkit-transform: translateX(0);
    /* property name | duration | timing function | delay */
    transition: all 0.4s ease;
  }
  .category-icon {
    margin: auto;
    margin-right: 1vw;
    vertical-align: middle;
    width: 20px;
    transform: translateX(0);
    -webkit-transform: translateX(0);
    /* property name | duration | timing function | delay */
    transition: all 0.4s ease;
  }
  .category-text {
    font-size: 20px;
    margin-left: 0.5vw;
    padding: 1vh;
    vertical-align: middle;
  }

  .category-icon.svg {
    margin: auto;
    margin-left: 1vw;
  }
}
</style>
  
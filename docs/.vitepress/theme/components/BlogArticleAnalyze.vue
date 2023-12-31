<template>
  <div class="doc-analyze" v-if="showAnalyze" data-pagefind-ignore="all">
    <span>
      <el-icon><EditPen /></el-icon>
      字数：{{ wordCount }} 个字
    </span>
    <span>
      <el-icon><AlarmClock /></el-icon>
      预计：{{ readTime }} 分钟
    </span>
  </div>
  <div class="meta-des 123" ref="$des" id="hack-article-des">
    <span v-if="author">
      <el-icon><UserFilled /></el-icon>
      {{ author }}
    </span>
    <span>
      <el-icon><Clock /></el-icon>
      {{ publishDate }}
    </span>
  </div>
</template>

<script lang="ts" setup>
// 阅读时间计算方式参考
// https://zhuanlan.zhihu.com/p/36375802
import { useData, useRoute } from 'vitepress'
import { computed, onMounted, ref, watch } from 'vue'
import { ElIcon } from 'element-plus'
import { UserFilled, Clock, EditPen, AlarmClock } from '@element-plus/icons-vue'
import { useBlogConfig, useCurrentArticle } from '../composables/config/blog'
import countWord, { formatShowDate } from '../utils/index'
import { Theme } from '../composables/config'

const { article } = useBlogConfig()
const { frontmatter } = useData()
const showAnalyze = computed(
  () => frontmatter.value?.readingTime ?? article?.readingTime ?? true
)

const wordCount = ref(0)
const imageCount = ref(0)
const wordTime = computed(() => {
  return ~~((wordCount.value / 275) * 60)
})

const imageTime = computed(() => {
  const n = imageCount.value
  if (imageCount.value <= 10) {
    // 等差数列求和
    return n * 13 + (n * (n - 1)) / 2
  }
  return 175 + (n - 10) * 3
})

const readTime = computed(() => {
  return Math.ceil((wordTime.value + imageTime.value) / 60)
})

const route = useRoute()
const $des = ref<HTMLDivElement>()

const analyze = () => {
  if (!$des.value) {
    return
  }
  document.querySelectorAll('.meta-des').forEach((v) => v.remove())
  const docDomContainer = window.document.querySelector('#VPContent')
  const imgs = docDomContainer?.querySelectorAll<HTMLImageElement>(
    '.content-container .main img'
  )
  imageCount.value = imgs?.length || 0

  const words =
    docDomContainer?.querySelector('.content-container .main')?.textContent ||
    ''

  wordCount.value = countWord(words)
  docDomContainer?.querySelector('h1')?.after($des.value!)
}

onMounted(() => {
  const observer = new MutationObserver(() => {
    const targetInstance = document.querySelector('#hack-article-des')
    if (!targetInstance) {
      analyze()
    }
  })
  observer.observe(document.body, {
    childList: true, // 观察目标子节点的变化，是否有添加或者删除
    subtree: true // 观察后代节点，默认为 false
  })

  // 初始化时执行一次
  analyze()
})

// 阅读量
const pv = ref(6666)

const currentArticle = useCurrentArticle()
const publishDate = computed(() => {
  return formatShowDate(currentArticle.value?.meta?.date || '')
})

const { theme } = useData<Theme.Config>()
const globalAuthor = computed(() => theme.value.blog?.author || '')
const author = computed(
  () => currentArticle.value?.meta.author || globalAuthor.value
)

watch(
  () => route.path,
  () => {
    // TODO: 调用接口取数据
    pv.value = 123
  },
  {
    immediate: true
  }
)
</script>

<style lang="scss" scoped>
.doc-analyze {
  color: var(--vp-c-text-2);
  font-size: 14px;
  margin-bottom: 20px;
  display: flex;
  justify-content: center;
  span {
    margin-right: 16px;
    display: flex;
    align-items: center;
    .el-icon {
      margin-right: 4px;
    }
  }
}
.meta-des {
  text-align: left;
  color: var(--vp-c-text-2);
  font-size: 14px;
  margin-top: 6px;
  display: flex;
  span {
    margin-right: 16px;
    display: flex;
    align-items: center;
    .el-icon {
      margin-right: 4px;
    }
  }
}
</style>

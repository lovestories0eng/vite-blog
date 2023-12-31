<template>
  <div class="blog-search" data-pagefind-ignore="all">
    <div class="nav-search-btn-wait" @click="searchModal = true">
      <svg width="14" height="14" viewBox="0 0 20 20">
        <path
          d="M14.386 14.386l4.0877 4.0877-4.0877-4.0877c-2.9418 2.9419-7.7115 2.9419-10.6533 0-2.9419-2.9418-2.9419-7.7115 0-10.6533 2.9418-2.9419 7.7115-2.9419 10.6533 0 2.9419 2.9418 2.9419 7.7115 0 10.6533z"
          stroke="currentColor"
          fill="none"
          fill-rule="evenodd"
          stroke-linecap="round"
          stroke-linejoin="round"
        ></path>
      </svg>
      <span v-if="!isMinimized" class="search-tip">{{
        'Search'
      }}</span>
      <span v-if="!isMinimized" class="metaKey"> {{ metaKey }} K </span>
    </div>
    <Command.Dialog :visible="searchModal" theme="algolia">
      <template #header>
        <Command.Input
          v-model:value="searchWords"
          :placeholder="'Search Docs'"
        />
      </template>
      <template #body>
        <div class="search-dialog">
          <Command.List>
            <Command.Empty v-if="!searchResult.length">
              {{ 'No results found.' }}
            </Command.Empty>
            <Command.Group v-else :heading="headingText">
              <Command.Item
                v-for="item in showSearchResult"
                :data-value="withBase(item.route)"
                :key="item.route"
                @select="handleSelect"
              >
                <div class="link">
                  <div class="title">
                    <span>{{ item.meta.title }}</span>
                    <span class="date">
                      {{ formatDate(item.meta.date, 'yyyy-MM-dd') }}</span
                    >
                  </div>
                  <div class="des" v-html="item.meta.description"></div>
                </div>
              </Command.Item>
            </Command.Group>
          </Command.List>
        </div>
      </template>
      <template #footer v-if="searchResult.length">
        <div class="command-palette-logo">
          <a
            href="https://github.com/cloudcannon/pagefind"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span class="command-palette-Label">Search by</span>
            <logo-pagefind style="width: 77px" />
          </a>
        </div>
        <ul class="command-palette-commands">
          <li>
            <kbd class="command-palette-commands-key"
              ><svg width="15" height="15" aria-label="Enter key" role="img">
                <g
                  fill="none"
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="1.2"
                >
                  <path
                    d="M12 3.53088v3c0 1-1 2-2 2H4M7 11.53088l-3-3 3-3"
                  ></path>
                </g></svg></kbd
            ><span class="command-palette-Label">to select</span>
          </li>
          <li>
            <kbd class="command-palette-commands-key"
              ><svg width="15" height="15" aria-label="Arrow down" role="img">
                <g
                  fill="none"
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="1.2"
                >
                  <path d="M7.5 3.5v8M10.5 8.5l-3 3-3-3"></path>
                </g></svg></kbd
            ><kbd class="command-palette-commands-key"
              ><svg width="15" height="15" aria-label="Arrow up" role="img">
                <g
                  fill="none"
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="1.2"
                >
                  <path d="M7.5 11.5v-8M10.5 6.5l-3-3-3 3"></path>
                </g></svg></kbd
            ><span class="command-palette-Label">to navigate</span>
          </li>
          <li>
            <kbd class="command-palette-commands-key"
              ><svg width="15" height="15" aria-label="Escape key" role="img">
                <g
                  fill="none"
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="1.2"
                >
                  <path
                    d="M13.6167 8.936c-.1065.3583-.6883.962-1.4875.962-.7993 0-1.653-.9165-1.653-2.1258v-.5678c0-1.2548.7896-2.1016 1.653-2.1016.8634 0 1.3601.4778 1.4875 1.0724M9 6c-.1352-.4735-.7506-.9219-1.46-.8972-.7092.0246-1.344.57-1.344 1.2166s.4198.8812 1.3445.9805C8.465 7.3992 8.968 7.9337 9 8.5c.032.5663-.454 1.398-1.4595 1.398C6.6593 9.898 6 9 5.963 8.4851m-1.4748.5368c-.2635.5941-.8099.876-1.5443.876s-1.7073-.6248-1.7073-2.204v-.4603c0-1.0416.721-2.131 1.7073-2.131.9864 0 1.6425 1.031 1.5443 2.2492h-2.956"
                  ></path>
                </g></svg></kbd
            ><span class="command-palette-Label">to close</span>
          </li>
        </ul>
      </template>
    </Command.Dialog>
  </div>
</template>
<script lang="ts" setup>
// @ts-nocheck
import { computed, nextTick, ref, watch, onBeforeMount, onMounted } from 'vue'
import { Command } from 'vue-command-palette'
import { useRoute, useRouter, withBase } from 'vitepress'
import { useMagicKeys, useWindowSize } from '@vueuse/core'
import { useArticles } from '../composables/config/blog'
import { formatDate } from '../utils'
import LogoPagefind from './LogoPagefind.vue'

const windowSize = useWindowSize()

const docs = useArticles()

const isMinimized = computed(() => windowSize.width.value < 760)
const flexValue = computed(() => (isMinimized.value ? 0 : 1))

const headingText = computed(() => {
  return `Total: ${searchResult.value.length} search results.`
})

const addInlineScript = () => {
  // 使用script标签引入 pagefind.js 依赖
  const scriptText = `import('/_pagefind/pagefind.js')
        .then((module) => {
          window.__pagefind__ = module
        })
        .catch(() => {
          console.log('not load /_pagefind/pagefind.js')
        })`
  const inlineScript = document.createElement('script')
  inlineScript.innerHTML = scriptText
  document.head.appendChild(inlineScript)
}

onBeforeMount(() => {
  addInlineScript()
})

const metaKey = ref('')
onMounted(() => {
  metaKey.value = /(Mac|iPhone|iPod|iPad)/i.test(navigator?.platform)
    ? '⌘'
    : 'Ctrl'
})
const searchModal = ref(false)
const searchWords = ref('')

const keys = useMagicKeys()
const CmdK = keys['Meta+K']
// eslint-disable-next-line dot-notation, prefer-destructuring
const Escape = keys['Escape']

watch(CmdK, (v) => {
  if (v) {
    searchModal.value = true
  }
})
watch(Escape, (v) => {
  if (v) {
    searchModal.value = false
  }
})

const searchResult = ref<any[]>([])
const inlineSearch = () => {
  if (!searchWords.value) {
    searchResult.value = []
    return
  }
  searchResult.value = docs.value
    .filter((v) =>
      `${v.meta.description}${v.meta.title}`.includes(searchWords.value)
    )
    .map((v) => {
      return {
        ...v,
        meta: {
          ...v.meta,
          description:
            v.meta?.description?.replace(
              new RegExp(`(${searchWords.value})`, 'g'),
              '<mark>$1</mark>'
            ) || ''
        }
      }
    })
  searchResult.value.sort((a, b) => {
    return +new Date(b.meta.date) - +new Date(a.meta.date)
  })
}

watch(
  () => searchWords.value,
  async () => {
    // dev-server兜底
    if (!window?.__pagefind__?.search) {
      inlineSearch()
    } else {
      await window?.__pagefind__
        ?.search?.(searchWords.value)
        .then(async (search: any) => {
          const result = await Promise.all(
            search.results.map((v: any) => v.data())
          )
          searchResult.value = []
          docs.value.forEach((v) => {
            const match = result.find((r) => r.url.startsWith(v.route))
            if (match) {
              searchResult.value.push({
                ...v,
                meta: {
                  ...v.meta,
                  description: match.excerpt
                }
              })
            }
          })
        })
    }
    nextTick(() => {
      // hack 原组件实现
      document.querySelectorAll('div[aria-disabled="true"]').forEach((v) => {
        v.setAttribute('aria-disabled', 'false')
      })
    })
  }
)

const handleClickMask = (e: any) => {
  if (e.target === e.currentTarget) {
    searchModal.value = false
  }
}
watch(
  () => searchModal.value,
  (newValue) => {
    if (newValue) {
      nextTick(() => {
        document
          .querySelector('div[command-dialog-mask]')
          ?.addEventListener('click', handleClickMask)
      })
    } else {
      document
        .querySelector('div[command-dialog-mask]')
        ?.removeEventListener('click', handleClickMask)
    }
  }
)
// TODO：搜索结果限制
const pageSize = ref(999)
const currentPage = ref(0)
const showSearchResult = computed(() => {
  // 合法性处理
  const pageIdx =
    currentPage.value % Math.ceil(searchResult.value.length / pageSize.value)
  const startIdx = pageIdx * pageSize.value
  return searchResult.value.slice(startIdx, startIdx + pageSize.value)
})

const router = useRouter()
const route = useRoute()
const handleSelect = (target: any) => {
  searchModal.value = false
  if (!route.path.startsWith(target.value)) {
    // searchWords.value = ''
    router.go(target.value)
  }
}
</script>

<style lang="css" scoped>
.blog-search {
  flex: v-bind(flexValue);
  display: flex;
  padding-left: 32px;
}
.blog-search .nav-search-btn-wait {
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 6px;
  box-sizing: border-box;
}
.blog-search .nav-search-btn-wait .metaKey {
  margin-left: 10px;
  font-size: 12px;
}
.blog-search .nav-search-btn-wait:hover {
  border: 1px solid var(--vp-c-brand);
  border-radius: 6px;
}
.blog-search .nav-search-btn-wait .search-tip {
  color: #909399;
  font-size: 12px;
  padding-left: 10px;
}
</style>

<style lang="css">
@import './search.css';
</style>

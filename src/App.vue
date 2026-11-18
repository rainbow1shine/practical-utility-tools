<template>
  <div class="app-layout" :class="{ 'sb-open': sbOpen }">
    <!-- 手机顶栏 -->
    <header class="mobile-header" @click="sbOpen = true">
      <button class="mburger">☰</button>
      <span class="mtitle">🧰 上午工具箱</span>
      <span class="mspacer"></span>
    </header>

    <!-- 侧栏（桌面端常驻 / 手机端抽屉） -->
    <div class="sb-mask" v-if="sbOpen" @click="sbOpen = false"></div>
    <Sidebar
      :currentTool="currentTool"
      :searchQuery="searchQuery"
      :expandedGroups="expandedGroups"
      @update:searchQuery="searchQuery = $event"
      @toggleGroup="toggleGroup"
      @selectTool="(id) => { selectTool(id); sbOpen = false }"
      @goHome="goHome"
      @close="sbOpen = false"
    />

    <div class="main-area" :class="{ 'has-toolbar': currentTool !== 'home' }">
      <!-- 工具页面包屑 -->
      <div class="mobile-crumb" v-if="currentTool !== 'home'">
        <span @click="goHome">🏠 首页</span>
        <span class="sep">›</span>
        <span>{{ currentTitle }}</span>
      </div>
      <Home v-if="currentTool === 'home'" @selectTool="selectTool" />
      <ToolView v-else :toolId="currentTool" />
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import Sidebar from './components/Sidebar/index.vue'
import Home from './components/Home/index.vue'
import ToolView from './components/ToolView/index.vue'
import { TOOLS } from './data/tools.js'

const currentTool = ref('home')
const searchQuery = ref('')
const expandedGroups = ref(['calc', 'date', 'text', 'gen', 'file', 'life', 'game'])
const sbOpen = ref(false)

const currentTitle = computed(() => {
  const t = TOOLS.find(x => x.id === currentTool.value)
  return t ? `${t.icon} ${t.title}` : ''
})

const selectTool = (id) => { currentTool.value = id }
const goHome = () => { currentTool.value = 'home'; sbOpen.value = false }
const toggleGroup = (g) => {
  const i = expandedGroups.value.indexOf(g)
  if (i >= 0) expandedGroups.value.splice(i, 1)
  else expandedGroups.value.push(g)
}
</script>

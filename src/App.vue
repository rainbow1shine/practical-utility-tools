<template>
  <div class="app-layout">
    <Sidebar
      :currentTool="currentTool"
      :searchQuery="searchQuery"
      :expandedGroups="expandedGroups"
      @update:searchQuery="searchQuery = $event"
      @toggleGroup="toggleGroup"
      @selectTool="selectTool"
      @goHome="goHome"
    />
    <div class="main-area">
      <Home v-if="currentTool === 'home'" @selectTool="selectTool" />
      <ToolView v-else :toolId="currentTool" />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import Sidebar from './components/Sidebar/index.vue'
import Home from './components/Home/index.vue'
import ToolView from './components/ToolView/index.vue'

const currentTool = ref('home')
const searchQuery = ref('')
const expandedGroups = ref(['calc', 'date', 'text', 'gen', 'file', 'life', 'game'])

const selectTool = (id) => { currentTool.value = id }
const goHome = () => { currentTool.value = 'home' }
const toggleGroup = (g) => {
  const i = expandedGroups.value.indexOf(g)
  if (i >= 0) expandedGroups.value.splice(i, 1)
  else expandedGroups.value.push(g)
}
</script>

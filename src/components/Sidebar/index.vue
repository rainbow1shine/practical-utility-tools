<template>
  <aside class="sidebar">
    <div class="sb-logo" @click="$emit('goHome')" style="cursor:pointer">🧰 上午工具箱</div>
    <div class="sb-search">
      <input
        :value="searchQuery"
        @input="$emit('update:searchQuery', $event.target.value)"
        placeholder="🔍 搜索工具..."
      />
    </div>
    <div v-for="g in groups" :key="g.id">
      <div
        class="sb-group-title"
        :class="{ collapsed: !expandedGroups.includes(g.id) }"
        @click="$emit('toggleGroup', g.id)"
      >
        <span>{{ g.icon }} {{ g.name }}</span>
        <span class="arrow">▼</span>
      </div>
      <div class="sb-items" :style="{ maxHeight: expandedGroups.includes(g.id) ? '800px' : '0' }">
        <div
          v-for="t in g.tools"
          :key="t.id"
          class="sb-item"
          :class="{ active: currentTool === t.id }"
          @click="$emit('selectTool', t.id)"
        >
          <span>{{ t.icon }}</span>
          <span>{{ t.title }}</span>
        </div>
      </div>
    </div>
  </aside>
</template>

<script setup>
import { computed } from 'vue'
import { TOOLS, CATEGORIES } from '../../data/tools.js'

const props = defineProps({
  currentTool: String,
  searchQuery: String,
  expandedGroups: Array,
})
defineEmits(['update:searchQuery', 'toggleGroup', 'selectTool', 'goHome'])

const filteredTools = computed(() => {
  const q = props.searchQuery.trim().toLowerCase()
  if (!q) return TOOLS
  return TOOLS.filter(t =>
    t.title.toLowerCase().includes(q) ||
    t.desc.toLowerCase().includes(q) ||
    t.icon.includes(q)
  )
})

const groups = computed(() => {
  return CATEGORIES.map(c => ({
    ...c,
    tools: filteredTools.value.filter(t => t.cat === c.id)
  })).filter(g => g.tools.length > 0)
})
</script>

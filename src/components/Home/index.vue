<template>
  <div class="home-view">
    <div class="page-header">
      <h1>🧰 万能上午工具箱</h1>
      <div class="ph-desc">31 个实用工具 · 9 款小游戏 · 单文件零依赖 · 全本地处理</div>
    </div>
    <div class="cat-grid">
      <div
        v-for="c in cats"
        :key="c.id"
        class="cat-card"
        @click="$emit('selectTool', c.tools[0].id)"
      >
        <div class="cat-icon">{{ c.icon }}</div>
        <div class="cat-info">
          <div class="cat-name">{{ c.name }}</div>
          <div class="cat-count">{{ c.tools.length }} 个工具</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { CATEGORIES, TOOLS } from '../../data/tools.js'

defineEmits(['selectTool'])

const cats = computed(() => {
  return CATEGORIES.map(c => ({
    ...c,
    tools: TOOLS.filter(t => t.cat === c.id)
  }))
})
</script>

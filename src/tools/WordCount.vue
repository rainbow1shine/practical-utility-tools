<template>
  <div>
    <textarea v-model="text" class="input" rows="6" placeholder="粘贴文本进来..." style="resize:vertical"></textarea>
    <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:10px;margin-top:14px">
      <div class="result-box" style="text-align:center"><b>{{ stats.chars }}</b> 总字符</div>
      <div class="result-box" style="text-align:center"><b>{{ stats.noSpace }}</b> 不含空格</div>
      <div class="result-box" style="text-align:center"><b>{{ stats.cn }}</b> 中文字</div>
      <div class="result-box" style="text-align:center"><b>{{ stats.en }}</b> 英文单词</div>
      <div class="result-box" style="text-align:center"><b>{{ stats.lines }}</b> 行数</div>
      <div class="result-box" style="text-align:center"><b>{{ stats.paragraphs }}</b> 段落</div>
    </div>
    <div v-if="topChars.length" style="margin-top:14px">
      <div class="label">字频 Top10</div>
      <div style="display:flex;flex-wrap:wrap;gap:6px;margin-top:6px">
        <span v-for="c in topChars" :key="c[0]" class="tag">{{ c[0] }} × {{ c[1] }}</span>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, computed } from 'vue'
const text = ref('')
const stats = computed(() => {
  const t = text.value
  return {
    chars: t.length, noSpace: t.replace(/\s/g,'').length,
    cn: (t.match(/[\u4e00-\u9fa5]/g)||[]).length,
    en: (t.match(/[a-zA-Z]+/g)||[]).length,
    lines: t.split('\n').length, paragraphs: t.split(/\n\s*\n/).length
  }
})
const topChars = computed(() => {
  const m = {}; for(const c of text.value.replace(/\s/g,'')) m[c] = (m[c]||0)+1
  return Object.entries(m).sort((a,b)=>b[1]-a[1]).slice(0,10)
})
</script>

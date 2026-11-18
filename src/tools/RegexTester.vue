<template>
  <div>
    <div class="col"><span class="label">正则</span><input v-model="pat" class="input" placeholder="如 d+" /></div>
    <div class="col"><span class="label">标志</span><input v-model="flags" class="input" style="width:80px" placeholder="gi" /></div>
    <div class="col"><span class="label">测试文本</span><textarea v-model="text" class="input" rows="4">电话13812345678，邮箱test@example.com</textarea></div>
    <button class="btn btn-primary" @click="test">🔍 测试匹配</button>
    <div class="result-box" style="margin-top:12px" v-if="matches.length">匹配 {{ matches.length }} 处：<span v-for="(m,i) in matches" :key="i" class="tag" style="margin:2px">{{ m }}</span></div>
    <div v-else-if="err" class="result-box" style="color:#e17055">❌ {{ err }}</div>
    <div v-else class="result-box" style="color:#636e72">无匹配</div>
  </div>
</template>
<script setup>
import { ref } from 'vue'
const pat = ref('\\d+'); const flags = ref('g'); const text = ref(''); const matches = ref([]); const err = ref('')
const test = () => {
  try {
    const re = new RegExp(pat.value, flags.value)
    matches.value = text.value.match(re) || []; err.value = ''
  } catch(e){ err.value = e.message; matches.value = [] }
}
</script>

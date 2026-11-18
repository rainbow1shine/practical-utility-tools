<template>
  <div>
    <div class="col"><span class="label">Emoji</span><input v-model="em" class="input" placeholder="😊👋🌍" /></div>
    <div class="row"><button class="btn btn-primary" @click="e2c">→ 码点</button><button class="btn btn-secondary" @click="c2e">码点 →</button></div>
    <div class="col"><span class="label">码点（空格分隔）</span><input v-model="code" class="input" placeholder="1F60A 1F44B 1F30D" /></div>
    <div class="result-box" style="margin-top:12px">{{ result }}</div>
  </div>
</template>
<script setup>
import { ref } from 'vue'
const em = ref('😊👋🌍'); const code = ref(''); const result = ref('')
const e2c = () => { result.value = [...em.value].map(c => '\\u{' + c.codePointAt(0).toString(16).toUpperCase() + '}').join(' ') }
const c2e = () => {
  try { result.value = code.value.trim().split(/\s+/).map(c => String.fromCodePoint(parseInt(c,16))).join('') }
  catch(e){ result.value = '❌ 码点错误' }
}
</script>

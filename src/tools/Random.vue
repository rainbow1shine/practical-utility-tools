<template>
  <div>
    <div class="row"><span class="label">范围</span><input v-model="min" class="input" style="width:80px" />到<input v-model="max" class="input" style="width:80px" /></div>
    <div class="row"><span class="label">数量</span><input v-model="count" class="input" style="width:80px" /></div>
    <div class="row"><label><input type="checkbox" v-model="allowDup" /> 允许重复</label><label><input type="checkbox" v-model="floats" /> 小数</label></div>
    <button class="btn btn-primary" @click="gen">🎲 生成随机数</button>
    <div class="result-box" style="margin-top:14px">{{ results.join(', ') || '点击生成' }}</div>
  </div>
</template>
<script setup>
import { ref } from 'vue'
const min = ref(1); const max = ref(100); const count = ref(10); const allowDup = ref(true); const floats = ref(false)
const results = ref([])
const gen = () => {
  const mn = +min.value, mx = +max.value, n = +count.value
  const out = []; const set = new Set()
  while(out.length < n) {
    const v = floats.value ? mn + Math.random()*(mx-mn) : Math.floor(Math.random()*(mx-mn+1))+mn
    const str = floats.value ? v.toFixed(2) : v.toString()
    if(!allowDup.value){ if(set.has(str)) continue; set.add(str) }
    out.push(str)
  }
  results.value = out
}
</script>

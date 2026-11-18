<template>
  <div>
    <div class="row">
      <button class="btn btn-sm" :class="{active:mode==='sw'}" @click="setMode('sw')">秒表</button>
      <button class="btn btn-sm" :class="{active:mode==='cd'}" @click="setMode('cd')">倒计时</button>
    </div>
    <div class="row" v-if="mode==='cd'"><span class="label">秒数</span><input v-model="cdSec" class="input" style="width:80px" /></div>
    <div style="font-size:48px;font-weight:700;font-family:Consolas,monospace;color:#0984e3;letter-spacing:2px;margin:16px 0;text-align:center">{{ display }}</div>
    <div class="row" style="justify-content:center">
      <button class="btn btn-primary" @click="start" v-if="!running">▶️ 开始</button>
      <button class="btn btn-secondary" @click="pause" v-else>⏸️ 暂停</button>
      <button class="btn btn-danger" @click="reset">🔄 重置</button>
      <button class="btn btn-sm" @click="lap" v-if="mode==='sw'">🏁 计次</button>
    </div>
    <div v-if="mode==='sw' && laps.length" class="result-box" style="margin-top:12px">🏁 {{ laps.join(' | ') }}</div>
  </div>
</template>
<script setup>
import { ref, computed, onUnmounted } from 'vue'
const mode = ref('sw'); const elapsed = ref(0); const cdSec = ref(60); const left = ref(60); const running = ref(false); const laps = ref([])
let timer = null
const display = computed(() => {
  const t = mode.value==='sw' ? elapsed.value : left.value
  const m = Math.floor(t/60), s = Math.floor(t%60)
  if(mode.value==='sw'){
    const ms = Math.floor((elapsed.value % 1) * 100)
    return String(m).padStart(2,'0')+':'+String(s).padStart(2,'0')+'.'+String(ms).padStart(2,'0')
  }
  return String(m).padStart(2,'0')+':'+String(s).padStart(2,'0')
})
const setMode = m => { mode.value = m; reset() }
const start = () => {
  running.value = true
  timer = setInterval(() => {
    if(mode.value==='sw') elapsed.value += 0.01
    else { left.value -= 1; if(left.value<=0){ pause(); left.value=0 } }
  }, 10)
}
const pause = () => { running.value=false; clearInterval(timer) }
const reset = () => { pause(); elapsed.value=0; left.value=+cdSec.value; laps.value=[] }
const lap = () => laps.value.push(display.value)
onUnmounted(()=>clearInterval(timer))
</script>
<style scoped>.active{background:#0984e3;color:#fff}</style>

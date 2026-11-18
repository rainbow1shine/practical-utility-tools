<template>
  <div>
    <div class="col" style="text-align:center">
      <div style="font-size:20px;font-weight:600;color:#0984e3">{{ nowStr }}</div>
      <div style="font-size:28px;font-family:Consolas,monospace;color:#2d3436">{{ nowTs }}</div>
    </div>
    <div class="row"><span class="label">时间戳</span><input v-model="ts" class="input" style="flex:1" /><button class="btn btn-primary btn-sm" @click="ts2date">转日期</button></div>
    <div class="row"><span class="label">日期</span><input v-model="dt" class="input" style="flex:1" /><button class="btn btn-primary btn-sm" @click="date2ts">转时间戳</button></div>
    <div class="result-box" v-if="converted">{{ converted }}</div>
  </div>
</template>
<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
const nowTs = ref(Math.floor(Date.now()/1000)); const nowStr = ref(new Date().toLocaleString())
const ts = ref(''); const dt = ref(''); const converted = ref('')
let upd
onMounted(()=>{ upd = setInterval(()=>{ nowTs.value=Math.floor(Date.now()/1000); nowStr.value=new Date().toLocaleString() },1000) })
onUnmounted(()=>clearInterval(upd))
const ts2date = () => {
  let t = +ts.value; if(t.toString().length>13) t = Math.floor(t/1000)
  converted.value = '→ ' + new Date(t*1000).toLocaleString()
}
const date2ts = () => {
  const t = new Date(dt.value).getTime()
  if(!isNaN(t)) converted.value = '→ 秒: ' + Math.floor(t/1000) + ' / 毫秒: ' + t
}
</script>

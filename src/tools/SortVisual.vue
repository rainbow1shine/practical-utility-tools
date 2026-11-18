<template>
  <div>
    <div class="row">
      <button class="btn btn-sm" @click="gen">🎲 重新生成</button>
      <select v-model="algo" class="input" style="width:120px"><option value="bubble">冒泡排序</option><option value="quick">快速排序</option></select>
      <button class="btn btn-primary btn-sm" @click="run" :disabled="running">▶️ 开始排序</button>
    </div>
    <div style="display:flex;align-items:flex-end;gap:3px;height:180px;border-bottom:1px solid #ddd;padding:10px;background:#fff;border-radius:8px">
      <div v-for="(v,i) in arr" :key="i" :style="{height:(v*2)+'px',width:'18px',background:active===i?'#e17055':'linear-gradient(180deg,#0984e3,#00b894)',borderRadius:'3px 3px 0 0',transition:'all 0.15s'}"></div>
    </div>
    <div class="result-box" style="margin-top:10px">{{ arr.join(' → ') }}</div>
  </div>
</template>
<script setup>
import { ref } from 'vue'
const arr = ref([]); const algo = ref('bubble'); const running = ref(false); const active = ref(-1)
const gen = () => { arr.value = Array.from({length:25}, () => Math.floor(Math.random()*150)+20) }
gen()
const sleep = ms => new Promise(r => setTimeout(r, ms))
const run = async () => {
  if(running.value) return; running.value = true
  const a = [...arr.value]
  if(algo.value === 'bubble'){
    for(let i=0;i<a.length-1;i++)
      for(let j=0;j<a.length-i-1;j++){
        active.value = j; await sleep(30)
        if(a[j]>a[j+1]){ [a[j],a[j+1]]=[a[j+1],a[j]]; arr.value=[...a]; await sleep(20) }
      }
  } else { await qs(a, 0, a.length-1) }
  active.value=-1; running.value=false
}
async function qs(a, lo, hi){
  if(lo>=hi) return
  const pivot=a[hi]; let i=lo
  for(let j=lo;j<hi;j++){
    active.value=j; await sleep(40)
    if(a[j]<pivot){ [a[i],a[j]]=[a[j],a[i]]; i++; arr.value=[...a] }
  }
  [a[i],a[hi]]=[a[hi],a[i]]; arr.value=[...a]; await sleep(40)
  await qs(a, lo, i-1); await qs(a, i+1, hi)
}
</script>

<template>
  <div>
    <div class="col"><span class="label">IPv4 地址</span><input v-model="ip" class="input" placeholder="如 192.168.1.1" /></div>
    <div class="row"><button class="btn btn-primary" @click="calc">🔍 计算</button><button class="btn btn-secondary" @click="gen">🎲 随机 IP</button></div>
    <div class="result-box" style="margin-top:12px;white-space:pre-wrap" v-if="out">{{ out }}</div>
  </div>
</template>
<script setup>
import { ref } from 'vue'
const ip = ref('192.168.1.1'); const out = ref('')
const calc = () => {
  const p = ip.value.split('.').map(Number)
  if(p.length!==4 || p.some(x=>isNaN(x)||x<0||x>255)){ out.value='❌ IP 格式错误'; return }
  const dec = p.reduce((a,b)=>a*256+b,0)
  const bin = p.map(x=>x.toString(2).padStart(8,'0')).join('.')
  const cls = p[0]<128?'A类':p[0]<192?'B类':p[0]<224?'C类':p[0]<240?'D类':'E类'
  out.value = `📡 ${ip.value}\n🔢 十进制：${dec}\n🟦 二进制：${bin}\n🏷️ 网段：${cls}`
}
const gen = () => { ip.value = Array.from({length:4},()=>Math.floor(Math.random()*256)).join('.'); calc() }
</script>

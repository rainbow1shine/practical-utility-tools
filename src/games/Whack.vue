<template>
  <div>
    <div class="row">
      <button class="btn btn-primary btn-sm" @click="start" v-if="!running">▶️ 开始游戏</button>
      <span style="margin-left:10px">得分：<b>{{ score }}</b> · 剩余：<b>{{ time }}</b> 秒</span>
    </div>
    <div style="display:grid;grid-template-columns:repeat(3,100px);gap:10px;margin-top:14px;justify-content:center">
      <button v-for="(h,i) in holes" :key="i" class="whack" :class="{hit:h.pop}" @click="hit(i)">
        <span v-if="h.pop" style="font-size:48px;animation:bounce 0.3s">🔨</span>
        <span v-else style="font-size:40px">⚫</span>
      </button>
    </div>
    <div class="result-box" style="margin-top:12px;text-align:center">
      <div v-if="!running && time===30" style="font-size:14px;color:#636e72">点击开始，30 秒内敲到尽可能多地鼠！</div>
      <div v-if="!running && time===0" style="font-size:18px;font-weight:700;color:#0984e3">游戏结束！得分 {{ score }} 🎯</div>
    </div>
  </div>
</template>
<script setup>
import { ref, onUnmounted } from 'vue'
const holes = ref(Array.from({length:9},()=>({pop:false})))
const running = ref(false); const score = ref(0); const time = ref(30)
let mt, tt
function start(){ score.value=0; time.value=30; running.value=true
  mt=setInterval(mole, 800); tt=setInterval(()=>{ time.value--; if(time.value<=0) pause() },1000) }
function pause(){ running.value=false; clearInterval(mt); clearInterval(tt); holes.value.forEach(h=>h.pop=false) }
function mole(){ holes.value.forEach(h=>h.pop=false); const idx=Math.floor(Math.random()*9); holes.value[idx].pop=true
  setTimeout(()=>{ if(holes.value[idx]) holes.value[idx].pop=false }, 600) }
function hit(i){ if(holes.value[i].pop){ score.value++; holes.value[i].pop=false } }
onUnmounted(pause)
</script>
<style scoped>.whack{width:100px;height:100px;border-radius:50%;background:#a29bfe;border:3px solid rgba(9,132,227,0.3);cursor:pointer;display:flex;align-items:center;justify-content:center}.whack:hover{background:#74b9ff}.whack.hit{background:#00b894}@keyframes bounce{0%,100%{transform:scale(1)}50%{transform:scale(1.3)}}</style>

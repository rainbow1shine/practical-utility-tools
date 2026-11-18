<template>
  <div>
    <div class="row">
      <button class="btn btn-primary btn-sm" @click="newGame">🔄 新游戏</button>
      <span class="label" style="margin-left:10px">得分：<b>{{ score }}</b> · 最高：<b>{{ best }}</b></span>
    </div>
    <div style="display:grid;grid-template-columns:repeat(4,80px);gap:6px;margin-top:14px;background:#bbada0;padding:6px;border-radius:8px">
      <div v-for="(v,i) in grid" :key="i" :style="{...tileStyle(v)}" class="t2048">{{ v || '' }}</div>
    </div>
    <div style="margin-top:10px;font-size:12px;color:#636e72">方向键或 W/A/S/D 控制</div>
    <div v-if="over" style="color:#d63031;font-weight:700;margin-top:6px">游戏结束！得分：{{ score }}</div>
  </div>
</template>
<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
const grid = ref(Array(16).fill(0)); const score = ref(0)
const best = computed(()=> +localStorage.getItem('2048best')||0); let over = ref(false)
const colors = {0:'#cdc1b4',2:'#eee4da',4:'#ede0c8',8:'#f2b179',16:'#f59563',32:'#f67c5f',64:'#f65e3b',128:'#edcf72',256:'#edcc61',512:'#edc850',1024:'#edc53f',2048:'#edc22e'}
const tileStyle = v => ({ background: colors[v]||'#3c3a32', color: v<=4?'#776e65':'#f9f6f2', fontSize: v>=1024?'20px':'26px' })
function newGame(){ grid.value=Array(16).fill(0); score.value=0; over.value=false; add2(); add2() }
function add2(){ const z=grid.value.map((v,i)=>v?null:i).filter(i=>i!==null); if(z.length) grid.value[z[Math.floor(Math.random()*z.length)]]=2 }
function slide(row){
  const f = row.filter(v=>v); let s=0; for(let i=0;i<f.length-1;i++) if(f[i]===f[i+1]){ f[i]*=2; s+=f[i]; f.splice(i+1,1); score.value+=f[i] }
  while(f.length<4) f.push(0); return {row:f,s}
}
function move(dir){
  const g=[...grid.value]; let moved=false; let addedScore=0
  const getLine = d => { const idx=[]; if(d===0) for(let i=0;i<4;i++) idx.push([i*4,i*4+1,i*4+2,i*4+3])
    if(d===1) for(let i=0;i<4;i++) idx.push([i,i+4,i+8,i+12])
    if(d===2) for(let i=0;i<4;i++) idx.push([i*4+3,i*4+2,i*4+1,i*4])
    if(d===3) for(let i=0;i<4;i++) idx.push([i+12,i+8,i+4,i]); return idx }
  for(const ln of getLine(dir)){
    const r=ln.map(i=>g[i]); const {row,s}=slide(r); addedScore+=s
    ln.forEach((i,j)=>{ if(g[i]!==row[j]) moved=true; g[i]=row[j] })
  }
  if(moved){ grid.value=g; score.value+=addedScore; add2(); if(!grid.value.includes(0)&&!canMove()) over.value=true
    if(score.value>best.value) localStorage.setItem('2048best',score.value) }
}
function canMove(){ for(let i=0;i<16;i++) if(grid.value[i]===grid.value[i+1]&&i%4!==3) return true; for(let i=0;i<12;i++) if(grid.value[i]===grid.value[i+4]) return true; return false }
function kd(e){ if(['ArrowUp','w','W'].includes(e.key)){move(1);e.preventDefault()}
  else if(['ArrowDown','s','S'].includes(e.key)){move(3);e.preventDefault()}
  else if(['ArrowLeft','a','A'].includes(e.key)){move(0);e.preventDefault()}
  else if(['ArrowRight','d','D'].includes(e.key)){move(2);e.preventDefault()} }
onMounted(()=>{ newGame(); window.addEventListener('keydown',kd) })
onUnmounted(()=>window.removeEventListener('keydown',kd))
</script>
<style scoped>.t2048{width:80px;height:80px;border-radius:6px;display:flex;align-items:center;justify-content:center;font-weight:700;transition:all 0.15s}</style>

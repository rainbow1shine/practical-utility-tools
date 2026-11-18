<template>
  <div>
    <div class="row">
      <button class="btn btn-primary btn-sm" @click="start" v-if="!running">▶️ 开始</button>
      <button class="btn btn-secondary btn-sm" @click="pause" v-else>⏸️ 暂停</button>
      <button class="btn btn-danger btn-sm" @click="reset">🔄 重置</button>
      <span class="label" style="margin-left:10px">得分：<b>{{ score }}</b></span>
    </div>
    <canvas ref="cvs" width="400" height="400" style="border:2px solid rgba(9,132,227,0.3);border-radius:8px;margin-top:10px;display:block"></canvas>
    <div class="row" style="justify-content:center;margin-top:10px">
      <button class="btn btn-sm" @click="setDir(0,-1)">↑</button>
    </div>
    <div class="row" style="justify-content:center">
      <button class="btn btn-sm" @click="setDir(-1,0)">←</button>
      <button class="btn btn-sm" @click="setDir(1,0)">→</button>
    </div>
    <div class="row" style="justify-content:center">
      <button class="btn btn-sm" @click="setDir(0,1)">↓</button>
    </div>
  </div>
</template>
<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
const cvs = ref(null); let ctx = null
const W = 20, H = 20, S = 20
let snake = [], dir = [1,0], food = [0,0], score = ref(0)
let running = ref(false); let timer = null
function reset(){
  snake = [[10,10],[9,10],[8,10]]; dir=[1,0]; score.value=0
  placeFood(); draw()
}
function placeFood(){
  while(true){
    const f = [Math.floor(Math.random()*W), Math.floor(Math.random()*H)]
    if(!snake.some(s=>s[0]===f[0]&&s[1]===f[1])){ food = f; break }
  }
}
function draw(){
  ctx.fillStyle='#fafcff'; ctx.fillRect(0,0,W*S,H*S)
  ctx.fillStyle='#d63031'; ctx.fillRect(food[0]*S,food[1]*S,S-2,S-2)
  ctx.fillStyle='#00b894'; snake.forEach((s,i)=>{ ctx.fillStyle=i===0?'#0984e3':'#00b894'; ctx.fillRect(s[0]*S,s[1]*S,S-2,S-2) })
}
function step(){
  const head = [snake[0][0]+dir[0], snake[0][1]+dir[1]]
  if(head[0]<0||head[0]>=W||head[1]<0||head[1]>=H||snake.some(s=>s[0]===head[0]&&s[1]===head[1])){ pause(); alert('Game Over! 得分：'+score.value); reset(); return }
  snake.unshift(head)
  if(head[0]===food[0]&&head[1]===food[1]){ score.value+=10; placeFood() }
  else snake.pop()
  draw()
}
function start(){ running.value=true; timer=setInterval(step,120) }
function pause(){ running.value=false; clearInterval(timer) }
function setDir(x,y){ if(dir[0]!==-x||dir[1]!==-y) dir=[x,y] }
function kd(e){ if(e.key==='ArrowUp') setDir(0,-1); if(e.key==='ArrowDown') setDir(0,1); if(e.key==='ArrowLeft') setDir(-1,0); if(e.key==='ArrowRight') setDir(1,0) }
onMounted(()=>{ ctx=cvs.value.getContext('2d'); reset(); window.addEventListener('keydown',kd) })
onUnmounted(()=>{ clearInterval(timer); window.removeEventListener('keydown',kd) })
</script>

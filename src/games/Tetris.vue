<template>
  <div>
    <div class="row">
      <button class="btn btn-primary btn-sm" @click="start">▶️ 开始</button>
      <button class="btn btn-secondary btn-sm" @click="pause">⏸️ 暂停</button>
      <button class="btn btn-danger btn-sm" @click="reset">🔄 重置</button>
      <span style="margin-left:10px">得分：<b>{{ score }}</b> · 行：<b>{{ lines }}</b></span>
    </div>
    <div style="display:flex;gap:14px;margin-top:10px">
      <canvas ref="cvs" width="200" height="400" style="border:2px solid rgba(9,132,227,0.3);border-radius:6px"></canvas>
      <div>
        <div class="label">下一个</div>
        <canvas ref="nextCvs" width="80" height="80" style="border:1px solid rgba(0,0,0,0.1);border-radius:4px"></canvas>
        <div style="margin-top:8px;font-size:11px;color:#636e72">← → 移动<br>↑ 旋转<br>↓ 加速<br>空格 直落</div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
const cvs = ref(null); const nextCvs = ref(null); let ctx, nctx
const COLS=10, ROWS=20, S=20
let grid, cur, nxt, score = ref(0), lines = ref(0)
let timer=null; let piece = 0
const pieces = [
  [[1,1,1,1]], // I
  [[1,1],[1,1]], // O
  [[0,1,0],[1,1,1]], // T
  [[1,0,0],[1,1,1]], // J
  [[0,0,1],[1,1,1]], // L
  [[0,1,1],[1,1,0]], // S
  [[1,1,0],[0,1,1]], // Z
]
const colors=['#00b894','#fdcb6e','#e17055','#0984e3','#6c5ce7','#00cec9','#d63031']
function newPiece(){ cur=nxt||rand(); nxt=rand(); cur.x=Math.floor(COLS/2)-Math.floor(cur.shape[0].length/2); cur.y=0 }
function rand(){ return {shape:pieces[piece%pieces.length].map(r=>[...r]), color:colors[piece%colors.length]} }
function rotate(){ cur.shape = cur.shape[0].map((_,i)=>cur.shape.map(r=>r[i]).reverse()) }
function collide(dx=0,dy=0,s=cur.shape){
  for(let y=0;y<s.length;y++) for(let x=0;x<s[y].length;x++) if(s[y][x]){
    const nx=cur.x+x+dx, ny=cur.y+y+dy
    if(nx<0||nx>=COLS||ny>=ROWS) return true
    if(ny>=0 && grid[ny][nx]) return true
  }
  return false
}
function lock(){
  cur.shape.forEach((row,y)=>row.forEach((v,x)=>{ if(v&&cur.y+y>=0) grid[cur.y+y][cur.x+x]=cur.color }))
  clearLines(); newPiece(); if(collide()) pause()
}
function clearLines(){
  for(let y=ROWS-1;y>=0;y--){
    if(grid[y].every(c=>c)){ grid.splice(y,1); grid.unshift(Array(COLS).fill(0)); score.value+=100; lines.value++; y++ }
  }
}
function step(){ if(!collide(0,1)) cur.y++; else lock(); draw() }
function drawNext(){
  nctx.fillStyle='#fafcff'; nctx.fillRect(0,0,80,80); nxt.shape.forEach((row,y)=>row.forEach((v,x)=>{ if(v){ nctx.fillStyle=nxt.color; nctx.fillRect(8+x*16,8+y*16,15,15) } }))
}
function draw(){
  ctx.fillStyle='#fafcff'; ctx.fillRect(0,0,COLS*S,ROWS*S)
  grid.forEach((row,y)=>row.forEach((c,x)=>{ if(c){ ctx.fillStyle=c; ctx.fillRect(x*S,y*S,S-1,S-1) } }))
  cur.shape.forEach((row,y)=>row.forEach((v,x)=>{ if(v){ ctx.fillStyle=cur.color; ctx.fillRect((cur.x+x)*S,(cur.y+y)*S,S-1,S-1) } }))
  drawNext()
}
function start(){ grid=Array.from({length:ROWS},()=>Array(COLS).fill(0)); score.value=0; lines.value=0; cur=null; newPiece(); draw(); timer=setInterval(step,500) }
function pause(){ clearInterval(timer) }
function reset(){ pause(); start() }
function move(dx,dy){ if(!collide(dx,dy)){ cur.x+=dx; cur.y+=dy; draw() } else if(dy>0){ lock() } }
function kd(e){
  if(!cur) return; piece++
  if(e.key==='ArrowLeft') move(-1,0)
  else if(e.key==='ArrowRight') move(1,0)
  else if(e.key==='ArrowDown') move(0,1)
  else if(e.key==='ArrowUp'){ rotate(); if(collide()) rotate() }
  else if(e.key===' '){ while(!collide(0,1)) cur.y++; lock() }
}
onMounted(()=>{ ctx=cvs.value.getContext('2d'); nctx=nextCvs.value.getContext('2d'); start(); window.addEventListener('keydown',kd) })
onUnmounted(()=>{ clearInterval(timer); window.removeEventListener('keydown',kd) })
</script>

<template>
  <div>
    <div class="row"><span class="label">对战</span>
      <label><input type="radio" v-model="mode" value="ai" /> 人机</label>
      <label><input type="radio" v-model="mode" value="2p" /> 双人</label>
      <button class="btn btn-secondary btn-sm" @click="newGame">🔄 新局</button>
    </div>
    <div style="display:grid;grid-template-columns:repeat(3,80px);gap:6px;margin-top:14px;justify-content:center">
      <button v-for="(c,i) in board" :key="i" class="ttt" @click="play(i)" :disabled="c!==0 || winner">{{
        c===1?'❌':c===2?'⭕':''
      }}</button>
    </div>
    <div class="result-box" style="margin-top:14px;text-align:center">
      <div v-if="winner" style="font-size:18px;font-weight:700;color:#00b894">🎉 {{ winner===3?'平局':(mode==='ai'?(winner===1?'你赢了':'电脑赢了'):('玩家'+winner+'胜')) }}</div>
      <div v-else>轮到：{{ current===1?'❌':'⭕' }}</div>
    </div>
  </div>
</template>
<script setup>
import { ref, onMounted, watch } from 'vue'
const board = ref([0,0,0,0,0,0,0,0,0]); const current = ref(1); const winner = ref(0); const mode = ref('ai')
const newGame = () => { board.value = [0,0,0,0,0,0,0,0,0]; current.value = 1; winner.value = 0 }
function check(b){
  const w = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]]
  for(const [a,b1,c] of w) if(b[a] && b[a]===b[b1] && b[a]===b[c]) return b[a]
  return b.includes(0) ? 0 : 3
}
const play = (i) => {
  if(board.value[i] || winner.value) return
  board.value[i] = current.value
  winner.value = check(board.value)
  if(winner.value) return
  current.value = current.value===1?2:1
  if(mode.value==='ai' && current.value===2) setTimeout(aiPlay, 300)
}
function aiPlay(){
  // minimax 简化：先检查赢/防，再随机
  const b = [...board.value]
  // 赢
  for(let i=0;i<9;i++) if(!b[i]){ b[i]=2; if(check(b)===2){ board.value[i]=2; winner.value=2; return } b[i]=0 }
  // 防
  for(let i=0;i<9;i++) if(!b[i]){ b[i]=1; if(check(b)===1){ board.value[i]=2; winner.value=0; current.value=1; return } b[i]=0 }
  // 随机
  const empties = b.map((v,i)=>v?null:i).filter(i=>i!==null)
  if(empties.length){ const i=empties[Math.floor(Math.random()*empties.length)]; board.value[i]=2; current.value=1 }
}
</script>
<style scoped>.ttt{width:80px;height:80px;font-size:42px;border:2px solid rgba(9,132,227,0.3);border-radius:10px;background:#fafcff;cursor:pointer}.ttt:disabled{cursor:not-allowed}</style>

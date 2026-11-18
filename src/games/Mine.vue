<template>
  <div>
    <div class="row">
      <span class="label">难度</span>
      <select v-model="diff" class="input" style="width:100px" @change="newGame">
        <option value="easy">9×9 (10雷)</option><option value="mid">16×16 (40雷)</option><option value="hard">30×16 (99雷)</option>
      </select>
      <button class="btn btn-secondary btn-sm" @click="newGame">🔄 新游戏</button>
      <span style="margin-left:10px">💣 {{ flags }} / {{ mines }}</span>
    </div>
    <div style="display:flex;flex-wrap:wrap;gap:1px;margin-top:10px;background:rgba(0,0,0,0.1);padding:3px;border-radius:6px" @contextmenu.prevent>
      <button v-for="(c,i) in board" :key="i" class="cell" @click="click(i)" @contextmenu.prevent="flag(i)" :class="{open:c.open, mine:c.mine, flag:c.flag}">{{ show(c) }}</button>
    </div>
    <div class="result-box" style="margin-top:10px">
      <span v-if="won" style="color:#00b894;font-weight:700">🎉 胜利！</span>
      <span v-if="lost" style="color:#d63031;font-weight:700">💥 踩雷了！</span>
    </div>
    <div style="font-size:12px;color:#636e72;margin-top:4px">左键翻开 / 右键标记 🚩</div>
  </div>
</template>
<script setup>
import { ref, computed, onMounted } from 'vue'
const diff = ref('easy'); const board = ref([]); const won = ref(false); const lost = ref(false); let firstClick = true
const size = computed(()=> diff.value==='easy'?9 : diff.value==='mid'?16 : 30)
const mines = computed(()=> diff.value==='easy'?10 : diff.value==='mid'?40 : 99)
const cols = computed(()=> diff.value==='easy'?9 : diff.value==='mid'?16 : 30)
const flags = computed(()=> board.value.filter(c=>c.flag).length)
function newGame(){
  board.value = Array.from({length: size.value*size.value}, ()=>({open:false,mine:false,flag:false,adj:0}))
  won.value=false; lost.value=false; firstClick=true
}
function plantMines(safeIdx){
  const pool = [...Array(board.value.length).keys()].filter(i=>i!==safeIdx&&!adj8(safeIdx).includes(i))
  pool.sort(()=>Math.random()-0.5).slice(0,mines.value).forEach(i=>board.value[i].mine=true)
  board.value.forEach((c,i)=> c.adj = adj8(i).filter(j=>board.value[j].mine).length)
}
function adj8(i){
  const row=Math.floor(i/size.value), col=i%size.value; const r=[]
  for(let dr=-1;dr<=1;dr++) for(let dc=-1;dc<=1;dc++){
    const nr=row+dr, nc=col+dc, ni=nr*size.value+nc
    if(nr>=0&&nr<size.value&&nc>=0&&nc<size.value&&ni!==i) r.push(ni)
  }
  return r
}
function click(i){
  if(lost.value||won.value) return
  if(board.value[i].open||board.value[i].flag) return
  if(firstClick){ plantMines(i); firstClick=false }
  const c = board.value[i]
  if(c.mine){ lost.value=true; board.value.forEach(x=>x.open=x.mine); return }
  reveal(i); won.value = board.value.filter(c=>!c.open&&!c.mine).length===0
}
function reveal(i){
  const c = board.value[i]; if(c.open||c.flag||c.mine) return
  c.open = true
  if(c.adj===0) adj8(i).forEach(reveal)
}
function flag(i){ if(!board.value[i].open) board.value[i].flag = !board.value[i].flag }
function show(c){ if(c.flag) return '🚩'; if(!c.open) return ''; if(c.mine) return '💣'; return c.adj||'' }
onMounted(newGame)
</script>
<style scoped>.cell{width:22px;height:22px;font-size:13px;border-radius:3px;background:#bbada0;border:none;cursor:pointer}.cell.open{background:#fafcff}.cell.flag{background:#fdcb6e}.cell.mine{background:#d63031}</style>

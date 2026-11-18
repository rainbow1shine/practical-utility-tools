<template>
  <div>
    <div class="row">
      <span class="label">难度</span>
      <select v-model="diff" class="input" style="width:100px" @change="newGame">
        <option value="easy">简单 (4×3)</option><option value="mid">中等 (4×4)</option><option value="hard">困难 (4×6)</option>
      </select>
      <button class="btn btn-secondary btn-sm" @click="newGame">🔄 重新开始</button>
    </div>
    <div style="display:grid;gap:6px;margin-top:12px" :style="{gridTemplateColumns:'repeat('+cols+',80px)'}">
      <button v-for="(c,i) in cards" :key="i" class="memcard" @click="flip(i)" :class="{flipped:c.flipped||c.matched}">
        <span class="front">❓</span><span class="back">{{ c.em }}</span>
      </button>
    </div>
    <div class="result-box" style="margin-top:12px">翻次：{{ flips }} · 配对：{{ matched }}/{{ total }}
      <span v-if="matched===total && total">🎉 全部配对完成！</span></div>
  </div>
</template>
<script setup>
import { ref, computed, onMounted } from 'vue'
const icons = ['🍎','🍊','🍋','🍇','🍉','🍓','🍑','🥝','🍒','🥭','🍍','🥥','🍌','🫐','🍈','🍐','🌽','🥕']
const diff = ref('easy'); const cards = ref([]); const flips = ref(0); const flipped = ref([]); const matched = ref(0)
const cols = computed(()=> diff.value==='easy'?4 : diff.value==='mid'?4 : 6)
const total = computed(()=> cards.value.length/2)
function newGame(){
  const pairs = diff.value==='easy'?6 : diff.value==='mid'?8 : 12
  const ems = icons.slice(0,pairs).concat(icons.slice(0,pairs)).sort(()=>Math.random()-0.5)
  cards.value = ems.map(em=>({em,flipped:false,matched:false}))
  flips.value=0; matched.value=0; flipped.value=[]
}
function flip(i){
  if(flipped.value.length>=2||cards.value[i].flipped||cards.value[i].matched) return
  cards.value[i].flipped=true; flipped.value.push(i)
  if(flipped.value.length===2){
    flips.value++
    const [a,b] = flipped.value
    if(cards.value[a].em===cards.value[b].em){ cards.value[a].matched=true; cards.value[b].matched=true; matched.value++; flipped.value=[] }
    else setTimeout(()=>{ cards.value[a].flipped=false; cards.value[b].flipped=false; flipped.value=[] },600)
  }
}
onMounted(newGame)
</script>
<style scoped>.memcard{width:80px;height:80px;border-radius:8px;background:rgba(9,132,227,0.1);border:2px solid rgba(9,132,227,0.3);cursor:pointer;font-size:28px;transition:all 0.2s}.memcard.flipped{background:#00b894;border-color:#00b894;color:#fff}.memcard .back{display:none}.memcard.flipped .front{display:none}.memcard.flipped .back{display:block}</style>

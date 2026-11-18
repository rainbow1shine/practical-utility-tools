<template>
  <div>
    <div style="text-align:center;font-size:60px">{{ playerEmoji }} VS {{ compEmoji }}</div>
    <div class="row" style="justify-content:center;margin-top:10px">
      <button class="btn btn-primary" @click="play(1)">✊ 石头</button>
      <button class="btn btn-primary" @click="play(2)">✌️ 剪刀</button>
      <button class="btn btn-primary" @click="play(3)">🖐 布</button>
    </div>
    <div class="result-box" style="margin-top:14px;text-align:center">
      <div v-if="result" style="font-size:20px;font-weight:700">{{ result }}</div>
      <div style="margin-top:6px;color:#636e72">你：{{ playerName }} · 电脑：{{ compName }}</div>
      <div style="margin-top:8px">胜 {{ score.win }} · 负 {{ score.lose }} · 平 {{ score.draw }}</div>
    </div>
  </div>
</template>
<script setup>
import { ref } from 'vue'
const names = ['','石头','剪刀','布']
const emojis = ['','✊','✌️','🖐']
const player = ref(0); const comp = ref(0); const result = ref('')
const playerEmoji = ref('❓'); const compEmoji = ref('❓')
const playerName = ref('?'); const compName = ref('?')
const score = ref({win:0,lose:0,draw:0})
const play = (n) => {
  player.value = n; comp.value = Math.floor(Math.random()*3)+1
  playerEmoji.value = emojis[n]; compEmoji.value = emojis[comp.value]
  playerName.value = names[n]; compName.value = names[comp.value]
  if(n===comp.value){ result.value = '🤝 平局'; score.value.draw++ }
  else if((n===1&&comp.value===2)||(n===2&&comp.value===3)||(n===3&&comp.value===1)){ result.value = '🎉 你赢了'; score.value.win++ }
  else { result.value = '😢 你输了'; score.value.lose++ }
}
</script>

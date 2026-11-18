<template>
  <div>
    <div class="col"><span class="label">我想一个 1-100 的数，猜猜看</span></div>
    <div class="row"><input v-model="guess" class="input" style="width:100px" @keyup.enter="doGuess" /><button class="btn btn-primary btn-sm" @click="doGuess">🎯 猜</button></div>
    <div class="result-box" style="margin-top:12px">
      <div v-if="hint" style="font-size:16px;font-weight:600">{{ hint }}</div>
      <div v-if="won" style="color:#00b894">🎉 恭喜！{{ count }} 次猜中！</div>
      <div class="row" v-if="won"><button class="btn btn-secondary btn-sm" @click="newGame">🔄 再来一局</button></div>
      <div v-if="history.length" style="margin-top:8px;font-size:13px;color:#636e72">历史：{{ history.join(' → ') }}</div>
    </div>
  </div>
</template>
<script setup>
import { ref, onMounted } from 'vue'
const target = ref(0); const guess = ref(''); const hint = ref(''); const won = ref(false); const count = ref(0); const history = ref([])
const doGuess = () => {
  const n = +guess.value; count.value++; history.value.push(n)
  if(n<target.value) hint.value = '太小了 ↗'; else if(n>target.value) hint.value = '太大了 ↘'
  else { hint.value = '对了！'; won.value = true }
  guess.value = ''
}
const newGame = () => { target.value = Math.floor(Math.random()*100)+1; hint.value=''; won.value=false; count.value=0; history.value=[]; guess.value='' }
onMounted(newGame)
</script>

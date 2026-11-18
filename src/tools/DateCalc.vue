<template>
  <div>
    <div class="row"><span class="label">日期 A</span><input type="date" v-model="d1" class="input" /></div>
    <div class="row"><span class="label">日期 B</span><input type="date" v-model="d2" class="input" /></div>
    <div class="row"><button class="btn btn-primary btn-sm" @click="diff">📅 计算天数差</button></div>
    <div class="row"><span class="label">推算</span><input v-model="days" class="input" style="width:80px" />天后：<span class="tag-green" style="font-size:14px">{{ after || '—' }}</span></div>
    <div class="result-box" v-if="diffDays!==null">{{ d1 }} 与 {{ d2 }} 相差 <b>{{ diffDays }}</b> 天</div>
  </div>
</template>
<script setup>
import { ref, watch } from 'vue'
const d1 = ref(''); const d2 = ref(''); const diffDays = ref(null)
const days = ref(30); const after = ref('')
const diff = () => {
  if(!d1.value||!d2.value) return
  diffDays.value = Math.abs((new Date(d2.value)-new Date(d1.value))/86400000)
}
watch([days,d1], () => {
  if(!d1.value) return
  const d = new Date(d1.value); d.setDate(d.getDate()+ +days.value)
  after.value = d.toISOString().slice(0,10)
})
</script>

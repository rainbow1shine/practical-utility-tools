<template>
  <div>
    <div class="row"><span class="label">身高(cm)</span><input v-model="h" class="input" style="width:100px" /></div>
    <div class="row"><span class="label">体重(kg)</span><input v-model="w" class="input" style="width:100px" /></div>
    <button class="btn btn-primary" @click="calc">💪 计算 BMI</button>
    <div v-if="bmi" class="result-box" style="margin-top:14px;text-align:center">
      <div style="font-size:32px;font-weight:700;color:{{ color }}">{{ bmi }}</div>
      <div style="font-size:16px">{{ cat }}</div>
      <div style="font-size:13px;color:#636e72;margin-top:6px">理想：{{ minW }} ~ {{ maxW }} kg</div>
    </div>
  </div>
</template>
<script setup>
import { ref, computed, onMounted } from 'vue'
const h = ref(170); const w = ref(65); const bmi = ref(0)
const color = computed(()=> {
  if(bmi.value<18.5) return '#fdcb6e'; if(bmi.value<24) return '#00b894'
  if(bmi.value<28) return '#e17055'; return '#d63031'
})
const cat = computed(()=> {
  if(bmi.value<18.5) return '偏瘦'; if(bmi.value<24) return '正常 ✅'
  if(bmi.value<28) return '偏胖'; return '肥胖'
})
const hh = computed(()=> +h.value/100)
const minW = computed(()=> Math.round(18.5*hh.value*hh.value))
const maxW = computed(()=> Math.round(24*hh.value*hh.value))
const calc = () => { bmi.value = ((+w.value)/(hh.value*hh.value)).toFixed(1) }
onMounted(calc)
</script>

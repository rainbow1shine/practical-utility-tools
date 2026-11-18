<template>
  <div>
    <div class="row">
      <select v-model="cat" class="input" style="width:110px">
        <option value="len">长度</option><option value="wt">重量</option><option value="temp">温度</option>
        <option value="area">面积</option><option value="vol">体积</option><option value="time">时间</option>
      </select>
    </div>
    <div class="row">
      <input v-model="fromV" class="input" style="width:120px" />
      <select v-model="fromU" class="input" style="width:90px"></select>
      <button class="btn btn-sm" @click="swap">⇄</button>
      <select v-model="toU" class="input" style="width:90px"></select>
    </div>
    <div class="result-box" style="margin-top:12px">{{ result }}</div>
  </div>
</template>
<script setup>
import { ref, watch, computed } from 'vue'
const cats = {
  len: { 米:1, 厘米:0.01, 公里:1000, 英寸:0.0254, 英尺:0.3048 },
  wt:  { 千克:1, 克:0.001, 毫克:0.000001, 吨:1000, 磅:0.4536 },
  temp:{ 摄氏:'c', 华氏:'f', 开尔文:'k' },
  area:{ 平方米:1, 平方厘米:0.0001, 公顷:10000 },
  vol: { 升:1, 毫升:0.001, 立方米:1000 },
  time:{ 秒:1, 分钟:60, 小时:3600, 天:86400 }
}
const cat = ref('len'); const fromV = ref('1'); const fromU = ref('米'); const toU = ref('厘米')
watch(cat, v => { const keys = Object.keys(cats[v]); fromU.value = keys[0]; toU.value = keys[1] || keys[0] })
const result = computed(() => {
  const f = +fromV.value; const c = cats[cat.value]
  if(cat.value==='temp'){
    let C = fromU.value==='c' ? f : fromU.value==='f' ? (f-32)*5/9 : f-273.15
    let R = toU.value==='c' ? C : toU.value==='f' ? C*9/5+32 : C+273.15
    return f + ' ' + fromU.value + ' = ' + R.toFixed(2) + ' ' + toU.value
  }
  const base = f * c[fromU.value]; const out = base / c[toU.value]
  return f + ' ' + fromU.value + ' = ' + out + ' ' + toU.value
})
const swap = () => { const t = fromU.value; fromU.value = toU.value; toU.value = t }
</script>

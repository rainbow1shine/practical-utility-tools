<template>
  <div>
    <div class="row"><span class="label">十进制</span><input v-model="dec" class="input" @input="fromDec" /></div>
    <div class="row"><span class="label">二进制</span><input v-model="bin" class="input" @input="fromBin" /></div>
    <div class="row"><span class="label">八进制</span><input v-model="oct" class="input" @input="fromOct" /></div>
    <div class="row"><span class="label">十六进制</span><input v-model="hex" class="input" @input="fromHex" /></div>
    <button class="btn btn-secondary" @click="reset">🔄 清空</button>
  </div>
</template>
<script setup>
import { ref } from 'vue'
const dec = ref(''); const bin = ref(''); const oct = ref(''); const hex = ref('')
const fromDec = () => { const n = parseInt(dec.value,10); if(!isNaN(n)){ bin.value=n.toString(2); oct.value=n.toString(8); hex.value=n.toString(16).toUpperCase() } }
const fromBin = () => { const n = parseInt(bin.value,2); if(!isNaN(n)){ dec.value=n.toString(10); oct.value=n.toString(8); hex.value=n.toString(16).toUpperCase() } }
const fromOct = () => { const n = parseInt(oct.value,8); if(!isNaN(n)){ dec.value=n.toString(10); bin.value=n.toString(2); hex.value=n.toString(16).toUpperCase() } }
const fromHex = () => { const n = parseInt(hex.value,16); if(!isNaN(n)){ dec.value=n.toString(10); bin.value=n.toString(2); oct.value=n.toString(8) } }
const reset = () => { dec.value=bin.value=oct.value=hex.value='' }
</script>

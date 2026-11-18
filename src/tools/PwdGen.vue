<template>
  <div>
    <div class="row">
      <span class="label">长度</span><input v-model="len" class="input" style="width:70px" />
      <label><input type="checkbox" v-model="cL" />小写</label>
      <label><input type="checkbox" v-model="cU" />大写</label>
      <label><input type="checkbox" v-model="cN" />数字</label>
      <label><input type="checkbox" v-model="cS" />符号</label>
      <span class="label">数量</span><input v-model="n" class="input" style="width:60px" />
    </div>
    <button class="btn btn-primary" @click="gen">🔑 生成密码</button>
    <div class="result-box" style="margin-top:12px">
      <div v-for="(p,i) in passwords" :key="i" style="display:flex;justify-content:space-between;margin-bottom:4px">
        <code>{{ p }}</code>
        <button class="btn btn-sm btn-secondary" @click="navigator.clipboard.writeText(p)">📋</button>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, onMounted } from 'vue'
const len = ref(16); const cL=ref(true); const cU=ref(true); const cN=ref(true); const cS=ref(false); const n=ref(5)
const passwords = ref([])
const gen = () => {
  let c = ''; if(cL.value) c+='abcdefghijklmnopqrstuvwxyz'
  if(cU.value) c+='ABCDEFGHIJKLMNOPQRSTUVWXYZ'; if(cN.value) c+='0123456789'
  if(cS.value) c+='!@#$%^&*()_+-=[]{}|;:,.<>?'
  const arr = new Uint32Array(len.value * n.value); crypto.getRandomValues(arr)
  const out = []
  for(let i=0;i<n.value;i++){ let s=''; for(let j=0;j<len.value;j++) s += c[arr[i*len.value+j] % c.length]; out.push(s) }
  passwords.value = out
}
onMounted(gen)
</script>

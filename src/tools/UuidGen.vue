<template>
  <div>
    <div class="row"><span class="label">数量</span><input v-model="n" class="input" style="width:70px" /><label><input type="checkbox" v-model="noDash" />去横线</label></div>
    <button class="btn btn-primary" @click="gen">🆔 生成 UUID v4</button>
    <div class="result-box" style="margin-top:12px">
      <div v-for="(u,i) in ids" :key="i" style="margin-bottom:4px;display:flex;gap:8px">
        <code>{{ u }}</code>
        <button class="btn btn-sm btn-secondary" @click="navigator.clipboard.writeText(u)">📋</button>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, onMounted } from 'vue'
const n = ref(5); const noDash = ref(false); const ids = ref([])
const gen = () => {
  const out = []
  for(let i=0;i<n.value;i++){
    const b = new Uint8Array(16); crypto.getRandomValues(b)
    b[6] = (b[6] & 0x0f) | 0x40; b[8] = (b[8] & 0x3f) | 0x80
    const s = [...b].map(x=>x.toString(16).padStart(2,'0')).join('')
    const uu = s.slice(0,8)+'-'+s.slice(8,12)+'-'+s.slice(12,16)+'-'+s.slice(16,20)+'-'+s.slice(20)
    out.push(noDash.value ? uu.replace(/-/g,'') : uu)
  }
  ids.value = out
}
onMounted(gen)
</script>

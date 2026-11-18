<template>
  <div>
    <div class="row">
      <input type="file" accept="image/*" @change="load" class="input" style="max-width:300px" />
      <span class="label">质量</span><input type="range" min="10" max="100" v-model="q" style="width:130px" /><span class="label">{{ q }}</span>
    </div>
    <div class="row"><span class="label">最大宽度</span><input v-model="w" class="input" style="width:90px" /><button class="btn btn-primary btn-sm" @click="run" :disabled="!src">🚀 压缩</button></div>
    <div v-if="src" style="display:flex;gap:20px;margin-top:14px;flex-wrap:wrap">
      <div><div class="label">原图 ({{ srcSize }} KB)</div><img :src="src" style="max-width:260px;border-radius:8px;border:1px solid #eee" /></div>
      <div v-if="out"><div class="label">压缩后 ({{ outSize }} KB) · 节省 {{ saved }}%</div><img :src="out" style="max-width:260px;border-radius:8px;border:1px solid #eee" /></div>
    </div>
    <div class="row" v-if="out"><button class="btn btn-primary" @click="download">📥 下载压缩图</button></div>
  </div>
</template>
<script setup>
import { ref, computed } from 'vue'
const src = ref(''); const out = ref(''); const q = ref(85); const w = ref(1920)
const srcSize = ref(0); const outSize = ref(0)
const saved = computed(()=> srcSize.value ? Math.round((1-outSize.value/srcSize.value)*100) : 0)
function load(e){
  const f = e.target.files[0]; if(!f) return
  srcSize.value = Math.round(f.size/1024)
  const r = new FileReader(); r.onload = ev => src.value = ev.target.result; r.readAsDataURL(f)
}
function run(){
  const img = new Image(); img.onload = () => {
    const ratio = Math.min(1, +w.value / img.width)
    const canvas = document.createElement('canvas')
    canvas.width = img.width * ratio; canvas.height = img.height * ratio
    const ctx = canvas.getContext('2d'); ctx.imageSmoothingQuality = 'high'
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
    canvas.toBlob(b => { out.value = URL.createObjectURL(b); outSize.value = Math.round(b.size/1024) }, 'image/jpeg', +q.value/100)
  }; img.src = src.value
}
function download(){ const a = document.createElement('a'); a.href = out.value; a.download = 'compressed.jpg'; a.click() }
</script>

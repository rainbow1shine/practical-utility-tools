<template>
  <div>
    <div class="col"><input type="color" v-model="hex" @input="fromHex" style="width:70px;height:70px" /></div>
    <div class="row"><span class="label">HEX</span><input v-model="hex" class="input" @change="fromHex" /></div>
    <div class="row">
      <span class="label">R</span><input v-model.number="rgb.r" class="input" style="width:60px" @input="fromRgb" />
      <span class="label">G</span><input v-model.number="rgb.g" class="input" style="width:60px" @input="fromRgb" />
      <span class="label">B</span><input v-model.number="rgb.b" class="input" style="width:60px" @input="fromRgb" />
    </div>
    <div class="row">
      <span class="label">H</span><input v-model.number="hsl.h" class="input" style="width:60px" @input="fromHsl" />
      <span class="label">S</span><input v-model.number="hsl.s" class="input" style="width:60px" @input="fromHsl" />
      <span class="label">L</span><input v-model.number="hsl.l" class="input" style="width:60px" @input="fromHsl" />
    </div>
    <div style="width:100%;height:70px;border-radius:10px;margin-top:10px;border:1px solid rgba(0,0,0,0.1)" :style="{background:hex}"></div>
  </div>
</template>
<script setup>
import { reactive } from 'vue'
const rgb = reactive({r:9,g:132,b:227}); const hsl = reactive({h:211,s:90,l:46}); const hex = reactive({value:'#0984e3'})
function rgb2hsl(){
  const r=rgb.r/255,g=rgb.g/255,b=rgb.b/255
  const max=Math.max(r,g,b),min=Math.min(r,g,b),d=max-min
  const h=max===min?0:max===r?60*(((g-b)/d)%6):max===g?60*(((b-r)/d)+2):60*(((r-g)/d)+4)
  const l=(max+min)/2; const s=d===0?0:d/(1-Math.abs(2*l-1))
  hsl.h=Math.round((h+360)%360); hsl.s=Math.round(s*100); hsl.l=Math.round(l*100)
}
function hsl2rgb(){
  const s=hsl.s/100,l=hsl.l/100,c=(1-Math.abs(2*l-1))*s,x=c*(1-Math.abs((hsl.h/60)%2-1)),m=l-c/2
  const h=hsl.h/60, arr = [c,x,0, c,0,x, x,c,0, 0,c,x, 0,x,c, x,0,c]
  const p = arr.slice(Math.floor(h)*3, Math.floor(h)*3+3)
  rgb.r=Math.round((p[0]+m)*255); rgb.g=Math.round((p[1]+m)*255); rgb.b=Math.round((p[2]+m)*255)
}
function rgb2hex(){ hex.value='#'+[rgb.r,rgb.g,rgb.b].map(v=>Math.max(0,Math.min(255,v)).toString(16).padStart(2,'0')).join('') }
const fromHex=()=>{ const n=parseInt(hex.value.replace('#',''),16); rgb.r=(n>>16)&255; rgb.g=(n>>8)&255; rgb.b=n&255; rgb2hsl() }
const fromRgb=()=>{ rgb2hsl(); rgb2hex() }
const fromHsl=()=>{ hsl2rgb(); rgb2hex() }
fromHex()
</script>

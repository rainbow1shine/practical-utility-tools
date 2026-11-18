<template>
  <div>
    <div class="col"><textarea v-model="plain" class="input" rows="3"></textarea></div>
    <div class="row">
      <label><input type="radio" v-model="algo" value="caesar" /> 凯撒密码</label>
      <label><input type="radio" v-model="algo" value="xor" /> 异或加密</label>
      <input v-model="key" class="input" placeholder="密钥/偏移量" style="width:140px" />
    </div>
    <div class="row">
      <button class="btn btn-primary btn-sm" @click="enc">🔐 加密</button>
      <button class="btn btn-secondary btn-sm" @click="dec">🔓 解密</button>
    </div>
    <div class="result-box" style="margin-top:12px;min-height:60px">{{ result || '结果' }}</div>
  </div>
</template>
<script setup>
import { ref } from 'vue'
const plain = ref('Hello 世界'); const key = ref('3'); const algo = ref('caesar'); const result = ref('')
const _doEnc = (txt=plain.value, k=key.value, a=algo.value, decrypt=false) => {
  if(a==='caesar'){
    const n = (+k) * (decrypt ? -1 : 1)
    return txt.split('').map(c => {
      if(/[a-z]/.test(c)) return String.fromCharCode(((c.charCodeAt(0)-97+n)%26+26)%26+97)
      if(/[A-Z]/.test(c)) return String.fromCharCode(((c.charCodeAt(0)-65+n)%26+26)%26+65)
      return c
    }).join('')
  }
  return txt.split('').map(c => String.fromCharCode(c.charCodeAt(0) ^ (k.charCodeAt(0)||1))).join('')
}
const enc = () => result.value = _doEnc(plain.value, key.value, algo.value)
const dec = () => result.value = _doEnc(plain.value, key.value, algo.value, true)
</script>

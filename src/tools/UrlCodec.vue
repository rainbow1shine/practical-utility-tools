<template>
  <div>
    <div class="col"><textarea v-model="input" class="input" rows="3"></textarea></div>
    <div class="row">
      <button class="btn btn-sm" @click="input=encodeURIComponent(input)">URL 编码</button>
      <button class="btn btn-sm" @click="tryDecode">URL 解码</button>
      <button class="btn btn-sm" @click="toB64">Base64 编码</button>
      <button class="btn btn-sm" @click="fromB64">Base64 解码</button>
      <button class="btn btn-danger btn-sm" @click="input=''">清空</button>
    </div>
    <div class="result-box" style="margin-top:12px">{{ input }}</div>
  </div>
</template>
<script setup>
import { ref } from 'vue'
const input = ref('https://www.baidu.com/s?wd=你好')
const tryDecode = () => { try { input.value = decodeURIComponent(input.value) } catch {} }
const toB64 = () => { input.value = btoa(unescape(encodeURIComponent(input.value))) }
const fromB64 = () => { try { input.value = decodeURIComponent(escape(atob(input.value))) } catch {} }
</script>

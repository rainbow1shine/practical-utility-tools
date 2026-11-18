<template>
  <div>
    <input v-model="expr" class="input" placeholder="输入表达式，如 (2+3)*4" @keyup.enter="calc" />
    <div class="row">
      <button class="btn btn-sm" @click="expr=''">清空 C</button>
      <button class="btn btn-sm" @click="expr = expr.slice(0,-1)">退格 ⌫</button>
      <button class="btn btn-primary btn-sm" @click="calc">=</button>
    </div>
    <div class="row">
      <button v-for="c in ['(',' )','+','-','*','/']" :key="c" class="btn btn-sm" @click="expr += c.trim()">{{ c }}</button>
    </div>
    <div v-for="row in nums" :key="row" class="row">
      <button v-for="c in row" :key="c" class="btn btn-sm" @click="expr += c">{{ c }}</button>
    </div>
    <div class="result-box" style="margin-top:14px" v-if="result !== null">= {{ result }}</div>
    <div class="result-box" style="color:#e17055" v-if="error">❌ {{ error }}</div>
  </div>
</template>
<script setup>
import { ref } from 'vue'
const expr = ref('')
const result = ref(null)
const error = ref('')
const nums = [['7','8','9'],['4','5','6'],['1','2','3'],['0','.']]
const calc = () => {
  error.value = ''; result.value = null
  try { result.value = Function('"use strict";return (' + expr.value + ')')() }
  catch(e){ error.value = '表达式错误' }
}
</script>

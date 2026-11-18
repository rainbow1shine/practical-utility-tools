<template>
  <div>
    <div class="col"><textarea v-model="input" class="input" rows="5" placeholder='{"a":1}'></textarea></div>
    <div class="row">
      <button class="btn btn-primary btn-sm" @click="fmt">✨ 美化</button>
      <button class="btn btn-secondary btn-sm" @click="min">📦 压缩</button>
      <button class="btn btn-sm" @click="val">✅ 校验</button>
      <button class="btn btn-danger btn-sm" @click="input=''">🗑️ 清空</button>
    </div>
    <div class="result-box" style="margin-top:12px;white-space:pre-wrap;max-height:300px;overflow:auto">{{ output }}</div>
  </div>
</template>
<script setup>
import { ref, onMounted } from 'vue'
const input = ref('{"name":"张三","age":18,"hobbies":["篮球","游戏"],"addr":{"city":"北京"}}')
const output = ref('')
const fmt = () => { try { output.value = JSON.stringify(JSON.parse(input.value), null, 2) } catch(e){ output.value = '❌ ' + e.message } }
const min = () => { try { output.value = JSON.stringify(JSON.parse(input.value)) } catch(e){ output.value = '❌ ' + e.message } }
const val = () => { try { JSON.parse(input.value); output.value = '✅ 格式正确' } catch(e){ output.value = '❌ ' + e.message } }
onMounted(fmt)
</script>

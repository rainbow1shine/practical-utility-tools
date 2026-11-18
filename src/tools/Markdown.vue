<template>
  <div>
    <div class="col"><textarea v-model="h" class="input" rows="4" placeholder="输入 Markdown" style="font-family:Consolas,monospace"></textarea></div>
    <div class="row"><button class="btn btn-primary btn-sm" @click="render">✨ 渲染</button></div>
    <div class="result-box" style="margin-top:12px" v-html="out"></div>
  </div>
</template>
<script setup>
import { ref, onMounted } from 'vue'
const h = ref('# 标题\n\n**粗体** *斜体*\n\n- 列表1\n- 列表2\n\n> 引用\n\n[链接](https://gitee.com)')
const out = ref('')
function md(){
  let s = h.value
  s = s.replace(/^### (.+)$/gm, '<h3>$1</h3>').replace(/^## (.+)$/gm, '<h2>$1</h2>').replace(/^# (.+)$/gm, '<h1>$1</h1>')
  s = s.replace(/\*\*(.+?)\*\*/g, '<b>$1</b>').replace(/\*(.+?)\*/g, '<i>$1</i>')
  s = s.replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2" target="_blank">$1</a>')
  s = s.replace(/^> (.+)$/gm, '<blockquote style="border-left:3px solid #0984e3;padding-left:10px;color:#636e72">$1</blockquote>')
  s = s.replace(/^- (.+)$/gm, '• $1').replace(/\n/g, '<br>')
  return s
}
const render = () => out.value = md()
onMounted(render)
</script>

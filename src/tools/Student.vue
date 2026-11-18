<template>
  <div>
    <div class="row">
      <input v-model="newId" class="input" style="width:100px" placeholder="学号" />
      <input v-model="newName" class="input" style="width:100px" placeholder="姓名" />
      <input v-model="newScore" class="input" style="width:80px" placeholder="成绩" />
      <button class="btn btn-primary btn-sm" @click="add">➕ 添加</button>
    </div>
    <table style="width:100%;border-collapse:collapse;margin-top:12px" v-if="list.length">
      <thead><tr style="background:rgba(9,132,227,0.1)">
        <th style="padding:6px">学号</th><th>姓名</th><th>成绩</th><th></th>
      </tr></thead>
      <tbody>
        <tr v-for="(s,i) in list" :key="s.id" style="border-bottom:1px solid #eee">
          <td style="padding:6px">{{ s.id }}</td><td>{{ s.name }}</td><td>{{ s.score }}</td>
          <td><button class="btn btn-sm btn-danger" @click="del(i)">删</button></td>
        </tr>
      </tbody>
    </table>
    <div class="row" style="margin-top:12px">
      <button class="btn btn-sm" @click="sortList">📊 成绩排序</button>
      <button class="btn btn-sm btn-danger" @click="clear">🗑️ 清空</button>
      <span class="tag-green">共 {{ list.length }} 人，平均 {{ avg }}</span>
    </div>
  </div>
</template>
<script setup>
import { ref, onMounted, computed } from 'vue'
const list = ref([]); const newId = ref(''); const newName = ref(''); const newScore = ref('')
onMounted(()=>{ const s = localStorage.getItem('stu'); if(s) list.value = JSON.parse(s) })
const save = () => localStorage.setItem('stu', JSON.stringify(list.value))
const add = () => { list.value.push({id:newId.value,name:newName.value,score:+newScore.value}); save() }
const del = i => { list.value.splice(i,1); save() }
const sortList = () => { list.value.sort((a,b)=>b.score-a.score); save() }
const clear = () => { if(confirm('确认清空？')){ list.value=[]; save() } }
const avg = computed(()=> list.value.length ? (list.value.reduce((a,b)=>a+b.score,0)/list.value.length).toFixed(1) : 0)
</script>

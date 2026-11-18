<template>
  <div class="tool-view">
    <div class="page-header" v-if="info">
      <h1><span class="ph-icon">{{ info.icon }}</span>{{ info.title }}</h1>
      <div class="ph-desc">{{ info.desc }}</div>
    </div>
    <div class="tool-card" :data-watermark="wm" v-if="comp">
      <component :is="comp" />
    </div>
    <div v-else style="color:#e17055;padding:20px;">❌ 组件加载失败：{{ toolId }}</div>
  </div>
</template>

<script setup>
import { computed, defineAsyncComponent } from 'vue'
import { getToolById, WATERMARKS } from '../../data/tools.js'

const props = defineProps({ toolId: String })

const componentMap = {
  toolCalc:      defineAsyncComponent(() => import('../../tools/Calculator.vue')),
  toolHex:       defineAsyncComponent(() => import('../../tools/HexConvert.vue')),
  toolRand:      defineAsyncComponent(() => import('../../tools/Random.vue')),
  toolSort:      defineAsyncComponent(() => import('../../tools/SortVisual.vue')),
  toolDate:      defineAsyncComponent(() => import('../../tools/DateCalc.vue')),
  toolTimer:     defineAsyncComponent(() => import('../../tools/Stopwatch.vue')),
  toolTimestamp: defineAsyncComponent(() => import('../../tools/Timestamp.vue')),
  toolWord:      defineAsyncComponent(() => import('../../tools/WordCount.vue')),
  toolEnc:       defineAsyncComponent(() => import('../../tools/Encrypt.vue')),
  toolUrl:       defineAsyncComponent(() => import('../../tools/UrlCodec.vue')),
  toolRegex:     defineAsyncComponent(() => import('../../tools/RegexTester.vue')),
  toolEmoji:     defineAsyncComponent(() => import('../../tools/EmojiCodec.vue')),
  toolPwd:       defineAsyncComponent(() => import('../../tools/PwdGen.vue')),
  toolUuid:      defineAsyncComponent(() => import('../../tools/UuidGen.vue')),
  toolColor:     defineAsyncComponent(() => import('../../tools/ColorPicker.vue')),
  toolImgCmp:    defineAsyncComponent(() => import('../../tools/ImgCompress.vue')),
  toolJson:      defineAsyncComponent(() => import('../../tools/JsonFormat.vue')),
  toolMarkdown:  defineAsyncComponent(() => import('../../tools/Markdown.vue')),
  toolBmi:       defineAsyncComponent(() => import('../../tools/Bmi.vue')),
  toolUnit:      defineAsyncComponent(() => import('../../tools/UnitConvert.vue')),
  toolStu:       defineAsyncComponent(() => import('../../tools/Student.vue')),
  toolIp:        defineAsyncComponent(() => import('../../tools/IpConvert.vue')),
  gameGuess:     defineAsyncComponent(() => import('../../games/Guess.vue')),
  gameTtt:       defineAsyncComponent(() => import('../../games/Ttt.vue')),
  gameSnake:     defineAsyncComponent(() => import('../../games/Snake.vue')),
  gameRps:       defineAsyncComponent(() => import('../../games/Rps.vue')),
  game2048:      defineAsyncComponent(() => import('../../games/Game2048.vue')),
  gameTetris:    defineAsyncComponent(() => import('../../games/Tetris.vue')),
  gameMemory:    defineAsyncComponent(() => import('../../games/Memory.vue')),
  gameMine:      defineAsyncComponent(() => import('../../games/Mine.vue')),
  gameWhack:     defineAsyncComponent(() => import('../../games/Whack.vue')),
}

const info = computed(() => getToolById(props.toolId))
const comp = computed(() => componentMap[props.toolId])
const wm = computed(() => WATERMARKS[props.toolId] || info.value?.title || '')
</script>

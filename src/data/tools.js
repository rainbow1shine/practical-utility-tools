// 所有工具和游戏的配置
export const CATEGORIES = [
  { id: 'calc',  name: '计算工具', icon: '🧮' },
  { id: 'date',  name: '日期时间', icon: '📅' },
  { id: 'text',  name: '文本处理', icon: '📝' },
  { id: 'gen',   name: '生成器', icon: '✨' },
  { id: 'file',  name: '文件媒体', icon: '📁' },
  { id: 'life',  name: '生活助手', icon: '💪' },
  { id: 'game',  name: '小游戏', icon: '🎮' },
]

export const WATERMARKS = {
  toolCalc: '=', toolHex: '01', toolDate: '日', toolStu: '🎓',
  toolEnc: '🔐', toolRand: '?', toolSort: '↑',
  toolPwd: '🔑', toolUnit: '⇄', toolJson: '{}', toolUrl: '🔗',
  toolTimer: '⏱', toolBmi: '💪', toolUuid: 'ID', toolColor: '🎨',
  toolWord: '字', toolImgCmp: '🖼',
  toolTimestamp: '时', toolRegex: '.*', toolEmoji: '😊',
  toolMarkdown: 'M↓', toolIp: '::',
  gameGuess: '?', gameTtt: '×', gameSnake: '🐍', gameRps: '✊',
  game2048: '2048', gameTetris: '■', gameMemory: '🃏',
  gameMine: '💣', gameWhack: '🔨',
}

export const TOOLS = [
  // 计算工具
  { id: 'toolCalc', cat: 'calc',  icon: '🧮', title: '计算器', desc: '支持括号和运算符优先级' },
  { id: 'toolHex',  cat: 'calc',  icon: '💱', title: '进制转换', desc: '十/二/八/十六互转' },
  { id: 'toolRand', cat: 'calc',  icon: '🎲', title: '随机数生成', desc: '指定范围和数量' },
  { id: 'toolSort', cat: 'calc',  icon: '📊', title: '排序可视化', desc: '冒泡/快排动画' },
  // 日期时间
  { id: 'toolDate', cat: 'date',  icon: '📅', title: '日期计算器', desc: '计算天数差/推算日期' },
  { id: 'toolTimer',cat: 'date',  icon: '⏱️', title: '秒表倒计时', desc: '秒表/倒计时/计次' },
  { id: 'toolTimestamp',cat:'date', icon: '⏰', title: '时间戳转换', desc: '时间戳↔日期互转' },
  // 文本处理
  { id: 'toolWord', cat: 'text',  icon: '📝', title: '字数统计', desc: '中英文字数/字频' },
  { id: 'toolEnc',  cat: 'text',  icon: '🔐', title: '加密解密', desc: '凯撒+异或加密' },
  { id: 'toolUrl',  cat: 'text',  icon: '🔗', title: 'URL编解码', desc: 'URL+Base64四合一' },
  { id: 'toolRegex',cat: 'text',  icon: '🔍', title: '正则测试', desc: '实时匹配高亮' },
  { id: 'toolEmoji',cat: 'text',  icon: '😊', title: 'Emoji编解码', desc: 'Emoji↔码点互转' },
  // 生成器
  { id: 'toolPwd',  cat: 'gen',   icon: '🔑', title: '密码生成器', desc: '真随机+自定义' },
  { id: 'toolUuid', cat: 'gen',   icon: '🆔', title: 'UUID生成器', desc: 'v4标准格式' },
  { id: 'toolColor',cat: 'gen',   icon: '🎨', title: '颜色转换', desc: 'HEX↔RGB↔HSL' },
  // 文件媒体
  { id: 'toolImgCmp',cat:'file',  icon: '🖼️', title: '图片压缩', desc: '本地Canvas压缩' },
  { id: 'toolJson', cat: 'file',  icon: '🧩', title: 'JSON格式化', desc: '美化/压缩/校验' },
  { id: 'toolMarkdown',cat:'file',icon: '📄', title: 'Markdown预览', desc: '实时渲染' },
  // 生活助手
  { id: 'toolBmi',  cat: 'life',  icon: '💪', title: 'BMI计算器', desc: '健康分类+建议' },
  { id: 'toolUnit', cat: 'life',  icon: '📐', title: '单位换算', desc: '6大类单位互转' },
  { id: 'toolStu',  cat: 'life',  icon: '🎓', title: '学生成绩管理', desc: '增删改查+排序' },
  { id: 'toolIp',   cat: 'life',  icon: '🌐', title: 'IP/数字互转', desc: 'IPv4↔各进制' },
  // 游戏
  { id: 'gameGuess',cat:'game',  icon: '🎯', title: '猜数字', desc: '1-100随机数' },
  { id: 'gameTtt',  cat: 'game',  icon: '❌⭕', title: '井字棋', desc: '双人/人机' },
  { id: 'gameSnake',cat:'game',  icon: '🐍', title: '贪吃蛇', desc: 'Canvas彩色版' },
  { id: 'gameRps',  cat: 'game',  icon: '✊✌️🖐', title: '石头剪刀布', desc: '人机对战' },
  { id: 'game2048', cat: 'game',  icon: '🎲', title: '2048', desc: '经典合并游戏' },
  { id: 'gameTetris',cat:'game', icon: '🧱', title: '俄罗斯方块', desc: '7种标准方块' },
  { id: 'gameMemory',cat:'game', icon: '🃏', title: '翻牌记忆', desc: '3难度可选' },
  { id: 'gameMine', cat: 'game',  icon: '💣', title: '扫雷', desc: '3难度可选' },
  { id: 'gameWhack',cat: 'game',  icon: '🔨', title: '打地鼠', desc: '30秒限时' },
]

export function getToolsByCat(catId) {
  return TOOLS.filter(t => t.cat === catId)
}

export function getToolById(id) {
  return TOOLS.find(t => t.id === id)
}

export function getCatById(id) {
  return CATEGORIES.find(c => c.id === id)
}

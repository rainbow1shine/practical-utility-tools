import{m as p,o as i,c as u,a,w as d,v as m,e as r}from"./index-BdKqfL1K.js";const $={class:"col"},g=["innerHTML"],v={__name:"Markdown",setup(b){const l=r(`# 标题

**粗体** *斜体*

- 列表1
- 列表2

> 引用

[链接](https://gitee.com)`),n=r("");function s(){let e=l.value;return e=e.replace(/^### (.+)$/gm,"<h3>$1</h3>").replace(/^## (.+)$/gm,"<h2>$1</h2>").replace(/^# (.+)$/gm,"<h1>$1</h1>"),e=e.replace(/\*\*(.+?)\*\*/g,"<b>$1</b>").replace(/\*(.+?)\*/g,"<i>$1</i>"),e=e.replace(/\[(.+?)\]\((.+?)\)/g,'<a href="$2" target="_blank">$1</a>'),e=e.replace(/^> (.+)$/gm,'<blockquote style="border-left:3px solid #0984e3;padding-left:10px;color:#636e72">$1</blockquote>'),e=e.replace(/^- (.+)$/gm,"• $1").replace(/\n/g,"<br>"),e}const t=()=>n.value=s();return p(t),(e,o)=>(i(),u("div",null,[a("div",$,[d(a("textarea",{"onUpdate:modelValue":o[0]||(o[0]=c=>l.value=c),class:"input",rows:"4",placeholder:"输入 Markdown",style:{"font-family":"Consolas,monospace"}},null,512),[[m,l.value]])]),a("div",{class:"row"},[a("button",{class:"btn btn-primary btn-sm",onClick:t},"✨ 渲染")]),a("div",{class:"result-box",style:{"margin-top":"12px"},innerHTML:n.value},null,8,g)]))}};export{v as default};

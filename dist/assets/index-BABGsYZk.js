import{_ as u,d,B as k,A as l,C as m,o as f,c as p,x as v,D as h,g as a}from"./index-D8gmBzh4.js";const g=d({name:"IconLock",props:{size:{type:[Number,String]},strokeWidth:{type:Number,default:4},strokeLinecap:{type:String,default:"butt",validator:e=>["butt","round","square"].includes(e)},strokeLinejoin:{type:String,default:"miter",validator:e=>["arcs","bevel","miter","miter-clip","round"].includes(e)},rotate:Number,spin:Boolean},emits:{click:e=>!0},setup(e,{emit:t}){const n=k("icon"),s=l(()=>[n,`${n}-lock`,{[`${n}-spin`]:e.spin}]),r=l(()=>{const o={};return e.size&&(o.fontSize=m(e.size)?`${e.size}px`:e.size),e.rotate&&(o.transform=`rotate(${e.rotate}deg)`),o});return{cls:s,innerStyle:r,onClick:o=>{t("click",o)}}}}),C=["stroke-width","stroke-linecap","stroke-linejoin"],y=a("rect",{x:"7",y:"21",width:"34",height:"20",rx:"1"},null,-1),_=a("path",{d:"M15 21v-6a9 9 0 1 1 18 0v6M24 35v-8"},null,-1),b=[y,_];function w(e,t,n,s,r,c){return f(),p("svg",{viewBox:"0 0 48 48",fill:"none",xmlns:"http://www.w3.org/2000/svg",stroke:"currentColor",class:v(e.cls),style:h(e.innerStyle),"stroke-width":e.strokeWidth,"stroke-linecap":e.strokeLinecap,"stroke-linejoin":e.strokeLinejoin,onClick:t[0]||(t[0]=(...o)=>e.onClick&&e.onClick(...o))},b,14,C)}var i=u(g,[["render",w]]);const $=Object.assign(i,{install:(e,t)=>{var n;const s=(n=t==null?void 0:t.iconPrefix)!=null?n:"";e.component(s+i.name,i)}});export{$ as I};

import{z as F,d as H,k as M,u as P,r as w,K as W,a as C,o as t,c as n,b as _,w as v,g as l,t as f,q as r,h as d,j as V,f as x,F as N,e as Q,y as X,a2 as Y,M as u,x as S,at as Z}from"./index-D8gmBzh4.js";import{a as ee}from"./date-B9d_EV3y.js";import{E as oe}from"./MdEditor-ro--MMAW.js";import{M as te}from"./MdCatalog-f-q-2nMO.js";import{o as ae}from"./image_api-BtMspoFT.js";import{I as se}from"./index-BUns8YUt.js";import{I as ne}from"./index-CNaldku0.js";import{_ as le}from"./_plugin-vue_export-helper-DlAUqK2U.js";function ie(h){return F.get("/api/chat_message_list",{params:h})}function ce(h){return F.delete("/api/chat_delete_message",{data:{id_list:h}})}const re={class:"gvb_chat_group_components"},de={class:"head"},ue={class:"title"},_e={key:0,class:"outline"},me={key:1,class:"manage"},ge={class:"record_list"},pe={key:1,class:"date"},ve=["src"],fe={class:"message-main"},he={class:"message-user"},ke={class:"message-content"},ye={class:"content"},we={class:"txt-message"},Ce={class:"footer"},Ve={class:"menu"},xe={key:0,class:"inRoom"},be=H({__name:"gvb_chat_group",props:{config:{}},emits:["getConfig"],setup(h,{emit:R}){const b=M({list:[],count:0}),z=P(),i=h,A=M({page:1,limit:200});async function I(){let e=await ie(A);if(e.code){u.error(e.msg);return}e.data.list.forEach(a=>{a.is_me=a.nick_name==m.nick_name}),D.value=!1,b.list=e.data.list,b.count=e.data.count}const B=R;async function G(){await B("getConfig"),await I(),u.success("刷新成功")}I();const k=w(!1),y=w([]);async function K(){let e=await ce(y.value);if(e.code){u.error(e.msg);return}u.success(e.msg),y.value=[],I()}const D=w(!0);let c=w(),U=0;const m=M({nick_name:"",onlineCount:0});function T(){console.log(`ws://${location.host}/ws/api/chat_group`),c.value=new WebSocket(`ws://${location.host}/ws/api/chat_group`),c.value.onmessage=function(e){let a=e.data,s=JSON.parse(a);if(console.log("onmessage",s),U===0){m.nick_name=s.nick_name,m.onlineCount=s.online_count,U++;return}m.onlineCount=s.online_count,b.list.push({avatar:s.avatar,content:s.content,created_at:s.created_at,message_type:s.message_type,nick_name:s.nick_name,is_me:m.nick_name===s.nick_name,model:{id:"",created_at:"",updated_at:""}}),U++,setTimeout(()=>{let p=document.querySelector(".record_list");p.scrollTo({top:p.scrollHeight,behavior:"smooth"})},100),I()},c.value.onopen=function(e){console.log("进入聊天室成功",e),u.success("进入聊天室成功!")},c.value.onerror=function(e){u.error("进入聊天室失败!")},c.value.onclose=function(e){console.log("onClose",e),u.error("链接已经断开了!"),c.value=void 0}}const g=w("");function E(){var e;(e=c.value)==null||e.send(JSON.stringify({content:g.value,message_type:2})),g.value=""}function j(){u.warning("可以直接粘贴到聊天框里")}function q(){u.warning("文件上传开发中")}return W(()=>{var e;c.value&&((e=c.value)==null||e.close())}),(e,a)=>{const s=C("a-checkbox"),p=C("a-button"),J=C("a-checkbox-group"),L=C("a-textarea"),O=C("a-spin");return t(),n("div",re,[_(O,{loading:D.value},{default:v(()=>[l("div",de,[l("div",ue,f(i.config.welcome_title),1),i.config.is_online_people?(t(),n("div",_e,"在线人数: "+f(i.config.is_online_people?m.onlineCount:"∞"),1)):r("",!0),d(z).isAdmin?(t(),n("div",me,[_(d(se),{style:{cursor:"pointer"},onClick:G}),_(s,{modelValue:k.value,"onUpdate:modelValue":a[0]||(a[0]=o=>k.value=o)},{default:v(()=>[V("管理模式")]),_:1},8,["modelValue"]),k.value&&y.value.length?(t(),x(p,{key:0,onClick:K,style:{"margin-left":"10px"},size:"small",type:"primary",status:"danger"},{default:v(()=>[V("删除 ")]),_:1})):r("",!0)])):r("",!0)]),l("div",ge,[_(J,{modelValue:y.value,"onUpdate:modelValue":a[1]||(a[1]=o=>y.value=o)},{default:v(()=>[(t(!0),n(N,null,Q(b.list,o=>(t(),n("div",{class:S({msg:!0,isManage:k.value})},[k.value?(t(),x(s,{key:0,value:o.model.id},null,8,["value"])):r("",!0),i.config.is_show_time?(t(),n("div",pe,f(d(ee)(o.created_at)),1)):r("",!0),o.message_type===2?(t(),n("div",{key:2,class:S({message:!0,is_me:o.is_me})},[l("img",{class:"avatar",src:"/"+o.avatar,alt:"发送人头像"},null,8,ve),l("div",fe,[l("div",he,f(o.nick_name),1),l("div",ke,[l("div",ye,[l("div",{class:S({"txt-message":!0,is_markdown:i.config.is_markdown})},[e.config.is_markdown?(t(),x(d(te),{key:1,modelValue:o.content,"onUpdate:modelValue":$=>o.content=$,editorId:"md__"+o.id},null,8,["modelValue","onUpdate:modelValue","editorId"])):(t(),n(N,{key:0},[V(f(o.content),1)],64))],2)])])])],2)):r("",!0),o.message_type===1||o.message_type===7?(t(),n("div",{key:3,class:S("system system_"+o.message_type)},[l("div",we,f(o.content),1)],2)):r("",!0)],2))),256))]),_:1},8,["modelValue"])]),l("div",Ce,[l("div",Ve,[i.config.is_send_image?(t(),n("div",{key:0,class:"icon",onClick:j},[_(d(ne))])):r("",!0),i.config.is_send_file?(t(),n("div",{key:1,class:"icon",onClick:q},[_(d(Z))])):r("",!0)]),d(c)?r("",!0):(t(),n("div",xe,[_(p,{type:"primary",onClick:T},{default:v(()=>[V("进入聊天室")]),_:1})])),i.config.is_markdown?(t(),x(d(oe),{key:2,"max-length":i.config.content_length?i.config.content_length:100,"on-upload-img":d(ae),"show-word-limit":1,placeholder:"聊天内容",modelValue:g.value,"onUpdate:modelValue":a[3]||(a[3]=o=>g.value=o),toolbars:[],preview:!1},null,8,["max-length","on-upload-img","modelValue"])):(t(),x(L,{key:1,"show-word-limit":"","max-length":100,onKeydown:X(Y(E,["ctrl"]),["enter"]),modelValue:g.value,"onUpdate:modelValue":a[2]||(a[2]=o=>g.value=o),"auto-size":"",placeholder:"聊天内容",style:{height:"80%"}},null,8,["onKeydown","modelValue"])),_(p,{type:"primary",class:"send_button",onClick:E},{default:v(()=>[V("发送")]),_:1})])]),_:1},8,["loading"])])}}}),Re=le(be,[["__scopeId","data-v-761c9186"]]);export{Re as G};

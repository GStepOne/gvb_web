import{d as x,k as d,u as b,n as k,o as _,c as u,g as a,F as V,e as D,b as v,y as I,a2 as B,h,w as M,j as T,M as l,O as C,x as A,t as p,ak as K,V as N}from"./index-D8gmBzh4.js";import{m as P,a as R,b as S}from"./message_api-BXmMjDx5.js";const U={class:"gvb_message_record_component"},z={class:"record_list"},E=["src"],F={class:"message-main"},L={class:"message-user"},j={class:"message-content"},q={class:"content"},H={class:"txt-message"},O={class:"message_record"},Q=x({__name:"gvb_message_record",props:{rev_user_id:{},send_user_id:{},nickname:{}},setup(f,{expose:y}){const m=d({list:[],count:0}),r=f,o=d({content:"",send_user_id:r.send_user_id,rev_user_id:r.rev_user_id}),n=b();async function w(){let t=await P(n.userInfo.userId);m.list=t.data.list,m.count=t.data.count}w();async function i(t){let e=await R(n.userInfo.userId,t);if(e.code){l.error(e.msg);return}e.data.list.forEach(s=>{s.is_me=s.send_user_id==n.userInfo.userId}),c.list=e.data.list,c.count=e.data.count}y({getRecordData:i});const c=d({list:[],count:0});async function g(){if(o.content===""){l.warning("消息不能为空");return}let t=await S(o);if(t.code){l.error(t.msg);return}i(o.rev_user_id),C(()=>{setTimeout(()=>{const e=document.querySelector(".record_list");e==null||e.scrollTo({top:e.scrollHeight,behavior:"smooth"})},500)})}return k(()=>r.rev_user_id,()=>{r.rev_user_id!==0&&(o.rev_user_id=r.rev_user_id,o.send_user_id=r.send_user_id,i(r.rev_user_id))}),(t,e)=>(_(),u("div",U,[a("div",z,[(_(!0),u(V,null,D(c.list,s=>(_(),u("div",{class:A({message:!0,is_me:s.is_me})},[a("img",{class:"avatar",src:s.send_user_avatar,alt:"发送人头像"},null,8,E),a("div",F,[a("div",L,p(s.send_user_nickname),1),a("div",j,[a("div",q,[a("div",H,p(s.content),1)])])])],2))),256))]),a("div",O,[v(h(K),{placeholder:"请输入聊天内容",onKeydown:I(B(g,["ctrl"]),["enter"]),modelValue:o.content,"onUpdate:modelValue":e[0]||(e[0]=s=>o.content=s),"auto-size":"",style:{height:"100%"}},null,8,["onKeydown","modelValue"]),v(h(N),{type:"primary",onClick:g},{default:M(()=>[T("回复")]),_:1})])]))}});export{Q as _};

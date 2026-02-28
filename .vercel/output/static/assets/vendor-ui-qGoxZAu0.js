import{r,R as E}from"./vendor-react-ihAI6r0F.js";import{h,u as L,w as v,m as F}from"./vendor-Dov6qlaW.js";var B=e=>typeof e=="function",$=(e,t)=>B(e)?e(t):e,U=(()=>{let e=0;return()=>(++e).toString()})(),P=(()=>{let e;return()=>{if(e===void 0&&typeof window<"u"){let t=matchMedia("(prefers-reduced-motion: reduce)");e=!t||t.matches}return e}})(),V=20,O="default",T=(e,t)=>{let{toastLimit:a}=e.settings;switch(t.type){case 0:return{...e,toasts:[t.toast,...e.toasts].slice(0,a)};case 1:return{...e,toasts:e.toasts.map(s=>s.id===t.toast.id?{...s,...t.toast}:s)};case 2:let{toast:i}=t;return T(e,{type:e.toasts.find(s=>s.id===i.id)?1:0,toast:i});case 3:let{toastId:o}=t;return{...e,toasts:e.toasts.map(s=>s.id===o||o===void 0?{...s,dismissed:!0,visible:!1}:s)};case 4:return t.toastId===void 0?{...e,toasts:[]}:{...e,toasts:e.toasts.filter(s=>s.id!==t.toastId)};case 5:return{...e,pausedAt:t.time};case 6:let l=t.time-(e.pausedAt||0);return{...e,pausedAt:void 0,toasts:e.toasts.map(s=>({...s,pauseDuration:s.pauseDuration+l}))}}},S=[],N={toasts:[],pausedAt:void 0,settings:{toastLimit:V}},g={},R=(e,t=O)=>{g[t]=T(g[t]||N,e),S.forEach(([a,i])=>{a===t&&i(g[t])})},M=e=>Object.keys(g).forEach(t=>R(e,t)),Y=e=>Object.keys(g).find(t=>g[t].toasts.some(a=>a.id===e)),D=(e=O)=>t=>{R(t,e)},K={blank:4e3,error:4e3,success:2e3,loading:1/0,custom:4e3},Q=(e={},t=O)=>{let[a,i]=r.useState(g[t]||N),o=r.useRef(g[t]);r.useEffect(()=>(o.current!==g[t]&&i(g[t]),S.push([t,i]),()=>{let s=S.findIndex(([m])=>m===t);s>-1&&S.splice(s,1)}),[t]);let l=a.toasts.map(s=>{var m,y,u;return{...e,...e[s.type],...s,removeDelay:s.removeDelay||((m=e[s.type])==null?void 0:m.removeDelay)||e?.removeDelay,duration:s.duration||((y=e[s.type])==null?void 0:y.duration)||e?.duration||K[s.type],style:{...e.style,...(u=e[s.type])==null?void 0:u.style,...s.style}}});return{...a,toasts:l}},W=(e,t="blank",a)=>({createdAt:Date.now(),visible:!0,dismissed:!1,type:t,ariaProps:{role:"status","aria-live":"polite"},message:e,pauseDuration:0,...a,id:a?.id||U()}),x=e=>(t,a)=>{let i=W(t,e,a);return D(i.toasterId||Y(i.id))({type:2,toast:i}),i.id},d=(e,t)=>x("blank")(e,t);d.error=x("error");d.success=x("success");d.loading=x("loading");d.custom=x("custom");d.dismiss=(e,t)=>{let a={type:3,toastId:e};t?D(t)(a):M(a)};d.dismissAll=e=>d.dismiss(void 0,e);d.remove=(e,t)=>{let a={type:4,toastId:e};t?D(t)(a):M(a)};d.removeAll=e=>d.remove(void 0,e);d.promise=(e,t,a)=>{let i=d.loading(t.loading,{...a,...a?.loading});return typeof e=="function"&&(e=e()),e.then(o=>{let l=t.success?$(t.success,o):void 0;return l?d.success(l,{id:i,...a,...a?.success}):d.dismiss(i),o}).catch(o=>{let l=t.error?$(t.error,o):void 0;l?d.error(l,{id:i,...a,...a?.error}):d.dismiss(i)}),e};var Z=1e3,_=(e,t="default")=>{let{toasts:a,pausedAt:i}=Q(e,t),o=r.useRef(new Map).current,l=r.useCallback((n,f=Z)=>{if(o.has(n))return;let c=setTimeout(()=>{o.delete(n),s({type:4,toastId:n})},f);o.set(n,c)},[]);r.useEffect(()=>{if(i)return;let n=Date.now(),f=a.map(c=>{if(c.duration===1/0)return;let w=(c.duration||0)+c.pauseDuration-(n-c.createdAt);if(w<0){c.visible&&d.dismiss(c.id);return}return setTimeout(()=>d.dismiss(c.id,t),w)});return()=>{f.forEach(c=>c&&clearTimeout(c))}},[a,i,t]);let s=r.useCallback(D(t),[t]),m=r.useCallback(()=>{s({type:5,time:Date.now()})},[s]),y=r.useCallback((n,f)=>{s({type:1,toast:{id:n,height:f}})},[s]),u=r.useCallback(()=>{i&&s({type:6,time:Date.now()})},[i,s]),p=r.useCallback((n,f)=>{let{reverseOrder:c=!1,gutter:w=8,defaultPosition:j}=f||{},I=a.filter(b=>(b.position||j)===(n.position||j)&&b.height),H=I.findIndex(b=>b.id===n.id),z=I.filter((b,C)=>C<H&&b.visible).length;return I.filter(b=>b.visible).slice(...c?[z+1]:[0,z]).reduce((b,C)=>b+(C.height||0)+w,0)},[a]);return r.useEffect(()=>{a.forEach(n=>{if(n.dismissed)l(n.id,n.removeDelay);else{let f=o.get(n.id);f&&(clearTimeout(f),o.delete(n.id))}})},[a,l]),{toasts:a,handlers:{updateHeight:y,startPause:m,endPause:u,calculateOffset:p}}},q=h`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
 transform: scale(1) rotate(45deg);
  opacity: 1;
}`,G=h`
from {
  transform: scale(0);
  opacity: 0;
}
to {
  transform: scale(1);
  opacity: 1;
}`,J=h`
from {
  transform: scale(0) rotate(90deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(90deg);
	opacity: 1;
}`,X=v("div")`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${e=>e.primary||"#ff4b4b"};
  position: relative;
  transform: rotate(45deg);

  animation: ${q} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
  animation-delay: 100ms;

  &:after,
  &:before {
    content: '';
    animation: ${G} 0.15s ease-out forwards;
    animation-delay: 150ms;
    position: absolute;
    border-radius: 3px;
    opacity: 0;
    background: ${e=>e.secondary||"#fff"};
    bottom: 9px;
    left: 4px;
    height: 2px;
    width: 12px;
  }

  &:before {
    animation: ${J} 0.15s ease-out forwards;
    animation-delay: 180ms;
    transform: rotate(90deg);
  }
`,ee=h`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`,te=v("div")`
  width: 12px;
  height: 12px;
  box-sizing: border-box;
  border: 2px solid;
  border-radius: 100%;
  border-color: ${e=>e.secondary||"#e0e0e0"};
  border-right-color: ${e=>e.primary||"#616161"};
  animation: ${ee} 1s linear infinite;
`,ae=h`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(45deg);
	opacity: 1;
}`,se=h`
0% {
	height: 0;
	width: 0;
	opacity: 0;
}
40% {
  height: 0;
	width: 6px;
	opacity: 1;
}
100% {
  opacity: 1;
  height: 10px;
}`,ie=v("div")`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${e=>e.primary||"#61d345"};
  position: relative;
  transform: rotate(45deg);

  animation: ${ae} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
  animation-delay: 100ms;
  &:after {
    content: '';
    box-sizing: border-box;
    animation: ${se} 0.2s ease-out forwards;
    opacity: 0;
    animation-delay: 200ms;
    position: absolute;
    border-right: 2px solid;
    border-bottom: 2px solid;
    border-color: ${e=>e.secondary||"#fff"};
    bottom: 6px;
    left: 6px;
    height: 10px;
    width: 6px;
  }
`,re=v("div")`
  position: absolute;
`,oe=v("div")`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 20px;
  min-height: 20px;
`,ne=h`
from {
  transform: scale(0.6);
  opacity: 0.4;
}
to {
  transform: scale(1);
  opacity: 1;
}`,le=v("div")`
  position: relative;
  transform: scale(0.6);
  opacity: 0.4;
  min-width: 20px;
  animation: ${ne} 0.3s 0.12s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
`,ce=({toast:e})=>{let{icon:t,type:a,iconTheme:i}=e;return t!==void 0?typeof t=="string"?r.createElement(le,null,t):t:a==="blank"?null:r.createElement(oe,null,r.createElement(te,{...i}),a!=="loading"&&r.createElement(re,null,a==="error"?r.createElement(X,{...i}):r.createElement(ie,{...i})))},de=e=>`
0% {transform: translate3d(0,${e*-200}%,0) scale(.6); opacity:.5;}
100% {transform: translate3d(0,0,0) scale(1); opacity:1;}
`,ue=e=>`
0% {transform: translate3d(0,0,-1px) scale(1); opacity:1;}
100% {transform: translate3d(0,${e*-150}%,-1px) scale(.6); opacity:0;}
`,pe="0%{opacity:0;} 100%{opacity:1;}",me="0%{opacity:1;} 100%{opacity:0;}",fe=v("div")`
  display: flex;
  align-items: center;
  background: #fff;
  color: #363636;
  line-height: 1.3;
  will-change: transform;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.1), 0 3px 3px rgba(0, 0, 0, 0.05);
  max-width: 350px;
  pointer-events: auto;
  padding: 8px 10px;
  border-radius: 8px;
`,ye=v("div")`
  display: flex;
  justify-content: center;
  margin: 4px 10px;
  color: inherit;
  flex: 1 1 auto;
  white-space: pre-line;
`,be=(e,t)=>{let a=e.includes("top")?1:-1,[i,o]=P()?[pe,me]:[de(a),ue(a)];return{animation:t?`${h(i)} 0.35s cubic-bezier(.21,1.02,.73,1) forwards`:`${h(o)} 0.4s forwards cubic-bezier(.06,.71,.55,1)`}},ge=r.memo(({toast:e,position:t,style:a,children:i})=>{let o=e.height?be(e.position||t||"top-center",e.visible):{opacity:0},l=r.createElement(ce,{toast:e}),s=r.createElement(ye,{...e.ariaProps},$(e.message,e));return r.createElement(fe,{className:e.className,style:{...o,...a,...e.style}},typeof i=="function"?i({icon:l,message:s}):r.createElement(r.Fragment,null,l,s))});F(r.createElement);var he=({id:e,className:t,style:a,onHeightUpdate:i,children:o})=>{let l=r.useCallback(s=>{if(s){let m=()=>{let y=s.getBoundingClientRect().height;i(e,y)};m(),new MutationObserver(m).observe(s,{subtree:!0,childList:!0,characterData:!0})}},[e,i]);return r.createElement("div",{ref:l,className:t,style:a},o)},ve=(e,t)=>{let a=e.includes("top"),i=a?{top:0}:{bottom:0},o=e.includes("center")?{justifyContent:"center"}:e.includes("right")?{justifyContent:"flex-end"}:{};return{left:0,right:0,display:"flex",position:"absolute",transition:P()?void 0:"all 230ms cubic-bezier(.21,1.02,.73,1)",transform:`translateY(${t*(a?1:-1)}px)`,...i,...o}},xe=L`
  z-index: 9999;
  > * {
    pointer-events: auto;
  }
`,k=16,Ie=({reverseOrder:e,position:t="top-center",toastOptions:a,gutter:i,children:o,toasterId:l,containerStyle:s,containerClassName:m})=>{let{toasts:y,handlers:u}=_(a,l);return r.createElement("div",{"data-rht-toaster":l||"",style:{position:"fixed",zIndex:9999,top:k,left:k,right:k,bottom:k,pointerEvents:"none",...s},className:m,onMouseEnter:u.startPause,onMouseLeave:u.endPause},y.map(p=>{let n=p.position||t,f=u.calculateOffset(p,{reverseOrder:e,gutter:i,defaultPosition:t}),c=ve(n,f);return r.createElement(he,{id:p.id,key:p.id,onHeightUpdate:u.updateHeight,className:p.visible?xe:"",style:c},p.type==="custom"?$(p.message,p):o?o(p):r.createElement(ge,{toast:p,position:n}))}))};const A=e=>{let t;const a=new Set,i=(u,p)=>{const n=typeof u=="function"?u(t):u;if(!Object.is(n,t)){const f=t;t=p??(typeof n!="object"||n===null)?n:Object.assign({},t,n),a.forEach(c=>c(t,f))}},o=()=>t,m={setState:i,getState:o,getInitialState:()=>y,subscribe:u=>(a.add(u),()=>a.delete(u))},y=t=e(i,o,m);return m},we=(e=>e?A(e):A),Ee=e=>e;function ke(e,t=Ee){const a=E.useSyncExternalStore(e.subscribe,E.useCallback(()=>t(e.getState()),[e,t]),E.useCallback(()=>t(e.getInitialState()),[e,t]));return E.useDebugValue(a),a}const Se=e=>{const t=we(e),a=i=>ke(t,i);return Object.assign(a,t),a},Ce=(e=>Se);export{Ie as F,Ce as c,d as n};

(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[185],{8116:function(e,n,t){Promise.resolve().then(t.bind(t,9787)),Promise.resolve().then(t.bind(t,4380)),Promise.resolve().then(t.bind(t,2860)),Promise.resolve().then(t.t.bind(t,6685,23)),Promise.resolve().then(t.t.bind(t,3222,23)),Promise.resolve().then(t.bind(t,3457)),Promise.resolve().then(t.bind(t,2310)),Promise.resolve().then(t.bind(t,7964)),Promise.resolve().then(t.bind(t,2060)),Promise.resolve().then(t.bind(t,5399)),Promise.resolve().then(t.bind(t,4597)),Promise.resolve().then(t.bind(t,523)),Promise.resolve().then(t.bind(t,288)),Promise.resolve().then(t.bind(t,8963)),Promise.resolve().then(t.bind(t,4506)),Promise.resolve().then(t.bind(t,8454)),Promise.resolve().then(t.bind(t,196)),Promise.resolve().then(t.bind(t,7800)),Promise.resolve().then(t.bind(t,7621)),Promise.resolve().then(t.bind(t,6625)),Promise.resolve().then(t.bind(t,4750)),Promise.resolve().then(t.bind(t,1537)),Promise.resolve().then(t.bind(t,5998)),Promise.resolve().then(t.bind(t,7363)),Promise.resolve().then(t.bind(t,7899)),Promise.resolve().then(t.bind(t,6331)),Promise.resolve().then(t.bind(t,1343)),Promise.resolve().then(t.bind(t,6498)),Promise.resolve().then(t.bind(t,5925)),Promise.resolve().then(t.bind(t,4441)),Promise.resolve().then(t.bind(t,616)),Promise.resolve().then(t.bind(t,7562)),Promise.resolve().then(t.t.bind(t,2471,23))},616:function(e,n,t){"use strict";t.r(n),t.d(n,{default:function(){return l}});var r=t(7437),i=t(96),o=t(4033),s=t(2265);function l(e){let{allPaths:n}=e,t=(0,o.usePathname)(),l=(0,s.useRef)(!0),u=(0,i.I0)();return(0,s.useEffect)(()=>{let e=n.find(e=>e.href===t);u(i.Pl.actions.setCurrentTab({current:e?{href:e.href,title:e.title,type:e.framework}:{href:"/",title:"About Me",type:"about"}}))},[u,n,t]),(0,s.useEffect)(()=>{if(l.current){l.current=!1;return}window.innerWidth<768&&u(i.lg.actions.closeIfOpen({})),u(i.Ci.actions.resetVisible())},[u,t]),(0,r.jsx)(r.Fragment,{})}},7562:function(e,n,t){"use strict";t.r(n),t.d(n,{default:function(){return s}});var r=t(7437),i=t(96),o=t(2265);function s(){let e=(0,i.I0)();return(0,o.useEffect)(()=>{if(window.innerWidth<768)return;e(i.lg.actions.toggleMenu({menu:i.v2.EXPLORER}));let n=window.requestAnimationFrame(()=>{e(i.Uh.actions.toggleMenu({subMenu:i.Wd.PORTFOLIO}))});return()=>{window.cancelAnimationFrame(n)}},[e]),(0,r.jsx)(r.Fragment,{})}},6498:function(e,n,t){"use strict";t.r(n),t.d(n,{Providers:function(){return s}});var r=t(7437),i=t(3198),o=t(96);let s=e=>(0,r.jsx)(i.zt,{store:o.tO,children:e.children})},2471:function(){},1343:function(e,n,t){"use strict";t.r(n),n.default={src:"/_next/static/media/favicon.603d046c.ico",height:16,width:16,blurWidth:0,blurHeight:0}},4441:function(e,n,t){"use strict";t.r(n),t.d(n,{Analytics:function(){return d},default:function(){return c},track:function(){return u}});var r=t(2265),i=()=>{window.va||(window.va=function(...e){(window.vaq=window.vaq||[]).push(e)})};function o(){return"undefined"!=typeof window}function s(){return window.vam||"production"}function l(){return"development"===s()}function u(e,n){var t,r;if(!o()){console.warn("[Vercel Web Analytics] Server-side execution of `track()` is currently not supported.");return}if(!n){null==(t=window.va)||t.call(window,"event",{name:e});return}try{let t=function(e,n){let t=e,r=[];for(let[i,o]of Object.entries(e))"object"==typeof o&&null!==o&&(n.strip?t=function(e,{[e]:n,...t}){return t}(i,t):r.push(i));if(r.length>0&&!n.strip)throw Error(`The following properties are not valid: ${r.join(", ")}. Only strings, numbers, booleans, and null are allowed.`);return t}(n,{strip:"production"===s()});null==(r=window.va)||r.call(window,"event",{name:e,data:t})}catch(e){e instanceof Error&&l()&&console.error(e)}}function d({beforeSend:e,debug:n=!0,mode:t="auto"}){return(0,r.useEffect)(()=>{!function(e={debug:!0}){var n;if(!o())return;(function(e="auto"){if("auto"===e){window.vam="production";return}window.vam=e})(e.mode),i(),e.beforeSend&&(null==(n=window.va)||n.call(window,"beforeSend",e.beforeSend));let t=l()?"https://va.vercel-scripts.com/v1/script.debug.js":"/_vercel/insights/script.js";if(document.head.querySelector(`script[src*="${t}"]`))return;let r=document.createElement("script");r.src=t,r.defer=!0,r.setAttribute("data-sdkn","@vercel/analytics"),r.setAttribute("data-sdkv","1.0.2"),r.onerror=()=>{let e=l()?"Please check if any ad blockers are enabled and try again.":"Be sure to enable Web Analytics for your project and deploy again. See https://vercel.com/docs/concepts/analytics/quickstart for more information.";console.log(`[Vercel Web Analytics] Failed to load script from ${t}. ${e}`)},l()&&!1===e.debug&&r.setAttribute("data-debug","false"),document.head.appendChild(r)}({beforeSend:e,debug:n,mode:t})},[e,n,t]),null}var c={Analytics:d,track:u}}},function(e){e.O(0,[709,55,971,596,744],function(){return e(e.s=8116)}),_N_E=e.O()}]);
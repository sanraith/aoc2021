(this.webpackJsonpaoc2021=this.webpackJsonpaoc2021||[]).push([[0],{19:function(n,e,t){},20:function(n,e,t){},21:function(n,e,t){},31:function(n,e,t){"use strict";t.r(e);var c=t(0),i=t.n(c),r=t(10),a=t.n(r),l=t(2),s=t(14),u=(t(19),t(20),t(13));t(21);function o(n){return"cd".concat(n)}var d=t(1);function j(n){var e=n.day,t=n.isCopy,c=n.onCellClick;if(e&&e>=1&&e<=31){var i=o(e),r=e<=25;return Object(d.jsx)("div",{id:t?void 0:i,className:"calendar-cell"+(r?" pointer":""),onClick:function(){return r&&c&&c(e)},children:Object(d.jsx)("span",{children:e})})}return Object(d.jsx)("div",{className:"calendar-cell gray",children:Object(d.jsx)("span",{})})}function f(n,e,t){if(!n&&!e)return{visibility:"hidden"};n&&e&&(e=null);var c=o(n||e),i=document.getElementById(c).getBoundingClientRect();return"start"===t&&n||"end"===t&&e?{visibility:"hidden",left:i.x+"px",top:i.y+"px",width:i.width+"px",height:i.height+"px"}:{visibility:"visible",left:"5vw",top:"5vh",height:"90vh",maxHeight:"90vh",width:"90vw",maxWidth:"90vw"}}function p(n){var e=n.day,t=n.onClosed,i=Object(c.useRef)(null),r=Object(c.useRef)(null),a=f(e,i.current,"start");return Object(c.useEffect)((function(){r.current&&(r.current.classList.remove("notransition"),e?r.current.classList.add("open"):r.current.classList.remove("open"),Object.assign(r.current.style,f(e,i.current,"end")),i.current=e)}),[e]),Object(d.jsx)("div",{className:"popup notransition"+(e?"":" open"),style:a,ref:r,onClick:function(){return t()},children:Object(d.jsx)(j,{day:null!==e&&void 0!==e?e:i.current,isCopy:!0})},e)}function b(){var n=Array(5).fill(0).map((function(n,e){return Array(7).fill(0).map((function(n,t){return 7*e+t-1}))})),e=Object(c.useState)(null),t=Object(u.a)(e,2),r=t[0],a=t[1],s=Object(l.e)(),o=function(n){s.push(n?"/day/".concat(n.toString().padStart(2,"0")):"/"),a(r===n?null:n)};return Object(d.jsxs)(i.a.Fragment,{children:[Object(d.jsx)(p,{day:r,onClosed:function(){return o(null)}}),Object(d.jsx)("div",{className:"calendar",children:n.map((function(n,e){return Object(d.jsx)("div",{children:n.map((function(n){return Object(d.jsx)(j,{day:n,onCellClick:function(n){return o(n)}},n)}))},e)}))})]})}var h=function(){return Object(d.jsx)("div",{className:"App",children:Object(d.jsx)(b,{})})},v=function(n){n&&n instanceof Function&&t.e(3).then(t.bind(null,32)).then((function(e){var t=e.getCLS,c=e.getFID,i=e.getFCP,r=e.getLCP,a=e.getTTFB;t(n),c(n),i(n),r(n),a(n)}))};function O(){var n=Object(l.f)();return"page"in n?(console.log("navigation page param: ".concat(n.page)),null):null}a.a.render(Object(d.jsx)(i.a.StrictMode,{children:Object(d.jsxs)(s.a,{basename:"/aoc2021",children:[Object(d.jsx)(l.a,{path:"/day/:page",children:Object(d.jsx)(O,{})}),Object(d.jsx)(h,{})]})}),document.getElementById("root")),v()}},[[31,1,2]]]);
//# sourceMappingURL=main.bf58e620.chunk.js.map
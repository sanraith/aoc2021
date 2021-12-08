!function(){"use strict";var t={6459:function(t,n,r){var e,i=r(7762),u=r(5861),a=r(7757),o=r.n(a),s=r(1435),c=r(9591),p=r(5671),f=r(3144),l=r(136),h=r(9388),v=r(874),d=r(6043),y=function t(n,r){var e=arguments.length>2&&void 0!==arguments[2]?arguments[2]:0;(0,p.Z)(this,t),this.part=n,this.progress=r,this.timeMs=e,this.kind="progress"},m=function t(n,r,e,i){(0,p.Z)(this,t),this.part=n,this.result=r,this.timeMs=e,this.visualizationData=i,this.kind="result"},g=function t(n,r){var e=arguments.length>2&&void 0!==arguments[2]?arguments[2]:0;(0,p.Z)(this,t),this.part=n,this.message=r,this.timeMs=e,this.kind="error"},k=function(){function t(){(0,p.Z)(this,t),this.minTimeBetweenUpdatesMs=20,this.visualizationData=void 0,this._input=void 0,this._inputLines=void 0,this.currentSolution=void 0}return(0,f.Z)(t,[{key:"input",get:function(){var t;return null!==(t=this._input)&&void 0!==t?t:""}},{key:"inputLines",get:function(){return void 0===this._inputLines&&(this._inputLines=this.parseInputLines(this.input)),this._inputLines}},{key:"init",value:function(t){return this._input=t,this}},{key:"solveAsync",value:function(){var t=(0,u.Z)(o().mark((function t(n){var r;return o().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,(0,s.n)(this.solveWithProgress(n));case 2:r=t.sent,t.t0=r.kind,t.next="result"===t.t0?6:7;break;case 6:return t.abrupt("return",r.result);case 7:return t.abrupt("return",null);case 8:case"end":return t.stop()}}),t,this)})));return function(n){return t.apply(this,arguments)}}()},{key:"solveWithProgress",value:function(t){var n=this;return new v.y((function(r){if(n._input)if(n.currentSolution)r.error(new g(t,"Another solution is already in progress!"));else{var e=1===t?n.part1:n.part2;n.currentSolution={activePart:t,subscriber:r,stopwatch:new d.u,progressStopwatch:new d.u},n.visualizationData=null,n.currentSolution.stopwatch.start(),n.currentSolution.progressStopwatch.start();try{var i=e.apply(n)+"",u=n.currentSolution.stopwatch.stop(),a=new m(t,i,u,n.visualizationData);r.next(a)}catch(c){var o,s=null!==(o=n.currentSolution.stopwatch.stop())&&void 0!==o?o:0;r.next(new g(t,c+"",s))}finally{r.complete(),n.visualizationData=null,n.currentSolution=void 0}}else r.error(new g(t,"No input provided!"))}))}},{key:"updateProgress",value:function(t){var n=this.currentSolution;n&&n.progressStopwatch.getTime()>this.minTimeBetweenUpdatesMs&&(n.subscriber.next(new y(n.activePart,t,n.stopwatch.getTime())),n.progressStopwatch.start(!0))}},{key:"noSolution",value:function(t){var n;throw t=null!==(n=t)&&void 0!==n?n:"No solution available.",new Error(t)}},{key:"parseInputLines",value:function(t){var n,r=t.split(/\r\n?|\n/g),e=/^\s*$/gm;for(n=0;n<r.length;n++){var i=r[r.length-n-1];if(!e.test(i))break}return r.splice(r.length-n,n),r}}]),t}(),Z=r(1413),w=[];function b(){var t="number"===typeof(arguments.length<=0?void 0:arguments[0])?{day:arguments.length<=0?void 0:arguments[0],title:arguments.length<=1?void 0:arguments[1]}:arguments.length<=0?void 0:arguments[0];return function(n){w.push((0,Z.Z)((0,Z.Z)({},t),{},{ctor:n,create:function(){return new n}}))}}b({day:1,title:"Sonar Sweep"})(e=function(t){(0,l.Z)(r,t);var n=(0,h.Z)(r);function r(){return(0,p.Z)(this,r),n.apply(this,arguments)}return(0,f.Z)(r,[{key:"part1",value:function(){var t=this.inputLines.map((function(t){return parseInt(t)}));return t.slice(1).reduce((function(n,r,e){return n+(t[e]<r?1:0)}),0)}},{key:"part2",value:function(){var t=this.inputLines.map((function(t){return parseInt(t)})),n=t.slice(2).map((function(n,r){return t[r]+t[r+1]+n}));return n.slice(1).reduce((function(t,r,e){return t+(n[e]<r?1:0)}),0)}}]),r}(k));var x,L=r(3324);function I(t,n){for(var r,e=[];r=t.exec(n);)e.push(r);return e}b({day:2,title:"Dive!"})(x=function(t){(0,l.Z)(r,t);var n=(0,h.Z)(r);function r(){return(0,p.Z)(this,r),n.apply(this,arguments)}return(0,f.Z)(r,[{key:"part1",value:function(){var t={hor:0,dep:0};return this.parseInput().forEach((function(n){t.hor+=n.hor,t.dep+=n.dep})),t.hor*t.dep}},{key:"part2",value:function(){var t={hor:0,dep:0,aim:0};return this.parseInput().forEach((function(n){t.aim+=n.dep,t.hor+=n.hor,t.dep+=t.aim*n.hor})),t.hor*t.dep}},{key:"parseInput",value:function(){return I(/([a-z]+) (\d+)/g,this.input).map((function(t){var n=(0,L.Z)(t,3),r=n[1],e=n[2],i=parseInt(e),u={hor:0,dep:0};switch(r){case"forward":u.hor+=i;break;case"down":u.dep+=i;break;case"up":u.dep-=i;break;default:throw new Error("Invalid input!")}return u}))}}]),r}(k)),b({day:3,title:"Binary Diagnostic"})(M=function(t){(0,l.Z)(r,t);var n=(0,h.Z)(r);function r(){return(0,p.Z)(this,r),n.apply(this,arguments)}return(0,f.Z)(r,[{key:"part1",value:function(){var t=this.inputLines,n=t.length/2,r=t[0].split("").map((function(n,r){return t.reduce((function(t,n){return t+parseInt(n[r])}),0)}));return parseInt(r.map((function(t){return t>=n?"1":"0"})).join(""),2)*parseInt(r.map((function(t){return t<n?"1":"0"})).join(""),2)}},{key:"part2",value:function(){var t=this.inputLines;return this.getRating(t,"most_common")*this.getRating(t,"least_common")}},{key:"getRating",value:function(t,n){for(var r=0;r<t[0].length&&1!==(t=this.filter(t,r,n)).length;r++);return parseInt(t[0],2)}},{key:"filter",value:function(t,n,r){var e=t.reduce((function(t,r){return t+parseInt(r[n])}),0),i=e>=t.length/2!==("least_common"===r)?"1":"0";return t.filter((function(t){return t[n]===i}))}}]),r}(k)),b({day:4,title:"Giant Squid"})(S=function(t){(0,l.Z)(r,t);var n=(0,h.Z)(r);function r(){return(0,p.Z)(this,r),n.apply(this,arguments)}return(0,f.Z)(r,[{key:"part1",value:function(){return this.playBingo("play to win")}},{key:"part2",value:function(){return this.playBingo("let the giant squid win")}},{key:"playBingo",value:function(t){var n,r=this,e=this.parseInput(),u=e.numbers,a=e.boards,o=e.lookup,s=a.map((function(){return Array(5).fill(0).map((function(){return Array(5).fill(!1)}))})),c=new Set,p="play to win"===t?1:a.length,f=(0,i.Z)(u);try{for(f.s();!(n=f.n()).done;){var l=n.value,h=o.get(l);if(h){var v,d=(0,i.Z)(h);try{var y=function(){var t=v.value,n=t.ti,e=t.tj,i=t.tk;if((s[n][e][i]=!0,!c.has(n)&&r.isBingo(s[n],e,i))&&(c.add(n),c.size===p))return{v:a[n].reduce((function(t,r,e){return t+r.reduce((function(t,r,i){return t+(s[n][e][i]?0:r)}),0)}),0)*l}};for(d.s();!(v=d.n()).done;){var m=y();if("object"===typeof m)return m.v}}catch(g){d.e(g)}finally{d.f()}}}}catch(g){f.e(g)}finally{f.f()}this.noSolution()}},{key:"isBingo",value:function(t,n,r){for(var e=!0,i=!0,u=0;u<5;u++)if(e&&(e=t[u][r]),i&&(i=t[n][u]),!e&&!i)return!1;return!0}},{key:"parseInput",value:function(){for(var t=this,n=this.parseNumbersInLine(this.inputLines[0]),r=[],e=new Map,i=1,u=function(){for(var n=[],u=r.push(n)-1,a=void 0,o=function(){var r=t.parseNumbersInLine(a),i=n.push(r)-1;r.map((function(t,n){var r=e.get(t);r||e.set(t,r=[]),r.push({ti:u,tj:i,tk:n})}))};a=t.inputLines[++i];)o()};i<this.inputLines.length;)u();return{numbers:n,boards:r,lookup:e}}},{key:"parseNumbersInLine",value:function(t){return I(/\d+/g,t).map((function(t){return parseInt(t[0])}))}}]),r}(k)),b({day:5,title:"Hydrothermal Venture"})(P=function(t){(0,l.Z)(r,t);var n=(0,h.Z)(r);function r(){return(0,p.Z)(this,r),n.apply(this,arguments)}return(0,f.Z)(r,[{key:"part1",value:function(){var t=this.parsePipes(),n=this.createMap(t,"skip diagonals");return this.countOverlaps(n)}},{key:"part2",value:function(){var t=this.parsePipes(),n=this.createMap(t,"include diagonals");return this.countOverlaps(n)}},{key:"countOverlaps",value:function(t){return t.reduce((function(t,n){return t+n.reduce((function(t,n){return t+(n>1?1:0)}),0)}),0)}},{key:"createMap",value:function(t,n){var r,e=[],u="skip diagonals"===n,a=(0,i.Z)(t);try{for(a.s();!(r=a.n()).done;){var o=r.value,s=o.x1,c=o.y1,p=o.x2,f=o.y2;u&&s!==p&&c!==f||this.drawLine(e,s,c,p,f)}}catch(l){a.e(l)}finally{a.f()}return e}},{key:"drawLine",value:function(t,n,r,e,i){for(var u=Math.sign(e-n),a=Math.sign(i-r),o=(0,L.Z)([null,null],2),s=o[0],c=o[1];s!==e||c!==i;){var p,f;s=(null!==(p=s)&&void 0!==p?p:n-u)+u,void 0===t[c=(null!==(f=c)&&void 0!==f?f:r-a)+a]&&(t[c]=[]),void 0===t[c][s]&&(t[c][s]=0),t[c][s]++}}},{key:"parsePipes",value:function(){return I(/(\d+),(\d+) -> (\d+),(\d+)/g,this.input).map((function(t){var n=t.slice(1).map((function(t){return parseInt(t)})),r=(0,L.Z)(n,4);return{x1:r[0],y1:r[1],x2:r[2],y2:r[3]}}))}}]),r}(k)),b({day:6,title:"Lanternfish"})(_=function(t){(0,l.Z)(r,t);var n=(0,h.Z)(r);function r(){return(0,p.Z)(this,r),n.apply(this,arguments)}return(0,f.Z)(r,[{key:"part1",value:function(){return this.simulateLanternfish(80)}},{key:"part2",value:function(){return this.simulateLanternfish(256)}},{key:"simulateLanternfish",value:function(t){var n=Array(9).fill(0);I(/\d/g,this.input).map((function(t){return parseInt(t[0])})).forEach((function(t){return n[t]++}));for(var r=0;r<t;r++){var e=n.shift();n[8]=e,n[6]+=e}return n.reduce((function(t,n){return t+n}),0)}}]),r}(k)),b({day:7,title:"The Treachery of Whales"})(A=function(t){(0,l.Z)(r,t);var n=(0,h.Z)(r);function r(){return(0,p.Z)(this,r),n.apply(this,arguments)}return(0,f.Z)(r,[{key:"part1",value:function(){for(var t=this.parseInput(),n=t.crabs,r=t.minPos,e=t.maxPos,i=Number.MAX_VALUE,u=function(t){var r=n.reduce((function(n,r){return n+Math.abs(r-t)}),0);i=Math.min(i,r)},a=r;a<=e;a++)u(a);return i}},{key:"part2",value:function(){for(var t=this.parseInput(),n=t.crabs,r=t.minPos,e=t.maxPos,i=Number.MAX_VALUE,u=function(t){var r=n.reduce((function(n,r){var e=Math.abs(r-t);return n+e*(e+1)/2}),0);i=Math.min(i,r)},a=r;a<=e;a++)u(a);return i}},{key:"parseInput",value:function(){var t=Number.MAX_VALUE,n=Number.MIN_VALUE;return{crabs:I(/\d+/g,this.input).map((function(r){var e=parseInt(r[0]);return t=Math.min(t,e),n=Math.max(n,e),e})),minPos:t,maxPos:n}}}]),r}(k));var M,S,P,_,A,O=(new(function(){function t(){(0,p.Z)(this,t)}return(0,f.Z)(t,[{key:"getSolutionsByDay",value:function(){return new Map(w.map((function(t){return[t.day,t]})))}},{key:"getSolutions",value:function(){return Array.from(this.getSolutionsByDay().values()).sort((function(t,n){return t.day-n.day}))}}]),t}())).getSolutionsByDay();addEventListener("message",function(){var t=(0,u.Z)(o().mark((function t(n){var r,e,u,a,p,f,l;return o().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(r=n.data,e=O.get(r.day)){t.next=4;break}return t.abrupt("return");case 4:(u=e.create()).init(r.input),a=(0,i.Z)([1,2]),t.prev=7,a.s();case 9:if((p=a.n()).done){t.next=16;break}return f=p.value,l=u.solveWithProgress(f),t.next=14,(0,s.n)(l.pipe((0,c.b)((function(t){return postMessage(t)}))));case 14:t.next=9;break;case 16:t.next=21;break;case 18:t.prev=18,t.t0=t.catch(7),a.e(t.t0);case 21:return t.prev=21,a.f(),t.finish(21);case 24:postMessage(new m(-1,null,0));case 25:case"end":return t.stop()}}),t,null,[[7,18,21,24]])})));return function(n){return t.apply(this,arguments)}}())}},n={};function r(e){var i=n[e];if(void 0!==i)return i.exports;var u=n[e]={exports:{}};return t[e](u,u.exports,r),u.exports}r.m=t,r.x=function(){var t=r.O(void 0,[487],(function(){return r(6459)}));return t=r.O(t)},function(){var t=[];r.O=function(n,e,i,u){if(!e){var a=1/0;for(p=0;p<t.length;p++){e=t[p][0],i=t[p][1],u=t[p][2];for(var o=!0,s=0;s<e.length;s++)(!1&u||a>=u)&&Object.keys(r.O).every((function(t){return r.O[t](e[s])}))?e.splice(s--,1):(o=!1,u<a&&(a=u));if(o){t.splice(p--,1);var c=i();void 0!==c&&(n=c)}}return n}u=u||0;for(var p=t.length;p>0&&t[p-1][2]>u;p--)t[p]=t[p-1];t[p]=[e,i,u]}}(),r.n=function(t){var n=t&&t.__esModule?function(){return t.default}:function(){return t};return r.d(n,{a:n}),n},r.d=function(t,n){for(var e in n)r.o(n,e)&&!r.o(t,e)&&Object.defineProperty(t,e,{enumerable:!0,get:n[e]})},r.f={},r.e=function(t){return Promise.all(Object.keys(r.f).reduce((function(n,e){return r.f[e](t,n),n}),[]))},r.u=function(t){return"static/js/"+t+".8dc0e7a2.chunk.js"},r.miniCssF=function(t){},r.o=function(t,n){return Object.prototype.hasOwnProperty.call(t,n)},r.p="/aoc2021/",function(){var t={459:1};r.f.i=function(n,e){t[n]||importScripts(r.p+r.u(n))};var n=self.webpackChunkaoc2021=self.webpackChunkaoc2021||[],e=n.push.bind(n);n.push=function(n){var i=n[0],u=n[1],a=n[2];for(var o in u)r.o(u,o)&&(r.m[o]=u[o]);for(a&&a(r);i.length;)t[i.pop()]=1;e(n)}}(),function(){var t=r.x;r.x=function(){return r.e(487).then(t)}}();r.x()}();
//# sourceMappingURL=459.0d7b1e42.chunk.js.map
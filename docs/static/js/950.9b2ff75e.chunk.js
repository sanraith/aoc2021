!function(){"use strict";var t={7950:function(t,n,e){var r,i=e(7762),u=e(5861),a=e(7757),o=e.n(a),s=e(1435),c=e(9591),p=e(5671),l=e(3144),f=e(136),h=e(9388),v=e(874),d=e(6043),y=function t(n,e){var r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:0;(0,p.Z)(this,t),this.part=n,this.progress=e,this.timeMs=r,this.kind="progress"},g=function t(n,e,r,i){(0,p.Z)(this,t),this.part=n,this.result=e,this.timeMs=r,this.visualizationData=i,this.kind="result"},k=function t(n,e){var r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:0;(0,p.Z)(this,t),this.part=n,this.message=e,this.timeMs=r,this.kind="error"},m=function(){function t(){(0,p.Z)(this,t),this.minTimeBetweenUpdatesMs=20,this.visualizationData=void 0,this._input=void 0,this._inputLines=void 0,this.currentSolution=void 0}return(0,l.Z)(t,[{key:"input",get:function(){var t;return null!==(t=this._input)&&void 0!==t?t:""}},{key:"inputLines",get:function(){return void 0===this._inputLines&&(this._inputLines=this.parseInputLines(this.input)),this._inputLines}},{key:"init",value:function(t){return this._input=t,this}},{key:"solveAsync",value:function(){var t=(0,u.Z)(o().mark((function t(n){var e;return o().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,(0,s.n)(this.solveWithProgress(n));case 2:e=t.sent,t.t0=e.kind,t.next="result"===t.t0?6:7;break;case 6:return t.abrupt("return",e.result);case 7:return t.abrupt("return",null);case 8:case"end":return t.stop()}}),t,this)})));return function(n){return t.apply(this,arguments)}}()},{key:"solveWithProgress",value:function(t){var n=this;return new v.y((function(e){if(n._input)if(n.currentSolution)e.error(new k(t,"Another solution is already in progress!"));else{var r=1===t?n.part1:n.part2;n.currentSolution={activePart:t,subscriber:e,stopwatch:new d.u,progressStopwatch:new d.u},n.visualizationData=null,n.currentSolution.stopwatch.start(),n.currentSolution.progressStopwatch.start();try{var i=r.apply(n)+"",u=n.currentSolution.stopwatch.stop(),a=new g(t,i,u,n.visualizationData);e.next(a)}catch(c){var o,s=null!==(o=n.currentSolution.stopwatch.stop())&&void 0!==o?o:0;e.next(new k(t,c+"",s))}finally{e.complete(),n.visualizationData=null,n.currentSolution=void 0}}else e.error(new k(t,"No input provided!"))}))}},{key:"updateProgress",value:function(t){var n=this.currentSolution;n&&n.progressStopwatch.getTime()>this.minTimeBetweenUpdatesMs&&(n.subscriber.next(new y(n.activePart,t,n.stopwatch.getTime())),n.progressStopwatch.start(!0))}},{key:"noSolution",value:function(t){var n;throw t=null!==(n=t)&&void 0!==n?n:"No solution available.",new Error(t)}},{key:"parseInputLines",value:function(t){var n,e=t.split(/\r\n?|\n/g),r=/^\s*$/gm;for(n=0;n<e.length;n++){var i=e[e.length-n-1];if(!r.test(i))break}return e.splice(e.length-n,n),e}}]),t}(),w=e(1413),Z=[];function b(){var t="number"===typeof(arguments.length<=0?void 0:arguments[0])?{day:arguments.length<=0?void 0:arguments[0],title:arguments.length<=1?void 0:arguments[1]}:arguments.length<=0?void 0:arguments[0];return function(n){Z.push((0,w.Z)((0,w.Z)({},t),{},{ctor:n,create:function(){return new n}}))}}b({day:1,title:"Sonar Sweep"})(r=function(t){(0,f.Z)(e,t);var n=(0,h.Z)(e);function e(){return(0,p.Z)(this,e),n.apply(this,arguments)}return(0,l.Z)(e,[{key:"part1",value:function(){var t=this.inputLines.map((function(t){return parseInt(t)}));return t.slice(1).reduce((function(n,e,r){return n+(t[r]<e?1:0)}),0)}},{key:"part2",value:function(){var t=this.inputLines.map((function(t){return parseInt(t)})),n=t.slice(2).map((function(n,e){return t[e]+t[e+1]+n}));return n.slice(1).reduce((function(t,e,r){return t+(n[r]<e?1:0)}),0)}}]),e}(m));var x,L=e(3324);function S(t,n){for(var e,r=[];e=t.exec(n);)r.push(e);return r}b({day:2,title:"Dive!"})(x=function(t){(0,f.Z)(e,t);var n=(0,h.Z)(e);function e(){return(0,p.Z)(this,e),n.apply(this,arguments)}return(0,l.Z)(e,[{key:"part1",value:function(){var t={hor:0,dep:0};return this.parseInput().forEach((function(n){t.hor+=n.hor,t.dep+=n.dep})),t.hor*t.dep}},{key:"part2",value:function(){var t={hor:0,dep:0,aim:0};return this.parseInput().forEach((function(n){t.aim+=n.dep,t.hor+=n.hor,t.dep+=t.aim*n.hor})),t.hor*t.dep}},{key:"parseInput",value:function(){return S(/([a-z]+) (\d+)/g,this.input).map((function(t){var n=(0,L.Z)(t,3),e=n[1],r=n[2],i=parseInt(r),u={hor:0,dep:0};switch(e){case"forward":u.hor+=i;break;case"down":u.dep+=i;break;case"up":u.dep-=i;break;default:throw new Error("Invalid input!")}return u}))}}]),e}(m)),b({day:3,title:"Binary Diagnostic"})(I=function(t){(0,f.Z)(e,t);var n=(0,h.Z)(e);function e(){return(0,p.Z)(this,e),n.apply(this,arguments)}return(0,l.Z)(e,[{key:"part1",value:function(){var t=this.inputLines,n=t.length/2,e=t[0].split("").map((function(n,e){return t.reduce((function(t,n){return t+parseInt(n[e])}),0)}));return parseInt(e.map((function(t){return t>=n?"1":"0"})).join(""),2)*parseInt(e.map((function(t){return t<n?"1":"0"})).join(""),2)}},{key:"part2",value:function(){var t=this.inputLines;return this.getRating(t,"most_common")*this.getRating(t,"least_common")}},{key:"getRating",value:function(t,n){for(var e=0;e<t[0].length&&1!==(t=this.filter(t,e,n)).length;e++);return parseInt(t[0],2)}},{key:"filter",value:function(t,n,e){var r=t.reduce((function(t,e){return t+parseInt(e[n])}),0),i=r>=t.length/2!==("least_common"===e)?"1":"0";return t.filter((function(t){return t[n]===i}))}}]),e}(m)),b({day:4,title:"Giant Squid"})(M=function(t){(0,f.Z)(e,t);var n=(0,h.Z)(e);function e(){return(0,p.Z)(this,e),n.apply(this,arguments)}return(0,l.Z)(e,[{key:"part1",value:function(){return this.playBingo("play to win")}},{key:"part2",value:function(){return this.playBingo("let the giant squid win")}},{key:"playBingo",value:function(t){var n,e=this,r=this.parseInput(),u=r.numbers,a=r.boards,o=r.lookup,s=a.map((function(){return Array(5).fill(0).map((function(){return Array(5).fill(!1)}))})),c=new Set,p="play to win"===t?1:a.length,l=(0,i.Z)(u);try{for(l.s();!(n=l.n()).done;){var f=n.value,h=o.get(f);if(h){var v,d=(0,i.Z)(h);try{var y=function(){var t=v.value,n=t.ti,r=t.tj,i=t.tk;if((s[n][r][i]=!0,!c.has(n)&&e.isBingo(s[n],r,i))&&(c.add(n),c.size===p))return{v:a[n].reduce((function(t,e,r){return t+e.reduce((function(t,e,i){return t+(s[n][r][i]?0:e)}),0)}),0)*f}};for(d.s();!(v=d.n()).done;){var g=y();if("object"===typeof g)return g.v}}catch(k){d.e(k)}finally{d.f()}}}}catch(k){l.e(k)}finally{l.f()}this.noSolution()}},{key:"isBingo",value:function(t,n,e){for(var r=!0,i=!0,u=0;u<5;u++)if(r&&(r=t[u][e]),i&&(i=t[n][u]),!r&&!i)return!1;return!0}},{key:"parseInput",value:function(){for(var t=this,n=this.parseNumbersInLine(this.inputLines[0]),e=[],r=new Map,i=1,u=function(){for(var n=[],u=e.push(n)-1,a=void 0,o=function(){var e=t.parseNumbersInLine(a),i=n.push(e)-1;e.map((function(t,n){var e=r.get(t);e||r.set(t,e=[]),e.push({ti:u,tj:i,tk:n})}))};a=t.inputLines[++i];)o()};i<this.inputLines.length;)u();return{numbers:n,boards:e,lookup:r}}},{key:"parseNumbersInLine",value:function(t){return S(/\d+/g,t).map((function(t){return parseInt(t[0])}))}}]),e}(m)),b({day:5,title:"Hydrothermal Venture"})(O=function(t){(0,f.Z)(e,t);var n=(0,h.Z)(e);function e(){return(0,p.Z)(this,e),n.apply(this,arguments)}return(0,l.Z)(e,[{key:"part1",value:function(){var t=this.parsePipes(),n=this.createMap(t,"skip diagonals");return this.countOverlaps(n)}},{key:"part2",value:function(){var t=this.parsePipes(),n=this.createMap(t,"include diagonals");return this.countOverlaps(n)}},{key:"countOverlaps",value:function(t){return t.reduce((function(t,n){return t+n.reduce((function(t,n){return t+(n>1?1:0)}),0)}),0)}},{key:"createMap",value:function(t,n){var e,r=[],u="skip diagonals"===n,a=(0,i.Z)(t);try{for(a.s();!(e=a.n()).done;){var o=e.value,s=o.x1,c=o.y1,p=o.x2,l=o.y2;u&&s!==p&&c!==l||this.drawLine(r,s,c,p,l)}}catch(f){a.e(f)}finally{a.f()}return r}},{key:"drawLine",value:function(t,n,e,r,i){for(var u=Math.sign(r-n),a=Math.sign(i-e),o=(0,L.Z)([null,null],2),s=o[0],c=o[1];s!==r||c!==i;){var p,l;s=(null!==(p=s)&&void 0!==p?p:n-u)+u,void 0===t[c=(null!==(l=c)&&void 0!==l?l:e-a)+a]&&(t[c]=[]),void 0===t[c][s]&&(t[c][s]=0),t[c][s]++}}},{key:"parsePipes",value:function(){return S(/(\d+),(\d+) -> (\d+),(\d+)/g,this.input).map((function(t){var n=t.slice(1).map((function(t){return parseInt(t)})),e=(0,L.Z)(n,4);return{x1:e[0],y1:e[1],x2:e[2],y2:e[3]}}))}}]),e}(m)),b({day:6,title:"Lanternfish"})(_=function(t){(0,f.Z)(e,t);var n=(0,h.Z)(e);function e(){return(0,p.Z)(this,e),n.apply(this,arguments)}return(0,l.Z)(e,[{key:"part1",value:function(){return this.simulateLanternfish(80)}},{key:"part2",value:function(){return this.simulateLanternfish(256)}},{key:"simulateLanternfish",value:function(t){var n=Array(9).fill(0);S(/\d/g,this.input).map((function(t){return parseInt(t[0])})).forEach((function(t){return n[t]++}));for(var e=0;e<t;e++){var r=n.shift();n[8]=r,n[6]+=r}return n.reduce((function(t,n){return t+n}),0)}}]),e}(m));var I,M,O,_,P=(new(function(){function t(){(0,p.Z)(this,t)}return(0,l.Z)(t,[{key:"getSolutionsByDay",value:function(){return new Map(Z.map((function(t){return[t.day,t]})))}},{key:"getSolutions",value:function(){return Array.from(this.getSolutionsByDay().values()).sort((function(t,n){return t.day-n.day}))}}]),t}())).getSolutionsByDay();addEventListener("message",function(){var t=(0,u.Z)(o().mark((function t(n){var e,r,u,a,p,l,f;return o().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(e=n.data,r=P.get(e.day)){t.next=4;break}return t.abrupt("return");case 4:(u=r.create()).init(e.input),a=(0,i.Z)([1,2]),t.prev=7,a.s();case 9:if((p=a.n()).done){t.next=16;break}return l=p.value,f=u.solveWithProgress(l),t.next=14,(0,s.n)(f.pipe((0,c.b)((function(t){return postMessage(t)}))));case 14:t.next=9;break;case 16:t.next=21;break;case 18:t.prev=18,t.t0=t.catch(7),a.e(t.t0);case 21:return t.prev=21,a.f(),t.finish(21);case 24:postMessage(new g(-1,null,0));case 25:case"end":return t.stop()}}),t,null,[[7,18,21,24]])})));return function(n){return t.apply(this,arguments)}}())}},n={};function e(r){var i=n[r];if(void 0!==i)return i.exports;var u=n[r]={exports:{}};return t[r](u,u.exports,e),u.exports}e.m=t,e.x=function(){var t=e.O(void 0,[487],(function(){return e(7950)}));return t=e.O(t)},function(){var t=[];e.O=function(n,r,i,u){if(!r){var a=1/0;for(p=0;p<t.length;p++){r=t[p][0],i=t[p][1],u=t[p][2];for(var o=!0,s=0;s<r.length;s++)(!1&u||a>=u)&&Object.keys(e.O).every((function(t){return e.O[t](r[s])}))?r.splice(s--,1):(o=!1,u<a&&(a=u));if(o){t.splice(p--,1);var c=i();void 0!==c&&(n=c)}}return n}u=u||0;for(var p=t.length;p>0&&t[p-1][2]>u;p--)t[p]=t[p-1];t[p]=[r,i,u]}}(),e.n=function(t){var n=t&&t.__esModule?function(){return t.default}:function(){return t};return e.d(n,{a:n}),n},e.d=function(t,n){for(var r in n)e.o(n,r)&&!e.o(t,r)&&Object.defineProperty(t,r,{enumerable:!0,get:n[r]})},e.f={},e.e=function(t){return Promise.all(Object.keys(e.f).reduce((function(n,r){return e.f[r](t,n),n}),[]))},e.u=function(t){return"static/js/"+t+".8dc0e7a2.chunk.js"},e.miniCssF=function(t){},e.o=function(t,n){return Object.prototype.hasOwnProperty.call(t,n)},e.p="/aoc2021/",function(){var t={950:1};e.f.i=function(n,r){t[n]||importScripts(e.p+e.u(n))};var n=self.webpackChunkaoc2021=self.webpackChunkaoc2021||[],r=n.push.bind(n);n.push=function(n){var i=n[0],u=n[1],a=n[2];for(var o in u)e.o(u,o)&&(e.m[o]=u[o]);for(a&&a(e);i.length;)t[i.pop()]=1;r(n)}}(),function(){var t=e.x;e.x=function(){return e.e(487).then(t)}}();e.x()}();
//# sourceMappingURL=950.9b2ff75e.chunk.js.map
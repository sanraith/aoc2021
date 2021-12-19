!function(){"use strict";var t={560:function(t,n,e){var r,a=e(7762),i=e(5861),u=e(7757),o=e.n(u),s=e(1435),c=e(9591),f=e(5671),l=e(3144),p=e(136),h=e(9388),v=e(874),d=e(6043),y=function t(n,e){var r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:0;(0,f.Z)(this,t),this.part=n,this.progress=e,this.timeMs=r,this.kind="progress"},m=function t(n,e,r,a){(0,f.Z)(this,t),this.part=n,this.result=e,this.timeMs=r,this.visualizationData=a,this.kind="result"},g=function t(n,e){var r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:0;(0,f.Z)(this,t),this.part=n,this.message=e,this.timeMs=r,this.kind="error"},k=function(){function t(){(0,f.Z)(this,t),this.minTimeBetweenUpdatesMs=20,this.visualizationData=void 0,this._input=void 0,this._inputLines=void 0,this.currentSolution=void 0}return(0,l.Z)(t,[{key:"input",get:function(){var t;return null!==(t=this._input)&&void 0!==t?t:""}},{key:"inputLines",get:function(){return void 0===this._inputLines&&(this._inputLines=this.parseInputLines(this.input)),this._inputLines}},{key:"init",value:function(t){return this._input=t,this}},{key:"solveAsync",value:function(){var t=(0,i.Z)(o().mark((function t(n){var e;return o().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,(0,s.n)(this.solveWithProgress(n));case 2:e=t.sent,t.t0=e.kind,t.next="result"===t.t0?6:7;break;case 6:return t.abrupt("return",e.result);case 7:return t.abrupt("return",null);case 8:case"end":return t.stop()}}),t,this)})));return function(n){return t.apply(this,arguments)}}()},{key:"solveWithProgress",value:function(t){var n=this;return new v.y((function(e){if(n._input)if(n.currentSolution)e.error(new g(t,"Another solution is already in progress!"));else{var r=1===t?n.part1:n.part2;n.currentSolution={activePart:t,subscriber:e,stopwatch:new d.u,progressStopwatch:new d.u},n.visualizationData=null,n.currentSolution.stopwatch.start(),n.currentSolution.progressStopwatch.start();try{var a=r.apply(n)+"",i=n.currentSolution.stopwatch.stop(),u=new m(t,a,i,n.visualizationData);e.next(u)}catch(c){var o,s=null!==(o=n.currentSolution.stopwatch.stop())&&void 0!==o?o:0;e.next(new g(t,c+"",s))}finally{e.complete(),n.visualizationData=null,n.currentSolution=void 0}}else e.error(new g(t,"No input provided!"))}))}},{key:"updateProgress",value:function(t){var n=this.currentSolution;n&&n.progressStopwatch.getTime()>this.minTimeBetweenUpdatesMs&&(n.subscriber.next(new y(n.activePart,t,n.stopwatch.getTime())),n.progressStopwatch.start(!0))}},{key:"noSolution",value:function(t){var n;throw t=null!==(n=t)&&void 0!==n?n:"No solution available.",new Error(t)}},{key:"parseInputLines",value:function(t){var n,e=t.split(/\r\n?|\n/g),r=/^\s*$/gm;for(n=0;n<e.length;n++){var a=e[e.length-n-1];if(!r.test(a))break}return e.splice(e.length-n,n),e}}]),t}(),Z=e(1413),x=[];function w(){var t="number"===typeof(arguments.length<=0?void 0:arguments[0])?{day:arguments.length<=0?void 0:arguments[0],title:arguments.length<=1?void 0:arguments[1]}:arguments.length<=0?void 0:arguments[0];return function(n){x.push((0,Z.Z)((0,Z.Z)({},t),{},{ctor:n,create:function(){return new n}}))}}w({day:1,title:"Sonar Sweep"})(r=function(t){(0,p.Z)(e,t);var n=(0,h.Z)(e);function e(){return(0,f.Z)(this,e),n.apply(this,arguments)}return(0,l.Z)(e,[{key:"part1",value:function(){var t=this.inputLines.map((function(t){return parseInt(t)}));return t.slice(1).reduce((function(n,e,r){return n+(t[r]<e?1:0)}),0)}},{key:"part2",value:function(){var t=this.inputLines.map((function(t){return parseInt(t)})),n=t.slice(2).map((function(n,e){return t[e]+t[e+1]+n}));return n.slice(1).reduce((function(t,e,r){return t+(n[r]<e?1:0)}),0)}}]),e}(k));var I,S=e(3324),M=e(9062);function b(t,n){for(var e,r=[];e=t.exec(n);)r.push(e);return r}function P(t,n){return new Set((0,M.Z)(t).filter((function(t){return n.has(t)})))}w({day:2,title:"Dive!"})(I=function(t){(0,p.Z)(e,t);var n=(0,h.Z)(e);function e(){return(0,f.Z)(this,e),n.apply(this,arguments)}return(0,l.Z)(e,[{key:"part1",value:function(){var t={hor:0,dep:0};return this.parseInput().forEach((function(n){t.hor+=n.hor,t.dep+=n.dep})),t.hor*t.dep}},{key:"part2",value:function(){var t={hor:0,dep:0,aim:0};return this.parseInput().forEach((function(n){t.aim+=n.dep,t.hor+=n.hor,t.dep+=t.aim*n.hor})),t.hor*t.dep}},{key:"parseInput",value:function(){return b(/([a-z]+) (\d+)/g,this.input).map((function(t){var n=(0,S.Z)(t,3),e=n[1],r=n[2],a=parseInt(r),i={hor:0,dep:0};switch(e){case"forward":i.hor+=a;break;case"down":i.dep+=a;break;case"up":i.dep-=a;break;default:throw new Error("Invalid input!")}return i}))}}]),e}(k)),w({day:3,title:"Binary Diagnostic"})(E=function(t){(0,p.Z)(e,t);var n=(0,h.Z)(e);function e(){return(0,f.Z)(this,e),n.apply(this,arguments)}return(0,l.Z)(e,[{key:"part1",value:function(){var t=this.inputLines,n=t.length/2,e=t[0].split("").map((function(n,e){return t.reduce((function(t,n){return t+parseInt(n[e])}),0)}));return parseInt(e.map((function(t){return t>=n?"1":"0"})).join(""),2)*parseInt(e.map((function(t){return t<n?"1":"0"})).join(""),2)}},{key:"part2",value:function(){var t=this.inputLines;return this.getRating(t,"most_common")*this.getRating(t,"least_common")}},{key:"getRating",value:function(t,n){for(var e=0;e<t[0].length&&1!==(t=this.filter(t,e,n)).length;e++);return parseInt(t[0],2)}},{key:"filter",value:function(t,n,e){var r=t.reduce((function(t,e){return t+parseInt(e[n])}),0),a=r>=t.length/2!==("least_common"===e)?"1":"0";return t.filter((function(t){return t[n]===a}))}}]),e}(k)),w({day:4,title:"Giant Squid"})(L=function(t){(0,p.Z)(e,t);var n=(0,h.Z)(e);function e(){return(0,f.Z)(this,e),n.apply(this,arguments)}return(0,l.Z)(e,[{key:"part1",value:function(){return this.playBingo("play to win")}},{key:"part2",value:function(){return this.playBingo("let the giant squid win")}},{key:"playBingo",value:function(t){var n,e=this,r=this.parseInput(),i=r.numbers,u=r.boards,o=r.lookup,s=u.map((function(){return Array(5).fill(0).map((function(){return Array(5).fill(!1)}))})),c=new Set,f="play to win"===t?1:u.length,l=(0,a.Z)(i);try{for(l.s();!(n=l.n()).done;){var p=n.value,h=o.get(p);if(h){var v,d=(0,a.Z)(h);try{var y=function(){var t=v.value,n=t.ti,r=t.tj,a=t.tk;if((s[n][r][a]=!0,!c.has(n)&&e.isBingo(s[n],r,a))&&(c.add(n),c.size===f))return{v:u[n].reduce((function(t,e,r){return t+e.reduce((function(t,e,a){return t+(s[n][r][a]?0:e)}),0)}),0)*p}};for(d.s();!(v=d.n()).done;){var m=y();if("object"===typeof m)return m.v}}catch(g){d.e(g)}finally{d.f()}}}}catch(g){l.e(g)}finally{l.f()}this.noSolution()}},{key:"isBingo",value:function(t,n,e){for(var r=!0,a=!0,i=0;i<5;i++)if(r&&(r=t[i][e]),a&&(a=t[n][i]),!r&&!a)return!1;return!0}},{key:"parseInput",value:function(){for(var t=this,n=this.parseNumbersInLine(this.inputLines[0]),e=[],r=new Map,a=1,i=function(){for(var n=[],i=e.push(n)-1,u=void 0,o=function(){var e=t.parseNumbersInLine(u),a=n.push(e)-1;e.map((function(t,n){var e=r.get(t);e||r.set(t,e=[]),e.push({ti:i,tj:a,tk:n})}))};u=t.inputLines[++a];)o()};a<this.inputLines.length;)i();return{numbers:n,boards:e,lookup:r}}},{key:"parseNumbersInLine",value:function(t){return b(/\d+/g,t).map((function(t){return parseInt(t[0])}))}}]),e}(k)),w({day:5,title:"Hydrothermal Venture"})(N=function(t){(0,p.Z)(e,t);var n=(0,h.Z)(e);function e(){return(0,f.Z)(this,e),n.apply(this,arguments)}return(0,l.Z)(e,[{key:"part1",value:function(){var t=this.parsePipes(),n=this.createMap(t,"skip diagonals");return this.countOverlaps(n)}},{key:"part2",value:function(){var t=this.parsePipes(),n=this.createMap(t,"include diagonals");return this.countOverlaps(n)}},{key:"countOverlaps",value:function(t){return t.reduce((function(t,n){return t+n.reduce((function(t,n){return t+(n>1?1:0)}),0)}),0)}},{key:"createMap",value:function(t,n){var e,r=[],i="skip diagonals"===n,u=(0,a.Z)(t);try{for(u.s();!(e=u.n()).done;){var o=e.value,s=o.x1,c=o.y1,f=o.x2,l=o.y2;i&&s!==f&&c!==l||this.drawLine(r,s,c,f,l)}}catch(p){u.e(p)}finally{u.f()}return r}},{key:"drawLine",value:function(t,n,e,r,a){for(var i=Math.sign(r-n),u=Math.sign(a-e),o=(0,S.Z)([null,null],2),s=o[0],c=o[1];s!==r||c!==a;){var f,l;s=(null!==(f=s)&&void 0!==f?f:n-i)+i,void 0===t[c=(null!==(l=c)&&void 0!==l?l:e-u)+u]&&(t[c]=[]),void 0===t[c][s]&&(t[c][s]=0),t[c][s]++}}},{key:"parsePipes",value:function(){return b(/(\d+),(\d+) -> (\d+),(\d+)/g,this.input).map((function(t){var n=t.slice(1).map((function(t){return parseInt(t)})),e=(0,S.Z)(n,4);return{x1:e[0],y1:e[1],x2:e[2],y2:e[3]}}))}}]),e}(k)),w({day:6,title:"Lanternfish"})(A=function(t){(0,p.Z)(e,t);var n=(0,h.Z)(e);function e(){return(0,f.Z)(this,e),n.apply(this,arguments)}return(0,l.Z)(e,[{key:"part1",value:function(){return this.simulateLanternfish(80)}},{key:"part2",value:function(){return this.simulateLanternfish(256)}},{key:"simulateLanternfish",value:function(t){var n=Array(9).fill(0);b(/\d/g,this.input).map((function(t){return parseInt(t[0])})).forEach((function(t){return n[t]++}));for(var e=0;e<t;e++){var r=n.shift();n[8]=r,n[6]+=r}return n.reduce((function(t,n){return t+n}),0)}}]),e}(k)),w({day:7,title:"The Treachery of Whales"})(j=function(t){(0,p.Z)(e,t);var n=(0,h.Z)(e);function e(){return(0,f.Z)(this,e),n.apply(this,arguments)}return(0,l.Z)(e,[{key:"part1",value:function(){for(var t=this.parseInput(),n=t.crabs,e=t.minPos,r=t.maxPos,a=Number.MAX_VALUE,i=function(t){var e=n.reduce((function(n,e){return n+Math.abs(e-t)}),0);a=Math.min(a,e)},u=e;u<=r;u++)i(u);return a}},{key:"part2",value:function(){for(var t=this.parseInput(),n=t.crabs,e=t.minPos,r=t.maxPos,a=Number.MAX_VALUE,i=function(t){var e=n.reduce((function(n,e){var r=Math.abs(e-t);return n+r*(r+1)/2}),0);a=Math.min(a,e)},u=e;u<=r;u++)i(u);return a}},{key:"parseInput",value:function(){var t=Number.MAX_VALUE,n=Number.MIN_VALUE;return{crabs:b(/\d+/g,this.input).map((function(e){var r=parseInt(e[0]);return t=Math.min(t,r),n=Math.max(n,r),r})),minPos:t,maxPos:n}}}]),e}(k));var E,L,N,A,j,z,D,C,_,O,R,B,V,G,T,Y,F,U=["abcefg","cf","acdeg","acdfg","bcdf","abdfg","abdefg","acf","abcdefg","abcdfg"],q=new Set(U),W=(w({day:8,title:"Seven Segment Search"})(z=function(t){(0,p.Z)(e,t);var n=(0,h.Z)(e);function e(){return(0,f.Z)(this,e),n.apply(this,arguments)}return(0,l.Z)(e,[{key:"part1",value:function(){var t=new Set([2,3,4,7]);return this.parseInput().reduce((function(n,e){return n+e.digits.reduce((function(n,e){return n+(t.has(e.length)?1:0)}),0)}),0)}},{key:"part2",value:function(){var t=this,n=this.parseInput();return n.reduce((function(e,r,a){return t.updateProgress(a/n.length),e+t.decodeDisplayValue(r)}),0)}},{key:"decodeDisplayValue",value:function(t){var n=this,e=t.patterns,r=t.digits,a=this.generateVagueSegmentMap(e),i=this.resolveSegmentMap(a,e);return i||this.noSolution(),parseInt(r.map((function(t){return n.decodeDigit(t,i)})).join(""))}},{key:"resolveSegmentMap",value:function(t,n){var e=this,r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:0;if(r===t.length){var i=Object.fromEntries(t.map((function(t){return[t.from,t.to[0]]})));return this.isSegmentMapValid(i,n)?i:null}var u,o=t[r].to,s=(0,a.Z)(o);try{var c=function(){var a=u.value,i=[].concat((0,M.Z)(t.slice(0,r)),[{from:t[r].from,to:[a]}],(0,M.Z)(t.slice(r+1).map((function(t){return{from:t.from,to:t.to.filter((function(t){return t!==a}))}})))),o=e.resolveSegmentMap(i,n,r+1);if(o)return{v:o}};for(s.s();!(u=s.n()).done;){var f=c();if("object"===typeof f)return f.v}}catch(l){s.e(l)}finally{s.f()}return null}},{key:"isSegmentMapValid",value:function(t,n){var e=this;return n.every((function(n){return q.has(e.decodeSegments(n,t))}))}},{key:"decodeDigit",value:function(t,n){return U.indexOf(this.decodeSegments(t,n))}},{key:"decodeSegments",value:function(t,n){return t.split("").map((function(t){return n[t]})).sort().join("")}},{key:"generateVagueSegmentMap",value:function(t){var n=new Map(Array(8).fill(0).map((function(t,n){return[n,[]]})));U.forEach((function(t){return n.get(t.length).push(t.split(""))}));var e,r=new Map,i=(0,a.Z)(t);try{var u=function(){var t=e.value,i=new Map,u=n.get(t.length);t.split("").forEach((function(t){return u.forEach((function(n){return n.forEach((function(n){i.has(t)||i.set(t,new Set),i.get(t).add(n)}))}))}));var o,s=(0,a.Z)(i.entries());try{for(s.s();!(o=s.n()).done;){var c=(0,S.Z)(o.value,2),f=c[0],l=c[1];if(r.has(f)){var p=r.get(f);r.set(f,P(p,l))}else r.set(f,l)}}catch(h){s.e(h)}finally{s.f()}};for(i.s();!(e=i.n()).done;)u()}catch(o){i.e(o)}finally{i.f()}return(0,M.Z)(r.entries()).map((function(t){return{from:t[0],to:(0,M.Z)(t[1])}})).sort((function(t,n){return t.to.length-n.to.length}))}},{key:"parseInput",value:function(){return b(/(.+) \| (.+)/g,this.input).map((function(t){var n=(0,S.Z)(t,3),e=n[1],r=n[2];return{patterns:b(/[a-g]+/g,e).map((function(t){return t[0]})),digits:b(/[a-g]+/g,r).map((function(t){return t[0]}))}}))}}]),e}(k)),[[-1,0],[0,-1],[1,0],[0,1]].map((function(t){return{x:t[0],y:t[1]}}))),X=(w({day:9,title:"Smoke Basin"})(D=function(t){(0,p.Z)(e,t);var n=(0,h.Z)(e);function e(){return(0,f.Z)(this,e),n.apply(this,arguments)}return(0,l.Z)(e,[{key:"part1",value:function(){var t=this.parseInput();return this.getLowPoints(t).reduce((function(n,e){return n+1+t.map[e.y][e.x]}),0)}},{key:"part2",value:function(){var t=this,n=this.parseInput();return this.getLowPoints(n).map((function(e){return t.flood(n,e)})).sort((function(t,n){return n-t})).slice(0,3).reduce((function(t,n){return t*n}),1)}},{key:"getLowPoints",value:function(t){for(var n=t.map,e=t.width,r=t.height,a=[],i=function(t){for(var r=function(e){var r=n[t][e];W.map((function(r){return n[t+r.y]&&n[t+r.y][e+r.x]})).every((function(t){return void 0===t||r<t}))&&a.push({x:e,y:t})},i=0;i<e;i++)r(i)},u=0;u<r;u++)i(u);return a}},{key:"flood",value:function(t,n){for(var e=t.map,r=t.width,a=t.height,i=new Set,u=[n],o=function(){var t,n=u.shift(),o=(t=n).y*r+t.x;if(i.has(o))return"continue";i.add(o),W.forEach((function(t){var i=n.x+t.x,o=n.y+t.y;i>=0&&i<r&&o>=0&&o<a&&e[o][i]<9&&u.push({x:i,y:o})}))};u.length>0;)o();return i.size}},{key:"parseInput",value:function(){var t=this.inputLines.map((function(t){return b(/\d/g,t).map((function(t){return parseInt(t[0])}))}));return{map:t,width:t[0].length,height:t.length}}}]),e}(k)),{"(":")","[":"]","{":"}","<":">"}),H={")":3,"]":57,"}":1197,">":25137},$={")":1,"]":2,"}":3,">":4},J=(w({day:10,title:"Syntax Scoring"})(C=function(t){(0,p.Z)(e,t);var n=(0,h.Z)(e);function e(){return(0,f.Z)(this,e),n.apply(this,arguments)}return(0,l.Z)(e,[{key:"part1",value:function(){var t=this;return this.inputLines.reduce((function(n,e){return n+t.score(e,"check")}),0)}},{key:"part2",value:function(){var t=this,n=this.inputLines.filter((function(n){return!t.score(n,"check")})).map((function(n){return t.score(n,"complete")}));return n.sort((function(t,n){return t-n}))[Math.floor(n.length/2)]}},{key:"score",value:function(t,n){var e,r=[],i=(0,a.Z)(t.split(""));try{for(i.s();!(e=i.n()).done;){var u=e.value;if(X[u])r.push(u);else{var o=r.pop();if(X[o]!==u)return H[u]}}}catch(c){i.e(c)}finally{i.f()}var s=0;return"complete"===n&&(s=r.reduceRight((function(t,n){return 5*t+$[X[n]]}),0)),s}}]),e}(k)),w({day:11,title:"Dumbo Octopus"})(_=function(t){(0,p.Z)(e,t);var n=(0,h.Z)(e);function e(){return(0,f.Z)(this,e),n.apply(this,arguments)}return(0,l.Z)(e,[{key:"part1",value:function(){for(var t=this.parseInput(),n=0,e=1;e<=100;e++)n+=this.step(t);return n}},{key:"part2",value:function(){for(var t=this.parseInput(),n=t.width*t.height,e=1;this.step(t)<n;)e++;return e}},{key:"step",value:function(t){var n=this,e=t.map,r=0;return this.forEachCell(t,(function(t,n){return e[n][t]++})),this.forEachCell(t,(function(e,a){return r+=n.flash(t,e,a)})),this.forEachCell(t,(function(t,n){return e[n][t]=Math.max(0,e[n][t])})),r}},{key:"flash",value:function(t,n,e){var r=this,a=t.map;if(a[e][n]<=9)return 0;var i=1;return a[e][n]=Number.MIN_SAFE_INTEGER,this.forEachNeighbor(t,n,e,(function(n,e){a[e][n]++,a[e][n]>9&&(i+=r.flash(t,n,e))})),i}},{key:"forEachCell",value:function(t,n){for(var e=t.width,r=t.height,a=0;a<r;a++)for(var i=0;i<e;i++)n(i,a)}},{key:"forEachNeighbor",value:function(t,n,e,r){for(var a=t.width,i=t.height,u=Math.min(a-1,n+1),o=Math.min(i-1,e+1),s=Math.max(0,e-1);s<=o;s++)for(var c=Math.max(0,n-1);c<=u;c++)c===n&&s===e||r(c,s)}},{key:"visualize",value:function(t){var n=t.map.map((function(t){return t.map((function(t){return t<0?"-":t>9?"+":t})).join("")})).join("\n");console.log("\n".concat(n))}},{key:"parseInput",value:function(){var t,n,e=b(/\d+/g,this.input).map((function(t){return t[0].split("").map((function(t){return parseInt(t)}))}));return{map:e,width:null!==(t=null===(n=e[0])||void 0===n?void 0:n.length)&&void 0!==t?t:0,height:e.length}}}]),e}(k)),w({day:12,title:"Passage Pathing"})(O=function(t){(0,p.Z)(e,t);var n=(0,h.Z)(e);function e(){return(0,f.Z)(this,e),n.apply(this,arguments)}return(0,l.Z)(e,[{key:"part1",value:function(){return this.findPathCount(this.parseCaveSystem(),1)}},{key:"part2",value:function(){return this.findPathCount(this.parseCaveSystem())}},{key:"findPathCount",value:function(t){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0,e=arguments.length>2?arguments[2]:void 0,r=arguments.length>3?arguments[3]:void 0,i=t.map,u=t.start,o=t.end;if(!e||!r)return this.findPathCount(t,n,u,new Set([u]));var s,c=0,f=i.get(e),l=(0,a.Z)(f);try{for(l.s();!(s=l.n()).done;){var p=s.value;if(p!==u){var h=n;if(p<0&&r.has(p)){if(h)continue;h=p}r.add(p),p===o?c++:c+=this.findPathCount(t,h,p,r),h!==p&&r.delete(p)}}}catch(v){l.e(v)}finally{l.f()}return c}},{key:"parseCaveSystem",value:function(){var t,n=0,e=b(/(\w+)-(\w+)/g,this.input).map((function(t){var n=(0,S.Z)(t,3);return[n[1],n[2]]})),r=(0,M.Z)(new Set(e.flat())),i=Object.fromEntries(r.map((function(t){return[t,++n*(t[0].toUpperCase()===t[0]?1:-1)]}))),u=new Map(r.map((function(t){return[i[t],[]]}))),o=(0,a.Z)(e);try{for(o.s();!(t=o.n()).done;){var s=(0,S.Z)(t.value,2),c=s[0],f=s[1];u.get(i[c]).push(i[f]),u.get(i[f]).push(i[c])}}catch(l){o.e(l)}finally{o.f()}return{map:u,start:i.start,end:i.end}}}]),e}(k)),w({day:13,title:"Transparent Origami"})(R=function(t){(0,p.Z)(e,t);var n=(0,h.Z)(e);function e(){var t;(0,f.Z)(this,e);for(var r=arguments.length,a=new Array(r),i=0;i<r;i++)a[i]=arguments[i];return(t=n.call.apply(n,[this].concat(a))).visualizationData=void 0,t}return(0,l.Z)(e,[{key:"part1",value:function(){var t=this.parseInput();return this.fold(t.points,t.folds[0]).length}},{key:"part2",value:function(){var t=this;this.visualizationData={steps:[]};var n=this.parseInput(),e=n.folds.reduce((function(n,e){return t.visualizationData.steps.push({points:n,fold:e}),t.fold(n,e)}),n.points);return this.visualizationData.steps.push({points:e}),this.draw(e)}},{key:"fold",value:function(t,n){var e=new Set;return t.map((function(t){return{x:n.x&&t.x>n.x?t.x-2*(t.x-n.x):t.x,y:n.y&&t.y>n.y?t.y-2*(t.y-n.y):t.y}})).filter((function(t){var n="".concat(t.x,",").concat(t.y);return!e.has(n)&&e.add(n)}))}},{key:"draw",value:function(t){var n=t.reduce((function(t,n){return Math.max(t,n.x)}),-1)+1,e=t.reduce((function(t,n){return Math.max(t,n.y)}),-1)+1,r=Array(e).fill(0).map((function(){return Array(n).fill(" ")}));return t.forEach((function(t){return r[t.y][t.x]="\u2588"})),r.map((function(t){return t.join("")})).join("\n")}},{key:"parseInput",value:function(){return{points:b(/(\d+),(\d+)/g,this.input).map((function(t){return{x:parseInt(t[1]),y:parseInt(t[2])}})),folds:b(/fold along ([xy])=(\d+)/g,this.input).map((function(t){var n=t[1],e=parseInt(t[2]);return{x:"x"===n?e:0,y:"y"===n?e:0}}))}}}]),e}(k)),w({day:14,title:"Extended Polymerization"})(B=function(t){(0,p.Z)(e,t);var n=(0,h.Z)(e);function e(){return(0,f.Z)(this,e),n.apply(this,arguments)}return(0,l.Z)(e,[{key:"part1",value:function(){var t=this.parseInput(),n=t.template,e=t.rules,r=this.runSteps(n,e,10),a=r.leastCommonCount;return r.mostCommonCount-a}},{key:"part2",value:function(){var t=this.parseInput(),n=t.template,e=t.rules,r=this.runSteps(n,e,40),a=r.leastCommonCount;return r.mostCommonCount-a}},{key:"runSteps",value:function(t,n,e){var r=(0,M.Z)(new Set(n.flatMap((function(t){return[t.newLetter].concat((0,M.Z)(t.pair.split("")))})))),a=Object.fromEntries(r.map((function(t){return[t,0]}))),i=r.flatMap((function(t){return r.map((function(n){return t+n}))})),u=Object.fromEntries(i.map((function(t){return[t,0]}))),o=Object.fromEntries(n.map((function(t){return[t.pair,t]})));t.split("").forEach((function(t,n,e){a[t]++,n<e.length-1&&u[t+e[n+1]]++}));for(var s=0;s<e;s++)for(var c=function(){var t=(0,S.Z)(l[f],2),n=t[0],e=t[1],r=o[n],i=r.newPairs,s=r.newLetter;a[s]+=e,u[n]-=e,i.forEach((function(t){return u[t]+=e}))},f=0,l=Object.entries(u);f<l.length;f++)c();var p=Object.entries(a).map((function(t){var n=(0,S.Z)(t,2);return{char:n[0],count:n[1]}})).sort((function(t,n){return t.count-n.count})),h=p[0].count;return{mostCommonCount:p[p.length-1].count,leastCommonCount:h}}},{key:"parseInput",value:function(){var t,n;return{template:null!==(t=null===(n=this.input.match(/^\w+/m))||void 0===n?void 0:n[0])&&void 0!==t?t:"",rules:b(/(\w{2}) -> (\w)/g,this.input).map((function(t){var n=(0,S.Z)(t,3),e=n[1],r=n[2];return{pair:e,newLetter:r,newPairs:[e[0]+r,r+e[1]]}}))}}}]),e}(k)),function(){function t(n,e){(0,f.Z)(this,t),this.x=n,this.y=e}return(0,l.Z)(t,[{key:"add",value:function(n){return new t(this.x+n.x,this.y+n.y)}},{key:"isInBounds",value:function(t,n){return this.x>=0&&this.x<t&&this.y>=0&&this.y<n}},{key:"toString",value:function(){return"".concat(this.x,",").concat(this.y)}}]),t}()),K=[[1,0],[0,1],[-1,0],[0,-1]].map((function(t){var n=(0,S.Z)(t,2),e=n[0],r=n[1];return new J(e,r)})),Q=(w({day:15,title:"Chiton"})(V=function(t){(0,p.Z)(e,t);var n=(0,h.Z)(e);function e(){return(0,f.Z)(this,e),n.apply(this,arguments)}return(0,l.Z)(e,[{key:"part1",value:function(){var t=this.parseGrid();return this.findShortestPathLength(t)}},{key:"part2",value:function(){var t=this.enlargeGrid(this.parseGrid(),5);return this.findShortestPathLength(t)}},{key:"findShortestPathLength",value:function(t){for(var n=t.map,e=t.width,r=t.height,i=e*r,u=i-1,o=Array(i).fill(0).map((function(t,a){var u=function(t){return new J(t%e,Math.floor(t/e))}(a),o=K.map((function(t){return u.add(t).isInBounds(e,r)?function(t){return t.y*e+t.x}(u.add(t)):void 0})).filter((function(t){return void 0!==t})).sort((function(t,n){return t-n}));return{index:a,value:n[u.y][u.x],outEdges:a===i-1?[]:o,shortestDistance:0===a?0:Number.MAX_SAFE_INTEGER}})),s=0,c=new Set([0]);c.size>0;){this.updateProgress(Math.min(s++/e,.99));var f=(0,M.Z)(c.values()).map((function(t){return o[t]}));c.clear();var l,p=(0,a.Z)(f);try{for(p.s();!(l=p.n()).done;){var h,v=l.value,d=(0,a.Z)(v.outEdges);try{for(d.s();!(h=d.n()).done;){var y=h.value,m=o[y],g=v.shortestDistance+m.value;g<m.shortestDistance&&(m.shortestDistance=g,c.add(m.index),m.outEdges.forEach((function(t){return c.add(t)})))}}catch(k){d.e(k)}finally{d.f()}}}catch(k){p.e(k)}finally{p.f()}}return o[u].shortestDistance}},{key:"enlargeGrid",value:function(t,n){for(var e=Array(t.height*n).fill(0).map((function(){return Array(t.width*n).fill(0)})),r=e[0].length,a=e.length,i=0;i<a;i++)for(var u=0;u<r;u++){var o=Math.floor(i/t.height)+Math.floor(u/t.width);e[i][u]=(t.map[i%t.height][u%t.width]+o-1)%9+1}return{map:e,width:r,height:a}}},{key:"parseGrid",value:function(){var t=b(/\d+/g,this.input).map((function(t){return(0,S.Z)(t,1)[0].split("").map((function(t){return parseInt(t)}))}));return{map:t,width:t[0].length,height:t.length}}}]),e}(k)),e(804)),tt=(w({day:16,title:"Packet Decoder"})(G=function(t){(0,p.Z)(e,t);var n=(0,h.Z)(e);function e(){return(0,f.Z)(this,e),n.apply(this,arguments)}return(0,l.Z)(e,[{key:"part1",value:function(){return this.parseInput().flatPackets.reduce((function(t,n){return t+n.version}),0)}},{key:"part2",value:function(){var t=this.parseInput().rootPacket;return this.evaluate(t)}},{key:"evaluate",value:function(t){var n=this;if("literal"===t.kind)return t.value;var e=t.packets;switch(t.operator){case 0:return e.reduce((function(t,e){return t+n.evaluate(e)}),0);case 1:return e.reduce((function(t,e){return t*n.evaluate(e)}),1);case 2:return e.map((function(t){return n.evaluate(t)})).reduce((function(t,n){return n<t?n:t}));case 3:return e.map((function(t){return n.evaluate(t)})).reduce((function(t,n){return n>t?n:t}));case 5:return this.evaluate(e[0])>this.evaluate(e[1])?1:0;case 6:return this.evaluate(e[0])<this.evaluate(e[1])?1:0;case 7:return this.evaluate(e[0])===this.evaluate(e[1])?1:0;default:throw new Error("Invalid operator: ".concat(t.operator))}}},{key:"parseInput",value:function(){var t,n,e=(null!==(t=null===(n=/[0-9A-F]+/.exec(this.input))||void 0===n?void 0:n[0])&&void 0!==t?t:"").split("").map((function(t){return parseInt(t,16).toString(2).padStart(4,"0")})).join(""),r=[];return{rootPacket:this.parsePacket(e,r).packet,flatPackets:r}}},{key:"parsePacket",value:function(t,n){var e,r=(0,Q.Z)(/^([0-9]{3})100((?:1[0-9]{4})*0[0-9]{4})/,{version:1,data:2}),a=(0,Q.Z)(/^([0-9]{3})((?!100)[0-9]{3})0([0-9]{15})/,{version:1,operator:2,length:3}),i=(0,Q.Z)(/^([0-9]{3})((?!100)[0-9]{3})1([0-9]{11})/,{version:1,operator:2,count:3});if(e=r.exec(t))return this.parseLiteralPacket(e,n);if(e=a.exec(t))return this.parseOperatorPacket(t,e,n);if(e=i.exec(t))return this.parseOperatorPacket(t,e,n);throw new Error("Unknown packet format: ".concat(t))}},{key:"parseLiteralPacket",value:function(t,n){var e=t.groups,r=e.version,a=e.data,i={kind:"literal",version:parseInt(r,2),value:parseInt(b(/\d{5}/g,a).map((function(t){return t[0].slice(1)})).join(""),2)};return n.push(i),{packet:i,length:t[0].length}}},{key:"parseOperatorPacket",value:function(t,n,e){var r=this,a=n.groups,i=a.version,u=a.operator,o=a.length,s=a.count,c=n[0].length,f={kind:"operator",version:parseInt(i,2),operator:parseInt(u,2),packets:[]};e.push(f);var l=function(n){var a=r.parsePacket(t.slice(n),e),i=a.packet,u=a.length;return f.packets.push(i),u},p=c;if(void 0!==o)for(var h=parseInt(o,2);p-c<h;)p+=l(p);else for(var v=parseInt(s,2),d=0;d<v;d++)p+=l(p);return{packet:f,length:p}}}]),e}(k)),w({day:17,title:"Trick Shot"})(T=function(t){(0,p.Z)(e,t);var n=(0,h.Z)(e);function e(){return(0,f.Z)(this,e),n.apply(this,arguments)}return(0,l.Z)(e,[{key:"part1",value:function(){var t=this.parseInput(),n=t.topLeft,e=t.bottomRight;return this.searchMaxY(n,e).maxY}},{key:"part2",value:function(){for(var t=this.parseInput(),n=t.bottomRight,e=t.topLeft,r=this.searchMaxY(e,n).maxAy,a=0,i=n.y;i<=r;i++)for(var u=0;u<=n.x;u++)this.isHit(u,i,e,n)&&a++;return a}},{key:"isHit",value:function(t,n,e,r){for(var a=0,i=0;!(n<0&&i<r.y||a>r.x||0===t&&a<e.x);){if(i+=n,(a+=t)>=e.x&&a<=r.x&&i>=r.y&&i<=e.y)return!0;t=Math.max(0,t-1),n-=1}return!1}},{key:"searchMaxY",value:function(t,n){for(var e=-1,r=!0,a=void 0,i=Number.MIN_SAFE_INTEGER;r;){e++;var u=this.simulateY(e,t,n);u.hit&&(i=Math.max(i,u.maxY)),r=u.hit||!a||!(!a.hit&&a.missTop<=u.missTop&&a.missBottom>=u.missBottom),a=u}return{maxAy:e,maxY:i}}},{key:"simulateY",value:function(t,n,e){for(var r=0,a=t,i=!1,u=0,o=0,s=Number.MIN_SAFE_INTEGER;!(a<0&&r<e.y);){if(r+=a,s=Math.max(s,r),r>=e.y&&r<=n.y){i=!0;break}r>n.y&&(u=r),a-=1}return r<e.y&&(o=r),{hit:i,missTop:u,missBottom:o,maxY:s}}},{key:"parseInput",value:function(){var t,n=(null!==(t=this.input.match(/target area: x=(-?\d+)\.\.(-?\d+), y=(-?\d+)\.\.(-?\d+)/))&&void 0!==t?t:[]).slice(1).map((function(t){return parseInt(t)})),e=(0,S.Z)(n,4),r=e[0],a=e[1],i=e[2];return{topLeft:{x:r,y:e[3]},bottomRight:{x:a,y:i}}}}]),e}(k)),w({day:18,title:"Snailfish"})(Y=function(t){(0,p.Z)(e,t);var n=(0,h.Z)(e);function e(){return(0,f.Z)(this,e),n.apply(this,arguments)}return(0,l.Z)(e,[{key:"part1",value:function(){var t=this,n=this.parseInput().reduce((function(n,e){return t.add(n,e)}));return this.magnitude(n)}},{key:"part2",value:function(){for(var t=Number.MIN_SAFE_INTEGER,n=this.parseInput(),e=0;e<this.inputLines.length;e++){this.updateProgress(e/this.inputLines.length);for(var r=0;r<this.inputLines.length;r++)if(e!==r){var a=this.clone(n[e]),i=this.clone(n[r]),u=this.magnitude(this.add(a,i));t=Math.max(t,u)}}return t}},{key:"magnitude",value:function(t){return"value"===t.kind?t.value:3*this.magnitude(t.items[0])+2*this.magnitude(t.items[1])}},{key:"add",value:function(t,n){var e=this.createSnailGroup([t,n]);e.items.forEach((function(t,n){t.parent=e,t.sideInParent=n}));for(var r=!0;r;)(r=this.explodeIfNeeded(e))||(r=this.splitIfNeeded(e));return e}},{key:"splitIfNeeded",value:function(t){var n=this;return"value"===t.kind?t.value>=10&&(this.split(t),!0):t.items.some((function(t){return n.splitIfNeeded(t)}))}},{key:"explodeIfNeeded",value:function(t){var n=this,e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0;return"value"!==t.kind&&(4===e?(this.explode(t),!0):t.items.some((function(t){return n.explodeIfNeeded(t,e+1)})))}},{key:"explode",value:function(t){var n,e=(0,a.Z)([0,1]);try{for(e.s();!(n=e.n()).done;){var r=n.value,i=this.findValueSibling(t.items[r],r);i&&(i.value+=t.items[r].value)}}catch(u){e.e(u)}finally{e.f()}if(!t.parent)throw new Error("No parent for exploding pair!");t.parent.items[t.sideInParent]=this.createSnailValue(0,t.parent,t.sideInParent)}},{key:"split",value:function(t){var n=this,e=t;e.kind="group",e.items=[Math.floor(t.value/2),Math.ceil(t.value/2)].map((function(t,r){return n.createSnailValue(t,e,r)}))}},{key:"findValueSibling",value:function(t,n){for(var e=t,r=void 0;!r;){if(!e.parent)return null;e.sideInParent!==n?r=e.parent.items[n]:e=e.parent}for(var a=0===n?1:0;"value"!==r.kind;)r=r.items[a];return r}},{key:"parseInput",value:function(){var t=this;return this.inputLines.map((function(n){return t.parseSnailNumber(n)}))}},{key:"parseSnailNumber",value:function(t){var n,e,r=[],i=this.createSnailGroup([]),u=(0,a.Z)(t);try{for(u.s();!(e=u.n()).done;){var o=e.value;switch(o){case"[":n=i,r.push(n),i=this.createSnailGroup([],n,n.items.length),n.items.push(i);break;case"]":i=r.pop();break;case",":break;default:i.items.push(this.createSnailValue(parseInt(o),i,i.items.length))}}}catch(s){u.e(s)}finally{u.f()}return i.items[0].parent=void 0,i.items[0]}},{key:"clone",value:function(t,n){var e,r=this;if(null!==(e=n)&&void 0!==e||(n=t.parent),"value"===t.kind)return this.createSnailValue(t.value,n,t.sideInParent);var a=this.createSnailGroup([],n,t.sideInParent);return t.items.forEach((function(t){return a.items.push(r.clone(t,a))})),a}},{key:"createSnailGroup",value:function(t,n,e){return{kind:"group",items:t,parent:n,sideInParent:e}}},{key:"createSnailValue",value:function(t,n,e){return{kind:"value",value:t,parent:n,sideInParent:e}}}]),e}(k)),function(){function t(n,e,r){(0,f.Z)(this,t),this.x=n,this.y=e,this.z=r}return(0,l.Z)(t,[{key:"add",value:function(n){return new t(this.x+n.x,this.y+n.y,this.z+n.z)}},{key:"sub",value:function(n){return new t(this.x-n.x,this.y-n.y,this.z-n.z)}},{key:"manhattan",value:function(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}},{key:"equal",value:function(t){return this.x===t.x&&this.y===t.y&&this.z===t.z}},{key:"toString",value:function(){return"".concat(this.x,",").concat(this.y,",").concat(this.z)}},{key:"vector",value:function(){return[[this.x],[this.y],[this.z]]}}],[{key:"from",value:function(n){var e=(0,S.Z)(n,3);return new t((0,S.Z)(e[0],1)[0],(0,S.Z)(e[1],1)[0],(0,S.Z)(e[2],1)[0])}}]),t}()),nt=new tt(0,0,0),et=(w({day:19,title:"Beacon Scanner"})(F=function(t){(0,p.Z)(e,t);var n=(0,h.Z)(e);function e(){var t;(0,f.Z)(this,e);for(var r=arguments.length,a=new Array(r),i=0;i<r;i++)a[i]=arguments[i];return(t=n.call.apply(n,[this].concat(a))).rotations=t.createRotationMatrixes(),t.orientedScanners=[],t}return(0,l.Z)(e,[{key:"part1",value:function(){for(var t=this,n=this.parseInput(),e=this.unorderedPairs(n).map((function(n,e,r){var a=(0,S.Z)(n,2),i=a[0],u=a[1];return t.updateProgress(e/r.length),{a:i,b:u,overlap:t.overlap(i,u)}})).filter((function(t){return t.overlap})).flatMap((function(t){return[t,{a:t.b,b:t.a,overlap:{p1Index:t.overlap.p2Index,p2Index:t.overlap.p1Index}}]})),r=new Set([0]);r.size<n.length;){var a=e.findIndex((function(t){return r.has(t.a.id)&&!r.has(t.b.id)})),i=e[a],u=i.a,o=i.b,s=i.overlap;this.reorient(u,o,s),r.add(o.id),e.splice(a,1)}this.orientedScanners=n;var c=new Set;return n.forEach((function(t){return t.points.forEach((function(t){return c.add(t.toString())}))})),c.size}},{key:"part2",value:function(){return this.unorderedPairs(this.orientedScanners).reduce((function(t,n){var e=n[0].offset.manhattan(n[1].offset);return e>t?e:t}),Number.MIN_SAFE_INTEGER)}},{key:"reorient",value:function(t,n,e){var r,i=this,u=e.p1Index,o=e.p2Index,s=t.points[u],c=(0,a.Z)(this.rotations);try{var f=function(){var e=r.value,a=n.points.map((function(t){return tt.from(i.multiply(e,t.vector()))})),u=s.sub(a[o]),c=a.map((function(t){return t.add(u)}));if(c.reduce((function(n,e){return n+(t.points.some((function(t){return t.equal(e)}))?1:0)}),0)>=12)return n.points=c,n.offset=u,{v:!0}};for(c.s();!(r=c.n()).done;){var l=f();if("object"===typeof l)return l.v}}catch(p){c.e(p)}finally{c.f()}return!1}},{key:"unorderedPairs",value:function(t){for(var n=t.length,e=[],r=0;r<n;r++)for(var a=t[r],i=r+1;i<n;i++)e.push([a,t[i]]);return e}},{key:"overlap",value:function(t,n){for(var e=0;e<t.relativeDistances.length;e++)for(var r=t.relativeDistances[e],a=0;a<n.relativeDistances.length;a++){var i=n.relativeDistances[a],u=this.intersectSorted(r,i);if(u.length>=11)return{p1Index:e,p2Index:a}}return!1}},{key:"intersectSorted",value:function(t,n){var e,r=[],i=0,u=(0,a.Z)(t);try{for(u.s();!(e=u.n()).done;){for(var o=e.value;n[i]<o;)i++;n[i]===o&&(r.push(o),i++)}}catch(s){u.e(s)}finally{u.f()}return r}},{key:"parseInput",value:function(){return b(/--- scanner (\d+) ---\r?\n((?:.*,.*,.*(?:\r?\n)?)*)/g,this.input).map((function(t){var n=(0,S.Z)(t,3),e=n[1],r=n[2],a=parseInt(e),i=b(/(-?\d+),(-?\d+),(-?\d+)/g,r).map((function(t){return t.slice(1).map((function(t){return parseInt(t)}))})).map((function(t){var n=(0,S.Z)(t,3),e=n[0],r=n[1],a=n[2];return new tt(e,r,a)})),u=i.map((function(t){return i.map((function(n){return t.manhattan(n)})).sort((function(t,n){return t-n})).slice(1)}));return{id:a,points:i,relativeDistances:u,offset:nt}}))}},{key:"createRotationMatrixes",value:function(){var t=this,n=[0,90,180,270].map((function(t){return t*(Math.PI/180)})),e=n.map((function(n){return t.Rx(n)})),r=n.map((function(n){return t.Ry(n)})),a=n.map((function(n){return t.Rz(n)})),i=new Set;return e.flatMap((function(t){return r.map((function(n){return[t,n]}))})).flatMap((function(t){var n=(0,S.Z)(t,2),e=n[0],r=n[1];return a.map((function(t){return[e,r,t]}))})).map((function(n){return n.reduce((function(n,e){return t.multiply(n,e)}))})).filter((function(t){return!i.has(t.join(";"))&&i.add(t.join(";"))}))}},{key:"multiply",value:function(t,n){for(var e=t.length,r=n[0].length,a=Array(e).fill(0).map((function(){return Array(r)})),i=0;i<e;i++)for(var u=function(e){a[i][e]=t[i].map((function(t,r){return t*n[r][e]})).reduce((function(t,n){return t+n}))},o=0;o<r;o++)u(o);return a}},{key:"Rx",value:function(t){return this.intMatrix([[1,0,0],[0,Math.cos(t),-Math.sin(t)],[0,Math.sin(t),Math.cos(t)]])}},{key:"Ry",value:function(t){return this.intMatrix([[Math.cos(t),0,Math.sin(t)],[0,1,0],[-Math.sin(t),0,Math.cos(t)]])}},{key:"Rz",value:function(t){return this.intMatrix([[Math.cos(t),-Math.sin(t),0],[Math.sin(t),Math.cos(t),0],[0,0,1]])}},{key:"intMatrix",value:function(t){return t.map((function(t){return t.map((function(t){return t<0?Math.ceil(t):Math.floor(t)}))}))}}]),e}(k)),(new(function(){function t(){(0,f.Z)(this,t)}return(0,l.Z)(t,[{key:"getSolutionsByDay",value:function(){return new Map(x.map((function(t){return[t.day,t]})))}},{key:"getSolutions",value:function(){return Array.from(this.getSolutionsByDay().values()).sort((function(t,n){return t.day-n.day}))}}]),t}())).getSolutionsByDay());addEventListener("message",function(){var t=(0,i.Z)(o().mark((function t(n){var e,r,i,u,f,l,p;return o().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(e=n.data,r=et.get(e.day)){t.next=4;break}return t.abrupt("return");case 4:(i=r.create()).init(e.input),u=(0,a.Z)([1,2]),t.prev=7,u.s();case 9:if((f=u.n()).done){t.next=16;break}return l=f.value,p=i.solveWithProgress(l),t.next=14,(0,s.n)(p.pipe((0,c.b)((function(t){return postMessage(t)}))));case 14:t.next=9;break;case 16:t.next=21;break;case 18:t.prev=18,t.t0=t.catch(7),u.e(t.t0);case 21:return t.prev=21,u.f(),t.finish(21);case 24:postMessage(new m(-1,null,0));case 25:case"end":return t.stop()}}),t,null,[[7,18,21,24]])})));return function(n){return t.apply(this,arguments)}}())}},n={};function e(r){var a=n[r];if(void 0!==a)return a.exports;var i=n[r]={exports:{}};return t[r](i,i.exports,e),i.exports}e.m=t,e.x=function(){var t=e.O(void 0,[978],(function(){return e(560)}));return t=e.O(t)},function(){var t=[];e.O=function(n,r,a,i){if(!r){var u=1/0;for(f=0;f<t.length;f++){r=t[f][0],a=t[f][1],i=t[f][2];for(var o=!0,s=0;s<r.length;s++)(!1&i||u>=i)&&Object.keys(e.O).every((function(t){return e.O[t](r[s])}))?r.splice(s--,1):(o=!1,i<u&&(u=i));if(o){t.splice(f--,1);var c=a();void 0!==c&&(n=c)}}return n}i=i||0;for(var f=t.length;f>0&&t[f-1][2]>i;f--)t[f]=t[f-1];t[f]=[r,a,i]}}(),e.n=function(t){var n=t&&t.__esModule?function(){return t.default}:function(){return t};return e.d(n,{a:n}),n},e.d=function(t,n){for(var r in n)e.o(n,r)&&!e.o(t,r)&&Object.defineProperty(t,r,{enumerable:!0,get:n[r]})},e.f={},e.e=function(t){return Promise.all(Object.keys(e.f).reduce((function(n,r){return e.f[r](t,n),n}),[]))},e.u=function(t){return"static/js/"+t+".7cb4371c.chunk.js"},e.miniCssF=function(t){},e.o=function(t,n){return Object.prototype.hasOwnProperty.call(t,n)},e.p="/aoc2021/",function(){var t={560:1};e.f.i=function(n,r){t[n]||importScripts(e.p+e.u(n))};var n=self.webpackChunkaoc2021=self.webpackChunkaoc2021||[],r=n.push.bind(n);n.push=function(n){var a=n[0],i=n[1],u=n[2];for(var o in i)e.o(i,o)&&(e.m[o]=i[o]);for(u&&u(e);a.length;)t[a.pop()]=1;r(n)}}(),function(){var t=e.x;e.x=function(){return e.e(978).then(t)}}();e.x()}();
//# sourceMappingURL=560.a506d3af.chunk.js.map
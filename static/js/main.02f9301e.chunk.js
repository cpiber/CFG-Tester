(this["webpackJsonpcfg-tester"]=this["webpackJsonpcfg-tester"]||[]).push([[0],{10:function(e,t,n){e.exports={box:"code_box__3qFF4",code:"code_code__12eUv",entry:"code_entry__2iIXq",nonterminal:"code_nonterminal__3SmZs",terminal:"code_terminal__3sfUj"}},150:function(e,t,n){},171:function(e,t){},173:function(e,t){},183:function(e,t){},185:function(e,t){},21:function(e,t,n){e.exports={wrapper:"Advanced_wrapper__2cqsU",close:"Advanced_close__3VCxR",opener:"Advanced_opener__2hHgO",content:"Advanced_content__2A_ma",open:"Advanced_open__1E4dn",warn:"Advanced_warn__3M2fl",value:"Advanced_value__2sa9B",clear:"Advanced_clear__PiYzu"}},212:function(e,t){},213:function(e,t){},218:function(e,t){},25:function(e,t,n){e.exports={cols:"Header_cols__vzgPA",title:"Header_title__1hIMT",settings:"Header_settings__1Lc0z",close:"Header_close__3nXde"}},252:function(e,t,n){},253:function(e,t,n){"use strict";n.r(t);var r,a,c=n(1),s=n.n(c),i=n(79),l=n.n(i),o=n(41),u=n.n(o),h=n(50),d=(n(150),n(6)),b=n(5),f=n(80),j=n(51),m=Object(j.a)((function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"",t=function(e){var t=Object(f.parse)(e);return{rules:"string"===typeof t.rules?t.rules:"",input:"string"===typeof t.input?t.input:""}},n=Object(c.useState)(t(e)),r=Object(b.a)(n,2),a=r[0],s=r[1],i=Object(c.useState)(void 0),l=Object(b.a)(i,2),o=l[0],u=l[1],h=Object(c.useCallback)((function(e){return s(Object(d.a)(Object(d.a)({},a),{},{rules:e}))}),[a,s]),j=Object(c.useCallback)((function(e){return s(Object(d.a)(Object(d.a)({},a),{},{input:e}))}),[a,s]),m=Object(c.useCallback)((function(e){return s(t(e))}),[s]);Object(c.useEffect)((function(){var e=function(){return m(window.location.hash)};return window.addEventListener("hashchange",e),function(){return window.removeEventListener("hashchange",e)}}),[m]);var v=Object(c.useRef)(0);return Object(c.useEffect)((function(){return v.current=window.setTimeout((function(){return window.location.hash=Object(f.stringify)(a)}),100),function(){return window.clearTimeout(v.current)}}),[a]),Object(c.useEffect)((function(){window.grammar=o}),[o]),Object(d.a)(Object(d.a)({},a),{},{setRules:h,setInput:j,grammar:o,setGrammar:u,updateQuery:m})})),v=n(43),p=n.n(v),O=n(17),x=n.n(O),y=n(9),w=n(8),g=n(14);r=Symbol.iterator,a=Symbol.toStringTag;var S=function(){function e(t){Object(w.a)(this,e),this._map=void 0,this.clear=void 0,this.keys=void 0,this.values=void 0,this[r]=void 0,this._map=t?new Map(t._map):new Map,this.clear=this._map.clear.bind(this._map),this.keys=this._map.values.bind(this._map),this.values=this._map.values.bind(this._map),this[Symbol.iterator]=this.values}return Object(g.a)(e,[{key:"size",get:function(){return this._map.size}},{key:"add",value:function(e){return this._map.set(e.hash(),e),this}},{key:"delete",value:function(e){return this._map.delete(e.hash())}},{key:"forEach",value:function(e,t){var n=this;this._map.forEach((function(r,a,c){return e.call(t,r,r,n)}),t)}},{key:"has",value:function(e){return this._map.has(e.hash())}},{key:"entries",value:function(){var e=this;return x.a.mark((function t(){var n,r,a,c;return x.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:n=Object(y.a)(e._map),t.prev=1,n.s();case 3:if((r=n.n()).done){t.next=9;break}return a=Object(b.a)(r.value,2),c=a[1],t.next=7,[c,c];case 7:t.next=3;break;case 9:t.next=14;break;case 11:t.prev=11,t.t0=t.catch(1),n.e(t.t0);case 14:return t.prev=14,n.f(),t.finish(14);case 17:return t.abrupt("return",void 0);case 18:case"end":return t.stop()}}),t,null,[[1,11,14,17]])}))()}},{key:a,get:function(){return"ComparableSet"}}]),e}();var _=function(e,t,n){return Math.min(Math.max(e,t),n)};function k(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0,n=arguments.length>2?arguments[2]:void 0,r=arguments.length>3?arguments[3]:void 0,a=null===e||isNaN(+e)?t:+e;switch(arguments.length){case 3:return Math.max(a,n);case 4:return void 0===n?Math.min(a,r):_(a,n,r);default:return a}}var N,E="cfg_maxdepth",T="cfg_maxnonterm",I="cfg_iter",C="cfg_syntax_name",B=function(e,t){for(var n=arguments.length,r=new Array(n>2?n-2:0),a=2;a<n;a++)r[a-2]=arguments[a];return k.apply(void 0,[window.localStorage.getItem(e)].concat(r))},A=function(e,t){for(var n=arguments.length,r=new Array(n>2?n-2:0),a=2;a<n;a++)r[a-2]=arguments[a];var c=k.apply(void 0,[t].concat(r));return window.localStorage.setItem(e,""+c),c},M=function(e,t){return e(E,t,20)},R=function(e,t){return e(T,t,10)},L=function(e,t){return e(I,t,5e3)},U=function(e,t){return e("cfg_gen_number",t,15,1,999)},z=M.bind(null,B,null),F=M.bind(null,A),P=R.bind(null,B,null),G=R.bind(null,A),V=L.bind(null,B,null),q=L.bind(null,A),H=U.bind(null,B,null),W=U.bind(null,A),Y=function(e){return"fcs"===e||"bnf"===e?e:"fcs"},D=n(32),J=n.n(D),X=n(81),Z=n.n(X),Q=n(33),$=n.n(Q),K=n(0),ee=function(e){var t=e.strings,n=e.setStrings,r=e.setStatus,a=m.useContainer().grammar,s=Object(c.useState)(!1),i=Object(b.a)(s,2),l=i[0],o=i[1],u=Object(c.useState)(!1),h=Object(b.a)(u,2),d=h[0],f=h[1],j=Object(c.useState)(H()),v=Object(b.a)(j,2),p=v[0],O=v[1],x=function(){n(new Set);try{null===a||void 0===a||a.checkValid(),null===a||void 0===a||a.clear(),o(!1),r(["",""])}catch(e){o(!0),r(["error","".concat(e)])}};return Object(c.useEffect)(x,[a,r,n]),Object(K.jsxs)("div",{className:"row2",children:[Object(K.jsxs)("button",{className:"button secondary",onClick:function(e){if(function(e,t){var n=e.target;return"INPUT"!==n.tagName&&(n.blur(),!!t)}(e,a)){o(!0),r(["",""]);var c=function(e,t,n,r){var a,c=!1,s=t.size;for(a=0;a<n;a=t.size-s){var i=e.next();if(void 0===i)break;if(i instanceof Error){c=!0,r(["warn",i.message]);break}t.add(i)}return{i:a,hasWarn:c}}(a,t,p,r),s=c.i,i=c.hasWarn;n(new Set(t)),s<p&&!i?r(["info","Grammar exhausted"]):o(!1)}},disabled:l,"aria-label":"Get more strings","data-testid":"generate",children:["Get ",Object(K.jsx)("input",{type:"number",className:"input secondary_alt",size:3,value:d?"":p,onChange:function(e){var t=e.target.value;if(""===t.trim())return f(!0);O(W(t)),f(!1)},"aria-label":"Number of strings to get","data-testid":"number"})," more"]}),Object(K.jsx)("button",{className:"button secondary",onClick:function(e){e.target.blur(),x()},"aria-label":"Clear strings","data-testid":"clear",children:"Clear"})]})},te=function(e){var t=e.className,n=Object(c.useState)(new Set),r=Object(b.a)(n,2),a=r[0],s=r[1],i=Object(c.useState)(["",""]),l=Object(b.a)(i,2),o=l[0],u=l[1],h=Object(c.useMemo)((function(){return function(e,t,n){var r,a=new Array(e.size),c=0,s=Object(y.a)(e);try{for(s.s();!(r=s.n()).done;){var i=r.value;a[c]=t.call(n,i,c,e),c++}}catch(l){s.e(l)}finally{s.f()}return a}(a,(function(e,t){return Object(K.jsx)("li",{className:"monospace",children:e.split(/\r\n|\r|\n|\\n/g).map((function(e,t){return Object(K.jsx)("span",{className:""===e?Z.a.empty:"",children:e||"\u03b5"},t)}))},t)}))}),[a]);return Object(K.jsx)("div",{className:"".concat(t||""," status-").concat(o[0]," App-bodyComponent"),"data-testid":"output",children:Object(K.jsxs)("div",{className:"".concat($.a.area," ").concat(J.a.textarea),children:[Object(K.jsx)("h2",{className:$.a.title,children:"Strings"}),Object(K.jsx)("div",{className:Z.a.strings,children:Object(K.jsx)("ul",{"data-testid":"strings",children:h})}),Object(K.jsxs)("div",{className:"children",children:[Object(K.jsx)("div",{className:"row1",children:Object(K.jsx)("span",{className:"status",role:"status",children:o[1]})}),Object(K.jsx)(ee,{strings:a,setStrings:s,setStatus:u})]})]})})},ne=n(53),re=n(20),ae=n(24),ce=n(23),se=n(44),ie=function e(t){Object(w.a)(this,e),this.symbol=t},le=function(e){Object(ae.a)(n,e);var t=Object(ce.a)(n);function n(){return Object(w.a)(this,n),t.apply(this,arguments)}return Object(g.a)(n,[{key:"equals",value:function(e){return e instanceof n&&e.symbol===this.symbol}},{key:Symbol.toStringTag,get:function(){return"NonTerminal"}}]),n}(ie),oe=function(e){Object(ae.a)(n,e);var t=Object(ce.a)(n);function n(){return Object(w.a)(this,n),t.apply(this,arguments)}return Object(g.a)(n,[{key:"equals",value:function(e){return e instanceof n&&e.symbol===this.symbol}},{key:Symbol.toStringTag,get:function(){return"Terminal"}}],[{key:"construct",value:function(e){var t=arguments.length>1&&void 0!==arguments[1]&&arguments[1];return ue.isEmpty(e,t)?new ue:new n(e)}}]),n}(ie),ue=function(e){Object(ae.a)(n,e);var t=Object(ce.a)(n);function n(){return Object(w.a)(this,n),t.call(this,"")}return Object(g.a)(n,[{key:Symbol.toStringTag,get:function(){return"EmptySymbol"}}],[{key:"isEmpty",value:function(e){var t=arguments.length>1&&void 0!==arguments[1]&&arguments[1];return""===e||!t&&("^"===e||"\u03b5"===e)}}]),n}(oe),he=function e(t){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"",r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:0,a=arguments.length>3&&void 0!==arguments[3]?arguments[3]:0;Object(w.a)(this,e),this.rule=t,this.before=n,this.depth=r,this.nonTerminals=a},de=function(){function e(t,n,r,a,c){Object(w.a)(this,e),this.left=t,this.before=n,this.symbol=r,this.after=a,this.origin=c,this.left=t,this.before=n,this.symbol=r,this.after=a,this.origin=c}return Object(g.a)(e,[{key:"isFinished",value:function(){return void 0===this.symbol||this.symbol instanceof ue}},{key:"isTerminal",value:function(){return this.symbol instanceof oe}},{key:"isNonTerminal",value:function(){return this.symbol instanceof le}},{key:"hash",value:function(){var e=function(e){return e instanceof le?"\x01".concat(e.symbol,"\x01"):(null===e||void 0===e?void 0:e.symbol)||""},t=function(t,n){return t+e(n)};return"".concat(this.left.symbol,"\u2192").concat(this.before.reduce(t,""),"\x02\u2022").concat(e(this.symbol)).concat(this.after.reduce(t,""),"\x03,").concat(this.origin)}}]),e}(),be=function e(t,n){var r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:[],a=arguments.length>3&&void 0!==arguments[3]?arguments[3]:"",c=arguments.length>4&&void 0!==arguments[4]?arguments[4]:"",s=arguments.length>5&&void 0!==arguments[5]?arguments[5]:"";Object(w.a)(this,e),this.handle=t,this.currentSymbol=n,this.rule=r,this.currentInput=a,this.whitespace=c,this.data=s},fe=/[\u0000-\u0008\u000E-\u001f\u007f-\u009F]/,je=/\s/,me=function(){function e(){Object(w.a)(this,e),this.gen=void 0,this.maxDepth=z(),this.maxNonTerms=P(),this.maxIter=V(),this.currentState=void 0,this.rules={},this.currentState=new be((function(){}))}return Object(g.a)(e,[{key:"next",value:function(){if(!this.gen)throw new Error("Attempted to call .next without a generator, this should never happen!");return this.gen.next().value}},{key:"checkValid",value:function(){for(var e in this.rules){var t,n=this.rules[e],r=Object(y.a)(n);try{for(r.s();!(t=r.n()).done;){var a=t.value;if(0===a.length)throw new Error("Empty rule, this should never happen!");if(1===a.length&&""===a[0].symbol&&!(a[0]instanceof ue))throw new Error("Empty symbol that isn't an EmptySymbol, this should never happen!");if(a.length>1&&-1!==a.findIndex((function(e){return e instanceof ue||0===e.symbol.length})))throw new Error("EmptySymbol found in a longer rule, this should never happen!")}}catch(c){r.e(c)}finally{r.f()}}}},{key:"parseRules",value:function(e,t,n){this.currentState=t;var r=0,a=0,c=!1;try{for(var s=0;a++,s<e.length;s++){var i=e[s];i.match(fe)?console.debug("Purged control character ".concat(i," at ").concat(s)):i.match(n)&&!c?c=!0:"\n"===i?(c||this.endLine(t),a=0,r++,c=!1):(this.currentState.handle.call(this,i,c),c=!1)}this.endLine(t)}catch(l){throw new Error("".concat(l.message," at line ").concat(r+1,", column ").concat(a))}}},{key:"checkBranch",value:function(e,t,n){return""!==this.currentState.currentInput||t||n||!e.match(je)?"|"!==e||t?e.match(je)?(this.currentState.whitespace+=e,null):t?this.toSpecial(e):e:(this.endLine(),null):null}},{key:"toSpecial",value:function(e){return"n"===e?"\n":"t"===e?"\t":"r"===e?"\r":"f"===e?"\f":e}},{key:"mergeTerminals",value:function(e){for(var t=e.length-1;t>0;t--)e[t]instanceof oe&&e[t-1]instanceof oe&&(e[t-1].symbol+=e[t].symbol,e.splice(t,1))}},{key:"endLine",value:function(e){if(this.checkParseValid(),void 0!==this.currentState.currentSymbol){var t=this.currentState.currentSymbol.symbol,n=oe.construct(this.currentState.currentInput);0!==this.currentState.rule.length&&n instanceof ue||this.currentState.rule.push(n),t in this.rules?this.rules[t].push(this.currentState.rule):this.rules[t]=[this.currentState.rule],e?this.currentState=e:(this.currentState.currentInput="",this.currentState.whitespace="",this.currentState.rule=[])}}},{key:"initGenerator",value:function(e){var t=x.a.mark(a),n=this,r=0;function a(e){var a,c,s,i,l,o,u;return x.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(!(a=e.shift())){t.next=18;break}if(r++,c=n.expandTerminal(a),i=(s=a).rule,l=s.before,o=s.depth,u=s.nonTerminals,void 0!==c){t.next=9;break}return t.next=7,l;case 7:return r=0,t.abrupt("continue",0);case 9:if(!(r>=n.maxIter)){t.next=13;break}return t.next=12,new Error("Iterated ".concat(r," times without finding a new value"));case 12:r=0;case 13:if(!(o>n.maxDepth||u>n.maxNonTerms)){t.next=15;break}return t.abrupt("continue",0);case 15:n.expandNonTerminal(c,i,e,a),t.next=0;break;case 18:return t.abrupt("return",void 0);case 19:case"end":return t.stop()}}),t)}this.gen=a([new he([new le(e)])])}},{key:"expandTerminal",value:function(e){for(var t=e.rule,n=t.shift();n instanceof oe;)e.before+=n.symbol,n=t.shift(),e.nonTerminals=0;return n}},{key:"expandNonTerminal",value:function(e,t,n,r){var a,c=r.before,s=r.depth,i=r.nonTerminals,l=this.rules[e.symbol],o=Object(y.a)(l);try{for(o.s();!(a=o.n()).done;){var u=a.value;n.push(new he([].concat(Object(se.a)(u),Object(se.a)(t)),c,s+1,i+1))}}catch(h){o.e(h)}finally{o.f()}}},{key:"match",value:function(e,t){var n=[];n.push(new S);var r=new de(new le(""),[],new le(t),[],0),a=new de(new le(""),[new le(t)],void 0,[],0);n[0].add(r);for(var c=0;c<=e.length;c++){n.push(new S);var s,i=Object(y.a)(n[c]);try{for(i.s();!(s=i.n()).done;){var l=s.value;l.isFinished()?this.completer(l,c,n):l.isNonTerminal()?this.predictor(l,c,n):l.isTerminal()&&this.scanner(l,c,n,e)}}catch(o){i.e(o)}finally{i.f()}}return n[e.length].has(a)}},{key:"completer",value:function(e,t,n){var r,a=Object(y.a)(n[e.origin]);try{for(a.s();!(r=a.n()).done;){var c=r.value;if(!c.isFinished()){var s=c;s.symbol.equals(e.left)&&this.nextInRule(s,t,n)}}}catch(i){a.e(i)}finally{a.f()}}},{key:"predictor",value:function(e,t,n){var r,a=Object(y.a)(this.rules[e.symbol.symbol]);try{for(a.s();!(r=a.n()).done;){var c=r.value;n[t].add(new de(e.symbol,[],c[0],c.slice(1),t))}}catch(o){a.e(o)}finally{a.f()}var s,i=Object(y.a)(n[t]);try{for(i.s();!(s=i.n()).done;){var l=s.value;l.isFinished()&&this.completer(l,t,n)}}catch(o){i.e(o)}finally{i.f()}}},{key:"scanner",value:function(e,t,n,r){t!==r.length&&r[t]===e.symbol.symbol[0]&&this.nextInRule(e,t+1,n)}},{key:"nextInRule",value:function(e,t,n){var r=Object(se.a)(e.before);if(e.symbol instanceof oe){var a=r.length-1;r[a]instanceof oe?r[a]=new oe(r[a].symbol+e.symbol.symbol[0]):r.push(new oe(e.symbol.symbol[0]))}else r.push(e.symbol);e.symbol instanceof oe&&e.symbol.symbol.length>1?n[t].add(new de(e.left,r,new oe(e.symbol.symbol.slice(1)),Object(se.a)(e.after),e.origin)):n[t].add(new de(e.left,r,e.after[0],e.after.slice(1),e.origin))}}]),e}(),ve=/[A-Z]/,pe=/[\\]/,Oe=function(e){Object(ae.a)(n,e);var t=Object(ce.a)(n);function n(e){var r;for(var a in Object(w.a)(this,n),(r=t.call(this)).parseRules(e,new be(r.parseLeft),pe),r.rules){var c,s=r.rules[a],i=Object(y.a)(s);try{for(i.s();!(c=i.n()).done;){var l=c.value;r.extractTerminals(l)}}catch(o){i.e(o)}finally{i.f()}}return r}return Object(g.a)(n,[{key:"parseLeft",value:function(e,t){if(e.match(je)){if(t)throw new Error("Unexpected literal '".concat(e,"'"))}else{if(!e.match(ve)||void 0!==this.currentState.currentSymbol)throw new Error("Unexpected '".concat(e,"', expected Non-Terminal"));this.currentState=new be(this.parseIndicator,new le(e))}}},{key:"parseIndicator",value:function(e,t){if("-"!==this.currentState.currentInput)if(e.match(je)){if(t)throw new Error("Unexpected literal '".concat(e,"'"))}else{if(!e.match(/[\u2192-]/))throw new Error("Expected '->' or '\u2192', got '".concat(e,"'"));"-"===e?this.currentState.currentInput="-":this.currentState=new be(this.parseBranches,this.currentState.currentSymbol)}else{if(">"!==e)throw new Error("Expected '>', got '".concat(e,"'"));this.currentState=new be(this.parseBranches,this.currentState.currentSymbol)}}},{key:"parseBranches",value:function(e,t){var n=this.checkBranch(e,t,0!==this.currentState.rule.length);null!==n&&(e.match(ve)&&!t?(""===this.currentState.currentInput&&""===this.currentState.whitespace||this.currentState.rule.push(oe.construct(this.currentState.currentInput+this.currentState.whitespace)),this.currentState.rule.push(new le(n)),this.currentState.currentInput=""):this.currentState.currentInput+=this.currentState.whitespace+n,this.currentState.whitespace="")}},{key:"checkParseValid",value:function(){if(this.currentState.handle===this.parseIndicator)throw new Error("Unexpected line ending, expected rule indicator")}},{key:"extractTerminals",value:function(e){for(var t=0;t<e.length;t++)e[t]instanceof le&&(e[t].symbol in this.rules||(e[t]=new oe(e[t].symbol)));this.mergeTerminals(e)}},{key:"clear",value:function(){this.initGenerator("S")}},{key:"checkValid",value:function(){if(Object(ne.a)(Object(re.a)(n.prototype),"checkValid",this).call(this),!("S"in this.rules))throw new Error("Startsymbol 'S' not found")}},{key:"matches",value:function(e){return this.match(e,"S")}}]),n}(me),xe=/[\\]/,ye=function(e){Object(ae.a)(n,e);var t=Object(ce.a)(n);function n(e){var r;for(var a in Object(w.a)(this,n),(r=t.call(this)).parseRules(e,new be(r.parseLeftStart),xe),r.checkHasUndeclaredTerminals(),r.rules){var c,s=r.rules[a],i=Object(y.a)(s);try{for(i.s();!(c=i.n()).done;){var l=c.value;r.fixTerminals(l)}}catch(o){i.e(o)}finally{i.f()}}return r}return Object(g.a)(n,[{key:"parseLeftStart",value:function(e,t){if(e.match(je)){if(t)throw new Error("Unexpected literal '".concat(e,"'"))}else{if("<"!==e)throw new Error("Unexpected '".concat(e,"', expected '<'"));this.currentState=new be(this.parseLeft,void 0)}}},{key:"parseLeft",value:function(e,t){if(">"!==e||t)this.currentState.currentInput+=e;else{if(""===this.currentState.currentInput)throw new Error("Empty non-terminals not allowed");this.currentState=new be(this.parseIndicator,new le(this.currentState.currentInput))}}},{key:"parseIndicator",value:function(e,t){if(":"!==this.currentState.currentInput)if("::"!==this.currentState.currentInput)if(e.match(je)){if(t)throw new Error("Unexpected literal '".concat(e,"'"))}else{if(":"!==e)throw new Error("Expected '::=', got '".concat(e,"'"));this.currentState.currentInput=":"}else{if("="!==e)throw new Error("Expected '=', got '".concat(e,"'"));this.currentState=new be(this.parseBranches,this.currentState.currentSymbol)}else{if(":"!==e)throw new Error("Expected ':', got '".concat(e,"'"));this.currentState.currentInput="::"}}},{key:"parseBranches",value:function(e,t){if(null!==this.checkBranch(e,t,!0))if("<"!==e||t)if('"'!==e||t){if("'"!==e||t)throw new Error("Expected '<', '\"', or ''', got".concat(t?" literal":""," '").concat(e,"'"));this.currentState=new be(this.parseTerminal,this.currentState.currentSymbol,this.currentState.rule,"","","'")}else this.currentState=new be(this.parseTerminal,this.currentState.currentSymbol,this.currentState.rule,"","",'"');else this.currentState=new be(this.parseNonTerminal,this.currentState.currentSymbol,this.currentState.rule)}},{key:"parseNonTerminal",value:function(e,t){if(">"===e&&!t){if(""===this.currentState.currentInput)throw new Error("Empty non-terminals not allowed");return this.currentState.rule.push(new le(this.currentState.currentInput)),void(this.currentState=new be(this.parseBranches,this.currentState.currentSymbol,this.currentState.rule))}this.currentState.currentInput+=e}},{key:"parseTerminal",value:function(e,t){if(e===this.currentState.data&&!t)return this.currentState.rule.push(oe.construct(this.currentState.currentInput,!0)),void(this.currentState=new be(this.parseBranches,this.currentState.currentSymbol,this.currentState.rule));t&&(e=this.toSpecial(e)),this.currentState.currentInput+=e}},{key:"checkParseValid",value:function(){if(this.currentState.handle===this.parseIndicator)throw new Error("Unexpected line ending, expected rule indicator");if(this.currentState.handle===this.parseLeft||this.currentState.handle===this.parseNonTerminal||this.currentState.handle===this.parseTerminal)throw new Error("Unexpected line ending, symbol declaration ended early");if(this.currentState.handle===this.parseBranches&&0===this.currentState.rule.length)throw new Error("Branches must not be empty, put at least one symbol")}},{key:"checkHasUndeclaredTerminals",value:function(){for(var e in this.rules){var t,n=this.rules[e],r=Object(y.a)(n);try{for(r.s();!(t=r.n()).done;){var a,c=t.value,s=Object(y.a)(c);try{for(s.s();!(a=s.n()).done;){var i=a.value;if(i instanceof le&&!(i.symbol in this.rules))throw new Error("Undeclared symbol ".concat(i.symbol))}}catch(l){s.e(l)}finally{s.f()}}}catch(l){r.e(l)}finally{r.f()}}}},{key:"fixTerminals",value:function(e){for(var t=e.length-1;t>=0&&e.length>1;t--)e[t]instanceof ue&&e.splice(t,1);this.mergeTerminals(e)}},{key:"clear",value:function(){this.initGenerator("start")}},{key:"checkValid",value:function(){if(Object(ne.a)(Object(re.a)(n.prototype),"checkValid",this).call(this),!("start"in this.rules))throw new Error("Startsymbol 'start' not found")}},{key:"matches",value:function(e){return this.match(e,"start")}}]),n}(me),we=Object(j.a)((function(){var e=Object(c.useState)(Y(window.localStorage.getItem(C))),t=Object(b.a)(e,2),n=t[0],r=t[1],a=Object(c.useCallback)((function(e){r(function(e){var t=Y(e);return window.localStorage.setItem(C,t),t}(e))}),[r]),s=Object(c.useCallback)((function(e){return ge(n,e)}),[n]);return{syntax:n,setSyntax:a,createGrammar:s}})),ge=function(e,t){return"fcs"===e?new Oe(t):new ye(t)},Se=n(52),_e=function(e){var t=e.id,n=e.className,r=e.title,a=e.placeholder,c=e.onChange,s=e.value,i=e.aria,l=e.children,o=t||Object(Se.a)();return Object(K.jsxs)("div",{className:"".concat($.a.area," ").concat(n||""),"data-testid":"container",children:[r&&Object(K.jsx)("h2",{className:$.a.title,children:Object(K.jsx)("label",{htmlFor:o,"data-testid":"label",children:r})}),Object(K.jsx)("textarea",{id:o,className:"textarea monospace",onChange:c,draggable:"false",placeholder:"string"===typeof a?a:"Enter text here...",value:s,"aria-label":i}),l&&Object(K.jsx)("div",{className:"children",children:l})]})},ke={fcs:["S -> 1 | 2 | 3","S -> 4 | 5 | 6"],bnf:['<start> ::= "1" | "2" | "3"','<start> ::= "4" | "5" | "6"']},Ne=function(e){var t=e.className,n=m.useContainer(),r=n.rules,a=n.setRules,s=n.setGrammar,i=we.useContainer(),l=i.syntax,o=i.createGrammar,u=Object(c.useState)(["",""]),h=Object(b.a)(u,2),d=h[0],f=h[1],j=Object(c.useRef)(0),v=Object(c.useCallback)((function(){return j.current=window.setTimeout((function(){try{s(o(r)),f(["ok",""])}catch(e){f(["error","".concat(e)])}}),50),function(){return window.clearTimeout(j.current)}}),[r,s,o]);return Object(c.useEffect)(v,[r,v]),Object(K.jsx)("div",{className:"".concat(t||""," status-").concat(d[0]," App-bodyComponent"),"data-testid":"rules-input",children:Object(K.jsxs)(_e,{className:J.a.textarea,value:r,onChange:function(e){a(e.target.value)},title:"Rules",aria:"Rules that describe the grammar",placeholder:"Enter rules here... e.g.\n".concat(ke[l].join("\n")),children:[Object(K.jsx)("div",{className:"row1",children:Object(K.jsx)("div",{className:"status",role:"status",children:d[1]})}),Object(K.jsx)("div",{className:"row2",children:Object(K.jsx)("button",{className:"button secondary",onClick:function(e){e.target.blur(),v()},children:"Regenerate Model"})})]})})},Ee=function(e){var t=e.className,n=m.useContainer(),r=n.input,a=n.setInput,s=n.grammar,i=Object(c.useState)(["",""]),l=Object(b.a)(i,2),o=l[0],u=l[1],h=Object(c.useState)(!1),d=Object(b.a)(h,2),f=d[0],j=d[1],v=Object(c.useRef)(0),p=Object(c.useCallback)((function(){try{if(!s)throw new Error("No grammar object available");s.checkValid();var e=s.matches(r);j(!1),u([e?"ok":"error","Input ".concat(e?"matches":"doesn't match")])}catch(t){j(!0),u(["error","".concat(t)])}}),[r,s]);return Object(c.useEffect)((function(){return v.current=window.setTimeout(p,100),function(){return window.clearTimeout(v.current)}}),[p]),Object(K.jsx)("div",{className:"".concat(t||""," status-").concat(o[0]," App-bodyComponent"),"data-testid":"text-input",children:Object(K.jsxs)(_e,{className:J.a.textarea,value:r,onChange:function(e){a(e.target.value)},title:"Test Input",aria:"Input to match with grammar",children:[Object(K.jsx)("div",{className:"row1",children:Object(K.jsx)("span",{className:"status",role:"status",children:o[1]})}),Object(K.jsx)("div",{className:"row2",children:Object(K.jsx)("button",{className:"button secondary",onClick:function(e){e.target.blur(),p()},disabled:f,children:"Re-Match"})})]})})},Te=function(e){var t=e.className;return Object(K.jsx)("div",{className:"".concat(t||""," ").concat(p.a.grid," App-body"),"data-testid":"body",children:Object(K.jsxs)(m.Provider,{initialState:window.location.hash,children:[Object(K.jsx)(Ne,{className:p.a.left}),Object(K.jsx)(Ee,{className:p.a.rightTop}),Object(K.jsx)(te,{className:p.a.rightBottom})]})})},Ie="2020",Ce="Constantin Piber",Be="https://github.com/cpiber/cfg-tester",Ae=function(e){var t=e.className,n=(new Date).getFullYear().toString();return Object(K.jsxs)("footer",{className:"".concat(t||""," App-footer"),"data-testid":"footer",children:[n===Ie?n:"".concat(Ie,"-").concat(n)," by ".concat(Ce),Object(K.jsxs)(s.a.Fragment,{children:[Object(K.jsx)("span",{children:" :: "}),Object(K.jsx)("a",{href:Be,target:"_blank",rel:"noopener noreferrer",children:"Source"})]})]})},Me=n(25),Re=n.n(Me),Le=n(21),Ue=n.n(Le),ze=function(e){var t=e.read,n=e.write,r=e.name,a=Object(c.useState)(t()),s=Object(b.a)(a,2),i=s[0],l=s[1];return Object(K.jsxs)(c.Fragment,{children:[Object(K.jsx)("input",{type:"number",value:i,onChange:function(e){l(n(+e.target.value))},size:5,className:Ue.a.value,name:r}),Object(K.jsx)("span",{onClick:function(){window.localStorage.removeItem(r),l(t())},className:Ue.a.clear,title:"Clear value",children:"\ud83d\uddd1"})]})},Fe=function(e){var t=e.className,n=e.open,r=e.setOpen,a="".concat(Ue.a.wrapper," ").concat(n?Ue.a.open:Ue.a.close);return Object(K.jsxs)("div",{className:"".concat(t||""," ").concat(a),children:[Object(K.jsx)("h3",{className:Ue.a.opener,onClick:function(){return r(!n)},"data-testid":"opener",children:"Advanced"}),Object(K.jsxs)("div",{className:Ue.a.content,"data-testid":"content",children:[Object(K.jsx)("p",{className:Ue.a.warn,children:"Note: These values were chosen carefully, changing them could cause problems."}),Object(K.jsxs)("p",{children:[Object(K.jsxs)("label",{children:["Max recursion depth: ",Object(K.jsx)(ze,{read:z,write:F,name:E})]}),Object(K.jsxs)("label",{children:["Max non-terminals in a row: ",Object(K.jsx)(ze,{read:P,write:G,name:T})]}),Object(K.jsxs)("label",{children:["Max iterations per call: ",Object(K.jsx)(ze,{read:V,write:q,name:I})]})]})]})]})},Pe=n(55),Ge=n.n(Pe),Ve=n(18),qe=["className","children"],He=["value","children"],We=Object(c.createContext)({}),Ye=function(e){var t=e.className,n=e.children,r=Object(Ve.a)(e,qe);return r.name||(r.name=Object(Se.a)()),Object(K.jsx)(We.Provider,{value:r,children:Object(K.jsx)("div",{className:t,role:"radiogroup",children:n})})},De=function(e){var t=e.value,n=e.children,r=Object(Ve.a)(e,He),a=Object(c.useContext)(We),s=a.onChange,i=a.value,l=a.name;return Object(K.jsx)("input",Object(d.a)(Object(d.a)({type:"radio",value:t,name:l,onChange:s,checked:i===t},r),{},{children:n}))},Je=n(10),Xe=n.n(Je),Ze=["value"],Qe=["value"],$e=["value"],Ke=function(e){var t=e.value,n=Object(Ve.a)(e,Ze);return Object(K.jsxs)("span",Object(d.a)(Object(d.a)({},n),{},{children:["<",Object(K.jsx)("span",{className:Xe.a.entry,children:t}),">"]}))},et=function(e){var t=e.value,n=Object(Ve.a)(e,Qe);return Object(K.jsxs)("span",Object(d.a)(Object(d.a)({},n),{},{children:["<",Object(K.jsx)("span",{className:Xe.a.nonterminal,children:t}),">"]}))},tt=function(e){var t=e.value,n=Object(Ve.a)(e,$e);return Object(K.jsxs)("span",Object(d.a)(Object(d.a)({},n),{},{children:['"',Object(K.jsx)("span",{className:Xe.a.terminal,children:t}),'"']}))},nt=function(){return Object(K.jsxs)("div",{children:[Object(K.jsxs)("label",{"data-tip":"Backus-Naur form",children:[Object(K.jsx)(De,{value:"bnf",className:Xe.a.box}),Object(K.jsx)("span",{children:"BNF"})]}),Object(K.jsxs)("code",{className:Xe.a.code,children:[Object(K.jsx)(Ke,{value:"start"})," ::= ",Object(K.jsx)(et,{value:"int"})," ",Object(K.jsx)(tt,{value:"B"})," | ",Object(K.jsx)(tt,{value:"a"})," | ",Object(K.jsx)(tt,{value:"","data-tip":"At least one symbol is required"}),Object(K.jsx)("br",{}),Object(K.jsx)(et,{value:"int"})," ::= ",Object(K.jsx)(tt,{value:"1"}),Object(K.jsx)("br",{}),Object(K.jsx)(et,{value:"int"})," ::= ",Object(K.jsx)(tt,{value:"2"})]})]})},rt=["value"],at=["value"],ct=["value"],st=function(e){var t=e.value,n=Object(Ve.a)(e,rt);return Object(K.jsx)("span",Object(d.a)(Object(d.a)({className:Xe.a.entry},n),{},{children:t}))},it=function(e){var t=e.value,n=Object(Ve.a)(e,at);return Object(K.jsx)("span",Object(d.a)(Object(d.a)({className:Xe.a.nonterminal},n),{},{children:t}))},lt=function(e){var t=e.value,n=Object(Ve.a)(e,ct);return Object(K.jsx)("span",Object(d.a)(Object(d.a)({className:Xe.a.terminal},n),{},{children:t}))},ot=function(){return Object(K.jsxs)("div",{children:[Object(K.jsxs)("label",{children:[Object(K.jsx)(De,{value:"fcs",className:Xe.a.box}),Object(K.jsx)("span",{children:"FCS"})]}),Object(K.jsxs)("code",{className:Xe.a.code,children:[Object(K.jsx)(st,{value:"S"})," -> ",Object(K.jsx)(it,{value:"T"}),Object(K.jsx)(lt,{value:"B","data-tip":"Unresolved non-terminals get converted to terminals"})," | ",Object(K.jsx)(lt,{value:"a"})," | ",Object(K.jsx)(lt,{value:"\xa0","data-tip":"Empty branches work implicitly"}),Object(K.jsx)("br",{}),Object(K.jsx)(it,{value:"T"})," \u2192 ",Object(K.jsx)(lt,{value:"1"}),Object(K.jsx)("br",{}),Object(K.jsx)(it,{value:"T"})," \u2192 ",Object(K.jsx)(lt,{value:"2"})]})]})},ut=function(e){var t=e.className,n=we.useContainer(),r=n.syntax,a=n.setSyntax;return Object(K.jsxs)("div",{className:"".concat(t||""),children:[Object(K.jsx)("h3",{children:"Select syntax"}),Object(K.jsxs)(Ye,{onChange:function(e){a(e.target.value)},value:r,children:[Object(K.jsx)(ot,{}),Object(K.jsx)(nt,{})]}),Object(K.jsxs)("p",{children:["Both syntaxes above produce the same grammar, with different names and conventions for ",Object(K.jsx)("span",{className:Xe.a.entry,"data-tip":"The entry symbol into the grammar",children:"Start"}),"-, ",Object(K.jsx)("span",{className:Xe.a.nonterminal,children:"non-terminal"})," and ",Object(K.jsx)("span",{className:Xe.a.terminal,children:"terminal"})," symbols."]}),Object(K.jsx)("p",{children:"BNF is stricter and does not allow empty branches or implicit symbol declarations."})]})},ht=function(e){var t=e.className,n=e.close,r=Object(c.useState)(!1),a=Object(b.a)(r,2),s=a[0],i=a[1];return Object(K.jsxs)("div",{className:"".concat(t||""),children:[Object(K.jsxs)("div",{className:"".concat(Re.a.cols," App-header"),children:[Object(K.jsx)("h2",{className:Re.a.title,children:"Settings"}),Object(K.jsx)("div",{className:"".concat(Re.a.close," ").concat(Ge.a.close),onClick:n,"data-testid":"close",children:"\xd7"})]}),Object(K.jsx)(ut,{className:Ge.a.content}),Object(K.jsx)(Fe,{className:Ge.a.content,open:s,setOpen:i})]})},dt=["title","titleId"];function bt(){return(bt=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e}).apply(this,arguments)}function ft(e,t){if(null==e)return{};var n,r,a=function(e,t){if(null==e)return{};var n,r,a={},c=Object.keys(e);for(r=0;r<c.length;r++)n=c[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var c=Object.getOwnPropertySymbols(e);for(r=0;r<c.length;r++)n=c[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}function jt(e,t){var n=e.title,r=e.titleId,a=ft(e,dt);return c.createElement("svg",bt({xmlns:"http://www.w3.org/2000/svg",xmlnsXlink:"http://www.w3.org/1999/xlink",x:"0px",y:"0px",viewBox:"0 0 174.248 174.248",xmlSpace:"preserve",ref:t,"aria-labelledby":r},a),n?c.createElement("title",{id:r},n):null,N||(N=c.createElement("g",null,c.createElement("path",{d:"M173.145,73.91c-0.413-2.722-2.29-4.993-4.881-5.912l-13.727-4.881c-0.812-2.3-1.733-4.536-2.754-6.699l6.247-13.146 c1.179-2.479,0.899-5.411-0.729-7.628c-5.265-7.161-11.556-13.452-18.698-18.693c-2.219-1.629-5.141-1.906-7.625-0.724 l-13.138,6.242c-2.163-1.021-4.402-1.94-6.704-2.752l-4.883-13.729c-0.919-2.586-3.184-4.458-5.9-4.876 c-9.65-1.483-16.792-1.483-26.457,0c-2.713,0.418-4.981,2.29-5.9,4.876l-4.883,13.729c-2.302,0.812-4.541,1.731-6.702,2.752 l-13.143-6.242c-2.479-1.181-5.406-0.904-7.623,0.724c-7.142,5.241-13.433,11.532-18.698,18.693 c-1.629,2.217-1.908,5.148-0.729,7.628l6.247,13.146c-1.021,2.159-1.94,4.4-2.754,6.699L5.982,68.003 c-2.589,0.919-4.463,3.189-4.879,5.907c-0.749,4.92-1.099,9.115-1.099,13.219c0,4.098,0.35,8.299,1.099,13.219 c0.413,2.722,2.29,4.993,4.881,5.912l13.727,4.881c0.814,2.304,1.736,4.541,2.754,6.704l-6.247,13.141 c-1.179,2.479-0.899,5.411,0.727,7.623c5.258,7.156,11.549,13.447,18.7,18.698c2.217,1.629,5.144,1.911,7.625,0.724l13.138-6.242 c2.163,1.021,4.402,1.94,6.704,2.752l4.883,13.729c0.919,2.586,3.184,4.458,5.9,4.876c4.828,0.744,9.154,1.104,13.228,1.104 c4.074,0,8.401-0.36,13.228-1.104c2.715-0.418,4.981-2.29,5.9-4.876l4.883-13.729c2.302-0.812,4.541-1.731,6.704-2.752 l13.138,6.242c2.484,1.186,5.411,0.904,7.628-0.724c7.159-5.26,13.45-11.551,18.698-18.698c1.626-2.212,1.906-5.144,0.727-7.623 l-6.247-13.141c1.021-2.163,1.942-4.405,2.754-6.704l13.727-4.881c2.591-0.919,4.468-3.189,4.881-5.912 c0.749-4.92,1.099-9.12,1.099-13.219S173.894,78.829,173.145,73.91z M158.949,93.72l-12.878,4.58 c-2.251,0.797-3.982,2.625-4.66,4.92c-1.15,3.889-2.664,7.569-4.504,10.943c-1.142,2.1-1.213,4.619-0.187,6.777l5.841,12.285 c-2.822,3.389-5.943,6.515-9.337,9.334l-12.283-5.834c-2.161-1.036-4.672-0.953-6.775,0.185c-3.379,1.838-7.061,3.35-10.953,4.502 c-2.29,0.676-4.118,2.406-4.917,4.657l-4.582,12.883c-4.677,0.476-8.503,0.476-13.18,0l-4.582-12.883 c-0.8-2.246-2.628-3.982-4.917-4.657c-3.894-1.152-7.579-2.664-10.953-4.502c-2.103-1.147-4.619-1.22-6.775-0.185l-12.283,5.839 c-3.391-2.825-6.512-5.946-9.337-9.339l5.841-12.285c1.026-2.159,0.955-4.677-0.187-6.777c-1.835-3.364-3.35-7.049-4.504-10.948 c-0.678-2.29-2.411-4.118-4.66-4.915l-12.878-4.58c-0.243-2.343-0.36-4.502-0.36-6.592s0.117-4.244,0.36-6.587l12.881-4.584 c2.248-0.797,3.979-2.625,4.657-4.915c1.152-3.889,2.667-7.574,4.504-10.953c1.142-2.095,1.213-4.619,0.187-6.772l-5.841-12.285 c2.827-3.393,5.948-6.519,9.337-9.339l12.288,5.839c2.151,1.036,4.677,0.953,6.775-0.185c3.372-1.838,7.054-3.35,10.948-4.502 c2.29-0.676,4.118-2.411,4.917-4.657l4.582-12.883c4.633-0.481,8.466-0.481,13.18,0l4.582,12.883 c0.8,2.246,2.628,3.982,4.917,4.657c3.894,1.152,7.579,2.664,10.953,4.502c2.103,1.147,4.614,1.22,6.775,0.185l12.283-5.839 c3.389,2.82,6.51,5.946,9.337,9.339l-5.841,12.285c-1.026,2.154-0.955,4.677,0.187,6.772c1.843,3.389,3.357,7.069,4.504,10.948 c0.678,2.295,2.409,4.123,4.66,4.92l12.878,4.58c0.243,2.343,0.36,4.502,0.36,6.592S159.192,91.377,158.949,93.72z"}),c.createElement("path",{d:"M87.124,50.802c-19.062,0-34.571,15.508-34.571,34.571s15.508,34.571,34.571,34.571s34.571-15.508,34.571-34.571 S106.186,50.802,87.124,50.802z M87.124,105.009c-10.827,0-19.636-8.809-19.636-19.636s8.809-19.636,19.636-19.636 s19.636,8.809,19.636,19.636S97.951,105.009,87.124,105.009z"}))))}var mt=c.forwardRef(jt),vt=(n.p,function(e){var t=e.className,n=Object(c.useState)(!1),r=Object(b.a)(n,2),a=r[0],s=r[1],i=function(){return s(!1)};return Object(K.jsxs)("header",{className:"".concat(t||""," ").concat(Re.a.cols," App-header"),"data-testid":"header",children:[Object(K.jsxs)("h1",{className:Re.a.title,children:[Object(K.jsx)("abbr",{title:"Context-free grammar",children:"CFG"})," Testing suite"]}),Object(K.jsx)("div",{className:Re.a.settings,children:Object(K.jsx)(mt,{onClick:function(){return s(!0)},"data-testid":"cog"})}),Object(K.jsx)(u.a,{isOpen:a,onRequestClose:i,onAfterOpen:function(){return h.a.rebuild()},testId:"modal",children:Object(K.jsx)(ht,{close:i})})]})}),pt=function(){return Object(K.jsx)(we.Provider,{children:Object(K.jsxs)("div",{className:"App","data-testid":"app",children:[Object(K.jsx)(vt,{}),Object(K.jsx)(Te,{}),Object(K.jsx)(Ae,{}),Object(K.jsx)(h.a,{effect:"solid"})]})})};n(252),Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));u.a.setAppElement("#root"),u.a.defaultStyles.content.inset="",l.a.render(Object(K.jsx)(pt,{}),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()}))},32:function(e,t,n){e.exports={textarea:"bodyComponent_textarea__2AEVB"}},33:function(e,t,n){e.exports={area:"Textarea_area__13BlF",title:"Textarea_title__2JY6L"}},43:function(e,t,n){e.exports={grid:"Body_grid__2Eze4",left:"Body_left__3afN_",rightTop:"Body_rightTop__x95CP",rightBottom:"Body_rightBottom__2q8gj"}},55:function(e,t,n){e.exports={close:"Modal_close__2S9P9",content:"Modal_content__bvzj6"}},81:function(e,t,n){e.exports={strings:"GrammarOutput_strings__syveZ",empty:"GrammarOutput_empty__3tYL_"}}},[[253,1,2]]]);
//# sourceMappingURL=main.02f9301e.chunk.js.map
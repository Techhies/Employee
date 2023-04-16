ace.define("ace/snippets",[],function(e,t,n){"use strict";var i=e("./lib/dom");var r=e("./lib/oop");var s=e("./lib/event_emitter").EventEmitter;var a=e("./lib/lang");var o=e("./range").Range;var c=e("./range_list").RangeList;var f=e("./keyboard/hash_handler").HashHandler;var u=e("./tokenizer").Tokenizer;var l=e("./clipboard");var h={CURRENT_WORD:function(e){return e.session.getTextRange(e.session.getWordRange())},SELECTION:function(e,t,n){var i=e.session.getTextRange();if(n)return i.replace(/\n\r?([ \t]*\S)/g,"\n"+n+"$1");return i},CURRENT_LINE:function(e){return e.session.getLine(e.getCursorPosition().row)},PREV_LINE:function(e){return e.session.getLine(e.getCursorPosition().row-1)},LINE_INDEX:function(e){return e.getCursorPosition().row},LINE_NUMBER:function(e){return e.getCursorPosition().row+1},SOFT_TABS:function(e){return e.session.getUseSoftTabs()?"YES":"NO"},TAB_SIZE:function(e){return e.session.getTabSize()},CLIPBOARD:function(e){return l.getText&&l.getText()},FILENAME:function(e){return/[^/\\]*$/.exec(this.FILEPATH(e))[0]},FILENAME_BASE:function(e){return/[^/\\]*$/.exec(this.FILEPATH(e))[0].replace(/\.[^.]*$/,"")},DIRECTORY:function(e){return this.FILEPATH(e).replace(/[^/\\]*$/,"")},FILEPATH:function(e){return"/not implemented.txt"},WORKSPACE_NAME:function(){return"Unknown"},FULLNAME:function(){return"Unknown"},BLOCK_COMMENT_START:function(e){var t=e.session.$mode||{};return t.blockComment&&t.blockComment.start||""},BLOCK_COMMENT_END:function(e){var t=e.session.$mode||{};return t.blockComment&&t.blockComment.end||""},LINE_COMMENT:function(e){var t=e.session.$mode||{};return t.lineCommentStart||""},CURRENT_YEAR:p.bind(null,{year:"numeric"}),CURRENT_YEAR_SHORT:p.bind(null,{year:"2-digit"}),CURRENT_MONTH:p.bind(null,{month:"numeric"}),CURRENT_MONTH_NAME:p.bind(null,{month:"long"}),CURRENT_MONTH_NAME_SHORT:p.bind(null,{month:"short"}),CURRENT_DATE:p.bind(null,{day:"2-digit"}),CURRENT_DAY_NAME:p.bind(null,{weekday:"long"}),CURRENT_DAY_NAME_SHORT:p.bind(null,{weekday:"short"}),CURRENT_HOUR:p.bind(null,{hour:"2-digit",hour12:false}),CURRENT_MINUTE:p.bind(null,{minute:"2-digit"}),CURRENT_SECOND:p.bind(null,{second:"2-digit"})};h.SELECTED_TEXT=h.SELECTION;function p(e){var t=(new Date).toLocaleString("en-us",e);return t.length==1?"0"+t:t}var d=function(){this.snippetMap={};this.snippetNameMap={}};(function(){r.implement(this,s);this.getTokenizer=function(){return d.$tokenizer||this.createTokenizer()};this.createTokenizer=function(){function e(e){e=e.substr(1);if(/^\d+$/.test(e))return[{tabstopId:parseInt(e,10)}];return[{text:e}]}function t(e){return"(?:[^\\\\"+e+"]|\\\\.)"}var n={regex:"/("+t("/")+"+)/",onMatch:function(e,t,n){var i=n[0];i.fmtString=true;i.guard=e.slice(1,-1);i.flag="";return""},next:"formatString"};d.$tokenizer=new u({start:[{regex:/\\./,onMatch:function(e,t,n){var i=e[1];if(i=="}"&&n.length){e=i}else if("`$\\".indexOf(i)!=-1){e=i}return[e]}},{regex:/}/,onMatch:function(e,t,n){return[n.length?n.shift():e]}},{regex:/\$(?:\d+|\w+)/,onMatch:e},{regex:/\$\{[\dA-Z_a-z]+/,onMatch:function(t,n,i){var r=e(t.substr(1));i.unshift(r[0]);return r},next:"snippetVar"},{regex:/\n/,token:"newline",merge:false}],snippetVar:[{regex:"\\|"+t("\\|")+"*\\|",onMatch:function(e,t,n){var i=e.slice(1,-1).replace(/\\[,|\\]|,/g,function(e){return e.length==2?e[1]:"\0"}).split("\0").map(function(e){return{value:e}});n[0].choices=i;return[i[0]]},next:"start"},n,{regex:"([^:}\\\\]|\\\\.)*:?",token:"",next:"start"}],formatString:[{regex:/:/,onMatch:function(e,t,n){if(n.length&&n[0].expectElse){n[0].expectElse=false;n[0].ifEnd={elseEnd:n[0]};return[n[0].ifEnd]}return":"}},{regex:/\\./,onMatch:function(e,t,n){var i=e[1];if(i=="}"&&n.length)e=i;else if("`$\\".indexOf(i)!=-1)e=i;else if(i=="n")e="\n";else if(i=="t")e="\t";else if("ulULE".indexOf(i)!=-1)e={changeCase:i,local:i>"a"};return[e]}},{regex:"/\\w*}",onMatch:function(e,t,n){var i=n.shift();if(i)i.flag=e.slice(1,-1);this.next=i&&i.tabstopId?"start":"";return[i||e]},next:"start"},{regex:/\$(?:\d+|\w+)/,onMatch:function(e,t,n){return[{text:e.slice(1)}]}},{regex:/\${\w+/,onMatch:function(e,t,n){var i={text:e.slice(2)};n.unshift(i);return[i]},next:"formatStringVar"},{regex:/\n/,token:"newline",merge:false},{regex:/}/,onMatch:function(e,t,n){var i=n.shift();this.next=i&&i.tabstopId?"start":"";return[i||e]},next:"start"}],formatStringVar:[{regex:/:\/\w+}/,onMatch:function(e,t,n){var i=n[0];i.formatFunction=e.slice(2,-1);return[n.shift()]},next:"formatString"},n,{regex:/:[\?\-+]?/,onMatch:function(e,t,n){if(e[1]=="+")n[0].ifEnd=n[0];if(e[1]=="?")n[0].expectElse=true},next:"formatString"},{regex:"([^:}\\\\]|\\\\.)*:?",token:"",next:"formatString"}]});return d.$tokenizer};this.tokenizeTmSnippet=function(e,t){return this.getTokenizer().getLineTokens(e,t).tokens.map(function(e){return e.value||e})};this.getVariableValue=function(e,t,n){if(/^\d+$/.test(t))return(this.variables.__||{})[t]||"";if(/^[A-Z]\d+$/.test(t))return(this.variables[t[0]+"__"]||{})[t.substr(1)]||"";t=t.replace(/^TM_/,"");if(!this.variables.hasOwnProperty(t))return"";var i=this.variables[t];if(typeof i=="function")i=this.variables[t](e,t,n);return i==null?"":i};this.variables=h;this.tmStrFormat=function(e,t,n){if(!t.fmt)return e;var i=t.flag||"";var r=t.guard;r=new RegExp(r,i.replace(/[^gim]/g,""));var s=typeof t.fmt=="string"?this.tokenizeTmSnippet(t.fmt,"formatString"):t.fmt;var a=this;var o=e.replace(r,function(){var e=a.variables.__;a.variables.__=[].slice.call(arguments);var t=a.resolveVariables(s,n);var i="E";for(var r=0;r<t.length;r++){var o=t[r];if(typeof o=="object"){t[r]="";if(o.changeCase&&o.local){var c=t[r+1];if(c&&typeof c=="string"){if(o.changeCase=="u")t[r]=c[0].toUpperCase();else t[r]=c[0].toLowerCase();t[r+1]=c.substr(1)}}else if(o.changeCase){i=o.changeCase}}else if(i=="U"){t[r]=o.toUpperCase()}else if(i=="L"){t[r]=o.toLowerCase()}}a.variables.__=e;return t.join("")});return o};this.tmFormatFunction=function(e,t,n){if(t.formatFunction=="upcase")return e.toUpperCase();if(t.formatFunction=="downcase")return e.toLowerCase();return e};this.resolveVariables=function(e,t){var n=[];var i="";var r=true;for(var s=0;s<e.length;s++){var a=e[s];if(typeof a=="string"){n.push(a);if(a=="\n"){r=true;i=""}else if(r){i=/^\t*/.exec(a)[0];r=/\S/.test(a)}continue}if(!a)continue;r=false;if(a.fmtString){var o=e.indexOf(a,s+1);if(o==-1)o=e.length;a.fmt=e.slice(s+1,o);s=o}if(a.text){var c=this.getVariableValue(t,a.text,i)+"";if(a.fmtString)c=this.tmStrFormat(c,a,t);if(a.formatFunction)c=this.tmFormatFunction(c,a,t);if(c&&!a.ifEnd){n.push(c);f(a)}else if(!c&&a.ifEnd){f(a.ifEnd)}}else if(a.elseEnd){f(a.elseEnd)}else if(a.tabstopId!=null){n.push(a)}else if(a.changeCase!=null){n.push(a)}}function f(t){var n=e.indexOf(t,s+1);if(n!=-1)s=n}return n};this.insertSnippetForSelection=function(e,t){var n=e.getCursorPosition();var i=e.session.getLine(n.row);var r=e.session.getTabString();var s=i.match(/^\s*/)[0];if(n.column<s.length)s=s.slice(0,n.column);t=t.replace(/\r/g,"");var a=this.tokenizeTmSnippet(t);a=this.resolveVariables(a,e);a=a.map(function(e){if(e=="\n")return e+s;if(typeof e=="string")return e.replace(/\t/g,r);return e});var o=[];a.forEach(function(e,t){if(typeof e!="object")return;var n=e.tabstopId;var i=o[n];if(!i){i=o[n]=[];i.index=n;i.value="";i.parents={}}if(i.indexOf(e)!==-1)return;if(e.choices&&!i.choices)i.choices=e.choices;i.push(e);var r=a.indexOf(e,t+1);if(r===-1)return;var s=a.slice(t+1,r);var c=s.some(function(e){return typeof e==="object"});if(c&&!i.value){i.value=s}else if(s.length&&(!i.value||typeof i.value!=="string")){i.value=s.join("")}});o.forEach(function(e){e.length=0});var c={};function f(e){var t=[];for(var n=0;n<e.length;n++){var i=e[n];if(typeof i=="object"){if(c[i.tabstopId])continue;var r=e.lastIndexOf(i,n-1);i=t[r]||{tabstopId:i.tabstopId}}t[n]=i}return t}for(var u=0;u<a.length;u++){var l=a[u];if(typeof l!="object")continue;var h=l.tabstopId;var p=o[h];var d=a.indexOf(l,u+1);if(c[h]){if(c[h]===l){delete c[h];Object.keys(c).forEach(function(e){p.parents[e]=true})}continue}c[h]=l;var m=p.value;if(typeof m!=="string")m=f(m);else if(l.fmt)m=this.tmStrFormat(m,l,e);a.splice.apply(a,[u+1,Math.max(0,d-u)].concat(m,l));if(p.indexOf(l)===-1)p.push(l)}var v=0,b=0;var x="";a.forEach(function(e){if(typeof e==="string"){var t=e.split("\n");if(t.length>1){b=t[t.length-1].length;v+=t.length-1}else b+=e.length;x+=e}else if(e){if(!e.start)e.start={row:v,column:b};else e.end={row:v,column:b}}});var _=e.getSelectionRange();var T=e.session.replace(_,x);var S=new g(e);var E=e.inVirtualSelectionMode&&e.selection.index;S.addTabstops(o,_.start,T,E)};this.insertSnippet=function(e,t){var n=this;if(e.inVirtualSelectionMode)return n.insertSnippetForSelection(e,t);e.forEachSelection(function(){n.insertSnippetForSelection(e,t)},null,{keepOrder:true});if(e.tabstopManager)e.tabstopManager.tabNext()};this.$getScope=function(e){var t=e.session.$mode.$id||"";t=t.split("/").pop();if(t==="html"||t==="php"){if(t==="php"&&!e.session.$mode.inlinePhp)t="html";var n=e.getCursorPosition();var i=e.session.getState(n.row);if(typeof i==="object"){i=i[0]}if(i.substring){if(i.substring(0,3)=="js-")t="javascript";else if(i.substring(0,4)=="css-")t="css";else if(i.substring(0,4)=="php-")t="php"}}return t};this.getActiveScopes=function(e){var t=this.$getScope(e);var n=[t];var i=this.snippetMap;if(i[t]&&i[t].includeScopes){n.push.apply(n,i[t].includeScopes)}n.push("_");return n};this.expandWithTab=function(e,t){var n=this;var i=e.forEachSelection(function(){return n.expandSnippetForSelection(e,t)},null,{keepOrder:true});if(i&&e.tabstopManager)e.tabstopManager.tabNext();return i};this.expandSnippetForSelection=function(e,t){var n=e.getCursorPosition();var i=e.session.getLine(n.row);var r=i.substring(0,n.column);var s=i.substr(n.column);var a=this.snippetMap;var o;this.getActiveScopes(e).some(function(e){var t=a[e];if(t)o=this.findMatchingSnippet(t,r,s);return!!o},this);if(!o)return false;if(t&&t.dryRun)return true;e.session.doc.removeInLine(n.row,n.column-o.replaceBefore.length,n.column+o.replaceAfter.length);this.variables.M__=o.matchBefore;this.variables.T__=o.matchAfter;this.insertSnippetForSelection(e,o.content);this.variables.M__=this.variables.T__=null;return true};this.findMatchingSnippet=function(e,t,n){for(var i=e.length;i--;){var r=e[i];if(r.startRe&&!r.startRe.test(t))continue;if(r.endRe&&!r.endRe.test(n))continue;if(!r.startRe&&!r.endRe)continue;r.matchBefore=r.startRe?r.startRe.exec(t):[""];r.matchAfter=r.endRe?r.endRe.exec(n):[""];r.replaceBefore=r.triggerRe?r.triggerRe.exec(t)[0]:"";r.replaceAfter=r.endTriggerRe?r.endTriggerRe.exec(n)[0]:"";return r}};this.snippetMap={};this.snippetNameMap={};this.register=function(e,t){var n=this.snippetMap;var i=this.snippetNameMap;var r=this;if(!e)e=[];function s(e){if(e&&!/^\^?\(.*\)\$?$|^\\b$/.test(e))e="(?:"+e+")";return e||""}function o(e,t,n){e=s(e);t=s(t);if(n){e=t+e;if(e&&e[e.length-1]!="$")e=e+"$"}else{e=e+t;if(e&&e[0]!="^")e="^"+e}return new RegExp(e)}function c(e){if(!e.scope)e.scope=t||"_";t=e.scope;if(!n[t]){n[t]=[];i[t]={}}var s=i[t];if(e.name){var c=s[e.name];if(c)r.unregister(c);s[e.name]=e}n[t].push(e);if(e.prefix)e.tabTrigger=e.prefix;if(!e.content&&e.body)e.content=Array.isArray(e.body)?e.body.join("\n"):e.body;if(e.tabTrigger&&!e.trigger){if(!e.guard&&/^\w/.test(e.tabTrigger))e.guard="\\b";e.trigger=a.escapeRegExp(e.tabTrigger)}if(!e.trigger&&!e.guard&&!e.endTrigger&&!e.endGuard)return;e.startRe=o(e.trigger,e.guard,true);e.triggerRe=new RegExp(e.trigger);e.endRe=o(e.endTrigger,e.endGuard,true);e.endTriggerRe=new RegExp(e.endTrigger)}if(Array.isArray(e)){e.forEach(c)}else{Object.keys(e).forEach(function(t){c(e[t])})}this._signal("registerSnippets",{scope:t})};this.unregister=function(e,t){var n=this.snippetMap;var i=this.snippetNameMap;function r(e){var r=i[e.scope||t];if(r&&r[e.name]){delete r[e.name];var s=n[e.scope||t];var a=s&&s.indexOf(e);if(a>=0)s.splice(a,1)}}if(e.content)r(e);else if(Array.isArray(e))e.forEach(r)};this.parseSnippetFile=function(e){e=e.replace(/\r/g,"");var t=[],n={};var i=/^#.*|^({[\s\S]*})\s*$|^(\S+) (.*)$|^((?:\n*\t.*)+)/gm;var r;while(r=i.exec(e)){if(r[1]){try{n=JSON.parse(r[1]);t.push(n)}catch(e){}}if(r[4]){n.content=r[4].replace(/^\t/gm,"");t.push(n);n={}}else{var s=r[2],a=r[3];if(s=="regex"){var o=/\/((?:[^\/\\]|\\.)*)|$/g;n.guard=o.exec(a)[1];n.trigger=o.exec(a)[1];n.endTrigger=o.exec(a)[1];n.endGuard=o.exec(a)[1]}else if(s=="snippet"){n.tabTrigger=a.match(/^\S*/)[0];if(!n.name)n.name=a}else if(s){n[s]=a}}}return t};this.getSnippetByName=function(e,t){var n=this.snippetNameMap;var i;this.getActiveScopes(t).some(function(t){var r=n[t];if(r)i=r[e];return!!i},this);return i}}).call(d.prototype);var g=function(e){if(e.tabstopManager)return e.tabstopManager;e.tabstopManager=this;this.$onChange=this.onChange.bind(this);this.$onChangeSelection=a.delayedCall(this.onChangeSelection.bind(this)).schedule;this.$onChangeSession=this.onChangeSession.bind(this);this.$onAfterExec=this.onAfterExec.bind(this);this.attach(e)};(function(){this.attach=function(e){this.index=0;this.ranges=[];this.tabstops=[];this.$openTabstops=null;this.selectedTabstop=null;this.editor=e;this.editor.on("change",this.$onChange);this.editor.on("changeSelection",this.$onChangeSelection);this.editor.on("changeSession",this.$onChangeSession);this.editor.commands.on("afterExec",this.$onAfterExec);this.editor.keyBinding.addKeyboardHandler(this.keyboardHandler)};this.detach=function(){this.tabstops.forEach(this.removeTabstopMarkers,this);this.ranges=null;this.tabstops=null;this.selectedTabstop=null;this.editor.removeListener("change",this.$onChange);this.editor.removeListener("changeSelection",this.$onChangeSelection);this.editor.removeListener("changeSession",this.$onChangeSession);this.editor.commands.removeListener("afterExec",this.$onAfterExec);this.editor.keyBinding.removeKeyboardHandler(this.keyboardHandler);this.editor.tabstopManager=null;this.editor=null};this.onChange=function(e){var t=e.action[0]=="r";var n=this.selectedTabstop||{};var i=n.parents||{};var r=(this.tabstops||[]).slice();for(var s=0;s<r.length;s++){var a=r[s];var o=a==n||i[a.index];a.rangeList.$bias=o?0:1;if(e.action=="remove"&&a!==n){var c=a.parents&&a.parents[n.index];var f=a.rangeList.pointIndex(e.start,c);f=f<0?-f-1:f+1;var u=a.rangeList.pointIndex(e.end,c);u=u<0?-u-1:u-1;var l=a.rangeList.ranges.slice(f,u);for(var h=0;h<l.length;h++)this.removeRange(l[h])}a.rangeList.$onChange(e)}var p=this.editor.session;if(!this.$inChange&&t&&p.getLength()==1&&!p.getValue())this.detach()};this.updateLinkedFields=function(){var e=this.selectedTabstop;if(!e||!e.hasLinkedRanges||!e.firstNonLinked)return;this.$inChange=true;var n=this.editor.session;var i=n.getTextRange(e.firstNonLinked);for(var r=0;r<e.length;r++){var s=e[r];if(!s.linked)continue;var a=s.original;var o=t.snippetManager.tmStrFormat(i,a,this.editor);n.replace(s,o)}this.$inChange=false};this.onAfterExec=function(e){if(e.command&&!e.command.readOnly)this.updateLinkedFields()};this.onChangeSelection=function(){if(!this.editor)return;var e=this.editor.selection.lead;var t=this.editor.selection.anchor;var n=this.editor.selection.isEmpty();for(var i=0;i<this.ranges.length;i++){if(this.ranges[i].linked)continue;var r=this.ranges[i].contains(e.row,e.column);var s=n||this.ranges[i].contains(t.row,t.column);if(r&&s)return}this.detach()};this.onChangeSession=function(){this.detach()};this.tabNext=function(e){var t=this.tabstops.length;var n=this.index+(e||1);n=Math.min(Math.max(n,1),t);if(n==t)n=0;this.selectTabstop(n);if(n===0)this.detach()};this.selectTabstop=function(e){this.$openTabstops=null;var t=this.tabstops[this.index];if(t)this.addTabstopMarkers(t);this.index=e;t=this.tabstops[this.index];if(!t||!t.length)return;this.selectedTabstop=t;var n=t.firstNonLinked||t;if(t.choices)n.cursor=n.start;if(!this.editor.inVirtualSelectionMode){var i=this.editor.multiSelect;i.toSingleRange(n);for(var r=0;r<t.length;r++){if(t.hasLinkedRanges&&t[r].linked)continue;i.addRange(t[r].clone(),true)}}else{this.editor.selection.fromOrientedRange(n)}this.editor.keyBinding.addKeyboardHandler(this.keyboardHandler);if(this.selectedTabstop&&this.selectedTabstop.choices)this.editor.execCommand("startAutocomplete",{matches:this.selectedTabstop.choices})};this.addTabstops=function(e,t,n){var i=this.useLink||!this.editor.getOption("enableMultiselect");if(!this.$openTabstops)this.$openTabstops=[];if(!e[0]){var r=o.fromPoints(n,n);v(r.start,t);v(r.end,t);e[0]=[r];e[0].index=0}var s=this.index;var a=[s+1,0];var f=this.ranges;e.forEach(function(e,n){var r=this.$openTabstops[n]||e;for(var s=0;s<e.length;s++){var u=e[s];var l=o.fromPoints(u.start,u.end||u.start);m(l.start,t);m(l.end,t);l.original=u;l.tabstop=r;f.push(l);if(r!=e)r.unshift(l);else r[s]=l;if(u.fmtString||r.firstNonLinked&&i){l.linked=true;r.hasLinkedRanges=true}else if(!r.firstNonLinked)r.firstNonLinked=l}if(!r.firstNonLinked)r.hasLinkedRanges=false;if(r===e){a.push(r);this.$openTabstops[n]=r}this.addTabstopMarkers(r);r.rangeList=r.rangeList||new c;r.rangeList.$bias=0;r.rangeList.addList(r)},this);if(a.length>2){if(this.tabstops.length)a.push(a.splice(2,1)[0]);this.tabstops.splice.apply(this.tabstops,a)}};this.addTabstopMarkers=function(e){var t=this.editor.session;e.forEach(function(e){if(!e.markerId)e.markerId=t.addMarker(e,"ace_snippet-marker","text")})};this.removeTabstopMarkers=function(e){var t=this.editor.session;e.forEach(function(e){t.removeMarker(e.markerId);e.markerId=null})};this.removeRange=function(e){var t=e.tabstop.indexOf(e);if(t!=-1)e.tabstop.splice(t,1);t=this.ranges.indexOf(e);if(t!=-1)this.ranges.splice(t,1);t=e.tabstop.rangeList.ranges.indexOf(e);if(t!=-1)e.tabstop.splice(t,1);this.editor.session.removeMarker(e.markerId);if(!e.tabstop.length){t=this.tabstops.indexOf(e.tabstop);if(t!=-1)this.tabstops.splice(t,1);if(!this.tabstops.length)this.detach()}};this.keyboardHandler=new f;this.keyboardHandler.bindKeys({Tab:function(e){if(t.snippetManager&&t.snippetManager.expandWithTab(e))return;e.tabstopManager.tabNext(1);e.renderer.scrollCursorIntoView()},"Shift-Tab":function(e){e.tabstopManager.tabNext(-1);e.renderer.scrollCursorIntoView()},Esc:function(e){e.tabstopManager.detach()}})}).call(g.prototype);var m=function(e,t){if(e.row==0)e.column+=t.column;e.row+=t.row};var v=function(e,t){if(e.row==t.row)e.column-=t.column;e.row-=t.row};i.importCssString(".ace_snippet-marker {    -moz-box-sizing: border-box;    box-sizing: border-box;    background: rgba(194, 193, 208, 0.09);    border: 1px dotted rgba(211, 208, 235, 0.62);    position: absolute;}","snippets.css",false);t.snippetManager=new d;var b=e("./editor").Editor;(function(){this.insertSnippet=function(e,n){return t.snippetManager.insertSnippet(this,e,n)};this.expandSnippet=function(e){return t.snippetManager.expandWithTab(this,e)}}).call(b.prototype)});ace.define("ace/ext/emmet",[],function(e,t,n){"use strict";var i=e("../keyboard/hash_handler").HashHandler;var r=e("../editor").Editor;var s=e("../snippets").snippetManager;var a=e("../range").Range;var o=e("../config");var c,f;function u(){}u.prototype={setupContext:function(e){this.ace=e;this.indentation=e.session.getTabString();if(!c)c=window.emmet;var t=c.resources||c.require("resources");t.setVariable("indentation",this.indentation);this.$syntax=null;this.$syntax=this.getSyntax()},getSelectionRange:function(){var e=this.ace.getSelectionRange();var t=this.ace.session.doc;return{start:t.positionToIndex(e.start),end:t.positionToIndex(e.end)}},createSelection:function(e,t){var n=this.ace.session.doc;this.ace.selection.setRange({start:n.indexToPosition(e),end:n.indexToPosition(t)})},getCurrentLineRange:function(){var e=this.ace;var t=e.getCursorPosition().row;var n=e.session.getLine(t).length;var i=e.session.doc.positionToIndex({row:t,column:0});return{start:i,end:i+n}},getCaretPos:function(){var e=this.ace.getCursorPosition();return this.ace.session.doc.positionToIndex(e)},setCaretPos:function(e){var t=this.ace.session.doc.indexToPosition(e);this.ace.selection.moveToPosition(t)},getCurrentLine:function(){var e=this.ace.getCursorPosition().row;return this.ace.session.getLine(e)},replaceContent:function(e,t,n,i){if(n==null)n=t==null?this.getContent().length:t;if(t==null)t=0;var r=this.ace;var o=r.session.doc;var c=a.fromPoints(o.indexToPosition(t),o.indexToPosition(n));r.session.remove(c);c.end=c.start;e=this.$updateTabstops(e);s.insertSnippet(r,e)},getContent:function(){return this.ace.getValue()},getSyntax:function(){if(this.$syntax)return this.$syntax;var e=this.ace.session.$modeId.split("/").pop();if(e=="html"||e=="php"){var t=this.ace.getCursorPosition();var n=this.ace.session.getState(t.row);if(typeof n!="string")n=n[0];if(n){n=n.split("-");if(n.length>1)e=n[0];else if(e=="php")e="html"}}return e},getProfileName:function(){var e=c.resources||c.require("resources");switch(this.getSyntax()){case"css":return"css";case"xml":case"xsl":return"xml";case"html":var t=e.getVariable("profile");if(!t)t=this.ace.session.getLines(0,2).join("").search(/<!DOCTYPE[^>]+XHTML/i)!=-1?"xhtml":"html";return t;default:var n=this.ace.session.$mode;return n.emmetConfig&&n.emmetConfig.profile||"xhtml"}},prompt:function(e){return prompt(e)},getSelection:function(){return this.ace.session.getTextRange()},getFilePath:function(){return""},$updateTabstops:function(e){var t=1e3;var n=0;var i=null;var r=c.tabStops||c.require("tabStops");var s=c.resources||c.require("resources");var a=s.getVocabulary("user");var o={tabstop:function(e){var s=parseInt(e.group,10);var a=s===0;if(a)s=++n;else s+=t;var c=e.placeholder;if(c){c=r.processText(c,o)}var f="${"+s+(c?":"+c:"")+"}";if(a){i=[e.start,f]}return f},escape:function(e){if(e=="$")return"\\$";if(e=="\\")return"\\\\";return e}};e=r.processText(e,o);if(a.variables["insert_final_tabstop"]&&!/\$\{0\}$/.test(e)){e+="${0}"}else if(i){var f=c.utils?c.utils.common:c.require("utils");e=f.replaceSubstring(e,"${0}",i[0],i[1])}return e}};var l={expand_abbreviation:{mac:"ctrl+alt+e",win:"alt+e"},match_pair_outward:{mac:"ctrl+d",win:"ctrl+,"},match_pair_inward:{mac:"ctrl+j",win:"ctrl+shift+0"},matching_pair:{mac:"ctrl+alt+j",win:"alt+j"},next_edit_point:"alt+right",prev_edit_point:"alt+left",toggle_comment:{mac:"command+/",win:"ctrl+/"},split_join_tag:{mac:"shift+command+'",win:"shift+ctrl+`"},remove_tag:{mac:"command+'",win:"shift+ctrl+;"},evaluate_math_expression:{mac:"shift+command+y",win:"shift+ctrl+y"},increment_number_by_1:"ctrl+up",decrement_number_by_1:"ctrl+down",increment_number_by_01:"alt+up",decrement_number_by_01:"alt+down",increment_number_by_10:{mac:"alt+command+up",win:"shift+alt+up"},decrement_number_by_10:{mac:"alt+command+down",win:"shift+alt+down"},select_next_item:{mac:"shift+command+.",win:"shift+ctrl+."},select_previous_item:{mac:"shift+command+,",win:"shift+ctrl+,"},reflect_css_value:{mac:"shift+command+r",win:"shift+ctrl+r"},encode_decode_data_url:{mac:"shift+ctrl+d",win:"ctrl+'"},expand_abbreviation_with_tab:"Tab",wrap_with_abbreviation:{mac:"shift+ctrl+a",win:"shift+ctrl+a"}};var h=new u;t.commands=new i;t.runEmmetCommand=function e(n){if(this.action=="expand_abbreviation_with_tab"){if(!n.selection.isEmpty())return false;var i=n.selection.lead;var r=n.session.getTokenAt(i.row,i.column);if(r&&/\btag\b/.test(r.type))return false}try{h.setupContext(n);var s=c.actions||c.require("actions");if(this.action=="wrap_with_abbreviation"){return setTimeout(function(){s.run("wrap_with_abbreviation",h)},0)}var a=s.run(this.action,h)}catch(i){if(!c){var f=t.load(e.bind(this,n));if(this.action=="expand_abbreviation_with_tab")return false;return f}n._signal("changeStatus",typeof i=="string"?i:i.message);o.warn(i);a=false}return a};for(var p in l){t.commands.addCommand({name:"emmet:"+p,action:p,bindKey:l[p],exec:t.runEmmetCommand,multiSelectAction:"forEach"})}t.updateCommands=function(e,n){if(n){e.keyBinding.addKeyboardHandler(t.commands)}else{e.keyBinding.removeKeyboardHandler(t.commands)}};t.isSupportedMode=function(e){if(!e)return false;if(e.emmetConfig)return true;var t=e.$id||e;return/css|less|scss|sass|stylus|html|php|twig|ejs|handlebars/.test(t)};t.isAvailable=function(e,n){if(/(evaluate_math_expression|expand_abbreviation)$/.test(n))return true;var i=e.session.$mode;var r=t.isSupportedMode(i);if(r&&i.$modes){try{h.setupContext(e);if(/js|php/.test(h.getSyntax()))r=false}catch(e){}}return r};var d=function(e,n){var i=n;if(!i)return;var r=t.isSupportedMode(i.session.$mode);if(e.enableEmmet===false)r=false;if(r)t.load();t.updateCommands(i,r)};t.load=function(e){if(typeof f!=="string"){o.warn("script for emmet-core is not loaded");return false}o.loadModule(f,function(){f=null;e&&e()});return true};t.AceEmmetEditor=u;o.defineOptions(r.prototype,"editor",{enableEmmet:{set:function(e){this[e?"on":"removeListener"]("changeMode",d);d({enableEmmet:!!e},this)},value:true}});t.setCore=function(e){if(typeof e=="string")f=e;else c=e}});(function(){ace.require(["ace/ext/emmet"],function(e){if(typeof module=="object"&&typeof exports=="object"&&module){module.exports=e}})})();
//# sourceMappingURL=ext-emmet.js.map
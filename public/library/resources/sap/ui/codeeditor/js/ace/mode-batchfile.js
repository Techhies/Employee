ace.define("ace/mode/batchfile_highlight_rules",[],function(e,t,i){"use strict";var r=e("../lib/oop");var o=e("./text_highlight_rules").TextHighlightRules;var n=function(){this.$rules={start:[{token:"keyword.command.dosbatch",regex:"\\b(?:append|assoc|at|attrib|break|cacls|cd|chcp|chdir|chkdsk|chkntfs|cls|cmd|color|comp|compact|convert|copy|date|del|dir|diskcomp|diskcopy|doskey|echo|endlocal|erase|fc|find|findstr|format|ftype|graftabl|help|keyb|label|md|mkdir|mode|more|move|path|pause|popd|print|prompt|pushd|rd|recover|ren|rename|replace|restore|rmdir|set|setlocal|shift|sort|start|subst|time|title|tree|type|ver|verify|vol|xcopy)\\b",caseInsensitive:true},{token:"keyword.control.statement.dosbatch",regex:"\\b(?:goto|call|exit)\\b",caseInsensitive:true},{token:"keyword.control.conditional.if.dosbatch",regex:"\\bif\\s+not\\s+(?:exist|defined|errorlevel|cmdextversion)\\b",caseInsensitive:true},{token:"keyword.control.conditional.dosbatch",regex:"\\b(?:if|else)\\b",caseInsensitive:true},{token:"keyword.control.repeat.dosbatch",regex:"\\bfor\\b",caseInsensitive:true},{token:"keyword.operator.dosbatch",regex:"\\b(?:EQU|NEQ|LSS|LEQ|GTR|GEQ)\\b"},{token:["doc.comment","comment"],regex:"(?:^|\\b)(rem)($|\\s.*$)",caseInsensitive:true},{token:"comment.line.colons.dosbatch",regex:"::.*$"},{include:"variable"},{token:"punctuation.definition.string.begin.shell",regex:'"',push:[{token:"punctuation.definition.string.end.shell",regex:'"',next:"pop"},{include:"variable"},{defaultToken:"string.quoted.double.dosbatch"}]},{token:"keyword.operator.pipe.dosbatch",regex:"[|]"},{token:"keyword.operator.redirect.shell",regex:"&>|\\d*>&\\d*|\\d*(?:>>|>|<)|\\d*<&|\\d*<>"}],variable:[{token:"constant.numeric",regex:"%%\\w+|%[*\\d]|%\\w+%"},{token:"constant.numeric",regex:"%~\\d+"},{token:["markup.list","constant.other","markup.list"],regex:"(%)(\\w+)(%?)"}]};this.normalizeRules()};n.metaData={name:"Batch File",scopeName:"source.dosbatch",fileTypes:["bat"]};r.inherits(n,o);t.BatchFileHighlightRules=n});ace.define("ace/mode/folding/cstyle",[],function(e,t,i){"use strict";var r=e("../../lib/oop");var o=e("../../range").Range;var n=e("./fold_mode").FoldMode;var a=t.FoldMode=function(e){if(e){this.foldingStartMarker=new RegExp(this.foldingStartMarker.source.replace(/\|[^|]*?$/,"|"+e.start));this.foldingStopMarker=new RegExp(this.foldingStopMarker.source.replace(/\|[^|]*?$/,"|"+e.end))}};r.inherits(a,n);(function(){this.foldingStartMarker=/([\{\[\(])[^\}\]\)]*$|^\s*(\/\*)/;this.foldingStopMarker=/^[^\[\{\(]*([\}\]\)])|^[\s\*]*(\*\/)/;this.singleLineBlockCommentRe=/^\s*(\/\*).*\*\/\s*$/;this.tripleStarBlockCommentRe=/^\s*(\/\*\*\*).*\*\/\s*$/;this.startRegionRe=/^\s*(\/\*|\/\/)#?region\b/;this._getFoldWidgetBase=this.getFoldWidget;this.getFoldWidget=function(e,t,i){var r=e.getLine(i);if(this.singleLineBlockCommentRe.test(r)){if(!this.startRegionRe.test(r)&&!this.tripleStarBlockCommentRe.test(r))return""}var o=this._getFoldWidgetBase(e,t,i);if(!o&&this.startRegionRe.test(r))return"start";return o};this.getFoldWidgetRange=function(e,t,i,r){var o=e.getLine(i);if(this.startRegionRe.test(o))return this.getCommentRegionBlock(e,o,i);var n=o.match(this.foldingStartMarker);if(n){var a=n.index;if(n[1])return this.openingBracketBlock(e,n[1],i,a);var s=e.getCommentFoldRange(i,a+n[0].length,1);if(s&&!s.isMultiLine()){if(r){s=this.getSectionRange(e,i)}else if(t!="all")s=null}return s}if(t==="markbegin")return;var n=o.match(this.foldingStopMarker);if(n){var a=n.index+n[0].length;if(n[1])return this.closingBracketBlock(e,n[1],i,a);return e.getCommentFoldRange(i,a,-1)}};this.getSectionRange=function(e,t){var i=e.getLine(t);var r=i.search(/\S/);var n=t;var a=i.length;t=t+1;var s=t;var l=e.getLength();while(++t<l){i=e.getLine(t);var c=i.search(/\S/);if(c===-1)continue;if(r>c)break;var d=this.getFoldWidgetRange(e,"all",t);if(d){if(d.start.row<=n){break}else if(d.isMultiLine()){t=d.end.row}else if(r==c){break}}s=t}return new o(n,a,s,e.getLine(s).length)};this.getCommentRegionBlock=function(e,t,i){var r=t.search(/\s*$/);var n=e.getLength();var a=i;var s=/^\s*(?:\/\*|\/\/|--)#?(end)?region\b/;var l=1;while(++i<n){t=e.getLine(i);var c=s.exec(t);if(!c)continue;if(c[1])l--;else l++;if(!l)break}var d=i;if(d>a){return new o(a,r,d,t.length)}}}).call(a.prototype)});ace.define("ace/mode/batchfile",[],function(e,t,i){"use strict";var r=e("../lib/oop");var o=e("./text").Mode;var n=e("./batchfile_highlight_rules").BatchFileHighlightRules;var a=e("./folding/cstyle").FoldMode;var s=function(){this.HighlightRules=n;this.foldingRules=new a;this.$behaviour=this.$defaultBehaviour};r.inherits(s,o);(function(){this.lineCommentStart="::";this.blockComment="";this.$id="ace/mode/batchfile"}).call(s.prototype);t.Mode=s});(function(){ace.require(["ace/mode/batchfile"],function(e){if(typeof module=="object"&&typeof exports=="object"&&module){module.exports=e}})})();
//# sourceMappingURL=mode-batchfile.js.map
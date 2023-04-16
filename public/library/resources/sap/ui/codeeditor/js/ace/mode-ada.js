ace.define("ace/mode/ada_highlight_rules",[],function(e,t,n){"use strict";var r=e("../lib/oop");var a=e("./text_highlight_rules").TextHighlightRules;var i=function(){var e="abort|else|new|return|abs|elsif|not|reverse|abstract|end|null|accept|entry|select|"+"access|exception|of|separate|aliased|exit|or|some|all|others|subtype|and|for|out|synchronized|"+"array|function|overriding|at|tagged|generic|package|task|begin|goto|pragma|terminate|"+"body|private|then|if|procedure|type|case|in|protected|constant|interface|until|"+"|is|raise|use|declare|range|delay|limited|record|when|delta|loop|rem|while|digits|renames|with|do|mod|requeue|xor";var t="true|false|null";var n="count|min|max|avg|sum|rank|now|coalesce|main";var r=this.createKeywordMapper({"support.function":n,keyword:e,"constant.language":t},"identifier",true);this.$rules={start:[{token:"comment",regex:"--.*$"},{token:"string",regex:'".*?"'},{token:"string",regex:"'.'"},{token:"constant.numeric",regex:"[+-]?\\d+(?:(?:\\.\\d*)?(?:[eE][+-]?\\d+)?)?\\b"},{token:r,regex:"[a-zA-Z_$][a-zA-Z0-9_$]*\\b"},{token:"keyword.operator",regex:"\\+|\\-|\\/|\\/\\/|%|<@>|@>|<@|&|\\^|~|<|>|<=|=>|==|!=|<>|="},{token:"paren.lparen",regex:"[\\(]"},{token:"paren.rparen",regex:"[\\)]"},{token:"text",regex:"\\s+"}]}};r.inherits(i,a);t.AdaHighlightRules=i});ace.define("ace/mode/ada",[],function(e,t,n){"use strict";var r=e("../lib/oop");var a=e("./text").Mode;var i=e("./ada_highlight_rules").AdaHighlightRules;var o=e("../range").Range;var s=function(){this.HighlightRules=i;this.$behaviour=this.$defaultBehaviour};r.inherits(s,a);(function(){this.lineCommentStart="--";this.getNextLineIndent=function(e,t,n){var r=this.$getIndent(t);var a=this.getTokenizer().getLineTokens(t,e);var i=a.tokens;if(i.length&&i[i.length-1].type=="comment"){return r}if(e=="start"){var o=t.match(/^.*(begin|loop|then|is|do)\s*$/);if(o){r+=n}}return r};this.checkOutdent=function(e,t,n){var r=t+n;if(r.match(/^\s*(begin|end)$/)){return true}return false};this.autoOutdent=function(e,t,n){var r=t.getLine(n);var a=t.getLine(n-1);var i=this.$getIndent(a).length;var s=this.$getIndent(r).length;if(s<=i){return}t.outdentRows(new o(n,0,n+2,0))};this.$id="ace/mode/ada"}).call(s.prototype);t.Mode=s});(function(){ace.require(["ace/mode/ada"],function(e){if(typeof module=="object"&&typeof exports=="object"&&module){module.exports=e}})})();
//# sourceMappingURL=mode-ada.js.map
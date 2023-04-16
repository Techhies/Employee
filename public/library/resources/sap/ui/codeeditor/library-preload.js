//@ui5-bundle sap/ui/codeeditor/library-preload.js
/*!
 * OpenUI5
 * (c) Copyright 2009-2023 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.predefine("sap/ui/codeeditor/library", ["sap/ui/core/Core","sap/ui/core/library"],function(){"use strict";var e=sap.ui.getCore().initLibrary({name:"sap.ui.codeeditor",dependencies:["sap.ui.core"],types:[],interfaces:[],controls:["sap.ui.codeeditor.CodeEditor"],elements:[],noLibraryCSS:false,version:"1.108.6"});return e});
sap.ui.require.preload({
	"sap/ui/codeeditor/CodeEditor.js":function(){
/*!
 * OpenUI5
 * (c) Copyright 2009-2023 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.loader.config({shim:{"sap/ui/codeeditor/js/ace/ace":{exports:"ace"},"sap/ui/codeeditor/js/ace/ext-language_tools":{deps:["sap/ui/codeeditor/js/ace/ace"]},"sap/ui/codeeditor/js/ace/ext-beautify":{deps:["sap/ui/codeeditor/js/ace/ace"]},"sap/ui/codeeditor/js/ace/mode-javascript":{deps:["sap/ui/codeeditor/js/ace/ace"]},"sap/ui/codeeditor/js/ace/mode-json":{deps:["sap/ui/codeeditor/js/ace/ace"]}}});sap.ui.define(["./library","sap/ui/core/Core","sap/ui/core/Control","sap/ui/core/RenderManager","sap/ui/core/ResizeHandler","sap/ui/dom/includeStylesheet","sap/ui/thirdparty/jquery","sap/ui/codeeditor/js/ace/ace","sap/ui/codeeditor/js/ace/ext-language_tools","sap/ui/codeeditor/js/ace/ext-beautify","sap/ui/codeeditor/js/ace/mode-javascript","sap/ui/codeeditor/js/ace/mode-json"],function(e,t,i,o,r,s,jQuery,a){"use strict";var n=i.extend("sap.ui.codeeditor.CodeEditor",{metadata:{library:"sap.ui.codeeditor",properties:{value:{type:"string",group:"Misc",defaultValue:""},type:{type:"string",group:"Appearance",defaultValue:"javascript"},width:{type:"sap.ui.core.CSSSize",group:"Appearance",defaultValue:"100%"},height:{type:"sap.ui.core.CSSSize",group:"Appearance",defaultValue:"100%"},editable:{type:"boolean",group:"Behavior",defaultValue:true},lineNumbers:{type:"boolean",group:"Behavior",defaultValue:true},valueSelection:{type:"boolean",group:"Behavior",defaultValue:false},maxLines:{type:"int",group:"Behavior",defaultValue:0},colorTheme:{type:"string",group:"Behavior",defaultValue:"default"},syntaxHints:{type:"boolean",group:"Behavior",defaultValue:true}},events:{liveChange:{parameters:{value:{type:"string"},editorEvent:{type:"object"}}},change:{parameters:{value:{type:"string"},oldValue:{type:"string"}}}},defaultProperty:"content"},renderer:{apiVersion:2,render:function(e,i){e.openStart("div",i).class("sapCEd").style("width",i.getWidth()).style("height",i.getHeight()).attr("data-sap-ui-syntaxhints",i.getSyntaxHints()).attr("role","application").attr("aria-roledescription",t.getLibraryResourceBundle("sap.ui.codeeditor").getText("CODEEDITOR_ROLE_DESCRIPTION"));var o=i.getTooltip_AsString();if(o){e.attr("title",o)}e.openEnd();e.close("div")}}});var d=sap.ui.require.toUrl("sap/ui/codeeditor/js/ace");a.config.set("basePath",d);a.config.set("loadWorkerFromBlob",false);a.config.set("useStrictCSP",true);var u=a.require("ace/ext/language_tools");n.prototype.init=function(){this._bIsRenderingPhase=false;this._oEditorDomRef=document.createElement("div");this._oEditorDomRef.id=this.getId()+"-editor";this._oEditorDomRef.style.height="100%";this._oEditorDomRef.style.width="100%";this._oEditor=a.edit(this._oEditorDomRef);var e=this._oEditor.getSession();e.setUseWorker(false);e.setValue("");e.setUseWrapMode(true);e.setMode("ace/mode/javascript");s(sap.ui.require.toUrl("sap/ui/codeeditor/js/ace/css/ace.css"),"sap-ui-codeeditor-ace");this._applyTheme();this._oEditor.setOptions({enableBasicAutocompletion:true,enableSnippets:true,enableLiveAutocompletion:true});this._oEditor.renderer.setShowGutter(true);this._oEditor.addEventListener("change",function(e){if(!this.getEditable()){return}var t=this.getCurrentValue();this.fireLiveChange({value:t,editorEvent:e})}.bind(this));this._oEditor.addEventListener("blur",function(){if(this._bIsRenderingPhase){return}var e=this.getCurrentValue(),t=this.getValue();this.setProperty("value",e,true);if(e!=t&&this.getEditable()){this.fireChange({value:e,oldValue:t})}}.bind(this));this._oEditor.addEventListener("showGutterTooltip",function(e){var t=jQuery(e.$element),i=t.parents(".sapMDialog");if(i&&i.css("transform")){var o=i.position();t.css("transform","translate(-"+o.left+"px, -"+o.top+"px)")}})};n.prototype.exit=function(){this._deregisterResizeListener();this._oEditor.destroy();this._oEditor.getSession().setUseWorker(false);jQuery(this._oEditorDomRef).remove();this._oEditorDomRef=null;this._oEditor=null};n.prototype.onThemeChanged=function(){this._applyTheme()};n.prototype._applyTheme=function(){var e=t.getConfiguration().getTheme().toLowerCase();var i="tomorrow";if(e.indexOf("hcb")>-1){i="chaos"}else if(e.indexOf("hcw")>-1){i="github"}else if(e==="sap_fiori_3"){i="crimson_editor"}else if(e==="sap_fiori_3_dark"){i="clouds_midnight"}else if(e==="sap_horizon_dark"){i="nord_dark"}this.setColorTheme(i)};n.prototype.onBeforeRendering=function(){this._bIsRenderingPhase=true;var e=this.getDomRef();if(e&&!o.isPreservedContent(e)){o.preserveContent(e)}this._deregisterResizeListener()};n.prototype.onAfterRendering=function(){this._bIsRenderingPhase=false;var e=this.getDomRef(),t=this.getMetadata().getPropertyDefaults();setTimeout(function(){if(this.getMaxLines()===t.maxLines&&this.getHeight()===t.height&&e.height<20){e.style.height="3rem"}}.bind(this),0);e.appendChild(this._oEditorDomRef);var i=this.getEditable();this._oEditor.setReadOnly(!i);if(i){this._oEditor.renderer.$cursorLayer.element.style.display=""}else{this._oEditor.renderer.$cursorLayer.element.style.display="none"}this._oEditor.getSession().setMode("ace/mode/"+this.getType());this._oEditor.setOption("maxLines",this.getMaxLines());this._oEditor.renderer.setShowGutter(this.getLineNumbers());this._oEditor.getSession().setValue(this.getValue());if(!this.getValueSelection()){this._oEditor.selection.clearSelection()}this._oEditor.renderer.updateText();this._oEditor.resize();this._registerResizeListener()};n.prototype.getIdForLabel=function(){return this.getId()+"-editor-textarea"};n.prototype._registerResizeListener=function(){if(!this._iResizeListenerId){this._iResizeListenerId=r.register(this._oEditorDomRef,function(){this._oEditor.resize()}.bind(this))}};n.prototype._deregisterResizeListener=function(){if(this._iResizeListenerId){r.deregister(this._iResizeListenerId);this._iResizeListenerId=null}};n.prototype.focus=function(){this._oEditor.focus();return this};n.prototype.setColorTheme=function(e){this.setProperty("colorTheme",e,true);if(e==="default"){e="tomorrow"}else if(e==="hcb"){e="tomorrow_night"}else if(e==="hcb_bright"){e="tomorrow_night_bright"}else if(e==="hcb_blue"){e="tomorrow_night_blue"}this._oEditor.setTheme("ace/theme/"+e);s(sap.ui.require.toUrl("sap/ui/codeeditor/js/ace/css/theme/"+e+".css"),"sap-ui-codeeditor-theme-"+e);return this};n.prototype.getCurrentValue=function(){return this._oEditor.getValue()};n.prototype.addCustomCompleter=function(e){u.addCompleter({getCompletions:function(t,i,o,r,s){e.getCompletions(s,{oPos:o,sPrefix:r})}})};n.prototype.getInternalEditorInstance=function(){return this._oEditor};n.prototype.prettyPrint=function(){a.require("ace/ext/beautify").beautify(this._oEditor.session)};n.prototype.onfocusout=function(){this._oEditor.getSession().setUseWorker(false)};n.prototype.onfocusin=function(){this._oEditor.getSession().setUseWorker(true)};return n});
},
	"sap/ui/codeeditor/aceWorkerProxy.js":function(){
/*!
 * OpenUI5
 * (c) Copyright 2009-2023 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
window.addEventListener("load",function(){"use strict";var e=new URL("./js/ace/",document.baseURI).href;var r=new Map;window.addEventListener("message",function(e){var a=e.data.message;var n=e.data.workerId;var i=e.origin;if(a.createWorker){var s=t(a.workerUrl,i,n);if(s){r.set(n,s)}}else if(a.terminateWorker){r.get(n).worker.terminate();r.delete(n)}else if(i===r.get(n).creatorOrigin){r.get(n).worker.postMessage(a)}});function t(r,t,a){if(!r||typeof r!=="string"){return null}var n=new URL(r,document.baseURI).href;if(!n.startsWith(e)){return null}var i=new Worker(n);i.addEventListener("message",function(e){e.data.workerId=a;window.parent.postMessage(e.data,t)});return{creatorOrigin:t,worker:i}}});
},
	"sap/ui/codeeditor/manifest.json":'{"_version":"1.21.0","sap.app":{"id":"sap.ui.codeeditor","type":"library","embeds":[],"applicationVersion":{"version":"1.108.6"},"title":"UI5 library: sap.ui.codeeditor","description":"UI5 library: sap.ui.codeeditor","resources":"resources.json","offline":true,"openSourceComponents":[{"name":"ace","packagedWithMySelf":true,"version":"1.4.13"}]},"sap.ui":{"technology":"UI5","supportedThemes":["base","sap_hcb"]},"sap.ui5":{"dependencies":{"minUI5Version":"1.108","libs":{"sap.ui.core":{"minVersion":"1.108.6"}}},"library":{"i18n":{"bundleUrl":"messagebundle.properties","supportedLocales":["","ar","bg","ca","cs","cy","da","de","el","en","en-GB","en-US-sappsd","en-US-saprigi","en-US-saptrc","es","es-MX","et","fi","fr","fr-CA","hi","hr","hu","id","it","iw","ja","kk","ko","lt","lv","ms","nl","no","pl","pt","pt-PT","ro","ru","sh","sk","sl","sv","th","tr","uk","vi","zh-CN","zh-TW"]},"content":{"controls":["sap.ui.codeeditor.CodeEditor"],"elements":[],"types":[],"interfaces":[]}}}}'
});
//# sourceMappingURL=library-preload.js.map

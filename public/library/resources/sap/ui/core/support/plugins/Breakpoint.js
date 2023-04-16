/*!
 * OpenUI5
 * (c) Copyright 2009-2023 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/Device","sap/ui/core/ElementMetadata","../Plugin","sap/base/util/LoaderExtensions","sap/base/util/ObjectPath"],function(t,e,a,i,n){"use strict";var o=a.extend("sap.ui.core.support.plugins.Breakpoint",{constructor:function(t){a.apply(this,["sapUiSupportBreakpoint","",t]);this._oStub=t;this._methodType={clazz:1,proto:2};this._mBreakpointData={classes:{},instances:{}};this._idPrefix="id_";this._methodPrefix="method_";this._classPrefix="class_";this._bAlertNoDebugger=false;this._aEventIds=[this.getId()+"RequestInstanceMethods",this.getId()+"ChangeInstanceBreakpoint",this.getId()+"RequestClasses",this.getId()+"RequestClassMethods",this.getId()+"ChangeClassBreakpoint",this.getId()+"RemoveAllClassBreakpoints"]}});o.prototype.isToolPlugin=function(){return false};o.prototype.isAppPlugin=function(){return true};o.prototype.init=function(t){a.prototype.init.apply(this,arguments);window.bp=this;this.requestClasses("sapUiSupportDebuggingReceiveClasses")};o.prototype.onsapUiSupportBreakpointRequestInstanceMethods=function(t){var e=t.getParameter("callback"),a=t.getParameter("controlId");var i=this.getInstanceMethods(a);this._oStub.sendEvent(e,{methods:JSON.stringify(i),breakpointCount:JSON.stringify({active:i.filter(function(t,e){return t.active}).length,all:i.length}),controlId:a})};o.prototype.onsapUiSupportBreakpointChangeInstanceBreakpoint=function(t){var e={controlId:t.getParameter("controlId"),methodName:t.getParameter("methodName"),active:t.getParameter("active")},a=t.getParameter("callback");this.changeInstanceBreakpoint(e.controlId,e.methodName,e.active);var i=this.getInstanceMethods(e.controlId);e.breakpointCount=JSON.stringify({active:i.filter(function(t){return t.active}).length,all:i.length});e.methods=JSON.stringify(i);this._oStub.sendEvent(a,e)};o.prototype.requestClasses=function(t){this._oStub.sendEvent(t,{classes:JSON.stringify(this.getClasses())})};o.prototype.onsapUiSupportBreakpointRequestClasses=function(t){this.requestClasses(t.getParameter("callback"))};o.prototype.onsapUiSupportBreakpointRequestClassMethods=function(t){var e=t.getParameter("callback"),a=t.getParameter("className");var i=this.getClassMethods(a);this._oStub.sendEvent(e,{methods:JSON.stringify(i),breakpointCount:JSON.stringify({active:i.filter(function(t,e){return t.active}).length,all:i.length}),className:a})};o.prototype.onsapUiSupportBreakpointChangeClassBreakpoint=function(t){var e={className:t.getParameter("className"),methodName:t.getParameter("methodName"),active:t.getParameter("active"),type:t.getParameter("type")},a=t.getParameter("callback");this.changeClassBreakpoint(e.className,e.methodName,e.active,e.type);var i=this.getClassMethods(e.className);e.breakpointCount=JSON.stringify({active:i.filter(function(t,e){return t.active}).length,all:i.length});e.methods=JSON.stringify(i);this._oStub.sendEvent(a,e)};o.prototype.onsapUiSupportBreakpointRemoveAllClassBreakpoints=function(t){var e=t.getParameter("className");var a=this._mBreakpointData.classes[this._classPrefix+e];for(var i in a){this.changeClassBreakpoint(e,i.replace(this._methodPrefix,""),false)}};o.prototype.getInstanceMethods=function(t){var e=sap.ui.getCore().byId(t),a=[];if(!e){return a}for(var i in e){if(typeof e[i]!=="function"){continue}a.push({name:i,active:this.isInstanceBreakpointActive(e,i)})}return a.sort(function(t,e){if(t.name<e.name){return-1}else if(t.name>e.name){return 1}else{return 0}})};o.prototype.getClassMethods=function(t){var e=n.get(t);var a=[],i;if(!e){return a}for(i in e){if(typeof e[i]!=="function"){continue}a.push({name:i,type:this._methodType.clazz,active:this.isClassBreakpointActive(t,i)})}function o(t){return a.some(function(e){return e.name===t})}for(i in e.prototype){if(typeof e.prototype[i]!=="function"){continue}if(o(i)){continue}a.push({name:i,type:this._methodType.proto,active:this.isClassBreakpointActive(t,i)})}return a.sort(function(t,e){if(t.name<e.name){return-1}else if(t.name>e.name){return 1}else{return 0}})};o.prototype.getClasses=function(){function t(){var t=[];var a=i.getAllRequiredModules();for(var o=0;o<a.length;o++){if(t.indexOf(a[o])>-1){continue}var r=n.get(a[o]);if(typeof r==="undefined"||r===null){continue}if(typeof r.getMetadata==="function"&&r.getMetadata()instanceof e){t.push(r.getMetadata().getName())}}return t}return t().sort()};o.prototype.changeInstanceBreakpoint=function(t,e,a){var i=sap.ui.getCore().byId(t);if(!i||!e||!i[e]){return}if(this.isInstanceBreakpointActive(i,e)===a){return}if(a){this.applyInstanceMethodHook(t,i,e)}else{this.removeInstanceMethodHook(t,i,e)}};o.prototype.changeClassBreakpoint=function(t,e,a,i){var o=n.get(t);if(!o||!e){return}if(this.isClassBreakpointActive(t,e)===a){return}if(a){this.applyClassMethodHook(t,o,e,i)}else{this.removeClassMethodHook(t,o,e)}};o.prototype.getInstanceBreakpointData=function(t,e){if(typeof e==="undefined"){e=false}var a=this._mBreakpointData.instances[this._classPrefix+t.getMetadata().getName()];if(!a){if(e){this._mBreakpointData.instances[this._classPrefix+t.getMetadata().getName()]=a={}}else{return null}}var i=a[this._idPrefix+t.getId()];if(!i){if(e){a[this._idPrefix+t.getId()]=i={}}else{return null}}return i};o.prototype.getClassBreakpointData=function(t,e){if(typeof e==="undefined"){e=false}var a=this._mBreakpointData.classes[this._classPrefix+t];if(!a){if(e){this._mBreakpointData.classes[this._classPrefix+t]=a={}}else{return null}}return a};o.prototype.isInstanceBreakpointActive=function(t,e){var a=this.getInstanceBreakpointData(t);if(!a){return false}var i=a[this._methodPrefix+e];if(!i){return false}return i.active};o.prototype.isClassBreakpointActive=function(t,e){var a=this.getClassBreakpointData(t);if(!a){return false}var i=a[this._methodPrefix+e];if(!i){return false}return i.active};o.prototype.applyInstanceMethodHook=function(t,e,a){var i=this.getInstanceBreakpointData(e,true),n=i[this._methodPrefix+a]||(i[this._methodPrefix+a]={});n.originalMethod=e[a];n.active=true;e[a]=this.methodHook(n.originalMethod)};o.prototype.removeInstanceMethodHook=function(t,e,a){var i=this.getInstanceBreakpointData(e,true),n=i[this._methodPrefix+a];e[a]=n.originalMethod;delete n.originalMethod;n.active=false};o.prototype.applyClassMethodHook=function(t,e,a,i){var n=this.getClassBreakpointData(t,true),o=n[this._methodPrefix+a]||(n[this._methodPrefix+a]={});if(i===this._methodType.clazz){o.originalMethod=e[a];e[a]=this.methodHook(o.originalMethod)}else{o.originalMethod=e.prototype[a];e.prototype[a]=this.methodHook(o.originalMethod)}o.type=i;o.active=true};o.prototype.removeClassMethodHook=function(t,e,a){var i=this.getClassBreakpointData(t,true),n=i[this._methodPrefix+a];if(n.type===this._methodType.clazz){e[a]=n.originalMethod}else{e.prototype[a]=n.originalMethod}delete n.originalMethod;n.active=false};o.prototype.methodHook=function(t){var e=this;return function(){var a=(new Date).getTime();debugger;if((new Date).getTime()-a<50){e._alertNoDebugger()}return t.apply(this,arguments)}};o.prototype._alertNoDebugger=function(){if(this._bAlertNoDebugger){return}var e=null;if(t.browser.chrome){e="Please open your debugger by pressing CTRL + SHIFT + I."}if(e==null){e="Please open your debugger."}this._bAlertNoDebugger=true;alert("There is no debugger attached.\n\n"+e)};return o});
//# sourceMappingURL=Breakpoint.js.map
/*!
* OpenUI5
 * (c) Copyright 2009-2023 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
*/
sap.ui.define(["sap/base/Log","sap/ui/base/ManagedObject","sap/ui/testrecorder/CommunicationBus","sap/ui/core/Configuration"],function(t,e,r,i){"use strict";var n=null;var o=null;var s=null;var a=null;var u=e.extend("sap.ui.testrecorder.Recorder",{constructor:function(){if(!a){e.apply(this,arguments)}else{t.warning("Only one Recorder allowed");return a}}});u.prototype.start=function(t){if(this._hasStarted){return}this._hasStarted=true;this._testRecorderConfig=t||i.getTestRecorderMode();if(this._testRecorderConfig&&!this._testRecorderConfig.indexOf("silent")>-1&&!this._isInIframe()){sap.ui.require(["sap/ui/testrecorder/UIContextInjector","sap/ui/testrecorder/inspector/ControlInspector","sap/ui/testrecorder/interaction/RecordListener"],function(t,e,i){n=t;o=e;s=i;n.injectFrame(this._testRecorderConfig,this._stop.bind(this));r.allowFrame(n.getCommunicationInfo());o.init();s.init()}.bind(this))}};u.prototype._stop=function(){this._hasStarted=false;o.stop();s.stop()};u.prototype._isInIframe=function(){try{if(window.self!==window.top){var t="#sap-ui-test-recorder-frame";if(window.top.$&&window.top.$(t).length&&window.top.$(t)[0].contentWindow===window.self){return true}else{return false}}}catch(t){return true}};a=new u;return a},true);
//# sourceMappingURL=Recorder.js.map
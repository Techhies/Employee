/*!
 * OpenUI5
 * (c) Copyright 2009-2023 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["./BaseController","../models/SharedModel","../models/Documentation","../models/SelectionUtils","../models/PresetsUtils","sap/ui/core/Fragment","sap/ui/core/mvc/XMLView","sap/ui/support/supportRules/CommunicationBus","sap/ui/support/supportRules/WCBChannels","sap/ui/support/supportRules/Constants","sap/ui/support/supportRules/Storage","sap/ui/support/supportRules/util/EvalUtils","sap/ui/VersionInfo","sap/m/library"],function(e,t,s,i,o,n,r,a,p,u,l,d,c,h){"use strict";var g=h.ButtonType;return e.extend("sap.ui.support.supportRules.ui.controllers.Main",{onInit:function(){this.model=t;this.getView().setModel(this.model);this.resizeDown();this.setCommunicationSubscriptions();this.initSettingsPopoverModel();this.hidden=false;this.model.setProperty("/hasNoOpener",window.opener?false:true);this.model.setProperty("/constants",u);this.updateShowButton();this._setContextSettings();this._zoomUI();this.bAdditionalViewLoaded=false;a.subscribe(p.UPDATE_SUPPORT_RULES,function(){if(!this.bAdditionalViewLoaded){this.bAdditionalViewLoaded=true;this.loadAdditionalUI()}},this)},_zoomUI:function(){try{var e=window.localStorage.getItem("support-assistant-zoom-ui");var t="100%";switch(e){case"S":t="90%";break;default:}document.querySelector("html").style.fontSize=t}catch(e){}},loadAdditionalUI:function(){r.create({id:this.getView().getId()+"--issues",viewName:"sap.ui.support.supportRules.ui.views.Issues"}).then(function(e){this.byId("navCon").insertPage(e)}.bind(this))},onAfterRendering:function(){c.load({library:"sap.ui.core"}).then(function(e){a.publish(p.POST_UI_INFORMATION,{version:e,location:new URL(sap.ui.require.toUrl("sap/ui/support"),window.location.origin+window.location.pathname).toString()})});this._checkTempRules()},initSettingsPopoverModel:function(){var e=new URL(sap.ui.require.toUrl("sap/ui/support"),window.location.origin+window.location.pathname).toString(),t=sap.ui.version;this.model.setProperty("/supportAssistantOrigin",e);this.model.setProperty("/supportAssistantVersion",t)},copySupportAssistantOriginToClipboard:function(e){var t=this.model.getProperty("/supportAssistantOrigin"),s=function(e){if(e.clipboardData){e.clipboardData.setData("text/plain",t)}else{e.originalEvent.clipboardData.setData("text/plain",t)}e.preventDefault()};if(window.clipboardData){window.clipboardData.setData("text",t)}else{document.addEventListener("copy",s);document.execCommand("copy");document.removeEventListener("copy",s)}},setCommunicationSubscriptions:function(){var e;a.subscribe(p.CURRENT_LOADING_PROGRESS,function(t){var s=t.value,i=this.byId("progressIndicator");if(t.value<100){this.model.setProperty("/showProgressIndicator",true);clearTimeout(e);e=setTimeout(function(){this.model.setProperty("/showProgressIndicator",false)}.bind(this),2500)}else{setTimeout(function(){this.model.setProperty("/showProgressIndicator",false)}.bind(this),2e3)}i.setDisplayValue(u.RULESET_LOADING+" "+s+"%");this.model.setProperty("/progress",s)},this);a.subscribe(p.ON_ANALYZE_FINISH,function(e){this._clearProcessIndicator();this.ensureOpened();this.model.setProperty("/showProgressIndicator",false);this.model.setProperty("/coreStateChanged",false);this.model.setProperty("/lastAnalysisElapsedTime",e.elapsedTime);this.goToIssues();this.model.setProperty("/analyzedFinish",true)},this);a.subscribe(p.ON_PROGRESS_UPDATE,function(e){var t=e.currentProgress,s=this.byId("progressIndicator");s.setDisplayValue(t+"/"+100);this.model.setProperty("/progress",t)},this);a.subscribe(p.ON_CORE_STATE_CHANGE,function(){this.model.setProperty("/coreStateChanged",true)},this)},resizeUp:function(){a.publish(p.RESIZE_FRAME,{bigger:true})},ensureOpened:function(){a.publish(p.ENSURE_FRAME_OPENED)},resizeDown:function(){a.publish(p.RESIZE_FRAME,{bigger:false})},onSettings:function(e){a.publish(p.ENSURE_FRAME_OPENED);this._openSettingsPopover(e.getSource())},onPersistedSettingSelect:function(){if(this.model.getProperty("/persistingSettings")){l.createPersistenceCookie(u.COOKIE_NAME,true);this.model.getProperty("/libraries").forEach(function(e){if(e.title===u.TEMP_RULESETS_NAME){l.setRules(e.rules)}});this.persistExecutionScope();this.persistVisibleColumns();i.persistSelection();o.persistSelectionPresets();o.persistCustomPresets()}else{l.deletePersistenceCookie(u.COOKIE_NAME);this.deletePersistedData()}},onSettingsPopoverClose:function(){if(this.model.getProperty("/persistingSettings")&&!this.model.getProperty("/tempRulesDisabledWarned")){this.model.setProperty("/tempRulesDisabledWarned",true);l.markTempRulesDisabledWarned()}},goToAnalysis:function(e){this._setActiveView("analysis")},goToIssues:function(e){this._setActiveView("issues")},goToWiki:function(){s.openTopic("57ccd7d7103640e3a187ed55e1d2c163")},updateShowButton:function(){this.byId("sapSTShowButtonBar").setVisible(this.hidden)},toggleHide:function(){this.hidden=!this.hidden;this.updateShowButton();a.publish(p.TOGGLE_FRAME_HIDDEN,this.hidden)},_clearProcessIndicator:function(){var e=this.byId("progressIndicator");e.setDisplayValue("None");this.model.setProperty("/progress",.1)},_setContextSettings:function(){var e=l.readPersistenceCookie(u.COOKIE_NAME);if(e){this.model.setProperty("/persistingSettings",true);var t=l.getSelectedContext();if(t){this.model.setProperty("/analyzeContext",t.analyzeContext);this.model.setProperty("/subtreeExecutionContextId",t.subtreeExecutionContextId)}else{this.model.setProperty("/analyzeContext",this.model.getProperty("/analyzeContext"));this.model.setProperty("/subtreeExecutionContextId","")}}},_setActiveView:function(e){this.byId("issuesBtn").setType(g.Default);this.byId("analysisBtn").setType(g.Default);this.byId(e+"Btn").setType(g.Emphasized);this.byId("navCon").to(this.byId(e),"show");this.ensureOpened()},_checkTempRules:function(){if(!d.isEvalAllowed()&&!this.model.getProperty("/tempRulesDisabledWarned")){this._openSettingsPopover()}},_openSettingsPopover:function(){if(!this._settingsPopover){this._settingsPopover=n.load({name:"sap.ui.support.supportRules.ui.views.StorageSettings",controller:this}).then(function(e){this.getView().addDependent(e);return e}.bind(this))}this._settingsPopover.then(function(e){e.openBy(this.byId("settingsIcon"))}.bind(this))},_isSettingsPopoverOpen:function(){return this._settingsPopover&&this._settingsPopover.isOpen()}})});
//# sourceMappingURL=Main.controller.js.map
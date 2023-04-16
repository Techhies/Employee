/*!
 * OpenUI5
 * (c) Copyright 2009-2023 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/model/json/JSONModel","sap/ui/core/Core","sap/ui/core/Fragment"],function(e,t,n){"use strict";var a=function(a,r){var o=t.getLibraryResourceBundle("sap.ui.webc.main.designtime");return new Promise(function(i){var c={selectedKey:a.getTarget(),titleText:o.getText("LINK_DIALOG_TITLE_CHANGE_TARGET"),cancelBtn:o.getText("LINK_DIALOG_CANCEL_BTN"),okBtn:o.getText("LINK_DIALOG_OK_BTN")};var s=new e;s.setData(c);n.load({name:"sap.m.designtime.LinkTargetSelectDialog",controller:this}).then(function(e){e.setModel(s);e.getBeginButton().attachPress(function(n){var a=t.byId("targetCombo").getValue();i(a);e.close()});e.getEndButton().attachPress(function(t){e.close()});e.attachEventOnce("afterClose",function(t){e.destroy()});e.addStyleClass(r.styleClass);e.open()})}).then(function(e){return[{selectorControl:a,changeSpecificData:{changeType:"changeLinkTarget",content:e}}]})};return{name:{singular:"LINK_NAME",plural:"LINK_NAME_PLURAL"},actions:{remove:{changeType:"hideControl"},reveal:{changeType:"unhideControl"},rename:function(){return{changeType:"rename",domRef:function(e){return e.getDomRef()}}},settings:function(){return{changeLinkTarget:{name:"LINK_CHANGE_TARGET",isEnabled:function(e){return!!e.getHref()},handler:a}}}}}});
//# sourceMappingURL=Link.designtime.js.map
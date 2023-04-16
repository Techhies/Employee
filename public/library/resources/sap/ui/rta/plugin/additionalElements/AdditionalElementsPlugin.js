/*!
 * OpenUI5
 * (c) Copyright 2009-2023 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/base/util/each","sap/base/Log","sap/ui/core/IconPool","sap/ui/dt/OverlayRegistry","sap/ui/dt/OverlayUtil","sap/ui/fl/write/api/FieldExtensibility","sap/ui/rta/plugin/additionalElements/AddElementsDialog","sap/ui/rta/plugin/additionalElements/AdditionalElementsAnalyzer","sap/ui/rta/plugin/Plugin","sap/ui/rta/Utils","sap/ui/rta/plugin/additionalElements/AdditionalElementsUtils","sap/ui/rta/plugin/additionalElements/CommandBuilder","sap/ui/rta/plugin/additionalElements/ActionExtractor"],function(e,t,i,n,a,s,r,l,o,u,h,d,g){"use strict";var f=true;var c=false;function E(e,t){var i=t.responsibleElementOverlay.getParentAggregationOverlay().getAggregationName();return Object.keys(e).some(function(e){return e===i})}function v(e){return s.onControlSelected(e).then(function(){return Promise.all([u.isServiceUpToDate(e),s.isExtensibilityEnabled(e)])}).then(function(t){var i=!!t[1];if(i){return s.getExtensionData(e)}return undefined})}var m=o.extend("sap.ui.rta.plugin.additionalElements.AdditionalElementsPlugin",{constructor:function(e){e.dialog=new r;o.apply(this,arguments)},metadata:{library:"sap.ui.rta",properties:{commandFactory:"object"},aggregations:{dialog:{type:"sap.ui.rta.plugin.additionalElements.AddElementsDialog",multiple:false}},associations:{},events:{}},_getRelevantOverlays:function(e){var t=a.findAllOverlaysInContainer(e,true);e.setRelevantOverlays(t);return t},getContextMenuText:function(e,t,i,n){var a;function s(){a=sap.ui.getCore().getLibraryResourceBundle("sap.ui.rta");return a.getText("CTX_ADD_ELEMENTS",a.getText("MULTIPLE_CONTROL_NAME"))}if(i==="$$OnlyChildCustomField$$"){return s()}if(n){a=sap.ui.getCore().getLibraryResourceBundle("sap.ui.rta");return a.getText("CTX_ADD_ELEMENTS_WITH_SUBMENU")}var r=h.getParents(e,t,this);var l=g.getActionsOrUndef(e,t);if(!i){i=Object.keys(l)[0]}var o=l[i];if(!o){return s()}o.aggregation=i;return h.getText("CTX_ADD_ELEMENTS",o,r.parent,f)},isAvailable:function(e,t){return e.every(function(e){return this._isEditableByPlugin(e,t)},this)},isEnabled:function(e,t,i){if(e.length>1){return false}if(this.getExtensibilityInfo(t)){return true}var n=this.getResponsibleElementOverlay(e[0]);var a;var s=false;if(t){a=n.getParentElementOverlay();if(a){s=true}}else{var r=g.getActionsOrUndef(t,n);var l=r[i];if(l&&(l.reveal&&l.reveal.elements.length>0||l.addViaDelegate)){s=true}}var o=this.getCachedElements(t);var u=!!(o&&o.length>0);s=s&&u;return s},registerElementOverlay:function(e){var t=e.getElement().getModel();if(t){var i=t.getMetaModel();if(i&&i.loaded){i.loaded().then(function(){this.evaluateEditable([e],{onRegistration:true})}.bind(this))}}o.prototype.registerElementOverlay.apply(this,arguments)},_checkIfCreateFunctionIsAvailable:function(e){return!e||e&&e.content&&e.content.createFunction},showAvailableElements:function(e,i,a,s,r,l){var o=a[0];var u=h.getParents(e,o,this);var f=e&&o.getElement();var c;var E=[];return g.getActions(e,o,this).then(function(t){if(i==="$$OnlyChildCustomField$$"){return[]}c=t[i];return this.getAllElements(e,[u.responsibleElementOverlay],r,l)}.bind(this)).then(function(t){E=t;var i=this.getExtensibilityInfo(e);this.getDialog().setCustomFieldEnabled(!!i);if(i){this.getDialog().detachEvent("openCustomField",this._onOpenCustomField,this);this.getDialog().attachEvent("openCustomField",e,this._onOpenCustomField,this);this.getDialog().setCustomFieldButtonVisible(true);return this.getDialog().addExtensionData(i.extensionData)}return this.getDialog().setCustomFieldButtonVisible(false)}.bind(this)).then(function(){var e=E.filter(function(e){return e.aggregation===i})[0];var t=e?e.elements:[];this.getDialog().setElements(t);if(l){var a=sap.ui.getCore().getLibraryResourceBundle("sap.ui.rta");var h=a.getText("HEADER_ADDITIONAL_ELEMENTS_WITH_AGGREGATION",l);this.getDialog().setTitle(h)}else if(i||r){this._setDialogTitle(c||{},u.parent,r)}return this.getDialog().open().then(function(){var e=this.getDialog().getSelectedElements();return d.createCommands(u,f,c,s,e,i,this)}.bind(this)).then(function(){var e=n.getOverlay(f)||o;e.focus()}).catch(function(e){if(e instanceof Error){throw e}})}.bind(this)).catch(function(e){if(e instanceof Error){throw e}else{t.info("Service not up to date, skipping add dialog","sap.ui.rta")}})},_setDialogTitle:function(e,t,i){var n=h.getText("HEADER_ADDITIONAL_ELEMENTS",e,t,c,i);this.getDialog().setTitle(n)},_onOpenCustomField:function(e,t){var i=u.getRtaStyleClassName();return s.onTriggerCreateExtensionData(this.getExtensibilityInfo(t),i)},_isEditable:function(e,i){return Promise.all([this._isEditableCheck(i.sourceElementOverlay,true),this._isEditableCheck(i.sourceElementOverlay,false)]).then(function(e){return{asSibling:e[0],asChild:e[1]}}).catch(function(e){t.error(e)})},_isEditableCheck:function(e,t){return Promise.resolve().then(function(){var i=h.getParents(t,e,this);if(!i.relevantContainerOverlay){return false}return g.getActions(t,e,this,true).then(function(n){this.clearCachedElements();return u.doIfAllControlsAreAvailable([e,i.parentOverlay],function(){var e=false;if(t){e=E(n,i)}else{e=Object.keys(n).some(function(t){if(n[t].addViaDelegate){e=this.checkAggregationsOnSelf(i.parentOverlay,"add",undefined,"delegate")}if(!e&&n[t].reveal){return true}return e}.bind(this))}return e}.bind(this))}.bind(this)).then(function(t){if(t){t=this.hasStableId(e)&&this.hasStableId(i.parentOverlay)}return t}.bind(this))}.bind(this))},getAllElements:function(t,i){var n=i[0];var a=h.getParents(t,n,this);var s;var r=[];var o=false;var u=this.getCachedElements(t);if(u){return u}this.clearExtensibilityInfo(t);return g.getActions(t,n,this).then(function(t){e(t,function(e){s=t[e];s.aggregation=e;if(s.addViaDelegate){o=true}r.push({aggregation:e,elementPromises:[s.reveal?l.enhanceInvisibleElements(a.parent,s):Promise.resolve([]),s.addViaDelegate?l.getUnrepresentedDelegateProperties(a.parent,s.addViaDelegate):Promise.resolve([])]})});if(o){return v(a.parent)}return undefined}).then(function(e){this.setExtensibilityInfo(t,e)}.bind(this)).then(this._combineAnalyzerResults.bind(this,r)).then(function(e){this.setCachedElements(e,t);return e}.bind(this)).catch(function(e){throw e})},getMenuItems:function(e){var t=[];var i;this.clearCachedElements();return Promise.all([this.getAllElements(false,e),this.getAllElements(true,e)]).then(function(n){var a=n[0].length>0;var s=n[0].length>1;var r=n[1].length>0;var l=this.isAvailable(e,false);var o=this.isAvailable(e,true);if(o&&(!l||!a)){i=this._buildMenuItem("CTX_ADD_ELEMENTS_AS_SIBLING",true,e,n,false)}else if(!o&&l&&!s){i=this._buildMenuItem("CTX_ADD_ELEMENTS_AS_CHILD",false,e,n,false)}else if(!o&&l&&s){i=this._buildMenuItem("CTX_ADD_ELEMENTS_AS_CHILD",false,e,n,true)}else if(l&&o&&a&&r){i=this._buildMenuItem("CTX_ADD_ELEMENTS_CHILD_AND_SIBLING",false,e,n,true)}if(i){t.push(this.enhanceItemWithResponsibleElement(i,e,["addViaDelegate","reveal","custom"]))}return t}.bind(this))},_buildMenuItem:function(e,t,i,n,a){var s;var r;var l;var o=i[0];if(t){var u=h.getParents(t,o,this);l=u.responsibleElementOverlay.getParentAggregationOverlay().getAggregationName()}else{var d=n[0].length===0&&n[1].length===0;l=d?"$$OnlyChildCustomField$$":n[0]&&n[0][0]&&n[0][0].aggregation}if(a){s=this._buildSubmenuItems(false,i,n[0]);if(e==="CTX_ADD_ELEMENTS_CHILD_AND_SIBLING"){s=s.concat(this._buildSubmenuItems(true,i,n[1]))}}else{r=function(e,t){return this.showAvailableElements(e,l,t)}.bind(this,t)}var g={id:e,text:this.getContextMenuText.bind(this,t,o,l,a),enabled:a||function(e,t){return this.isEnabled(t,e,l)}.bind(this,t),rank:20,icon:"sap-icon://add",handler:r};if(a){g.submenu=s}return g},_buildSubmenuItems:function(e,t,n){var a=[];var s=e?"CTX_ADD_ELEMENTS_AS_SIBLING":"CTX_ADD_ELEMENTS_AS_CHILD";var r=0;i.registerFont({collectionName:"BusinessSuiteInAppSymbols",fontFamily:"BusinessSuiteInAppSymbols",fontURI:sap.ui.require.toUrl("sap/ushell/themes/base/fonts/"),lazy:true});function l(e,t,i){var n=e?i[0].getParentElementOverlay():i[0];var a=n.getDesignTimeMetadata();var s=a.getAggregationDisplayName(t,n.getElement());return s?s.singular:t}n.forEach(function(i){var n=i.aggregation;var o=l(e,n,t);var u={id:s+"_"+r,text:o,enabled:function(t){return this.isEnabled(t,e,n)}.bind(this),handler:function(e,t){return this.showAvailableElements(e,n,t,undefined,undefined,o)}.bind(this,e),icon:e?"sap-icon://BusinessSuiteInAppSymbols/icon-add-outside":"sap-icon://add"};a.push(this.enhanceItemWithResponsibleElement(u,t,["addViaDelegate","reveal","custom"]));r++}.bind(this));return a},_combineAnalyzerResults:function(e){var t=[];e.forEach(function(e){t.push(Promise.all(e.elementPromises).then(function(t){var i=t[0];var n=t[1];var a=i.concat(n);return{aggregation:e.aggregation,elements:a}}))});return Promise.all(t).then(function(e){return e.filter(function(e){var t=e&&e.elements;return t.length>0})})},clearCachedElements:function(){this._oCachedElements=undefined},setCachedElements:function(e,t){this._oCachedElements=this._oCachedElements||{};this._oCachedElements[t?"asSibling":"asChild"]=e},getCachedElements:function(e){if(this._oCachedElements){return this._oCachedElements[e?"asSibling":"asChild"]}return undefined},clearExtensibilityInfo:function(e){if(this._oExtensibilityInfo){this._oExtensibilityInfo[e?"asSibling":"asChild"]=undefined}},setExtensibilityInfo:function(e,t){this._oExtensibilityInfo=this._oExtensibilityInfo||{};this._oExtensibilityInfo[e?"asSibling":"asChild"]=t},getExtensibilityInfo:function(e){if(this._oExtensibilityInfo){return this._oExtensibilityInfo[e?"asSibling":"asChild"]}return undefined},exit:function(){this.getDialog().destroy();if(o.prototype.exit){o.prototype.exit.apply(this,arguments)}}});return m});
//# sourceMappingURL=AdditionalElementsPlugin.js.map
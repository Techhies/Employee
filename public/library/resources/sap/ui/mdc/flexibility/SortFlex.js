/*!
 * OpenUI5
 * (c) Copyright 2009-2023 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/mdc/p13n/Engine","sap/ui/mdc/flexibility/Util"],function(e,r){"use strict";var t=function(r){var t=r&&r.isA&&r.isA("sap.ui.mdc.Table")&&r.isTableBound();var n=r&&r.isA&&r.isA("sap.ui.mdc.Chart");if(t||n){if(!r._bWaitForBindChanges){r._bWaitForBindChanges=true;e.getInstance().waitForChanges(r).then(function(){if(t){r.rebind()}else if(n){r.rebind()}delete r._bWaitForBindChanges})}}};var n=function(e,r,n,i){if(i){e.resetRevertData()}else{e.setRevertData(n)}t(r)};var i=function(e,t,i,a){return new Promise(function(o,s){var c=a===r.REVERT;var v=i.modifier;var d=c?e.getRevertData():e.getContent();Promise.resolve().then(v.getProperty.bind(v,t,"sortConditions")).then(function(r){var i=r?r.sorters:[];var a={name:d.name,descending:d.descending};i.splice(d.index,0,a);r={sorters:i};v.setProperty(t,"sortConditions",r);n(e,t,a,c);o()}).catch(function(e){s(e)})})};var a=function(e,t,i,a){return new Promise(function(o,s){var c=i.modifier;var v=a===r.REVERT;var d=v?e.getRevertData():e.getContent();Promise.resolve().then(c.getProperty.bind(c,t,"sortConditions")).then(function(r){var i=r?r.sorters:[];if(!i){s()}var a=i.filter(function(e){return e.name===d.name});var f=i.indexOf(a[0]);i.splice(f,1);r={sorters:i};c.setProperty(t,"sortConditions",r);n(e,t,d,v);o()}).catch(function(e){s(e)})})};var o=function(e,t,i,a){return new Promise(function(o,s){var c=a===r.REVERT;var v=i.modifier;var d=c?e.getRevertData():e.getContent();Promise.resolve().then(v.getProperty.bind(v,t,"sortConditions")).then(function(r){var i=r?r.sorters:[];var a=i.filter(function(e){return e.name===d.name});var s=i.indexOf(a[0]);i.splice(d.index,0,i.splice(s,1)[0]);r={sorters:i};v.setProperty(t,"sortConditions",r);n(e,t,d,c);o()}).catch(function(e){s(e)})})};var s={};s.removeSort=r.createChangeHandler({apply:a,revert:i});s.addSort=r.createChangeHandler({apply:i,revert:a});s.moveSort=r.createChangeHandler({apply:o,revert:o});return s});
//# sourceMappingURL=SortFlex.js.map
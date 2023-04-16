/*!
 * OpenUI5
 * (c) Copyright 2009-2023 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/fl/LayerUtils","sap/ui/fl/changeHandler/condenser/Classification","sap/ui/fl/changeHandler/JsControlTreeModifier"],function(e,n,t){"use strict";var r={};r.applyChange=function(n,t,r){var i;var a=r.modifier;return Promise.resolve().then(a.getStashed.bind(a,t)).then(function(e){i=e;return a.findIndexInParentAggregation(t)}).then(function(r){this.setChangeRevertData(n,i,r);if(e.isDeveloperLayer(n.getLayer())){return a.setStashed(t,true)}return a.setVisible(t,false)}.bind(this))};function i(e,n,t,r){var i;if(e!==n.originalIndex){var a=r.getParent(t);return Promise.return().then(r.getParentAggregationName.bind(r,t)).then(function(e){i=e;return r.removeAggregation(a,i,t)}).then(r.insertAggregation.bind(r,a,i,t,n.originalIndex))}return Promise.resolve()}r.revertChange=function(n,t,r){var a=n.getRevertData();var o=r.modifier;return Promise.resolve().then(function(){if(e.isDeveloperLayer(n.getLayer())){var s=o.setStashed(t,a.originalValue,r.appComponent);if(s){return Promise.resolve().then(o.findIndexInParentAggregation.bind(o,s)).then(function(e){return i(e,a,s,o)})}return Promise.resolve()}return o.setVisible(t,!a.originalValue)}).then(function(){n.resetRevertData()})};r.completeChangeContent=function(){};r.setChangeRevertData=function(e,n,t){e.setRevertData({originalValue:n,originalIndex:t})};r.getCondenserInfo=function(e){return{affectedControl:e.getSelector(),classification:n.Reverse,uniqueKey:"stashed"}};r.getChangeVisualizationInfo=function(e,n){var r=e.getSelector();var i=t.bySelector(r,n);return{affectedControls:[r],displayControls:[i.getParent().getId()]}};return r});
//# sourceMappingURL=StashControl.js.map
/*!
 * OpenUI5
 * (c) Copyright 2009-2023 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/base/util/deepExtend","sap/ui/base/EventProvider","sap/ui/model/SelectionModel"],function(e,t,n){"use strict";function i(e,t){if(!e||!t){return false}var n=sap.ui.require(t);return!!(n&&e instanceof n)}var o={isIndexSelected:function(e){return this._isSelectedInModel(e)},setSelectedIndex:function(e){},getSelectedIndices:function(){return[]},setSelectionInterval:function(e,t){this._doChangeSelection("setSelectionInterval",arguments)},addSelectionInterval:function(e,t){this._doChangeSelection("addSelectionInterval",arguments)},removeSelectionInterval:function(e,t){this._doChangeSelection("removeSelectionInterval",arguments)},selectAll:function(){this._doChangeSelection("selectAll",[this._getBinding().getLength()-1])},getSelectedIndex:function(){return this._getSelectionModel().getLeadSelectedIndex()},clearSelection:function(){if(this._ignoreClearSelection){this._initializeSelectionModel();return}this._doChangeSelection("clearSelection",arguments)},_getSelectedIndicesCount:function(){return this._getSelectionModel().getSelectedIndices().length},_initializeSelectionModel:function(){return this._initializeSelectionModel()},updateSelectionFromModel:function(){return this.updateSelectionFromModel()},syncParentNodeSelectionWithChildren:function(e){return this.syncParentNodeSelectionWithChildren(e)}};function l(e,t){return function(){return o[e].apply(t,arguments)}}var r=t.extend("sap.ui.support.supportRules.ui.models.CustomListSelection",{constructor:function(e,n){t.call(this);var r=this;this._keys={};this._key=n;this._control=e;this._UITable=i(this._control,"sap/ui/table/Table");this._tree=i(this._control,"sap/ui/table/TreeTable")||i(this._control,"sap/m/Tree");if(this._UITable){this._aggregation="rows";for(var s in o){this._control[s]=l(s,this)}this._control.__onBindingChange=this._control._onBindingChange;this._control._onBindingChange=function(e){r._ignoreClearSelection=true;this.__onBindingChange.apply(this,arguments);if(e.getParameter("reason")!=="filter"&&e.getParameter("reason")!=="sort"){r._ignoreClearSelection=false}};this.attachEvent("selectionChange",function(e){r._getControl()._onSelectionChanged(e)})}else{this._aggregation="items";this._control.attachSelectionChange(function(t){var n=r._getSelectionModel();var i=t.getParameter("listItems");var o=[];for(var l=0;l<i.length;l++){var s=i[l].getSelected();var c=e.indexOfItem(i[l]);o.push(c);if(s){n.addSelectionInterval(c,c)}else{n.removeSelectionInterval(c,c)}}var t=r.oEventPool.borrowObject("selectionChanged",r,{rowIndices:o});r._updateModelAfterSelectionChange(t);r.oEventPool.returnObject(t);r._initializeSelectionModel()});this._control.attachUpdateFinished(function(){r._getSelectionModel(true)});this._doAfterInitSelectionModel=function(){var e=this._getControl().getItems();for(var t=0;t<e.length;t++){e[t].setSelected(this._isSelectedInModel(t),true)}}}if(this._isTree()){e.attachToggleOpenState(function(){r._getSelectionModel(true)})}},attachRowSelectionChange:function(e){this.attachEvent("selectionChange",e)},getSelectedKeys:function(){var e=[];for(var t in this._keys){if(this._keys[t]){e.push(t)}}return e},_getControl:function(){return this._control},_isUITable:function(){return this._UITable},_isTree:function(){return this._tree},_getBinding:function(){return this._getControl().getBinding(this._aggregation)},_getContextByIndex:function(e){return this._getBinding().getContexts(e,1,undefined,true)[0]},_getSelectionModel:function(e){if(!this.selectionmodel||e){this._initializeSelectionModel()}return this.selectionmodel},_getSelectedIndicesFromModel:function(){var e=this._getBinding();var t=[];if(e){var n=e.getModel();var i=e.getLength();for(var o=0;o<i;o++){var l=this._getContextByIndex(o);if(!l){return t}if(this._checkSelectionForContext(n,l)){t.push(o)}}}return t},_updateModelAfterSelectionChange:function(e){},updateSelectionFromModel:function(){var e=this._getBinding();var t=e.getModel();var n=t.getData();var i=this._getAllIndicesInModel();var o=this;function l(e,i,r){var s=t.getProperty(e+"/nodes");if(o._isTree()&&o._dependent){if(s&&s.length){for(var c=0;c<s.length;c++){var a=e.split("");l(e+"/nodes/"+c+"",t.getData()[a[1]].nodes[c].selected,true)}}else{var a=e.split("/");o.bTempSelected=true;a.pop();a.pop();var d=a.join("/"),h=d.split("/");if(n[h[1]]){o.bTempSelected=n[h[1]].selected}o._setSelectionForContext(t,t.createBindingContext(d),o.bTempSelected)}}o._setSelectionForContext(t,t.createBindingContext(e),i)}for(var r=0;r<i.length;r++){var s=this._getContextByIndex(i[r]),c=s.getPath(),a=c.split("/"),d=true;if(a[2]){if(n[a[1]].nodes[a[3]]){d=n[a[1]].nodes[a[3]].selected}}else{d=n[a[1]].selected}l(c,d)}this._finalizeSelectionUpdate()},_getAllIndicesInModel:function(){var e=this._getBinding();var t=[];if(e){var n=e.getLength();for(var i=0;i<n;i++){t.push(i)}}return t},_isSelectedInModel:function(e){var t=this._getBinding();var n=t?t.getLength():0;if(!t||e>=n){return false}return this._checkSelectionForContext(t.getModel(),this._getContextByIndex(e))},_finalizeSelectionUpdate:function(){this._initializeSelectionModel();this._getSelectionModel();this._fireRowSelectionChange()},_checkSelectionForContext:function(e,t){var n;if(this._key==="$PATH"){n=t.getPath()}else{n=e.getProperty(this._key,t)}return!!this._keys[n]},_setSelectionForContext:function(e,t,n){var i;if(this._key==="$PATH"){i=t.getPath()}else{i=e.getProperty(this._key,t)}if(n){this._keys[i]=true}else{delete this._keys[i]}},_initializeSelectionModel:function(){if(!this.selectionmodel){this.selectionmodel=new n(n.MULTI_SELECTION)}else{this.selectionmodel.clearSelection()}var e=this._getSelectedIndicesFromModel();for(var t=0;t<e.length;t++){this.selectionmodel.addSelectionInterval(e[t],e[t])}if(this._doAfterInitSelectionModel){this._doAfterInitSelectionModel()}},_doUpdateModelAfterSelectionChange:function(e){this._getSelectionModel().detachSelectionChanged(this._doUpdateModelAfterSelectionChange,this);this._updateModelAfterSelectionChange(e)},_doChangeSelection:function(e,t){var n=this._getSelectionModel();n.attachSelectionChanged(this._doUpdateModelAfterSelectionChange,this);n[e].apply(n,t)},_fireRowSelectionChange:function(){this.fireEvent("selectionChange",{selectedKeys:this.getSelectedKeys()})},syncParentNodeSelectionWithChildren:function(t){var n=e({},t.getData());Object.keys(n).forEach(function(e){var t=true;n[e].nodes.forEach(function(i){if(!i.selected){t=false;n[e].selected=false}else if(t){n[e].selected=true}})});t.setData(n)},updateModelAfterChangedSelection:function(e,t,n){var i=t.split("/"),o=i[1];if(i[2]){if(e.getProperty("/"+o+"/nodes")!==0){e.setProperty("/"+o+"/nodes/"+i[3]+"/selected",n)}}else{e.setProperty("/"+o+"/selected",n)}}});return r});
//# sourceMappingURL=CustomListSelection.js.map
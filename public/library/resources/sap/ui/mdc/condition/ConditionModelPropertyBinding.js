/*!
 * OpenUI5
 * (c) Copyright 2009-2023 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/model/ChangeReason","sap/ui/model/json/JSONPropertyBinding","sap/base/util/merge","sap/base/util/deepEqual"],function(t,e,i,a){"use strict";var s=e.extend("sap.ui.mdc.condition.ConditionModelPropertyBinding",{constructor:function(t,i,a,s){e.apply(this,arguments);this.oValue=o.call(this,this._getValue())}});s.prototype.getValue=function(){return o.call(this,this.oValue)};s.prototype.setValue=function(e){if(this.bSuspended){return}if(!a(this.oValue,e)){if(this.oModel.setProperty(this.sPath,e,this.oContext,true)){this.oValue=o.call(this,e);this.getDataState().setValue(this.oValue);this.oModel.firePropertyChange({reason:t.Binding,path:this._sOriginapPath,context:this.oContext,value:e})}}};s.prototype.checkUpdate=function(e){if(this.bSuspended&&!e){return}var i=this._getValue();if(!a(i,this.oValue)||e){this.oValue=o.call(this,i);this.getDataState().setValue(this.oValue);this.checkDataState();this._fireChange({reason:t.Change})}};function o(t){var e;if(!t){e=t}else if(Array.isArray(t)){e=i([],t)}else if(t instanceof Date){e=new Date(t)}else if(typeof t==="object"){e=i({},t)}else{e=t}return e}return s});
//# sourceMappingURL=ConditionModelPropertyBinding.js.map
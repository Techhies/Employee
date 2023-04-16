/*!
 * OpenUI5
 * (c) Copyright 2009-2023 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/core/Control","sap/m/library","sap/ui/core/format/NumberFormat","./CurrencyRenderer"],function(e,t,r,i){"use strict";var n=t.EmptyIndicatorMode;var u=e.extend("sap.ui.unified.Currency",{metadata:{library:"sap.ui.unified",properties:{value:{type:"float",group:"Appearance",defaultValue:0},stringValue:{type:"string",group:"Appearance",defaultValue:null},currency:{type:"string",group:"Appearance",defaultValue:null},maxPrecision:{type:"int",group:"Appearance"},useSymbol:{type:"boolean",group:"Appearance",defaultValue:true},emptyIndicatorMode:{type:"sap.m.EmptyIndicatorMode",group:"Appearance",defaultValue:n.Off}},designtime:"sap/ui/unified/designtime/Currency.designtime",dnd:{draggable:true,droppable:false}},renderer:i});u.FIGURE_SPACE=" ";u.PUNCTUATION_SPACE=" ";u.prototype.init=function(){this._oFormat=r.getCurrencyInstance({showMeasure:false})};u.prototype.exit=function(){this._oFormat=null;this._$Value=null;this._$Currency=null;this._sLastCurrency=null;this._iLastCurrencyDigits=null;this._bRenderNoValClass=null};u.prototype.onAfterRendering=function(){if(this.$()){this._$Value=this.$().find(".sapUiUfdCurrencyValue");this._$Currency=this.$().find(".sapUiUfdCurrencyCurrency")}};u.prototype.setValue=function(e){if(this.isBound("value")){this._bRenderNoValClass=e==null}this.setProperty("value",e,true);this._renderValue();return this};u.prototype.unbindProperty=function(t){e.prototype.unbindProperty.apply(this,arguments);if(t==="value"){this._bRenderNoValClass=false}};u.prototype.setCurrency=function(e){var t,r;this.setProperty("currency",e,true);this._renderCurrency();t=this._oFormat.oLocaleData.getCurrencyDigits(e);if(this._iLastCurrencyDigits!=null&&this._iLastCurrencyDigits!==t){r=true}else if(this._oFormat.oLocaleData.getCurrencyDigits()!==t){r=true}this._iLastCurrencyDigits=t;if(this._sLastCurrency==="*"||e==="*"){r=true}this._sLastCurrency=e;if(r){this._renderValue()}return this};u.prototype.setUseSymbol=function(e){this.setProperty("useSymbol",e,true);this._renderCurrency();return this};u.prototype.setMaxPrecision=function(e){this.setProperty("maxPrecision",e,true);this._renderValue();return this};u.prototype._renderValue=function(){if(this._$Value){this._$Value.text(this.getFormattedValue())}};u.prototype._renderCurrency=function(){if(this._$Currency){this._$Currency.text(this._getCurrency())}};u.prototype._getCurrency=function(){return this.getUseSymbol()?this.getCurrencySymbol():this.getCurrency()};u.prototype.getFormattedValue=function(){var e=this.getCurrency(),t,r,i,n=this.getMaxPrecision(),s=!n&&n!==0;if(e==="*"){return""}r=this._oFormat.oLocaleData.getCurrencyDigits(e);if(s){n=r}n=n<=0&&r>0?n-1:n;t=n-r;i=this._oFormat.format(this.getStringValue()||this.getValue(),e);if(t==n&&n>0){i+=u.PUNCTUATION_SPACE}if(t>0){i=i.padEnd(i.length+t,u.FIGURE_SPACE)}else if(t<0){i=i.substr(0,i.length+t)}return i};u.prototype.getCurrencySymbol=function(){return this._oFormat.oLocaleData.getCurrencySymbol(this.getCurrency())};u.prototype.getAccessibilityInfo=function(){if(this._bRenderNoValClass){return{}}return{description:(this.getFormattedValue()||"")+" "+(this.getCurrency()||"").trim()}};return u});
//# sourceMappingURL=Currency.js.map
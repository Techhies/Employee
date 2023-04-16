/*!
 * OpenUI5
 * (c) Copyright 2009-2023 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/thirdparty/jquery","sap/ui/base/EventProvider","sap/ui/commons/Button","sap/ui/core/Popup","sap/ui/commons/Slider","sap/ui/Device"],function(jQuery,e,t,o,i,r){"use strict";var s=e.extend("sap.ui.ux3.ShellColorPicker",{constructor:function(t){e.apply(this);this.id=t}});s.M_EVENTS={liveChange:"liveChange"};s.prototype.attachLiveChange=function(e,t){this.attachEvent(s.M_EVENTS.liveChange,e,t)};s.prototype.detachLiveChange=function(e,t){this.detachEvent(s.M_EVENTS.liveChange,e,t)};s.prototype.fireLiveChange=function(e){var t={cssColor:s.hslToCss(e)};this.fireEvent(s.M_EVENTS.liveChange,t)};s.prototype.isOpen=function(){return this.oPopup&&this.oPopup.isOpen()};s.prototype.open=function(e,r,s,n,a,h,l){if(this.oPopup&&this.oPopup.isOpen()){return}this.oSlider=new i({width:"225px",liveChange:[this.handleSlider,this]});this.oOkBtn=new t({text:"OK",press:[this.handleOk,this]});this.oCancelBtn=new t({text:"Cancel",press:[this.handleCancel,this]});this.oInitialColor=e;this.oCurrentColor=Object.assign({},this.oInitialColor);this.oSlider.setValue(this.oCurrentColor.l);var u=sap.ui.getCore().createRenderManager();var d=document.createElement("div");var p=sap.ui.getCore().getStaticAreaRef();p.appendChild(d);this.renderHtml(u);u.flush(d);u.destroy;this.oPopup=new o(d.firstChild,false,true,true).attachClosed(this.handleClose,this);this.oPopup.setAutoCloseAreas([d.firstChild]);this.oPopup.open(r,s,n,a,h,l);p.removeChild(d);d=null;jQuery(document.getElementById(this.id)).on("mousedown",jQuery.proxy(this.handleGeneralMouseDown,this));jQuery(document.getElementById(this.id+"-img")).on("mousedown",jQuery.proxy(this.handleMouseDown,this));jQuery(document.getElementById(this.id+"-marker")).on("mousedown",jQuery.proxy(this.handleMouseDown,this));this._imgOffset=jQuery(document.getElementById(this.id+"-img")).offset();this.adaptSliderBar(this.oCurrentColor);this.markColorOnImage(this.oCurrentColor);this.adaptPreview(this.oCurrentColor)};s.parseCssRgbString=function(e){e=e.replace(/rgb\(/,"").replace(/\)/,"").trim();var t=e.split(",");var o={r:parseInt(t[0]),g:parseInt(t[1]),b:parseInt(t[2])};return s.rgbToHsl(o)};s.prototype.renderHtml=function(e){e.write("<div id='"+this.id+"' class='sapUiUx3ShellColorPicker'>");e.write("<img id='"+this.id+"-img' src='"+sap.ui.resource("sap.ui.ux3","img/colors-h.png")+"'>");e.renderControl(this.oSlider);e.write("<div id='"+this.id+"-grad' class='sapUiUx3ShellColorPickerGradient'></div>");e.write("<div id='"+this.id+"-marker' class='sapUiUx3ShellColorPickerMarker'></div>");e.write("<div id='"+this.id+"-preview' class='sapUiUx3ShellColorPickerPreview'></div>");e.renderControl(this.oOkBtn);e.renderControl(this.oCancelBtn);e.write("</div>")};s.prototype.markColorOnImage=function(e){var t=e.h*225;var o=(1-e.s)*75;jQuery(document.getElementById(this.id+"-marker")).css("left",t+10).css("top",o+10)};s.prototype.markColorOnSlider=function(e){this.oSlider.setValue(e.l)};s.prototype.adaptSliderBar=function(e){var t="";var o=Object.assign({},e);o.l=50;var i=s.hslToCss(o);if(r.browser.firefox){t="-moz-linear-gradient(left, black, "+i+", white)"}else if(r.browser.webkit){t="-webkit-gradient(linear, left center, right center, from(#000), color-stop(0.5, "+i+"), to(#FFF))"}jQuery(document.getElementById(this.id+"-grad")).css("background-image",t)};s.prototype.adaptPreview=function(e){jQuery(document.getElementById(this.id+"-preview")).css("background-color",s.hslToCss(e))};s.prototype.handleSlider=function(e){var t=e.getParameter("value");this.oCurrentColor.l=t;this.adaptPreview(this.oCurrentColor);this.fireLiveChange(this.oCurrentColor)};s.prototype.handleGeneralMouseDown=function(e){e.preventDefault()};s.prototype.handleMouseDown=function(e){this.handleMousePos(e);e.preventDefault();jQuery(document).on("mousemove",jQuery.proxy(this.handleMousePos,this)).on("mouseup",jQuery.proxy(this.handleMouseUp,this))};s.prototype.handleMouseUp=function(e){this.handleMousePos(e);jQuery(document).off("mousemove",this.handleMousePos).off("mouseup",this.handleMouseUp)};s.prototype.handleMousePos=function(e){var t=e.pageX-this._imgOffset.left;var o=e.pageY-this._imgOffset.top;t=Math.min(Math.max(t,0),225);o=Math.min(Math.max(o,0),75);var i=t/225;var r=1-o/75;this.oCurrentColor.h=i;this.oCurrentColor.s=r;this.adaptSliderBar(this.oCurrentColor);this.markColorOnImage(this.oCurrentColor);this.adaptPreview(this.oCurrentColor);this.fireLiveChange(this.oCurrentColor)};s.prototype.handleOk=function(){this.fireLiveChange(this.oCurrentColor);this.oPopup.close()};s.prototype.handleCancel=function(){this.fireLiveChange(this.oInitialColor);this.oPopup.close()};s.prototype.handleClose=function(){jQuery(document.getElementById(this.id+"-img")).off("mousedown",this.handleMouseDown);jQuery(document.getElementById(this.id+"-marker")).off("mousedown",this.handleMouseDown);jQuery(document).off("mousemove",this.handleMousePos).off("mouseup",this.handleMouseUp);jQuery(document.getElementById(this.id)).off("mousedown",this.handleGeneralMouseDown);this.oSlider.destroy();this.oSlider=null;this.oOkBtn.destroy();this.oOkBtn=null;this.oCancelBtn.destroy();this.oCancelBtn=null;var e=document.getElementById(this.id);e.parentNode.removeChild(e);this.oPopup.destroy();this.oPopup=null};s.rgbToHsl=function(e){var t=e.r/255,o=e.g/255,i=e.b/255;var r=Math.max(t,o,i);var s=Math.min(t,o,i);var n,a,h=(r+s)/2;if(r==s){n=a=0}else{var l=r-s;a=h>.5?l/(2-r-s):l/(r+s);switch(r){case t:n=(o-i)/l+(o<i?6:0);break;case o:n=(i-t)/l+2;break;case i:n=(t-o)/l+4;break}n/=6}return{h:n,s:a,l:h*100}};s.hslToRgb=function(e){var t,o,i;var r=e.l/100;if(e.s==0){t=o=i=r}else{var n=r<.5?r*(1+e.s):r+e.s-r*e.s;var a=2*r-n;t=s.hueToRgb(a,n,e.h+1/3);o=s.hueToRgb(a,n,e.h);i=s.hueToRgb(a,n,e.h-1/3)}return[t*255,o*255,i*255]};s.hueToRgb=function(e,t,o){if(o<0){o+=1}if(o>1){o-=1}if(o<1/6){return e+(t-e)*6*o}if(o<1/2){return t}if(o<2/3){return e+(t-e)*(2/3-o)*6}return e};s.hslToCss=function(e){var t=s.hslToRgb(e);return"rgb("+Math.round(t[0])+","+Math.round(t[1])+","+Math.round(t[2])+")"};return s});
//# sourceMappingURL=ShellColorPicker.js.map
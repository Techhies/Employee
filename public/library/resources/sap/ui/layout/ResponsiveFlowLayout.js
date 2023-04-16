/*!
 * OpenUI5
 * (c) Copyright 2009-2023 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/core/Configuration","sap/ui/core/Control","sap/ui/core/ResizeHandler","./library","./ResponsiveFlowLayoutData","./ResponsiveFlowLayoutRenderer","sap/ui/thirdparty/jquery","sap/ui/dom/jquery/rect"],function(t,e,i,r,n,o,jQuery){"use strict";var a=e.extend("sap.ui.layout.ResponsiveFlowLayout",{metadata:{library:"sap.ui.layout",properties:{responsive:{type:"boolean",group:"Misc",defaultValue:true}},defaultAggregation:"content",aggregations:{content:{type:"sap.ui.core.Control",multiple:true,singularName:"content"}},associations:{ariaLabelledBy:{type:"sap.ui.core.Control",multiple:true,singularName:"ariaLabelledBy"}}},renderer:o});(function(){a.prototype.init=function(){this._rows=[];this._bIsRegistered=false;this._proxyComputeWidths=l.bind(this);this._iRowCounter=0};a.prototype.exit=function(){delete this._rows;if(this._IntervalCall){clearTimeout(this._IntervalCall);this._IntervalCall=undefined}if(this._resizeHandlerComputeWidthsID){i.deregister(this._resizeHandlerComputeWidthsID)}delete this._resizeHandlerComputeWidthsID;delete this._proxyComputeWidths;if(this.oRm){this.oRm.destroy();delete this.oRm}delete this._$DomRef;delete this._oDomRef;delete this._iRowCounter};var r=function(t){var e=t.getContent();var i=[];var r=-1;var o={},a={};var s="";var h;var l=0,u=0,p=0;var f=false,g=false,c=false;for(var v=0;v<e.length;v++){l=n.MIN_WIDTH;u=n.WEIGHT;f=n.LINEBREAK;g=n.MARGIN;c=n.LINEBREAKABLE;h=d(e[v]);if(h instanceof n){f=h.getLinebreak();l=h.getMinWidth();u=h.getWeight();g=h.getMargin();c=h.getLinebreakable()}if(r<0||f){r++;i.push({height:-1,cont:[]})}p=i[r].cont.length;s=e[v].getId()+"-cont"+r+"_"+p;o={minWidth:l,weight:u,linebreakable:c,padding:g,control:e[v],id:s,breakWith:[]};var m=false;if(!c){for(var C=p;C>0;C--){a=i[r].cont[C-1];if(a.linebreakable){a.breakWith.push(o);m=true;break}}}if(!m){i[r].cont.push(o)}}t._rows=i};var o=function(e,i,r){var n=[];var o=1e7;var a=-1;var s=function(t){var i=jQuery(document.getElementById(e.cont[t].id));if(i.length>0){var r=i[0].offsetLeft;if(o>=r){n.push({cont:[]});a++}o=r;n[a].cont.push(e.cont[t])}};if(t.getRTL()){for(var h=e.cont.length-1;h>=0;h--){s(h)}}else{for(var h=0;h<e.cont.length;h++){s(h)}}return n};var s=function(t,e){var i=[];var r=-1;var n=0;var o=0;var a=0;var s=0,h=0;var l=0,d=0;for(l=0;l<t.cont.length;l++){n=0;o=0;for(d=a;d<=l;d++){o=o+t.cont[d].weight}for(d=a;d<=l;d++){s=e/o*t.cont[d].weight;s=Math.floor(s);h=t.cont[d].minWidth;n+=Math.max(s,h)}if(r==-1||n>e){i.push({cont:[]});if(r!==-1){a=l}r++}i[r].cont.push(t.cont[l])}return i};var h=function(t,e){if(t.length!=e.length){return true}for(var i=0;i<t.length;i++){if(t[i].cont.length!=e[i].cont.length){return true}}return false};a.prototype.renderContent=function(t,e){var i=t,r=0,n=[],o=0,a=0,s=0,h=0,l=0,d=0,u,p=0,f=0,g=[],c=[],v=this.getId(),m="",C=this._getRenderManager();for(o=0;o<i.length;o++){d=0;n.length=0;r=100;c.length=0;c.push("sapUiRFLRow");if(i[o].cont.length<=1){c.push("sapUiRFLCompleteRow")}var _=v+"-row"+this._iRowCounter;var R={};C.writeHeader(_,R,c);l=0;for(a=0;a<i[o].cont.length;a++){l+=i[o].cont[a].weight}for(s=0;s<i[o].cont.length;s++){u=i[o].cont[s];p=0;f=0;if(u.breakWith.length>0){p=u.weight;f=u.minWidth;for(var y=0;y<u.breakWith.length;y++){p+=u.breakWith[y].weight;f+=u.breakWith[y].minWidth}}m=i[o].cont[s].id;c.length=0;R={"min-width":u.breakWith.length>0?f:u.minWidth};d=100/l*u.weight;var w=R["min-width"]/e*100;var W=Math.ceil(w);var b=Math.floor(d);if(b!==100&&W>b){d=W}else{d=b}d=r<d?r:d;r-=d;n.push(d);if(r>0&&s===i[o].cont.length-1){d+=r}c.push("sapUiRFLContainer");R["width"]=d+"%";R["min-width"]=R["min-width"]+"px";C.writeHeader(m,R,c);c.length=0;c.push("sapUiRFLContainerContent");if(u.breakWith.length>0){c.push("sapUiRFLMultiContainerContent")}if(u.padding){c.push("sapUiRFLPaddingClass")}var I=this._addContentClass(u.control,s);if(I){c.push(I)}R={};C.writeHeader("",R,c);if(u.breakWith.length>0){m=i[o].cont[s].id+"-multi0";c.length=0;R={"min-width":f+"px"};var D=100/p*u.weight;D=Math.floor(D);g.push(D);c.push("sapUiRFLMultiContent");R["width"]=D+"%";if(i[o].cont[s].padding){c.push("sapUiRFLPaddingClass")}C.writeHeader(m,R,c);var L=D;C.renderControl(u.control);C.close("div");for(h=0;h<u.breakWith.length;h++){m=u.breakWith[h].id+"-multi"+(h+1);c.length=0;R={"min-width":u.breakWith[h].minWidth+"px"};D=100/p*u.breakWith[h].weight;D=Math.floor(D);g.push(D);L+=D;if(L<100&&h===u.breakWith.length-1){D+=100-L}c.push("sapUiRFLMultiContent");R["width"]=D+"%";if(u.breakWith[h].padding){c.push("sapUiRFLPaddingClass")}C.writeHeader(m,R,c);C.renderControl(u.breakWith[h].control);C.close("div")}}else{C.renderControl(u.control)}C.close("div");C.close("div")}C.close("div");this._iRowCounter++}};var l=function(){this._iRowCounter=0;this._oDomRef=this.getDomRef();if(this._oDomRef){var t=this.getId();var e=jQuery(this._oDomRef).width();var i=false;if(this._rows){for(var r=0;r<this._rows.length;r++){var n=jQuery(document.getElementById(t+"-row"+r));var a=s(this._rows[r],e);var l=o(this._rows[r],n,this);i=h(l,a);var d=this._getElementRect(n);var u=this._rows[r].oRect;if(d&&u){i=i||d.width!==u.width&&d.height!==u.height}if(this._bLayoutDataChanged||i){this._oDomRef.innerHTML="";this._bLayoutDataChanged=false;this.renderContent(a,e)}}if(this._oDomRef.innerHTML===""){this._getRenderManager().flush(this._oDomRef);for(var r=0;r<this._rows.length;r++){var p=this._getElementRect(jQuery(document.getElementById(t+"-row"+r)));this._rows[r].oRect=p}}}}};a.prototype.onBeforeRendering=function(){r(this)};a.prototype.onAfterRendering=function(){this._oDomRef=this.getDomRef();this._$DomRef=jQuery(this._oDomRef);this._proxyComputeWidths();if(this.getResponsive()){if(!this._resizeHandlerComputeWidthsID){this._resizeHandlerComputeWidthsID=i.register(this,a.prototype.rerender.bind(this))}}};a.prototype.onThemeChanged=function(t){if(t.type==="LayoutDataChange"){this._bLayoutDataChanged=true}if(this.getResponsive()&&!this._resizeHandlerComputeWidthsID){this._resizeHandlerComputeWidthsID=i.register(this,a.prototype.rerender.bind(this))}r(this);this._proxyComputeWidths()};a.prototype.setResponsive=function(t){e.prototype.setProperty.call(this,"responsive",t);if(t&&!this._resizeHandlerComputeWidthsID){this._resizeHandlerComputeWidthsID=i.register(this,a.prototype.rerender.bind(this))}else if(this._resizeHandlerComputeWidthsID){if(this._resizeHandlerComputeWidthsID){i.deregister(this._resizeHandlerComputeWidthsID);delete this._resizeHandlerComputeWidthsID}}return this};a.prototype.onLayoutDataChange=a.prototype.onThemeChanged;var d=function(t){var e=t.getLayoutData();if(!e){return undefined}else if(e instanceof n){return e}else if(e.getMetadata().getName()=="sap.ui.core.VariantLayoutData"){var i=e.getMultipleLayoutData();for(var r=0;r<i.length;r++){var o=i[r];if(o instanceof n){return o}}}};a.prototype.addContent=function(t){if(t&&this._IntervalCall){clearTimeout(this._IntervalCall);this._IntervalCall=undefined}this.addAggregation("content",t);return this};a.prototype.insertContent=function(t,e){if(t&&this._IntervalCall){clearTimeout(this._IntervalCall);this._IntervalCall=undefined}this.insertAggregation("content",t,e);return this};a.prototype.removeContent=function(t){if(t&&this._IntervalCall){clearTimeout(this._IntervalCall);this._IntervalCall=undefined}this.removeAggregation("content",t)};a.prototype._getAccessibleRole=function(){return null};a.prototype._addContentClass=function(t,e){return null};a.prototype._getElementRect=function(t){var e=t&&t.rect();if(e){e.height=e.height.toFixed(1);e.width=e.width.toFixed(1)}return e};a.prototype._getRenderManager=function(){if(!this.oRm){this.oRm=sap.ui.getCore().createRenderManager();this.oRm.writeHeader=function(t,e,i){this.openStart("div",t);if(e){for(var r in e){if(r==="width"&&e[r]==="100%"){this.class("sapUiRFLFullLength")}this.style(r,e[r])}}for(var n=0;n<i.length;n++){this.class(i[n])}this.openEnd()}}return this.oRm}})();return a});
//# sourceMappingURL=ResponsiveFlowLayout.js.map
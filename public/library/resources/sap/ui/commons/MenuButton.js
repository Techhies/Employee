/*!
 * OpenUI5
 * (c) Copyright 2009-2023 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["./Button","./Menu","./MenuItemBase","./library","./MenuButtonRenderer","sap/ui/core/Popup","sap/ui/events/checkMouseEnterOrLeave"],function(t,e,i,n,o,s,r){"use strict";var u=s.Dock;var a=t.extend("sap.ui.commons.MenuButton",{metadata:{library:"sap.ui.commons",deprecated:true,properties:{dockButton:{type:"string",group:"Misc",defaultValue:null},dockMenu:{type:"string",group:"Misc",defaultValue:null}},defaultAggregation:"menu",aggregations:{menu:{type:"sap.ui.unified.Menu",multiple:false}},events:{itemSelected:{parameters:{itemId:{type:"string"},item:{type:"sap.ui.unified.MenuItemBase"}}}}}});a.prototype.init=function(){this.addStyleClass("sapUiMenuButton");this.bWithKeyboard=false};a.prototype.onclick=function(t){if(this.getEnabled()&&!this._bSkipOpen){var e=this.getTooltip();if(e&&e instanceof sap.ui.core.TooltipBase){e._closeOrPreventOpen()}var i=this.getDockButton()?this.getDockButton():u.BeginBottom;var n=this.getDockMenu()?this.getDockMenu():u.BeginTop;this.getMenu().open(this.bWithKeyboard,this,n,i,this)}this.bWithKeyboard=false;this._bSkipOpen=false;t.preventDefault();t.stopPropagation()};a.prototype.onmousedown=function(t){this.handleMouseDown(t,false);this._bSkipOpen=this.getMenu()&&this.getMenu().bOpen};a.prototype.onmouseout=function(e){if(t.prototype.onmouseout){t.prototype.onmouseout.apply(this,arguments)}if(this._bSkipOpen&&r(e,this.getDomRef())){this._bSkipOpen=false}};a.prototype.onsapenter=function(t){this.bWithKeyboard=true};a.prototype.onsapspace=function(t){this.bWithKeyboard=true};a.prototype.onsapdownmodifiers=function(t){if(t.altKey){this.bWithKeyboard=true;this.onclick(t)}};a.prototype.clone=function(e,i){p(this);var n=t.prototype.clone.apply(this,arguments);p(this,this.getMenu());return n};a.prototype.setMenu=function(t){p(this,t);this.setAggregation("menu",t);return this};a.prototype.destroyMenu=function(){p(this,null);this.destroyAggregation("menu");return this};var p=function(t,e){var i=t.getMenu();if(i){i.detachItemSelect(t._fItemSelectHandler)}t._fItemSelectHandler=h.bind(t);if(e){e.attachItemSelect(t._fItemSelectHandler)}};var h=function(t){var e=t.getParameter("item");this.fireItemSelected({itemId:e.getId(),item:e});this.firePress({itemId:e.getId(),item:e})};return a});
//# sourceMappingURL=MenuButton.js.map
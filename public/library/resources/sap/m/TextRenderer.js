/*!
 * OpenUI5
 * (c) Copyright 2009-2023 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/core/Renderer","sap/ui/core/library","sap/m/HyphenationSupport","./library","sap/ui/core/Core"],function(e,t,a,s,n){"use strict";var i=t.TextDirection;var r=s.WrappingType;var p=s.EmptyIndicatorMode;var o=n.getLibraryResourceBundle("sap.m");var c={apiVersion:2};c.render=function(t,s){var n=s.getWidth(),p=s.getText(true),o=s.getTextDirection(),c=s.getTooltip_AsString(),l=s.getMaxLines(),d=s.getWrapping(),x=s.getWrappingType(),T=s.getTextAlign(),g=s.getRenderWhitespace();t.openStart("span",s);t.class("sapMText");t.class("sapUiSelectable");if(s.hasMaxLines()){t.class("sapMTextMaxLineWrapper")}if(!d||l==1){t.class("sapMTextNoWrap")}else if(d&&x!==r.Hyphenated){if(p&&p.length>0&&!/\s/.test(p)){t.class("sapMTextBreakWord")}}n?t.style("width",n):t.class("sapMTextMaxWidth");t.attr("dir",o!==i.Inherit?o.toLowerCase():"auto");c&&t.attr("title",c);if(T){T=e.getTextAlign(T,o);if(T){t.style("text-align",T)}}if(g){var M=d?"sapMTextRenderWhitespaceWrap":"sapMTextRenderWhitespace";t.class(M)}a.writeHyphenationClass(t,s);t.accessibilityState(s);t.openEnd();if(s.hasMaxLines()){this.renderMaxLines(t,s)}else{this.renderText(t,s)}t.close("span")};c.renderMaxLines=function(e,t){e.openStart("span",t.getId()+"-inner");e.class("sapMTextMaxLine");if(t.canUseNativeLineClamp()){e.class("sapMTextLineClamp");e.style("-webkit-line-clamp",t.getMaxLines())}e.openEnd();this.renderText(e,t);e.close("span")};c.renderText=function(e,t){var s=a.getTextForRender(t,"main");if(t.getEmptyIndicatorMode()!==p.Off&&!t.getText()){this.renderEmptyIndicator(e,t)}else{e.text(s)}};c.renderEmptyIndicator=function(e,t){e.openStart("span");e.class("sapMEmptyIndicator");if(t.getEmptyIndicatorMode()===p.Auto){e.class("sapMEmptyIndicatorAuto")}e.openEnd();e.openStart("span");e.attr("aria-hidden",true);e.openEnd();e.text(o.getText("EMPTY_INDICATOR"));e.close("span");e.openStart("span");e.class("sapUiPseudoInvisibleText");e.openEnd();e.text(o.getText("EMPTY_INDICATOR_TEXT"));e.close("span");e.close("span")};return c},true);
//# sourceMappingURL=TextRenderer.js.map
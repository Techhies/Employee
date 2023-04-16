/*!
 * OpenUI5
 * (c) Copyright 2009-2023 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/core/Core"],function(e){"use strict";var t={apiVersion:2};var n=e.getLibraryResourceBundle("sap.tnt");t.render=function(e,t){this.startSideNavigation(e,t);this.renderArrowUp(e,t);this.renderItem(e,t);this.renderArrowDown(e,t);this.renderFixedItem(e,t);this.renderFooter(e,t);this.endSideNavigation(e,t)};t.startSideNavigation=function(e,t){var r=t.getAggregation("item");var i=t.getAggregation("fixedItem");var a=t.getExpanded();var o=t.getAriaLabel();e.openStart("div",t);e.attr("role","navigation");e.attr("aria-roledescription",n.getText("SIDENAVIGATION_ROLE_DESCRIPTION"));if(o){e.accessibilityState(t,{label:o})}e.class("sapTntSideNavigation");e.class("sapContrast");e.class("sapContrastPlus");if(!a){e.class("sapTntSideNavigationNotExpanded");e.class("sapTntSideNavigationNotExpandedWidth")}if(!a&&r){r.setExpanded(false)}if(!a&&i){i.setExpanded(false)}e.openEnd()};t.endSideNavigation=function(e,t){e.close("div")};t.renderArrowUp=function(e,t){e.renderControl(t._getTopArrowControl())};t.renderArrowDown=function(e,t){e.renderControl(t._getBottomArrowControl())};t.renderItem=function(e,t){var n=t.getAggregation("item");e.openStart("div",t.getId()+"-Flexible");e.attr("tabindex","-1");e.class("sapTntSideNavigationFlexible");e.class("sapTntSideNavigationVerticalScrolling");e.openEnd();e.openStart("div",t.getId()+"-Flexible-Content");e.class("sapTntSideNavigationFlexibleContent");e.openEnd();e.renderControl(n);e.close("div");e.close("div")};t.renderFixedItem=function(e,t){var r=t.getAggregation("fixedItem");if(r===null){return}if(r.getExpanded()===false){r.setExpanded(false)}e.openStart("div");e.attr("role","separator");e.attr("aria-roledescription",n.getText("SIDENAVIGATION_ROLE_DESCRIPTION_SEPARATOR"));e.attr("aria-orientation","horizontal");e.class("sapTntSideNavigationSeparator");e.openEnd();e.close("div");e.openStart("div");e.class("sapTntSideNavigationFixed");e.openEnd();e.renderControl(r);e.close("div")};t.renderFooter=function(e,t){if(t.getAggregation("footer")){e.openStart("footer");e.class("sapTntSideNavigationFooter");e.openEnd();e.renderControl(t.getAggregation("footer"));e.close("footer")}};return t},true);
//# sourceMappingURL=SideNavigationRenderer.js.map
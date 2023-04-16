/*!
 * OpenUI5
 * (c) Copyright 2009-2023 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/unified/calendar/CalendarDate","sap/ui/unified/calendar/CalendarUtils","sap/ui/core/date/UniversalDate","sap/ui/core/format/DateFormat","sap/ui/core/InvisibleText"],function(e,t,a,r,i){"use strict";var l={apiVersion:2};l.render=function(e,t){var a=t.getTooltip_AsString();e.openStart("div",t);e.class("sapUiCalYearPicker");if(t._getSecondaryCalendarType()){e.class("sapUiCalMonthSecType")}if(a){e.attr("title",a)}e.accessibilityState(t,this.getAccessibilityState(t));e.openEnd();this.renderCells(e,t);e.close("div")};l.getAccessibilityState=function(e){return{role:"grid",readonly:"true",multiselectable:e.getIntervalSelection(),roledescription:sap.ui.getCore().getLibraryResourceBundle("sap.ui.unified").getText("YEAR_PICKER"),describedby:e._bCalendar?i.getStaticId("sap.ui.unified","CALENDAR_YEAR_RANGE_PICKER_OPEN_HINT"):""}};l.renderCells=function(i,l){var s=l.getProperty("_middleDate")?l.getProperty("_middleDate"):l._getDate(),n=new e(s,l.getPrimaryCalendarType()),d=t._minDate(l.getProperty("primaryCalendarType")).getYear(),o=t._maxDate(l.getProperty("primaryCalendarType")).getYear(),c=l.getYears(),p=l.getId(),y=l.getColumns(),u=l._getSecondaryCalendarType(),g="",f=false,C=l._getLocaleData(),S,m,_,D,T,b;n.setYear(n.getYear()-Math.floor(c/2));if(n.getYear()<d){n.setYear(d)}else if(n.getYear()+c>o){n.setYear(o-c+1)}if(y>0){g=100/y+"%"}else{g=100/c+"%"}for(b=0;b<c;b++){T=l._oFormatYyyymmdd.format(n.toUTCJSDate(),true);D={role:"gridcell"};f=l._checkDateEnabled(n);if(y>0&&b%y==0){i.openStart("div");i.accessibilityState(null,{role:"row"});i.openEnd()}i.openStart("div",p+"-y"+T);i.class("sapUiCalItem");m=l._fnShouldApplySelection(n);_=l._fnShouldApplySelectionBetween(n);if(m){i.class("sapUiCalItemSel");D["selected"]=true}if(_){i.class("sapUiCalItemSelBetween");D["selected"]=true}if(!m&&!_){D["selected"]=false}if(!f){i.class("sapUiCalItemDsbl");D["disabled"]=true}S=l._oYearFormat.format(a.getInstance(n.toUTCJSDate(),n.getCalendarType()),true);D["label"]=S;if(u){var Y=l._getDisplayedSecondaryDates(n),v=r.getDateInstance({format:"y",calendarType:l.getSecondaryCalendarType()}),I,U;if(Y.start.getYear()===Y.end.getYear()){I=v.format(Y.start.toUTCJSDate(),true)}else{U=C.getIntervalPattern();I=U.replace(/\{0\}/,v.format(Y.start.toUTCJSDate()),true).replace(/\{1\}/,v.format(Y.end.toUTCJSDate(),true))}D["label"]=D["label"]+" "+I}i.attr("tabindex","-1");i.attr("data-sap-year-start",T);i.style("width",g);i.accessibilityState(null,D);i.openEnd();i.text(S);if(u){i.openStart("div",p+"-y"+T+"-secondary");i.class("sapUiCalItemSecText");i.openEnd();i.text(I);i.close("div")}i.close("div");n.setYear(n.getYear()+1);if(y>0&&(b+1)%y==0){i.close("div")}}};return l},true);
//# sourceMappingURL=YearPickerRenderer.js.map
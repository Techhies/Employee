/*!
 * OpenUI5
 * (c) Copyright 2009-2023 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/core/Control","sap/ui/Device","sap/ui/core/LocaleData","sap/ui/unified/calendar/CalendarUtils","sap/ui/core/format/TimezoneUtil","sap/ui/core/Core","sap/ui/core/date/UniversalDate","./library","sap/ui/core/InvisibleText","sap/ui/core/format/DateFormat","sap/ui/core/ResizeHandler","sap/ui/core/Locale","./CalendarRowRenderer","sap/ui/dom/containsOrEquals","sap/ui/thirdparty/jquery","sap/ui/unified/CalendarAppointment","sap/ui/core/InvisibleMessage","sap/ui/core/library","sap/ui/core/Configuration"],function(e,t,i,a,n,s,r,o,p,l,u,g,h,d,jQuery,c,f,m,v){"use strict";var T=o.CalendarDayType;var C=o.CalendarAppointmentVisualization;var A=o.GroupAppointmentsMode;var _=o.CalendarIntervalType;var U=o.CalendarAppointmentHeight;var y=o.CalendarAppointmentRoundWidth;var D=m.InvisibleMessageMode;var b=e.extend("sap.ui.unified.CalendarRow",{metadata:{library:"sap.ui.unified",properties:{startDate:{type:"object",group:"Data"},intervals:{type:"int",group:"Appearance",defaultValue:12},intervalSize:{type:"int",group:"Appearance",defaultValue:1},intervalType:{type:"sap.ui.unified.CalendarIntervalType",group:"Appearance",defaultValue:_.Hour},showSubIntervals:{type:"boolean",group:"Appearance",defaultValue:false},showIntervalHeaders:{type:"boolean",group:"Appearance",defaultValue:true},showEmptyIntervalHeaders:{type:"boolean",group:"Appearance",defaultValue:true},nonWorkingDays:{type:"int[]",group:"Misc",defaultValue:null},nonWorkingHours:{type:"int[]",group:"Misc",defaultValue:null},width:{type:"sap.ui.core.CSSSize",group:"Dimension",defaultValue:null},height:{type:"sap.ui.core.CSSSize",group:"Dimension",defaultValue:null},checkResize:{type:"boolean",group:"Behavior",defaultValue:true},updateCurrentTime:{type:"boolean",group:"Behavior",defaultValue:true},groupAppointmentsMode:{type:"sap.ui.unified.GroupAppointmentsMode",group:"Appearance",defaultValue:A.Collapsed},appointmentsReducedHeight:{type:"boolean",group:"Appearance",defaultValue:false,deprecated:true},appointmentsVisualization:{type:"sap.ui.unified.CalendarAppointmentVisualization",group:"Appearance",defaultValue:C.Standard},appointmentHeight:{type:"sap.ui.unified.CalendarAppointmentHeight",group:"Appearance",defaultValue:U.Regular},appointmentRoundWidth:{type:"sap.ui.unified.CalendarAppointmentRoundWidth",group:"Appearance",defaultValue:y.None},multipleAppointmentsSelection:{type:"boolean",group:"Data",defaultValue:false}},aggregations:{appointments:{type:"sap.ui.unified.CalendarAppointment",multiple:true,singularName:"appointment"},intervalHeaders:{type:"sap.ui.unified.CalendarAppointment",multiple:true,singularName:"intervalHeader"},groupAppointments:{type:"sap.ui.unified.CalendarAppointment",multiple:true,singularName:"groupAppointment",visibility:"hidden"}},associations:{ariaLabelledBy:{type:"sap.ui.core.Control",multiple:true,singularName:"ariaLabelledBy"},legend:{type:"sap.ui.unified.CalendarLegend",multiple:false}},events:{select:{parameters:{appointment:{type:"sap.ui.unified.CalendarAppointment"},appointments:{type:"sap.ui.unified.CalendarAppointment[]"},multiSelect:{type:"boolean"},domRefId:{type:"string"}}},startDateChange:{},leaveRow:{parameters:{type:{type:"string"}}},intervalSelect:{parameters:{startDate:{type:"object"},endDate:{type:"object"},subInterval:{type:"boolean"}}}}},renderer:h});b.prototype.init=function(){this._bRTL=v.getRTL();this._oRb=sap.ui.getCore().getLibraryResourceBundle("sap.ui.unified");this._oFormatAria=l.getDateTimeInstance({pattern:"EEEE dd/MM/YYYY 'at' "+I.call(this).getTimePattern("medium")});this._aVisibleAppointments=[];this._aVisibleIntervalHeaders=[];this.setStartDate(new Date);this._resizeProxy=jQuery.proxy(this.handleResize,this);this.aSelectedAppointments=[];this._fnCustomSortedAppointments=undefined};b.prototype.exit=function(){if(this._sResizeListener){u.deregister(this._sResizeListener);this._sResizeListener=undefined}if(this._sUpdateCurrentTime){clearTimeout(this._sUpdateCurrentTime);this._sUpdateCurrentTime=undefined}this._fnCustomSortedAppointments=undefined};b.prototype.onBeforeRendering=function(){this._aVisibleAppointments=[];w.call(this);k.call(this);W.call(this);if(this._sUpdateCurrentTime){clearTimeout(this._sUpdateCurrentTime);this._sUpdateCurrentTime=undefined}if(!this.getAppointments().length){this.aSelectedAppointments=[]}else{this.getAppointments().forEach(function(e){this._updateSelectedAppointmentsArray(e)}.bind(this))}this._oInvisibleMessage=f.getInstance()};b.prototype.onAfterRendering=function(){F.call(this);this.updateCurrentTimeVisualization();if(this.getCheckResize()&&!this._sResizeListener){this._sResizeListener=u.register(this,this._resizeProxy)}};b.prototype.onThemeChanged=function(e){if(this.getDomRef()){for(var t=0;t<this._aVisibleAppointments.length;t++){var i=this._aVisibleAppointments[t];i.level=-1}this.handleResize(e)}};b.prototype.invalidate=function(t){if(t&&t instanceof c){var i=false;for(var a=0;a<this._aVisibleAppointments.length;a++){if(this._aVisibleAppointments[a].appointment==t){i=true;break}}if(i){this._aVisibleAppointments=[]}this._updateSelectedAppointmentsArray(t)}e.prototype.invalidate.apply(this,arguments)};b.prototype.setStartDate=function(e){if(!e){e=new Date}a._checkJSDateObject(e);var t=e.getFullYear();a._checkYearInValidRange(t);this._oUTCStartDate=a._createUniversalUTCDate(e,undefined,true);this.setProperty("startDate",e);return this};b.prototype._getStartDate=function(){if(!this._oUTCStartDate){this._oUTCStartDate=a._createUniversalUTCDate(this.getStartDate(),undefined,true)}return this._oUTCStartDate};b.prototype.setIntervalType=function(e){this.setProperty("intervalType",e);this._aVisibleAppointments=[];return this};b.prototype._getAppointmentReducedHeight=function(e){var i=!t.system.phone&&this.getAppointmentsReducedHeight()&&e.size===U.Regular;return i};b.prototype.onfocusin=function(e){if(jQuery(e.target).hasClass("sapUiCalendarApp")){$.call(this,e.target.id)}else{var t=this._getVisibleAppointments();var i=false;var a;for(var n=0;n<t.length;n++){a=t[n].appointment;if(d(a.getDomRef(),e.target)){i=true;a.focus();break}}if(!i){a=this.getFocusedAppointment();if(a){a.focus()}}}};b.prototype.applyFocusInfo=function(e){if(this._sFocusedAppointmentId){this.getFocusedAppointment().focus()}return this};b.prototype.onsapleft=function(e){if(jQuery(e.target).hasClass("sapUiCalendarApp")){N.call(this,this._bRTL,1)}e.preventDefault();e.stopPropagation()};b.prototype.onsapright=function(e){if(jQuery(e.target).hasClass("sapUiCalendarApp")){N.call(this,!this._bRTL,1)}e.preventDefault();e.stopPropagation()};b.prototype.onsapup=function(e){this.fireLeaveRow({type:e.type})};b.prototype.onsapdown=function(e){this.fireLeaveRow({type:e.type})};b.prototype.onsaphome=function(e){x.call(this,e);e.preventDefault();e.stopPropagation()};b.prototype.onsapend=function(e){x.call(this,e);e.preventDefault();e.stopPropagation()};b.prototype.onsapselect=function(e){var t=this._getVisibleAppointments(),i;for(var a=0;a<t.length;a++){var n=t[a].appointment;if(d(n.getDomRef(),e.target)){var s=!(this.getMultipleAppointmentsSelection()||e.ctrlKey||e.metaKey);L.call(this,n,s);i=n.getSelected()?"APPOINTMENT_SELECTED":"APPOINTMENT_UNSELECTED";break}}this._oInvisibleMessage.announce(this._oRb.getText(i),D.Polite);e.stopPropagation();e.preventDefault()};b.prototype.ontap=function(e){var t=this.$("Apps").children(".sapUiCalendarRowAppsInt");var i=0;var a=false;for(i=0;i<t.length;i++){var n=t[i];if(!this._isOneMonthsRowOnSmallSizes()&&d(n,e.target)){a=true;break}}if(a){B.call(this,i,e.target)}else{this.onsapselect(e)}};b.prototype.onsapselectmodifiers=function(e){this.onsapselect(e)};b.prototype.handleResize=function(e){if(e&&e.size&&e.size.width<=0){return this}var t=this.$("DummyApp");t.css("display","");F.call(this);return this};b.prototype.updateCurrentTimeVisualization=function(){var e=this.$("Now");var t=a._createUniversalUTCDate(new Date,undefined,true);var i=this.getIntervals();var n=this.getIntervalType();var s=this._getStartDate();var r=s.getTime();var o=this._oUTCEndDate;var p=o.getTime();this._sUpdateCurrentTime=undefined;t=this._convertToTimezone(t);if(t.getTime()<=p&&t.getTime()>=r){var l=E.call(this,n,i,s,o,r,t);var u=0;if(this._bRTL){e.css("right",l+"%")}else{e.css("left",l+"%")}e.css("display","");if(this.getUpdateCurrentTime()){switch(n){case _.Hour:u=6e4;break;case _.Day:case _.Week:case _.OneMonth:case"OneMonth":u=18e5;break;default:u=-1;break}if(u>0){this._sUpdateCurrentTime=setTimeout(this.updateCurrentTimeVisualization.bind(this),u)}}}else{e.css("display","none")}return this};b.prototype._convertToTimezone=function(e){var t=s.getConfiguration().getTimezone();var i=a._createUniversalUTCDate(e,undefined,true);i=new Date(e.getUTCFullYear(),e.getUTCMonth(),e.getUTCDate(),e.getUTCHours(),e.getUTCMinutes(),e.getUTCSeconds());i.setUTCFullYear(e.getUTCFullYear());i=n.convertToTimezone(i,t);return i};b.prototype.getFocusedAppointment=function(){var e=this._getAppointmentsSorted();var t=this.getAggregation("groupAppointments",[]);var i;var a=0;for(a=0;a<t.length;a++){if(t[a].getId()==this._sFocusedAppointmentId){i=t[a];break}}if(!i){for(a=0;a<e.length;a++){if(e[a].getId()==this._sFocusedAppointmentId){i=e[a];break}}}return i};b.prototype.focusAppointment=function(e){if(!e||!(e instanceof c)){throw new Error("Appointment must be a CalendarAppointment; "+this)}var t=e.getId();if(this._sFocusedAppointmentId!=t){$.call(this,t)}else{e.focus()}return this};b.prototype.focusNearestAppointment=function(e){a._checkJSDateObject(e);var t=this._getAppointmentsSorted();var i;var n;var s;for(var r=0;r<t.length;r++){i=t[r];if(i._getStartDateWithTimezoneAdaptation()>e){if(r>0){n=t[r-1]}else{n=i}break}}if(i){if(n&&Math.abs(i._getStartDateWithTimezoneAdaptation()-e)>=Math.abs(n._getStartDateWithTimezoneAdaptation()-e)){s=n}else{s=i}this.focusAppointment(s)}return this};b.prototype._getVisibleAppointments=function(){return this._aVisibleAppointments};b.prototype._getVisibleIntervalHeaders=function(){return this._aVisibleIntervalHeaders};b.prototype._getNonWorkingDays=function(){if(this.getIntervalSize()!==1){return[]}var e=this.getNonWorkingDays();if(!e){var t=I.call(this);var i=t.getWeekendStart();var a=t.getWeekendEnd();e=[];for(var n=0;n<=6;n++){if(i<=a&&n>=i&&n<=a||i>a&&(n>=i||n<=a)){e.push(n)}}}else if(!Array.isArray(e)){e=[]}return e};b.prototype._isOneMonthsRowOnSmallSizes=function(){return(this.getIntervalType()===_.OneMonth||this.getIntervalType()==="OneMonth")&&this.getIntervals()===1};b.prototype._getAppointmentsSorted=function(){var e=this.getAppointments(),t=j;e.sort(this._fnCustomSortedAppointments?this._fnCustomSortedAppointments:t);return e};b.prototype._setCustomAppointmentsSorterCallback=function(e){this._fnCustomSortedAppointments=e;this.invalidate()};b.prototype._calculateAppoitnmentVisualCue=function(e){if(S(this,e)){return{appTimeUnitsDifRowStart:0,appTimeUnitsDifRowEnd:0}}var t=e._getStartDateWithTimezoneAdaptation(),i=e._getEndDateWithTimezoneAdaptation(),a=new r(t.getFullYear(),t.getMonth(),t.getDate(),t.getHours(),t.getMinutes()),n=new r(i.getFullYear(),i.getMonth(),i.getDate(),i.getHours(),i.getMinutes()),s=this.getIntervalType(),o=this.getStartDate(),p=s==="Hour"?new r(o.getFullYear(),o.getMonth(),o.getDate(),o.getHours()):new r(o.getFullYear(),o.getMonth(),o.getDate()),l=this.getIntervals(),u;switch(s){case"Hour":u=new r(o.getFullYear(),o.getMonth(),o.getDate(),o.getHours()+l);break;case"Day":case"Week":case"One Month":u=new r(o.getFullYear(),o.getMonth(),o.getDate()+l);break;case"Month":u=new r(o.getFullYear(),o.getMonth()+l,o.getDate());break;default:break}return{appTimeUnitsDifRowStart:p.getTime()-a.getTime(),appTimeUnitsDifRowEnd:n.getTime()-u.getTime()}};b.prototype._updateSelectedAppointmentsArray=function(e){if(e.getSelected()){if(this.aSelectedAppointments.indexOf(e.getId())===-1){this.aSelectedAppointments.push(e.getId())}}else{this.aSelectedAppointments=this.aSelectedAppointments.filter(function(t){return t!==e.getId()})}};function S(e,t){var i=e.getAggregation("groupAppointments",[]);var a;for(a=0;a<i.length;++a){if(t===i[a]){return true}}return false}function M(){if(!this._sLocale){this._sLocale=v.getFormatSettings().getFormatLocale().toString()}return this._sLocale}function I(){if(!this._oLocaleData){var e=M.call(this);var t=new g(e);this._oLocaleData=i.getInstance(t)}return this._oLocaleData}function w(){var e=this.getStartDate();var t;var i=this.getIntervals();var a=this.getIntervalType();this._oUTCStartDate=H.call(this,e);switch(a){case _.Hour:t=new r(this._oUTCStartDate.getTime());t.setUTCHours(t.getUTCHours()+i);break;case _.Day:case _.Week:case _.OneMonth:case"OneMonth":t=new r(this._oUTCStartDate.getTime());t.setUTCDate(t.getUTCDate()+i*this.getIntervalSize());break;case _.Month:t=new r(this._oUTCStartDate.getTime());t.setUTCMonth(t.getUTCMonth()+i);break;default:throw new Error("Unknown IntervalType: "+a+"; "+this)}t.setUTCMilliseconds(-1);this._iRowSize=t.getTime()-this._oUTCStartDate.getTime();this._iIntervalSize=Math.floor(this._iRowSize/i);this._oUTCEndDate=t}function H(e){var t=this.getIntervalType();var i=a._createUniversalUTCDate(e,undefined,true);switch(t){case _.Hour:i.setUTCMinutes(0);i.setUTCSeconds(0);i.setUTCMilliseconds(0);break;case _.Day:case _.Week:case _.OneMonth:case"OneMonth":i.setUTCHours(0);i.setUTCMinutes(0);i.setUTCSeconds(0);i.setUTCMilliseconds(0);break;case _.Month:i.setUTCDate(1);i.setUTCHours(0);i.setUTCMinutes(0);i.setUTCSeconds(0);i.setUTCMilliseconds(0);break;default:throw new Error("Unknown IntervalType: "+t+"; "+this)}return i}function z(){return t.system.phone||this.getGroupAppointmentsMode()===A.Collapsed}function k(){var e=this._getAppointmentsSorted();var t;var i;var n;var s=this.getIntervals();var o=this.getIntervalType();var p=this._getStartDate();var l=p.getTime();var u=this._oUTCEndDate;var g=u.getTime();var h=[];var d=false;var c=0;var f=0;var m=z.call(this);var v=this._needAppointmentHorizontalFit();this.destroyAggregation("groupAppointments",true);for(c=0;c<e.length;c++){t=e[c];var T=a._createUniversalUTCDate(t._getStartDateWithTimezoneAdaptation(),undefined,true);var C=T.getTime();T.setUTCSeconds(0);T.setUTCMilliseconds(0);var A=t._getEndDateWithTimezoneAdaptation()?a._createUniversalUTCDate(t._getEndDateWithTimezoneAdaptation(),undefined,true):a._createUniversalUTCDate(new Date(864e12),undefined,true);var U=A.getTime();A.setUTCSeconds(0);A.setUTCMilliseconds(0);var y=false;if(T.getTime()<l&&A.getTime()>=l){T=new r(l);y=true}if(A.getTime()>g&&T.getTime()<=g){A=new r(g);y=true}var D=(A.getTime()-T.getTime())/6e4;if(y&&D==0){continue}var b=0;var S=0;var M=-1;i=undefined;n=undefined;if(T&&T.getTime()<=g&&A&&A.getTime()>=l&&C<=U){if(m&&o==_.Month&&A.getTime()-T.getTime()<6048e5){i=R.call(this,T,t,o,s,p,u,l,h);var I=a._createUniversalUTCDate(i._getEndDateWithTimezoneAdaptation(),undefined,true);if(A.getTime()>I.getTime()){n=R.call(this,A,t,o,s,p,u,l,h)}}if(v){this._setHorizontalRoundingWidth(t,T,A)}b=E.call(this,o,s,p,u,l,T);S=V.call(this,o,s,p,u,l,A);if(i){i._iBegin=b;i._iEnd=S;i._iLevel=M;if(n){n._iBegin=b;n._iEnd=S;n._iLevel=M}continue}h.push({appointment:t,begin:b,end:S,calculatedEnd:S,level:M,size:this.getProperty("appointmentHeight")});if(this._sFocusedAppointmentId&&this._sFocusedAppointmentId==t.getId()){d=true}}}var w=this.getAggregation("groupAppointments",[]);if(w.length>0){for(c=0;c<h.length;c++){t=h[c];if(t.appointment._aAppointments&&t.appointment._aAppointments.length<=1){i=t.appointment;var H=false;if(i._aAppointments.length==0){H=true}else{for(f=0;f<h.length;f++){if(h[f].appointment==i._aAppointments[0]){H=true;break}}}if(!H){for(f=0;f<w.length;f++){n=w[f];if(i!=n){for(var k=0;k<n._aAppointments.length;k++){if(i._aAppointments[0]==n._aAppointments[k]){n._aAppointments.splice(k,1);if(n._aAppointments.length==1){this.removeAggregation("groupAppointments",n);n.destroy();w=this.getAggregation("groupAppointments",[])}else{n.setProperty("title",n._aAppointments.length,true)}break}}}}t.begin=i._iBegin;t.end=i._iEnd;t.calculatedEnd=i._iEnd;t.level=i._iLevel;t.appointment=i._aAppointments[0]}else{h.splice(c,1);c--}this.removeAggregation("groupAppointments",i);i.destroy();w=this.getAggregation("groupAppointments",[])}}}if(!d){if(h.length>0){this._sFocusedAppointmentId=h[0].appointment.getId()}else{this._sFocusedAppointmentId=undefined}}this._aVisibleAppointments=h;return this._aVisibleAppointments}function R(e,t,i,n,s,o,p,l){var u=this.getAggregation("groupAppointments",[]);var g;var h=I.call(this);var d=h.getFirstDayOfWeek();var f=e.getUTCDay();var m=new r(e.getTime());m.setUTCHours(0);m.setUTCMinutes(0);m.setUTCSeconds(0);m.setUTCMilliseconds(0);if(d<=f){m.setDate(m.getDate()-(f-d))}else{m.setDate(m.getDate()-(7-f-d))}for(var v=0;v<u.length;v++){g=u[v];var C=a._createUniversalUTCDate(g._getStartDateWithTimezoneAdaptation(),undefined,true);if(C.getTime()==m.getTime()){break}g=undefined}if(!g){var A=new r(m.getTime());A.setDate(A.getDate()+7);A.setMilliseconds(-1);g=new c(this.getId()+"-Group"+u.length,{type:t.getType(),startDate:a._createLocalDate(new Date(m.getTime()),true),endDate:a._createLocalDate(new Date(A.getTime()),true)});g._aAppointments=[];this.addAggregation("groupAppointments",g,true);var _=E.call(this,i,n,s,o,p,m);var U=V.call(this,i,n,s,o,p,A);l.push({appointment:g,begin:_,end:U,calculatedEnd:U,level:-1,size:this.getProperty("appointmentHeight")})}g._aAppointments.push(t);if(g.getType()!=T.None&&g.getType()!=t.getType()){g.setType(T.None)}g.setProperty("title",g._aAppointments.length,true);return g}function E(e,t,i,a,n,s){var o=0;if(e!=_.Month){o=100*(s.getTime()-n)/this._iRowSize}else{var p=new r(s.getTime());p.setUTCDate(1);p.setUTCHours(0);p.setUTCMinutes(0);p.setUTCSeconds(0);p.setUTCMilliseconds(0);var l=new r(p.getTime());l.setUTCMonth(l.getUTCMonth()+1);l.setMilliseconds(-1);var u=l.getTime()-p.getTime();var g=(p.getUTCFullYear()-i.getUTCFullYear())*12+p.getUTCMonth()-i.getUTCMonth();o=100*g/t+100*(s.getTime()-p.getTime())/u/t}if(o<0){o=0}o=Math.round(o*1e5)/1e5;return o}function V(e,t,i,a,n,s){var o=0;if(e!=_.Month){o=100-100*(s.getTime()-n)/this._iRowSize}else{var p=new r(s.getTime());p.setUTCDate(1);p.setUTCHours(0);p.setUTCMinutes(0);p.setUTCSeconds(0);p.setUTCMilliseconds(0);var l=new r(p.getTime());l.setUTCMonth(l.getUTCMonth()+1);l.setMilliseconds(-1);var u=l.getTime()-p.getTime();var g=(p.getUTCFullYear()-i.getUTCFullYear())*12+p.getUTCMonth()-i.getUTCMonth();o=100-(100*g/t+100*(s.getTime()-p.getTime())/u/t)}if(o<0){o=0}o=Math.round(o*1e5)/1e5;return o}function W(){var e=[];if(this.getShowIntervalHeaders()){var t=this.getIntervalHeaders();var i;var n=this.getIntervals();var s=this.getIntervalType();var o=this._getStartDate();var p=o.getTime();var l=this._oUTCEndDate;var u=l.getTime();var g=0;var h=0;for(g=0;g<t.length;g++){i=t[g];var d=a._createUniversalUTCDate(i._getStartDateWithTimezoneAdaptation(),undefined,true);d.setUTCSeconds(0);d.setUTCMilliseconds(0);var c=i._getEndDateWithTimezoneAdaptation()?a._createUniversalUTCDate(i._getEndDateWithTimezoneAdaptation(),undefined,true):a._createUniversalUTCDate(new Date(864e12),undefined,true);c.setUTCSeconds(0);c.setUTCMilliseconds(0);if(d&&d.getTime()<=u&&c&&c.getTime()>=p){var f=new r(o.getTime());var m=new r(o.getTime());m.setUTCMinutes(m.getUTCMinutes()-1);var v=-1;var T=-1;for(h=0;h<n;h++){switch(s){case _.Hour:m.setUTCHours(m.getUTCHours()+1);if(h>0){f.setUTCHours(f.getUTCHours()+1)}break;case _.Day:case _.Week:case _.OneMonth:case"OneMonth":m.setUTCDate(m.getUTCDate()+1);if(h>0){f.setUTCDate(f.getUTCDate()+1)}break;case _.Month:m.setUTCDate(1);m.setUTCMonth(m.getUTCMonth()+2);m.setUTCDate(0);if(h>0){f.setUTCMonth(f.getUTCMonth()+1)}break;default:throw new Error("Unknown IntervalType: "+s+"; "+this)}if(d&&d.getTime()<=f.getTime()&&c&&c.getTime()>=m.getTime()){if(v<0){v=h}T=h}}if(v>=0){e.push({interval:v,appointment:i,last:T})}}}}this._aVisibleIntervalHeaders=e;return this._aVisibleIntervalHeaders}function F(){if(this._isOneMonthsRowOnSmallSizes()){return}var e=this.$("Apps");var t=e.innerWidth();if(t<=0){return}var i=this.$("DummyApp");var a=i.outerHeight(true);if(a<=0){return}var n=4;var s=i.outerWidth();var r=s/t*100;var o=Math.ceil(1e3*r)/1e3;var p;var l;var u=0;var g=0;var h=0;var d=false;var c;var f=this._needAppointmentHorizontalFit();if(this.getShowIntervalHeaders()&&(this.getShowEmptyIntervalHeaders()||this._getVisibleIntervalHeaders().length>0)){u=jQuery(this.$("AppsInt0").children(".sapUiCalendarRowAppsIntHead")[0]).outerHeight(true);d=true}for(h=0;h<this._aVisibleAppointments.length;h++){p=this._aVisibleAppointments[h];l=p.appointment.$();var m=Math.floor(1e3*(100-p.calculatedEnd-p.begin))/1e3;var v=false;if(m<o){p.end=100-p.begin-r;if(p.end<0){p.end=0}v=true;l.addClass("sapUiCalendarAppSmall")}else if(l.hasClass("sapUiCalendarAppSmall")){p.end=p.calculatedEnd;v=true;l.removeClass("sapUiCalendarAppSmall")}if(v){p.level=-1}if(v&&!f){if(this._bRTL){l.css("left",p.end+"%")}else{l.css("right",p.end+"%")}}if(f){p.end=p.calculatedEnd}}for(h=0;h<this._aVisibleAppointments.length;h++){p=this._aVisibleAppointments[h];l=p.appointment.$();var T={};if(p.level<0){for(var C=0;C<this._aVisibleAppointments.length;C++){var A=this._aVisibleAppointments[C];if(p!=A&&p.begin<Math.floor(1e3*(100-A.end))/1e3&&Math.floor(1e3*(100-p.end))/1e3>A.begin&&A.level>=0){this._setBlockedLevelsForAppointment(A,T)}}p.level=this._getAppointmetLevel(T,p);l.attr("data-sap-level",p.level)}c=a*p.level+u;if(!d){c+=n}l.css("top",c+"px");var _=p.level;_+=this._getAppointmentRowCount(p)-1;if(g<_){g=_}}g++;a=a*g+u;if(!d){a+=n}if(!this.getHeight()){e.outerHeight(a)}else{var U=this.$("Apps").children(".sapUiCalendarRowAppsInt");for(h=0;h<U.length;h++){var y=jQuery(U[h]);y.outerHeight(a)}}i.css("display","none")}function L(e,t){var i=0;var a;var n;var s;var r;var o=p.getStaticId("sap.ui.unified","APPOINTMENT_SELECTED");var l=!e.getSelected();if(t){var u=this.getAppointments();var g=this.getAggregation("groupAppointments",[]);jQuery.merge(u,g);for(i=0;i<u.length;i++){a=u[i];if(a.getId()!==e.getId()&&a.getSelected()){a.setProperty("selected",false,true);a.$().removeClass("sapUiCalendarAppSel");for(var i=0;i<this.aSelectedAppointments.length;i++){if(this.aSelectedAppointments[i]!==a.getId()){this.aSelectedAppointments.splice(i)}}n=a.$().attr("aria-labelledby");s=n?n.replace(o,""):"";a.$().attr("aria-labelledby",s)}}}r=e.$().attr("aria-labelledby")+" "+o;s=e.$().attr("aria-labelledby").replace(o,"").trim();if(e.getSelected()){e.setProperty("selected",false,true);e.$().removeClass("sapUiCalendarAppSel");e.$().attr("aria-labelledby",s);O(this,t)}else{e.setProperty("selected",true,true);e.$().addClass("sapUiCalendarAppSel");e.$().attr("aria-labelledby",r);O(this,t)}this._updateSelectedAppointmentsArray(e);if(e._aAppointments){for(i=0;i<e._aAppointments.length;i++){a=e._aAppointments[i];a.setProperty("selected",l,true);r=a.$().attr("aria-labelledby")+" "+o;a.$().attr("aria-labelledby",r)}this.fireSelect({appointments:e._aAppointments,multiSelect:!t,domRefId:e.getId()})}else{this.fireSelect({appointment:e,multiSelect:!t,domRefId:e.getId()})}}function P(e){var t=this._getPlanningCalendar();if(t){t["_onRow"+e]()}}b.prototype._needAppointmentHorizontalFit=function(){var e=this._getPlanningCalendar(),t,i,a;if(!e||this.getAppointmentRoundWidth()===y.None){return false}t=e.getViewKey();i=e._getView(t);a=e._getIntervals(i);return a>=20};b.prototype._setHorizontalRoundingWidth=function(e,t,i){var a;switch(this.getAppointmentRoundWidth()){case y.HalfColumn:a=12;break}this._roundAppointment(e,t,i,a)};b.prototype._roundAppointment=function(e,t,i,a){var n,s;n=e._getStartDateWithTimezoneAdaptation().getHours()-e._getStartDateWithTimezoneAdaptation().getHours()%a;t.setUTCHours(n);t.setUTCMinutes(0);t.setUTCSeconds(0);t.setUTCMilliseconds(0);s=e._getEndDateWithTimezoneAdaptation().getHours()-e._getEndDateWithTimezoneAdaptation().getHours()%a+a;i.setUTCHours(s);i.setUTCMinutes(0);i.setUTCSeconds(0);i.setUTCMilliseconds(0)};b.prototype._setBlockedLevelsForAppointment=function(e,t){var i=this._getAppointmentRowCount(e);for(var a=0;a<i;a++){t[e.level+a]=true}return t};b.prototype._getAppointmentRowCount=function(e){var t,i=this._getAppointmentReducedHeight(e);switch(e.size){case U.HalfSize:t=1;break;case U.Regular:t=2;if(i&&!e.appointment.getText()&&!e.appointment.getDescription()){t=1}break;case U.Large:t=3;break;case U.Automatic:t=1;if(e.appointment.getText()){t+=1}if(e.appointment.getDescription()){t+=1}break}return t};b.prototype._getAppointmetLevel=function(e,t){var i=0;var a=this._getAppointmentRowCount(t);var n=true;while(n){n=this._isPosibleToPositionAppointment(i,e,a);if(!n){n=true;i+=1}else{n=false}}return i};b.prototype._isPosibleToPositionAppointment=function(e,t,i){for(var a=e;a<i+e;a++){if(t[a]){return false}}return true};b.prototype._getPlanningCalendar=function(){var e=this;while(e.getParent()!==null){if(e.isA("sap.m.PlanningCalendar")){return e}e=e.getParent()}};function O(e,t){if(t){P.call(e,"DeselectAppointment")}}function Y(e){var t=this.getAggregation("groupAppointments",[]);var i;var a=false;for(var n=0;n<t.length;n++){var s=t[n]._aAppointments;for(var r=0;r<s.length;r++){if(s[r].getId()==e){i=t[n];a=true;break}}if(a){break}}return i}function $(e){if(this._sFocusedAppointmentId!=e){var t=this._getAppointmentsSorted();var i=this._aVisibleAppointments;var n;var s=0;n=Y.call(this,e);if(n){e=n.getId();n=undefined}for(s=0;s<i.length;s++){if(i[s].appointment.getId()==e){n=i[s].appointment;break}}if(n){var r=this.getFocusedAppointment().$();var o=n.$();this._sFocusedAppointmentId=n.getId();r.attr("tabindex","-1");o.attr("tabindex","0");o.trigger("focus")}else{for(s=0;s<t.length;s++){if(t[s].getId()==e){n=t[s];break}}if(n){this._sFocusedAppointmentId=n.getId();var p=H.call(this,n._getStartDateWithTimezoneAdaptation());this.setStartDate(a._createLocalDate(p,true));if(!d(this.getDomRef(),document.activeElement)){setTimeout(function(){this.getFocusedAppointment().focus()}.bind(this),0)}this.fireStartDateChange()}}}}function N(e,t){var i=this._sFocusedAppointmentId;var a=this._getAppointmentsSorted();var n=this.getAggregation("groupAppointments",[]);var s;var r=0;var o=0;for(o=0;o<n.length;o++){if(n[o].getId()==i){var p=n[o]._aAppointments;if(e){i=p[p.length-1].getId()}else{i=p[0].getId()}break}}for(o=0;o<a.length;o++){if(a[o].getId()==i){r=o;break}}if(e){r=r+t}else{r=r-t}if(r<0){r=0}else if(r>=a.length){r=a.length-1}s=a[r];$.call(this,s.getId())}function x(e){var t=this._getAppointmentsSorted();var i;var n=new r(this._getStartDate());var s=new r(this._oUTCEndDate);var o=this.getIntervalType();var p;var l;n.setUTCHours(0);s.setUTCHours(0);s.setUTCMinutes(0);s.setUTCSeconds(0);switch(o){case _.Hour:s.setUTCDate(s.getUTCDate()+1);s.setUTCMilliseconds(-1);break;case _.Day:case _.Week:case _.OneMonth:case"OneMonth":n.setUTCDate(1);s.setUTCMonth(s.getUTCMonth()+1);s.setUTCDate(1);s.setUTCMilliseconds(-1);break;case _.Month:n.setUTCMonth(0);n.setUTCDate(1);s.setUTCFullYear(s.getUTCFullYear()+1);s.setUTCMonth(1);s.setUTCDate(1);s.setUTCMilliseconds(-1);break;default:throw new Error("Unknown IntervalType: "+o+"; "+this)}var u=a._createLocalDate(n,true);var g=a._createLocalDate(s,true);for(var h=0;h<t.length;h++){if(t[h]._getStartDateWithTimezoneAdaptation()>=u&&t[h]._getStartDateWithTimezoneAdaptation()<=g){i=t[h];p=i.getId();if(e.type=="saphome"){break}}else if(t[h]._getStartDateWithTimezoneAdaptation()>g){break}}l=Y.call(this,p);if(l){i=l;p=i.getId()}if(p&&p!=this._sFocusedAppointmentId){$.call(this,p)}else if(e._bPlanningCalendar&&i){i.focus()}else{this.fireLeaveRow({type:e.type})}}function B(e,t){var i=this.getIntervalType();var n=this._getStartDate();var s=new r(n.getTime());var o;var p=false;var l=0;var u=0;if(jQuery(t).hasClass("sapUiCalendarRowAppsSubInt")){p=true;var g=jQuery(jQuery(t).parent()).children(".sapUiCalendarRowAppsSubInt");u=g.length;for(l=0;l<u;l++){var h=g[l];if(h==t){break}}}switch(i){case _.Hour:s.setUTCHours(s.getUTCHours()+e);if(p){s.setUTCMinutes(s.getUTCMinutes()+l*60/u);o=new r(s.getTime());o.setUTCMinutes(o.getUTCMinutes()+60/u)}else{o=new r(s.getTime());o.setUTCHours(o.getUTCHours()+1)}break;case _.Day:case _.Week:case _.OneMonth:case"OneMonth":s.setUTCDate(s.getUTCDate()+e);if(p){s.setUTCHours(s.getUTCHours()+l*24/u);o=new r(s.getTime());o.setUTCHours(o.getUTCHours()+24/u)}else{o=new r(s.getTime());o.setUTCDate(o.getUTCDate()+1)}break;case _.Month:s.setUTCMonth(s.getUTCMonth()+e);if(p){s.setUTCDate(s.getUTCDate()+l);o=new r(s.getTime());o.setUTCDate(o.getUTCDate()+1)}else{o=new r(s.getTime());o.setUTCMonth(o.getUTCMonth()+1)}break;default:throw new Error("Unknown IntervalType: "+i+"; "+this)}o.setUTCMilliseconds(o.getUTCMilliseconds()-1);s=a._createLocalDate(s,true);o=a._createLocalDate(o,true);this.fireIntervalSelect({startDate:s,endDate:o,subInterval:p})}function j(e,t){var i=e._getStartDateWithTimezoneAdaptation()-t._getStartDateWithTimezoneAdaptation();if(i==0){i=t._getEndDateWithTimezoneAdaptation()-e._getEndDateWithTimezoneAdaptation()}return i}return b});
//# sourceMappingURL=CalendarRow.js.map
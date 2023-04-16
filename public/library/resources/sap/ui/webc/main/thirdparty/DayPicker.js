sap.ui.define(["exports","sap/ui/webc/common/thirdparty/base/locale/getLocale","sap/ui/webc/common/thirdparty/base/config/FormatSettings","sap/ui/webc/common/thirdparty/localization/getCachedLocaleDataInstance","sap/ui/webc/common/thirdparty/base/Keys","sap/ui/webc/common/thirdparty/base/types/Integer","sap/ui/webc/common/thirdparty/localization/dates/CalendarDate","sap/ui/webc/common/thirdparty/localization/dates/calculateWeekNumber","sap/ui/webc/common/thirdparty/base/types/CalendarType","./types/CalendarSelectionMode","./CalendarPart","./generated/templates/DayPickerTemplate.lit","./generated/i18n/i18n-defaults","./generated/themes/DayPicker.css"],function(e,t,s,a,i,n,d,l,r,o,h,m,c,p){"use strict";Object.defineProperty(e,"__esModule",{value:true});e.default=void 0;t=f(t);a=f(a);n=f(n);d=f(d);l=f(l);r=f(r);o=f(o);h=f(h);m=f(m);p=f(p);function f(e){return e&&e.__esModule?e:{default:e}}const u={tag:"ui5-daypicker",properties:{selectedDates:{type:n.default,multiple:true,compareValues:true},selectionMode:{type:o.default,defaultValue:o.default.Single},hideWeekNumbers:{type:Boolean},_weeks:{type:Object,multiple:true},_dayNames:{type:Object,multiple:true},_hidden:{type:Boolean,noAttribute:true},_secondTimestamp:{type:String}},events:{change:{},navigate:{}}};const y=(e,t,s)=>e>Math.min(t,s)&&e<Math.max(t,s);const _=7;class g extends h.default{static get metadata(){return u}static get template(){return m.default}static get styles(){return p.default}onBeforeRendering(){const e=(0,a.default)((0,t.default)());this._buildWeeks(e);this._buildDayNames(e)}_buildWeeks(e){if(this._hidden){return}this._weeks=[];const a=this._getFirstDayOfWeek();const i=e.getMonths("wide",this._primaryCalendarType);const n=this.hasSecondaryCalendarType&&e.getMonths("wide",this.secondaryCalendarType);const r=g.i18nBundle.getText(c.DAY_PICKER_NON_WORKING_DAY);const o=g.i18nBundle.getText(c.DAY_PICKER_TODAY);const h=this._getFirstDay();const m=d.default.fromLocalJSDate(new Date,this._primaryCalendarType);const p=this._calendarDate;const f=this._minDate;const u=this._maxDate;const y=this.hasSecondaryCalendarType&&this._getSecondaryDay(h);let D=[];for(let d=0;d<_*6;d++){const d=h.valueOf()/1e3;let c=h.getDay()-a;if(c<0){c+=_}const g=h.getMonth()===p.getMonth()&&h.getDate()===p.getDate();const T=this._isDaySelected(d);const S=this._isDayInsideSelectionRange(d);const M=h.getMonth()!==p.getMonth();const w=this._isWeekend(h);const b=h.valueOf()<f.valueOf()||h.valueOf()>u.valueOf();const C=h.isSame(m);const k=h.getDay()===a;const v=w?`${r} `:"";const O=C?`${o} `:"";const N=this.hasSecondaryCalendarType?`${O}${v}${i[h.getMonth()]} ${h.getDate()}, ${h.getYear()}; ${n[y.getMonth()]} ${y.getDate()}, ${y.getYear()}`:`${O}${v}${i[h.getMonth()]} ${h.getDate()}, ${h.getYear()}`;const E={timestamp:d.toString(),focusRef:g,_tabIndex:g?"0":"-1",selected:T,day:h.getDate(),secondDay:this.hasSecondaryCalendarType&&y.getDate(),_isSecondaryCalendarType:this.hasSecondaryCalendarType,classes:`ui5-dp-item ui5-dp-wday${c}`,ariaLabel:N,ariaSelected:T?"true":"false",ariaDisabled:M?"true":undefined,disabled:b};if(k){E.classes+=" ui5-dp-firstday"}if(T){E.classes+=" ui5-dp-item--selected"}if(S){E.classes+=" ui5-dp-item--selected-between"}if(C){E.classes+=" ui5-dp-item--now"}if(M){E.classes+=" ui5-dp-item--othermonth"}if(w){E.classes+=" ui5-dp-item--weeekend"}if(b){E.classes+=" ui5-dp-item--disabled"}if(this.hasSecondaryCalendarType){E.classes+=" ui5-dp-item--withsecondtype"}D.push(E);if(c===_-1){D.unshift({weekNum:(0,l.default)((0,s.getFirstDayOfWeek)(),h.toUTCJSDate(),h.getYear(),(0,t.default)(),e),isHidden:this.shouldHideWeekNumbers})}if(D.length===_+1){this._weeks.push(D);D=[]}h.setDate(h.getDate()+1);if(this.hasSecondaryCalendarType){y.setDate(y.getDate()+1)}}}_buildDayNames(e){if(this._hidden){return}let t;const s=e.getDays("wide",this._primaryCalendarType);const a=e.getDays("abbreviated",this._primaryCalendarType);let i;this._dayNames=[];this._dayNames.push({classes:"ui5-dp-dayname",name:g.i18nBundle.getText(c.DAY_PICKER_WEEK_NUMBER_TEXT)});for(let e=0;e<_;e++){t=e+this._getFirstDayOfWeek();if(t>_-1){t-=_}i={name:s[t],ultraShortName:a[t],classes:"ui5-dp-dayname"};this._dayNames.push(i)}this._dayNames[1].classes+=" ui5-dp-firstday";if(this.shouldHideWeekNumbers){this._dayNames.shift()}}onAfterRendering(){if(this._autoFocus&&!this._hidden){this.focus()}}_onfocusin(){this._autoFocus=true}_onfocusout(){this._autoFocus=false}_isDaySelected(e){if(this.selectionMode===o.default.Single){return e===this.selectedDates[0]}return this.selectedDates.includes(e)}_isDayInsideSelectionRange(e){if(this.selectionMode!==o.default.Range||!this.selectedDates.length){return false}if(this.selectedDates.length===1&&this._secondTimestamp){return y(e,this.selectedDates[0],this._secondTimestamp)}return y(e,this.selectedDates[0],this.selectedDates[1])}_selectDate(e,t){const s=e.target;if(!this._isDayPressed(s)){return}const a=this._getTimestampFromDom(s);this._safelySetTimestamp(a);this._updateSecondTimestamp();if(this.selectionMode===o.default.Single){this.selectedDates=[a]}else if(this.selectionMode===o.default.Multiple){if(this.selectedDates.length>0&&t){this._multipleSelection(a)}else{this._toggleTimestampInSelection(a)}}else{this.selectedDates=this.selectedDates.length===1?[...this.selectedDates,a]:[a]}this.fireEvent("change",{timestamp:this.timestamp,dates:this.selectedDates})}_selectWeek(e){this._weeks.forEach(e=>{const t=e.findIndex(e=>{const t=d.default.fromTimestamp(parseInt(e.timestamp)*1e3);return t.getMonth()===this._calendarDate.getMonth()&&t.getDate()===this._calendarDate.getDate()})!==-1;if(t){const t=e.some(e=>e.timestamp&&!this.selectedDates.includes(parseInt(e.timestamp)));if(t){e.filter(e=>e.timestamp).forEach(e=>{this._addTimestampToSelection(parseInt(e.timestamp))})}else{e.filter(e=>e.timestamp).forEach(e=>{this._removeTimestampFromSelection(parseInt(e.timestamp))})}}});this.fireEvent("change",{timestamp:this.timestamp,dates:this.selectedDates})}_toggleTimestampInSelection(e){if(this.selectedDates.includes(e)){this._removeTimestampFromSelection(e)}else{this._addTimestampToSelection(e)}}_addTimestampToSelection(e){if(!this.selectedDates.includes(e)){this.selectedDates=[...this.selectedDates,e]}}_removeTimestampFromSelection(e){this.selectedDates=this.selectedDates.filter(t=>t!==e)}_multipleSelection(e){const t=Math.min(...this.selectedDates);const s=Math.max(...this.selectedDates);let a;let i;let n=false;if(e<t){a=e;i=t}else if(e>=t&&e<=s){const d=Math.abs(e-t);const l=Math.abs(e-s);if(d<l){a=e;i=s}else{a=t;i=e}n=true}else{a=s;i=e}const l=d.default.fromTimestamp(a*1e3);const r=d.default.fromTimestamp(i*1e3);while(l.valueOf()<=r.valueOf()){this[n?"_toggleTimestampInSelection":"_addTimestampToSelection"](l.valueOf()/1e3);l.setDate(l.getDate()+1)}}_onmouseover(e){const t=e.target.closest(".ui5-dp-item");if(t&&this.selectionMode===o.default.Range&&this.selectedDates.length===1){this._secondTimestamp=this._getTimestampFromDom(t)}}_onkeydown(e){let t=true;if((0,i.isEnter)(e)||(0,i.isEnterShift)(e)){this._selectDate(e,(0,i.isEnterShift)(e))}else if((0,i.isSpace)(e)||(0,i.isSpaceShift)(e)){e.preventDefault()}else if((0,i.isLeft)(e)){this._modifyTimestampBy(-1,"day")}else if((0,i.isRight)(e)){this._modifyTimestampBy(1,"day")}else if((0,i.isUp)(e)){this._modifyTimestampBy(-7,"day")}else if((0,i.isDown)(e)){this._modifyTimestampBy(7,"day")}else if((0,i.isPageUp)(e)){this._modifyTimestampBy(-1,"month")}else if((0,i.isPageDown)(e)){this._modifyTimestampBy(1,"month")}else if((0,i.isPageUpShift)(e)||(0,i.isPageUpAlt)(e)){this._modifyTimestampBy(-1,"year")}else if((0,i.isPageDownShift)(e)||(0,i.isPageDownAlt)(e)){this._modifyTimestampBy(1,"year")}else if((0,i.isPageUpShiftCtrl)(e)){this._modifyTimestampBy(-10,"year")}else if((0,i.isPageDownShiftCtrl)(e)){this._modifyTimestampBy(10,"year")}else if((0,i.isHome)(e)||(0,i.isEnd)(e)){this._onHomeOrEnd((0,i.isHome)(e))}else if((0,i.isHomeCtrl)(e)){const e=new d.default(this._calendarDate,this._primaryCalendarType);e.setDate(1);this._setTimestamp(e.valueOf()/1e3)}else if((0,i.isEndCtrl)(e)){const e=new d.default(this._calendarDate,this._primaryCalendarType);e.setMonth(e.getMonth()+1);e.setDate(0);this._setTimestamp(e.valueOf()/1e3)}else{t=false}if(t){e.preventDefault()}}_onkeyup(e){if((0,i.isSpace)(e)||(0,i.isSpaceShift)(e)&&this.selectionMode!==o.default.Multiple){this._selectDate(e,false)}else if((0,i.isSpaceShift)(e)){this._selectWeek(e)}}_onclick(e){this._selectDate(e,e.shiftKey)}_onHomeOrEnd(e){this._weeks.forEach(t=>{const s=t.findIndex(e=>{const t=d.default.fromTimestamp(parseInt(e.timestamp)*1e3);return t.getMonth()===this._calendarDate.getMonth()&&t.getDate()===this._calendarDate.getDate()})!==-1;if(s){const s=e?1:7;this._setTimestamp(parseInt(t[s].timestamp))}})}_hasPreviousPage(){return!(this._calendarDate.getMonth()===this._minDate.getMonth()&&this._calendarDate.getYear()===this._minDate.getYear())}_hasNextPage(){return!(this._calendarDate.getMonth()===this._maxDate.getMonth()&&this._calendarDate.getYear()===this._maxDate.getYear())}_showPreviousPage(){this._modifyTimestampBy(-1,"month")}_showNextPage(){this._modifyTimestampBy(1,"month")}_modifyTimestampBy(e,t){this._safelyModifyTimestampBy(e,t);this._updateSecondTimestamp();this.fireEvent("navigate",{timestamp:this.timestamp})}_setTimestamp(e){this._safelySetTimestamp(e);this._updateSecondTimestamp();this.fireEvent("navigate",{timestamp:this.timestamp})}_updateSecondTimestamp(){if(this.selectionMode===o.default.Range&&this.selectedDates.length===1){this._secondTimestamp=this.timestamp}}get shouldHideWeekNumbers(){if(this._primaryCalendarType!==r.default.Gregorian){return true}return this.hideWeekNumbers}get hasSecondaryCalendarType(){return!!this.secondaryCalendarType}_isWeekend(e){const s=(0,a.default)((0,t.default)());const i=e.getDay(),n=s.getWeekendStart(),d=s.getWeekendEnd();return i>=n&&i<=d||d<n&&(i>=n||i<=d)}_isDayPressed(e){const t=e.parentNode;return e.className.indexOf("ui5-dp-item")>-1||t&&t.classList&&t.classList.contains("ui5-dp-item")}_getSecondaryDay(e){return new d.default(e,this.secondaryCalendarType)}_getFirstDay(){let e;const t=this._getFirstDayOfWeek();const s=new d.default(this._calendarDate,this._primaryCalendarType);s.setDate(1);e=s.getDay()-t;if(e<0){e=7+e}if(e>0){s.setDate(1-e)}return s}_getFirstDayOfWeek(){const e=(0,a.default)((0,t.default)());const i=(0,s.getFirstDayOfWeek)();return Number.isInteger(i)?i:e.getFirstDayOfWeek()}get styles(){return{wrapper:{display:this._hidden?"none":"flex","justify-content":"center"},main:{width:"100%"}}}get ariaRoledescription(){return this.hasSecondaryCalendarType?`${this._primaryCalendarType} calendar with secondary ${this.secondaryCalendarType} calendar`:`${this._primaryCalendarType} calendar`}}g.define();var D=g;e.default=D});
//# sourceMappingURL=DayPicker.js.map
sap.ui.define(["exports","sap/ui/core/date/UniversalDate"],function(e,t){"use strict";Object.defineProperty(e,"__esModule",{value:true});e.default=void 0;t=a(t);function a(e){return e&&e.__esModule?e:{default:e}}const n=(e,a,n,s,u)=>{let g=0;let i=0;const T=Number.isInteger(e)?e:u.getFirstDayOfWeek();if(s&&s.getLanguage()==="en"&&s.getRegion()==="US"){const e=new t.default(a.getTime());e.setUTCFullYear(n,0,1);i=e.getUTCDay();const s=new t.default(a.getTime());s.setUTCDate(s.getUTCDate()-s.getUTCDay()+i);g=Math.round((s.getTime()-e.getTime())/864e5/7)+1}else{const e=new t.default(a.getTime());e.setUTCDate(e.getUTCDate()-T);i=e.getUTCDay();e.setUTCDate(e.getUTCDate()-i+4);const n=new t.default(e.getTime());n.setUTCMonth(0,1);i=n.getUTCDay();let s=0;if(i>4){s=7}const u=new t.default(n.getTime());u.setUTCDate(1-i+4+s);g=Math.round((e.getTime()-u.getTime())/864e5/7)+1}return g};var s=n;e.default=s});
//# sourceMappingURL=calculateWeekNumber.js.map
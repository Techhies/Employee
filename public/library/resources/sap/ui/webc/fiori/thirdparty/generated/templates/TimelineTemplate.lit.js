sap.ui.define(["exports","sap/ui/webc/common/thirdparty/base/renderer/LitRenderer"],function(i,e){"use strict";Object.defineProperty(i,"__esModule",{value:true});i.default=void 0;const l=(i,l,n)=>(0,e.html)`<div class="ui5-timeline-root" @focusin=${i._onfocusin} @keydown=${i._onkeydown}><div class="ui5-timeline-scroll-container"><ul class="ui5-timeline-list" aria-live="polite" aria-label="${(0,e.ifDefined)(i.ariaLabel)}">${(0,e.repeat)(i.items,(i,e)=>i._id||e,(e,s)=>t(e,s,i,l,n))}</ul></div></div>`;const t=(i,l,t,n,s)=>(0,e.html)`<li class="ui5-timeline-list-item"><slot name="${(0,e.ifDefined)(i._individualSlot)}"></slot></li>`;var n=l;i.default=n});
//# sourceMappingURL=TimelineTemplate.lit.js.map
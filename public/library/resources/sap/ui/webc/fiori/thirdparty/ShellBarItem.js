sap.ui.define(["exports","sap/ui/webc/common/thirdparty/base/UI5Element","sap/ui/webc/common/thirdparty/base/renderer/LitRenderer"],function(e,t,r){"use strict";Object.defineProperty(e,"__esModule",{value:true});e.default=void 0;t=i(t);r=i(r);function i(e){return e&&e.__esModule?e:{default:e}}const a={tag:"ui5-shellbar-item",properties:{icon:{type:String},text:{type:String},count:{type:String}},events:{click:{detail:{targetRef:{type:HTMLElement}}}}};class n extends t.default{static get metadata(){return a}static get render(){return r.default}get stableDomRef(){return this.getAttribute("stable-dom-ref")||`${this._id}-stable-dom-ref`}}n.define();var s=n;e.default=s});
//# sourceMappingURL=ShellBarItem.js.map
sap.ui.define(["exports","sap/ui/webc/common/thirdparty/base/UI5Element","sap/ui/webc/common/thirdparty/base/delegate/ResizeHandler","sap/ui/webc/common/thirdparty/base/asset-registries/Illustrations","sap/ui/webc/common/thirdparty/base/i18nBundle","sap/ui/webc/main/thirdparty/Title","sap/ui/webc/common/thirdparty/base/renderer/LitRenderer","./generated/templates/IllustratedMessageTemplate.lit","./types/IllustrationMessageSize","./types/IllustrationMessageType","./illustrations/BeforeSearch","./generated/themes/IllustratedMessage.css"],function(t,e,i,s,a,l,n,r,u,d,o,h){"use strict";Object.defineProperty(t,"__esModule",{value:true});t.default=void 0;e=c(e);i=c(i);l=c(l);n=c(n);r=c(r);u=c(u);d=c(d);h=c(h);function c(t){return t&&t.__esModule?t:{default:t}}const g="ILLUSTRATION_NOT_FOUND";const f={tag:"ui5-illustrated-message",languageAware:true,managedSlots:true,properties:{titleText:{type:String},subtitleText:{type:String},media:{type:String},invalid:{type:Boolean},name:{type:d.default,defaultValue:d.default.BeforeSearch},size:{type:u.default,defaultValue:u.default.Auto}},slots:{default:{propertyName:"actions",type:HTMLElement},subtitle:{type:HTMLElement}},events:{}};class S extends e.default{constructor(){super();this._handleResize=this.handleResize.bind(this)}static get metadata(){return f}static get render(){return n.default}static get styles(){return h.default}static get template(){return r.default}static async onDefine(){S.i18nBundle=await(0,a.getI18nBundle)("@ui5/webcomponents-fiori")}static get BREAKPOINTS(){return{DIALOG:679,SPOT:319,BASE:259}}static get MEDIA(){return{BASE:"base",SPOT:"spot",DIALOG:"dialog",SCENE:"scene"}}static get dependencies(){return[l.default]}onBeforeRendering(){const t=(0,s.getIllustrationDataSync)(this.name);if(t===g){this.invalid=true;const t=this.name.includes("Tnt")?`tnt/${this.name.replace("Tnt","")}`:this.name;return console.warn(`Required illustration is not registered. You can either import the illustration as a module in order to use it e.g. "@ui5/webcomponents-fiori/dist/illustrations/${t}.js".`)}this.invalid=false;this.spotSvg=t.spotSvg;this.dialogSvg=t.dialogSvg;this.sceneSvg=t.sceneSvg;this.illustrationTitle=S.i18nBundle.getText(t.title);this.illustrationSubtitle=S.i18nBundle.getText(t.subtitle);if(this.size!==u.default.Auto){this._handleCustomSize()}}onEnterDOM(){i.default.register(this,this._handleResize)}onExitDOM(){i.default.deregister(this,this._handleResize)}handleResize(){if(this.size!==u.default.Auto){return}if(this.offsetWidth<=S.BREAKPOINTS.BASE){this.media=S.MEDIA.BASE}else if(this.offsetWidth<=S.BREAKPOINTS.SPOT){this.media=S.MEDIA.SPOT}else if(this.offsetWidth<=S.BREAKPOINTS.DIALOG){this.media=S.MEDIA.DIALOG}else{this.media=S.MEDIA.SCENE}}_handleCustomSize(){switch(this.size){case u.default.Base:this.media=S.MEDIA.BASE;return;case u.default.Spot:this.media=S.MEDIA.SPOT;return;case u.default.Dialog:this.media=S.MEDIA.DIALOG;return;default:this.media=S.MEDIA.SCENE}}get effectiveIllustration(){switch(this.media){case S.MEDIA.SPOT:return this.spotSvg;case S.MEDIA.DIALOG:return this.dialogSvg;case S.MEDIA.SCENE:return this.sceneSvg;default:return""}}get hasFormattedSubtitle(){return!!this.subtitle.length}get effectiveTitleText(){return this.titleText?this.titleText:this.illustrationTitle}get effectiveSubitleText(){return this.subtitleText?this.subtitleText:this.illustrationSubtitle}get hasTitle(){return this.titleText||this.illustrationTitle}get hasSubtitle(){return this.subtitleText||this.illustrationSubtitle}get hasActions(){return!!this.actions.length&&this.media!==S.MEDIA.BASE}}S.define();var m=S;t.default=m});
//# sourceMappingURL=IllustratedMessage.js.map
/*!
 * OpenUI5
 * (c) Copyright 2009-2023 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/base/Object","sap/base/util/isEmptyObject","sap/ui/core/Configuration"],function(t,e,n){"use strict";var i=t.extend("sap.ui.mdc.link.Log",{constructor:function(){this.reset()}});i.prototype.reset=function(){this._oLog={semanticObjects:{},intents:{api:[],breakout:[]}};return this};i.prototype.isEmpty=function(){return!(!e(this._oLog.semanticObjects)||this._oLog.intents.breakout.length||this._oLog.intents.api.length)};i.prototype.initialize=function(t){this.reset();t.forEach(function(t){this.createSemanticObjectStructure(t)}.bind(this))};i.prototype.addContextObject=function(t,e){for(var n in e){var i=this.createAttributeStructure();this.addSemanticObjectAttribute(t,n,i);i.transformations.push({value:e[n],description:"ℹ The attribute "+n+" with the value "+e[n]+" is initially taken from the binding context."})}};i.prototype.createSemanticObjectStructure=function(t){this._oLog.semanticObjects[t]={attributes:{},intents:[]}};i.prototype.createAttributeStructure=function(){return{transformations:[]}};i.prototype.addSemanticObjectIntent=function(t,e){if(!this._oLog.semanticObjects[t]){this.createSemanticObjectStructure(t)}this._oLog.semanticObjects[t].intents.push(e);return this};i.prototype.addSemanticObjectAttribute=function(t,e,n){if(!this._oLog.semanticObjects[t]){this.createSemanticObjectStructure(t)}this._oLog.semanticObjects[t].attributes[e]=n;return this};i.prototype.getSemanticObjectAttribute=function(t,e){return this._oLog.semanticObjects[t]&&this._oLog.semanticObjects[t].attributes[e]?this._oLog.semanticObjects[t].attributes[e]:undefined};i.prototype.addIntent=function(t,e){switch(t){case i.IntentType.API:this._oLog.intents.api.push(e);break;case i.IntentType.BREAKOUT:this._oLog.intents.breakout.push(e);break;default:throw"Intent type "+t+" is not supported yet."}return this};i.prototype.getFormattedText=function(){var t=function(t){return typeof t==="string"?"'"+t+"'":t};var i=function(e,n){var i={value:"• "+n+" : ",description:""};e.forEach(function(e,n){i.value=i.value+(n>0?"  ➜  ":"")+t(e["value"]);i.description=i.description+"…   "+e["description"]+"\n";if(e["reason"]){i.description=i.description+"…   "+e["reason"]+"\n"}});return i};var o=function(t){var e="";t.forEach(function(t){e+="• '"+t.text+"' : "+t.intent+"\n"});return e};var r=function(t){try{var e=n.getLocale().toString();if(typeof window.Intl!=="undefined"){var i=window.Intl.Collator(e,{numeric:true});t.sort(function(t,e){return i.compare(t,e)})}else{t.sort(function(t,n){return t.localeCompare(n,e,{numeric:true})})}}catch(t){}};var a="";for(var s in this._oLog.semanticObjects){a=a+"\n⬤"+" "+s+"\n";if(e(this._oLog.semanticObjects[s].attributes)){a+="……  🔴 No semantic attributes available for semantic object "+s+". Please be aware "+"that without semantic attributes no URL parameters can be created.\n"}else{var c=Object.keys(this._oLog.semanticObjects[s].attributes);r(c);for(var u=0;u<c.length;u++){var b=c[u];var h=i(this._oLog.semanticObjects[s].attributes[b].transformations,b);a+=h.value+"\n";a+=h.description}}if(this._oLog.semanticObjects[s].intents.length){a+="\nIntents returned by FLP for semantic object "+s+":\n";a+=o(this._oLog.semanticObjects[s].intents)}}if(this._oLog.intents.api.length){a+="\nIntents defined in items aggregation:\n";a+=o(this._oLog.intents.api)}if(this._oLog.intents.breakout.length){a+="\nIntents returned by modifyItemsCallback callback:\n";a+=o(this._oLog.intents.breakout)}return a};i.prototype._getLogFormattedText=function(){return!this.isEmpty()?"---------------------------------------------\nsap.ui.mdc.Link:\nBelow you can see detailed information regarding semantic attributes which have been calculated for one or more semantic objects defined in a Link control. Semantic attributes are used to create the URL parameters. Additionally you can see all links containing the URL parameters.\n"+this.getFormattedText():"No logging data available"};i.IntentType={BREAKOUT:"Breakout",API:"Api"};return i});
//# sourceMappingURL=Log.js.map
/*!
 * OpenUI5
 * (c) Copyright 2009-2023 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/base/Log","sap/base/security/encodeXML"],function(t,e){"use strict";function a(t){if(t){if(Array.isArray(t)){return e(t.join(", "))}else{return e(t)}}else{return""}}function r(t,e,r,s){var i="";var n="";var l=1;var d=0;for(var o in e){var u=e[o];d+=u.length;var c=u[0];n+='<tr id="'+r+"_rule_"+l+'" >';n+="<td>";n+='<div class="expandable-control collapsed-content" data-expandableElement="'+r+"_rule_"+l+'_content">';n+='<div class="expandable-title">'+l+". "+a(c.name)+' <span class="rule-issue-number">('+u.length+" issues)</span></div></div>";n+='<div class="sapUiIssueGroupContent" id="'+r+"_rule_"+l+'_content">';n+='<div><span class="sapUiSupportLabel">Description: </span>'+a(c.description)+"</div>";n+='<div><span class="sapUiSupportLabel">Min version: </span>'+a(c.minVersion)+"</div>";n+='<div><span class="sapUiSupportLabel">Async: </span>'+a(c.async.toString())+"</div>";n+='<div><span class="sapUiSupportLabel">Resolution: </span>'+a(c.resolution)+"</div>";n+="<div>";if(c.resolutionUrls){for(var p=0;p<c.resolutionUrls.length;p++){n+='<div><a href="'+a(c.resolutionUrls[p].href)+'" target="_blank">'+a(c.resolutionUrls[p].text)+"</a></div>"}}n+="</div>";n+='<table class="sapUiTable"><tr><th></th><th>Element Id</th><th>Class</th><th>Status</th><th>Details</th></tr>';for(var v=0;v<u.length;v++){n+='<tr class="filterable" data-severity="'+a(u[v].severity)+'"><td>'+(v+1)+"</td><td>"+a(u[v].context.id)+"</td>";n+="<td>"+a(u[v].context.className)+"</td>";n+='<td class="'+a(u[v].severity)+'">'+a(u[v].severity)+"</td>";n+="<td>"+a(u[v].details)+"</td></tr>"}n+="</table>";n+="</div></td>";n+="<td>"+a(c.categories)+"</td>";n+="<td>"+a(c.audiences)+"</td>";n+="</tr>";l++}var f="collapsed-content";if(s===1){f="expanded-content"}i+="<tr>";i+='<td colspan="100" class="expandable-control '+f+'" data-expandableElement="'+r+'" data-groupName="'+t+'" data-groupNumber="'+s+'">';i+='<span class="sapUiSupportLabel expandable-title">'+s+". "+t+" ("+(l-1)+" rules, "+d+" issues)</span>";i+='</td></tr><tbody id="'+r+'">';i+=n;i+="</tbody>";return i}function s(e){var a="";var s=1;if(!e){return a}try{a+='<table class="sapUiTable"><tr><th>Name</th><th>Categories</th><th>Audiences</th></tr>';for(var i in e){a+=r(i,e[i],"group"+s,s);s++}a+="</table>"}catch(e){t.warning("There was a problem extracting issues info.");a=""}return a}function i(t,e,a){if(!e){return""}var r=a?"filter-active":"";return'<div data-severity="'+t+'" class="filter '+r+" "+t+'">'+t+"("+e+")</div>"+" | "}function n(e){var a="",r={},s,n,l=0,d=[],o={},u={},c={};if(!e){return a}try{for(c in e){o=e[c];for(u in o){d=o[u];for(n=0;n<d.length;n++){s=d[n].severity;if(r[s]){r[s]++}else{r[s]=1}l++}}}a+=i("Total",l,true);a+=i("High",r["High"],false);a+=i("Medium",r["Medium"],false);a+=i("Low",r["Low"],false)}catch(e){t.warning("There was a problem creating severity filters.");a=""}return a}function l(t,e){var a="";if(e){a+='<div class="filters">'+n(t)+"<div>\n"}a+="<div>"+s(t)+"</div>";return"<div>"+a+"</div>"}return{render:l}},true);
//# sourceMappingURL=IssueRenderer.js.map
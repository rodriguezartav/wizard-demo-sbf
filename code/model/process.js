var _3Model = require("clay-model")
var Ajax = require("clay-model-vfr");


var Process = _3Model.setup("BuildOrder__c", [
	"Account__c", "Item__c","Addons__c","Program__c", "TotalAddons__c","Total__c", "BasePrice__c","TotalProgram__c","ProgramMultiplier__c"
	]);
Process.ajax = Ajax;

Process.prototype.toJSON = function(){
	var data = this.attributes();
	if(data.Addons__c) data.Addons__c = data.Addons__c.join(",")
  return data;
}

Process.complete = function(process){
	var send = Ajax.vfr("Controller_BuildOrder.saveBuildOrder");
	return send(process.id)

	
}

module.exports= Process
var _3Model = require("clay-model")
var Ajax = require("clay-model-vfr");


var Process = _3Model.setup("BuildOrder__c", [
	"Account__c", "Item__c","Addons__c","Program__c", "TotalAddons__c","Total__c", "BasePrice__c","TotalProgram__c","ProgramMultiplier__c"
	]);
Process.ajax = Ajax;


module.exports= Process
var _3Model = require("clay-model")
var Ajax = require("clay-model-vfr");

Program = _3Model.setup("Program__c", ["Name","Credit__c","Description__c","Multiplier__c","Item__c"]);
Program.ajax = Ajax;

module.exports= Program;
var _3Model = require("clay-model")
var Ajax = require("clay-model-vfr");

Addon = _3Model.setup("Addon__c", ["Name","Price__c"]);
Addon.ajax = Ajax;


module.exports= Addon
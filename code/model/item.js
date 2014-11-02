var _3Model = require("clay-model")
var Ajax = require("clay-model-vfr");

Item = _3Model.setup("Item__c", ["Name","BasePrice__c","Image__c"]);
Item.ajax = Ajax;
Item.namespace = "threevot."

module.exports= Item
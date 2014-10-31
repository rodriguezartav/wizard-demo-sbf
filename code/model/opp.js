var _3Model = require("clay-model")
var Ajax = require("clay-model-vfr");

Opportunity = _3Model.setup("Opportunity", ["Name","AccountId","Amount","CloseDate","CreatedDate"]);
Opportunity.ajax = Ajax;


module.exports= Opportunity
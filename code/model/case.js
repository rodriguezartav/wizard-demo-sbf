var _3Model = require("clay-model")
var Ajax = require("clay-model-vfr");

Case = _3Model.setup("Case", ["Name","Subject","ContactId","Description", "Status", "AccountId", "CaseNumber"]);
Case.ajax = Ajax;
Case.namespace = ""

module.exports= Case
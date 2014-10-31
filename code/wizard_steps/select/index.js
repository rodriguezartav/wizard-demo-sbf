var Wizard = require("clay-wizard");

var Layout = require("./layout");

var wizard = new Wizard("select",Layout);


wizard.onBack = function(){

	this.emit("STEP", { action: "back" })

}

module.exports = wizard;
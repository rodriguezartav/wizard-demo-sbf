var Wizard = require("clay-wizard");

var Layout = require("./layout");

var wizard = new Wizard("start",Layout);


wizard.onViewReady = function(values){
}

wizard.onStart = function(a,b,c){
	this.emit("STEP", {action: "next", values: { name: "rob" } })
}

module.exports = wizard;
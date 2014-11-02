var Wizard = require("clay-wizard");

var Layout = require("./layout");

var wizard = new Wizard(__dirname,Layout);


wizard.onViewReady = function(values){
}

wizard.onStart = function(a,b,c){
	new Process()
	this.emit("STEP", {action: "next", values: { name: "rob" } })
}

module.exports = wizard;
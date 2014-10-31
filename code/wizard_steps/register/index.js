var Wizard = require("clay-wizard");

var Layout = require("./layout");

var register = new Wizard("register",Layout);


register.onBack = function(){
	this.emit("STEP", { action: "back" })
}

register.onNext = function(){
	this.emit("STEP", { action: "next" })
}

register.onViewReady = function(values, action){
	if(action != "back"){
		this.txt_name.value = values.name;
	}
}

module.exports = register;
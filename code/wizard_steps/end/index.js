var Wizard = require("clay-wizard");
var Layout = require("./layout");

var ProcessLayout = require("./processLayout");

var Process = require("../../model/process");

var wizard = new Wizard(__dirname,Layout);

wizard.onViewReady = function(values){
	var _this = this;
	this.process_layout_container.innerHTML = ProcessLayout(Process.first());

	this.process_layout_container.querySelector(".btn_complete").onclick = function(){
		_this.emit("STEP", {action: "end" } )	
	}

}

wizard.onEnd = function(a,b,c){
	
}

module.exports = wizard;
var Wizard = require("clay-wizard");

var Layout = require("./layout");

var wizard = new Wizard(__dirname,Layout);

var ItemTemplate = require("./item")

var Program = require("../../model/program");

var Process = require("../../model/process");

wizard.onViewReady = function(){
	var _this = this;
	if(!this.addonLoaded){
		this.activeAddons = [];
		var process = Process.first();
		Program.query( "select Name, Credit__c, Description__c, Multiplier__c, Item__c from Program__c where Item__c ='" + process.Item__c + "'"  ) // where Name Like ='%"+_this.txt_search_account.value+"%'")
		.then( function(){ _this.onProgramsReady() } )
		.fail( function(err){console.error(err)} )
	}
	this.addonLoaded=true;
}

wizard.onProgramsReady = function(){
	this.program_list.innerHTML = ""
	for (var i = Program.all().length - 1; i >= 0; i--) {
		this.program_list.innerHTML += ItemTemplate(Program.all()[i]);
	};
}

wizard.onBack = function(){
	this.emit("STEP", { action: "back" })
}

wizard.onProgramClick = function(e){
	var target = e.target;
	while(!target.classList.contains("item") && !target.classList.contains("program_list") ){ target = target.parentNode; }

	var id = target.dataset.id;

	this.emit("STEP", { action: "next", values: { id: id} });


}


module.exports = wizard;
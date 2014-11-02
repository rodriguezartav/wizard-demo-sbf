var Item = require("./model/item");

var Program = require("./model/program");

var ProcessManager = require("clay-wizard/processManager")

var Process = require("./model/process");

Process.bind("create",loadProcess);

Process.bind("select", loadProcess);

ProcessManager.routes = {

// CURRENT STATE     ACTION                                    BACK STATE

		start:    {      next: startToSelect                 },

		select: { next: selectToItems , back: backToStart },

		items: { next: itemsToAddons ,  back: backToSelect },

		addons: { next: addonsToPrograms , back: backToItems },

		programs: { next: programToEnd, back: backToAddons },

		end: { end: complete, back: backtoPrograms }

}


ProcessManager.loadProcess = function(process){
	ProcessManager.destroyAll( { ignoreAjax: true } );
	ProcessManager.process = process;
	if(!process.Account__c) ProcessManager.bringIntoView("start",{},"")
}

function startToSelect(action, values, wizardStep){
	ProcessManager.bringIntoView( "select", values, action )
}

function backToStart(action, values, wizardStep){
	ProcessManager.process.Account__c = null;
	ProcessManager.process.save();

	ProcessManager.bringIntoView( "start", values, action )
}

function selectToItems(action, values){
	ProcessManager.process.Account__c = values.id;
	ProcessManager.process.save();
	ProcessManager.bringIntoView( "items", values, action )
}

function backToSelect(action, values, wizardStep){
	ProcessManager.process.Item__c = null;
	ProcessManager.process.BasePrice__c = 0;
	ProcessManager.process.Total__c = 0;
	ProcessManager.process.save();
	ProcessManager.bringIntoView( "select", values, action )
}

function itemsToAddons(action, values){
	var item = Item.find(values.id);
	ProcessManager.process.Item__c = values.id;
	ProcessManager.process.BasePrice__c = item.BasePrice__c;
	ProcessManager.process.Total__c = item.BasePrice__c;
	ProcessManager.process.save();
	ProcessManager.bringIntoView( "addons", values, action )
}

function backToItems(action, values, wizardStep){
	ProcessManager.process.Addons__c = [];
	ProcessManager.process.TotalAddons__c = 0;
	ProcessManager.process.Total__c = 0;
	ProcessManager.process.save();
	ProcessManager.bringIntoView( "items", values, action )
}

function addonsToPrograms(action,values, wizardStep){
	ProcessManager.process.Addons__c = values.addons;
	ProcessManager.process.TotalAddons__c = values.total;
	ProcessManager.process.Total__c = ProcessManager.process.TotalAddons__c + ProcessManager.process.BasePrice__c;
	ProcessManager.process.save();
	ProcessManager.bringIntoView( "programs", values, action )
}

function backToAddons(action, values, wizardStep){
	ProcessManager.process.Program__c = null;
	ProcessManager.process.Total__c = 0;
	ProcessManager.process.TotalAddons__c = 0;
	ProcessManager.process.save();
	ProcessManager.bringIntoView( "addons", values, action )
}

function programToEnd(action,values, wizardStep){
	var program = Program.find(values.id);
	ProcessManager.process.Program__c = values.id;
	ProcessManager.process.ProgramMultiplier__c = program.Multiplier__c;
	ProcessManager.process.TotalProgram__c = (ProcessManager.process.ProgramMultiplier__c -1) * (ProcessManager.process.BasePrice__c + ProcessManager.process.TotalAddons__c );
	ProcessManager.process.Total__c = ProcessManager.process.TotalAddons__c + ProcessManager.process.TotalProgram__c + ProcessManager.process.BasePrice__c;
	ProcessManager.process.save()
	ProcessManager.bringIntoView( "end", values, action )
}

function backtoPrograms(action, values, wizardStep){
	ProcessManager.process.Program__c = null;
	ProcessManager.process.ProgramMultiplier__c = 0
	ProcessManager.process.TotalProgram__c = 0
	ProcessManager.process.Total__c = 0
	ProcessManager.process.save()

	ProcessManager.bringIntoView( "programs", values, action )
}

function complete(action, values, wizardStep){
	Process.complete(ProcessManager.process)
	.then(function(){
		console.log(arguments)
		ProcessManager.bringIntoView("start", { lastProcess: ProcessManager.process } , action)
	})
	.fail(function(){ console.error(arguments) })

	
}

module.exports = ProcessManager;
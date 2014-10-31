var ProcessManager = require("clay-wizard/processManager")

ProcessManager.routes = {

// CURRENT STATE     ACTION                                    BACK STATE

		start:    {      next: startToRegister                 },

		register: {      next: register_toSelect,    back: backToStart },

		select:   {      next: startToRegister,      back: backToRegister },
}


function startToRegister(action, values, wizardStep){
	ProcessManager.bringIntoView( "register", values, action )
}

function backToStart(action, values, wizardStep){
	ProcessManager.bringIntoView( "start", values, action )
}

function register_toSelect(action, values){
	ProcessManager.bringIntoView( "select", values, action )
}

function backToRegister(action, values, wizardStep){
	ProcessManager.bringIntoView( "register", values, action )
}


module.exports = ProcessManager;
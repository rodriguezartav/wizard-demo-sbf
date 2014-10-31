var LayoutManager = require("clay-wizard/layoutManager");

var ProcessManager = require("./code/processManager");
ProcessManager.debug = true;

var Step_start = require("./code/wizard_steps/start");
var Step_register = require("./code/wizard_steps/register");
var Step_select = require("./code/wizard_steps/select");


LayoutManager.register("._3vot", ProcessManager);
LayoutManager.registerView(  Step_start );
LayoutManager.registerView(  Step_register );
LayoutManager.registerView(  Step_select );

LayoutManager.bringIntoView("start")
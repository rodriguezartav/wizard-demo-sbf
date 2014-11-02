var w = window,
    d = document,
    e = d.documentElement,
    g = d.getElementsByTagName('body')[0]
    window.x = w.innerWidth || e.clientWidth || g.clientWidth,
    window.y = w.innerHeight|| e.clientHeight|| g.clientHeight;
  
var LayoutManager = require("clay-wizard/layoutManager");

var Process = require("./code/model/process");

var Menu = require("./code/menu");

var ProcessManager = require("./code/processManager");
ProcessManager.debug = true;

var Step_start = require("./code/wizard_steps/start");
var Step_select = require("./code/wizard_steps/select");

var Step_items = require("./code/wizard_steps/items");
var Step_items = require("./code/wizard_steps/items");
var Step_addons = require("./code/wizard_steps/addons");
var Step_programs = require("./code/wizard_steps/programs");
var Step_end = require("./code/wizard_steps/end");

var menu = new Menu("._3vot");

LayoutManager.register("._3vot", ProcessManager, {processIndexLabel: menu.processIndexLabel, heightOffset: 64 });
LayoutManager.registerView(  Step_start );
LayoutManager.registerView(  Step_select );
LayoutManager.registerView(  Step_items );
LayoutManager.registerView(  Step_addons );
LayoutManager.registerView(  Step_programs );
LayoutManager.registerView(  Step_end );

LayoutManager.start();
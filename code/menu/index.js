var LayoutManager = require("clay-wizard/layoutManager")

var MenuLayout = require("./menuLayout")
var ProcessLayout = require("./processLayout")

var Process = require("../model/process");

var ProcessItem = require("./processItem");

var PendingProcess = require("../model/pendingProcess");

var domify= require("domify")

function Menu(container){
	var _this  = this;
	this.el = domify( MenuLayout() );

	this.submenu = this.el.querySelector(".submenu");
	this.processmenu = this.el.querySelector(".processmenu");

	this.listWizards = this.el.querySelector(".list-wizards")

	this.menuBtn = this.el.querySelector(".btn_menu");
	this.processBtn = this.el.querySelector(".btn_process");
	this.processIndexLabel = this.el.querySelector(".processIndexLabel")

	this.loadPendingBtn = this.el.querySelector(".btn_load_pending")

	this.loadPendingBtn.onclick = function(){
		_this.loadPendingBtn.style.display = "none";
		PendingProcess.query("select id, name, account__r.Name, item__c, account__c, Item__r.Name, Program__c, Total__c from BuildOrder__c where Active__c = false")
		.then(function(){ 
			for (var i = PendingProcess.all().length - 1; i >= 0; i--) {
				var pending = PendingProcess.all()[i];
				_this.listWizards.innerHTML+= ProcessItem(pending);
			};
		})
	}

	this.listWizards.onclick = function(e){
		var target = e.target;
		while( !target.classList.contains("item") && !target.classList.contains("list-wizards") ) target =target.parentNode;

		var id = target.dataset.id;
		var pendingProcess = PendingProcess.find(id)
		console.log(pendingProcess)


	}



	LayoutManager.on("VIEW_CHANGE",function(){
		_this.hideMenus();
	});

	this.backBtn = this.el.querySelector(".btn_back")
	
		this.backBtn.onclick = function(){ 
			LayoutManager.goBack(); 
			_this.processmenu.classList.remove("active")
		}

  this.submenu.style.height = window.y - 68 + "px"
	this.processmenu.style.height = window.y - 68 + "px"

	this.menuBtn.onclick = function(){

		if(_this.submenu.classList.contains("active")){
			_this.submenu.classList.remove("active");
		}
		else{
			_this.submenu.classList.add("active")
		}
	}

	this.processBtn.onclick = function(){

		if(_this.processmenu.classList.contains("active")){
			_this.processmenu.classList.remove("active")
		}
		else{
			_this.processmenu.classList.add("active")
			_this.renderProcess();
		}
	}

	document.querySelector(container).appendChild( this.el );

}

	Menu.prototype.hideMenus = function(){
		this.submenu.classList.remove("active")
		this.processmenu.classList.remove("active")
	}

	Menu.prototype.renderProcess = function(){
		this.processmenu.querySelector(".layout_container").innerHTML = ProcessLayout( Process.first() )
}



module.exports = Menu;
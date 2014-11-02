var Wizard = require("clay-wizard");

var Layout = require("./layout");

var wizard = new Wizard(__dirname,Layout);

var ItemTemplate = require("./item")

var Addon = require("../../model/addon")

var Process = require("../../model/process");

wizard.onViewReady = function(){
	var _this = this;
	if(!this.addonLoaded){
		this.activeAddons = [];
		Addon.query( "select id,Name, Price__c from Addon__c" ) // where Name Like ='%"+_this.txt_search_account.value+"%'")
		.then( function(){ _this.onAddonsReady() } )
		.fail( alert )
	}
	this.addonLoaded=true;
}

wizard.onAddonsReady = function(){
	this.item_list.innerHTML = ""
	for (var i = Addon.all().length - 1; i >= 0; i--) {
		this.item_list.innerHTML += ItemTemplate(Addon.all()[i]);
	};
}

wizard.onBack = function(){
	this.emit("STEP", { action: "back" })
}

wizard.onItemClick = function(e){
	var target = e.target;
	
	while(!target.classList.contains("item") && !target.classList.contains("item_list") ){ target = target.parentNode; }
	id = target.dataset.id;

	if(target.classList.contains("active")){
		target.classList.remove("active")
		this.activeAddons.splice(this.activeAddons.indexOf(id),1)
	}
	else{
		target.classList.add("active")
		this.activeAddons.push(id);
	}

	this.getTotal();
}

wizard.getTotal = function(){
	var item = Item.find( Process.first().Item__c );
	var total =  item.BasePrice__c;
	var addonTotal=0;
	for (var i = this.activeAddons.length - 1; i >= 0; i--) {
		var addon= Addon.find( this.activeAddons[i] ) ;
		total +=addon.Price__c
		addonTotal += addon.Price__c;
	};

	this.value_total_addons = addonTotal;

	this.item_list_add_on_total.innerHTML = "$ " + addonTotal + ".00"
	this.item_list_total.innerHTML = "$ " + total + ".00"

}

wizard.onNext = function(){
	console.log(this.value_total_addons)
	
	this.emit("STEP", {action: "next", values: { addons: this.activeAddons, total: this.value_total_addons } })
	
	
}


module.exports = wizard;
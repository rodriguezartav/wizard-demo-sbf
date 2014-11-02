var Wizard = require("clay-wizard");

var Layout = require("./layout");

var wizard = new Wizard(__dirname,Layout);

var ItemTemplate = require("./item")

var Item = require("../../model/item")

wizard.onViewReady = function(){
	var _this = this;
	if(Item.count() == 0){
		Item.query( "select id,Name, BasePrice__c, Image__c from Item__c" ) // where Name Like ='%"+_this.txt_search_account.value+"%'")
		.then( function(){ _this.onItemsReady() } )
		.fail( alert )
	}
	this.productsLoaded=true;
}

wizard.onItemsReady = function(){
	this.item_list.innerHTML = ""
	for (var i = Item.all().length - 1; i >= 0; i--) {
		this.item_list.innerHTML += ItemTemplate(Item.all()[i]);
	};
}

wizard.onBack = function(){
	this.emit("STEP", { action: "back" })
}

wizard.onItemClick = function(e){
	var target = e.target;
	while(!target.classList.contains("item") && !target.classList.contains("item_list") ){ target = target.parentNode; }

	if(target.classList.contains("item")){
		id = target.dataset.id;
		this.emit( "STEP", {action: "next", values: { id: id } } );
	}
}

module.exports = wizard;
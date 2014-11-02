var Wizard = require("clay-wizard");

var Layout = require("./layout");

var wizard = new Wizard(__dirname,Layout);

var Item = require("./item")

var Account = require("../../model/account")


wizard.onViewReady = function(){
	var _this = this;
	if(!this.registeredChange){
		this.txt_search_account.onchange = function(){
			Account.query("select id,Name from Account ") // where Name Like ='%"+_this.txt_search_account.value+"%'")
			.then( function(){ _this.onAccountRefresh() } )
			.fail( alert )
		}
	}
	this.registeredChange=true;
}

wizard.onAccountRefresh = function(){
	this.account_list.innerHTML = ""
	for (var i = Account.all().length - 1; i >= 0; i--) {
		this.account_list.innerHTML += Item(Account.all()[i]);
	};
}

wizard.onBack = function(){

	this.emit("STEP", { action: "back" })

}

wizard.onAccountClick = function(e){
	
	var target = e.target;
	if(target.classList.contains("item")){
		id = target.dataset.id;
		this.emit("STEP", {action: "next", values: { id: id } })
	}

}


module.exports = wizard;
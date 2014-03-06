(function () {
"use strict";

var message = "Welcome to the Maid Café! The only rule is to be nice." +
	"Welcome back, my Master! お帰りなさいませ、ご主人様! " + 
	"We're now serving the Animu & Mangos with a side of Moé. " + 
	"Sit back and relax with general chat for anime.stackexchange.com";

function welcome ( name ) {
	return bot.adapter.reply( name ) + " " + message; ;
}

bot.addCommand({
	name : 'welcome',
	fun : function ( args ) {
		if (!args.length) {
			return message;
		}

		return args.send( welcome(args) );
	},
	permission : {
		del : 'NONE'
	},
	description : 'Welcomes a user. `/welcome user`'
});
}());

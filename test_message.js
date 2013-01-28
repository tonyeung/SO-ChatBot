"use strict";

//assumption: everything was loaded and configured beforehand
var data = require( './data/results.json' ),
	opts = require( './data/opts.json' );

var http = require( 'http' ),
	qs   = require( 'querystring' ),
	util = require('util');

var request = http.request({
	hostname : 'chat.stackoverflow.com',
	method : 'POST',
	path : util.format('/chats/%s/messages/new', opts.roomid ),
	headers : {
		'User-Agent' : 'Mozilla/5.0 (X11; Linux i686; rv:17.0) Gecko/20100101 Firefox/17.0',
		'Content-Type' : 'application/x-www-form-urlencoded',
		Cookie : data.cookies
	}
}, done);

request.on('error', function ( e ) {
	console.log( 'request error: ' + e.toString() );
});
request.write(qs.stringify({
	fkey : data.headers.fkey,
	text : '(test)'
}));
request.end();

function done ( response ) {
	console.log( 'status: ' + response.statusCode );
}

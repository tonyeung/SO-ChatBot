//execute arbitrary js code in a relatively safe environment
bot.eval = (function () {
window.URL = window.URL || window.webkitURL || window.mozURL || null;

// http://tinkerbin.com/84dPpGFr
var worker_code = atob( 'dmFyIGdsb2JhbCA9IHRoaXM7CgovKm1vc3QgZXh0cmEgZnVuY3Rpb25zIGNvdWxkIGJlIHBvc3NpYmx5IHVuc2FmZSovCnZhciB3aGl0ZXkgPSB7Cgknc2VsZicgICAgICAgICAgICAgICA6IDEsCgknb25tZXNzYWdlJyAgICAgICAgICA6IDEsCgkncG9zdE1lc3NhZ2UnICAgICAgICA6IDEsCgknZ2xvYmFsJyAgICAgICAgICAgICA6IDEsCgknd2hpdGV5JyAgICAgICAgICAgICA6IDEsIC8qbG9vayBtb20sIEknbSBhIHdoaXRlbGlzdCwgY29udGFpbmluZyBpdHNlbGYhKi8KCSdldmFsJyAgICAgICAgICAgICAgIDogMSwKCSdBcnJheScgICAgICAgICAgICAgIDogMSwKCSdCb29sZWFuJyAgICAgICAgICAgIDogMSwKCSdEYXRlJyAgICAgICAgICAgICAgIDogMSwKCSdGdW5jdGlvbicgICAgICAgICAgIDogMSwKCSdOdW1iZXInICAgICAgICAgICAgIDogMSwKCSdPYmplY3QnICAgICAgICAgICAgIDogMSwKCSdSZWdFeHAnICAgICAgICAgICAgIDogMSwKCSdTdHJpbmcnICAgICAgICAgICAgIDogMSwKCSdFcnJvcicgICAgICAgICAgICAgIDogMSwKCSdFdmFsRXJyb3InICAgICAgICAgIDogMSwKCSdSYW5nZUVycm9yJyAgICAgICAgIDogMSwKCSdSZWZlcmVuY2VFcnJvcicgICAgIDogMSwKCSdTeW50YXhFcnJvcicgICAgICAgIDogMSwKCSdUeXBlRXJyb3InICAgICAgICAgIDogMSwKCSdVUklFcnJvcicgICAgICAgICAgIDogMSwKCSdkZWNvZGVVUkknICAgICAgICAgIDogMSwKCSdkZWNvZGVVUklDb21wb25lbnQnIDogMSwKCSdlbmNvZGVVUkknICAgICAgICAgIDogMSwKCSdlbmNvZGVVUklDb21wb25lbnQnIDogMSwKCSdpc0Zpbml0ZScgICAgICAgICAgIDogMSwKCSdpc05hTicgICAgICAgICAgICAgIDogMSwKCSdwYXJzZUZsb2F0JyAgICAgICAgIDogMSwKCSdwYXJzZUludCcgICAgICAgICAgIDogMSwKCSdJbmZpbml0eScgICAgICAgICAgIDogMSwKCSdKU09OJyAgICAgICAgICAgICAgIDogMSwKCSdNYXRoJyAgICAgICAgICAgICAgIDogMSwKCSdOYU4nICAgICAgICAgICAgICAgIDogMSwKCSd1bmRlZmluZWQnICAgICAgICAgIDogMQp9OwoKWyBnbG9iYWwsIGdsb2JhbC5fX3Byb3RvX18gXS5mb3JFYWNoKGZ1bmN0aW9uICggb2JqICkgewoJT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMoIG9iaiApLmZvckVhY2goZnVuY3Rpb24oIHByb3AgKSB7CgoJCWlmKCAhd2hpdGV5Lmhhc093blByb3BlcnR5KCBwcm9wICkgKSB7CgkJCU9iamVjdC5kZWZpbmVQcm9wZXJ0eSggb2JqLCBwcm9wLCB7CgkJCQlnZXQgOiBmdW5jdGlvbigpIHsKCQkJCQl0aHJvdyAnU2VjdXJpdHkgRXhjZXB0aW9uOiBDYW5ub3QgYWNjZXNzICcgKyBwcm9wOwoJCQkJCXJldHVybiAxOwoJCQkJfSwKCgkJCQljb25maWd1cmFibGUgOiBmYWxzZQoJCQl9KTsKCQl9Cgl9KTsgLyplbmQgd2hpbGUqLwp9KTsKCk9iamVjdC5kZWZpbmVQcm9wZXJ0eSggQXJyYXkucHJvdG90eXBlLCAnam9pbicsIHsKCXdyaXRhYmxlOiBmYWxzZSwKCWNvbmZpZ3VyYWJsZTogZmFsc2UsCgllbnVtcmFibGU6IGZhbHNlLAoKCXZhbHVlOiAoZnVuY3Rpb24gKCBvbGQgKSB7CgkJcmV0dXJuIGZ1bmN0aW9uICggYXJnICkgewoJCQlpZiAoIHRoaXMubGVuZ3RoID4gNTAwIHx8IChhcmcgJiYgYXJnLmxlbmd0aCA+IDUwMCkgKSB7CgkJCQl0aHJvdyAnRXhjZXB0aW9uOiB0b28gbWFueSBpdGVtcyc7CgkJCX0KCgkJCXJldHVybiBvbGQuYXBwbHkoIHRoaXMsIGFyZ3VtZW50cyApOwoJCX07Cgl9KCBBcnJheS5wcm90b3R5cGUuam9pbiApKQp9KTsKCihmdW5jdGlvbigpewoJInVzZSBzdHJpY3QiOwoKCXZhciBjb25zb2xlID0gewoJCV9pdGVtcyA6IFtdLAoJCWxvZyA6IGZ1bmN0aW9uKCkgewoJCQljb25zb2xlLl9pdGVtcy5wdXNoLmFwcGx5KCBjb25zb2xlLl9pdGVtcywgYXJndW1lbnRzICk7CgkJfQoJfTsKCXZhciBwID0gY29uc29sZS5sb2cuYmluZCggY29uc29sZSApOwoKCWZ1bmN0aW9uIGV4ZWMgKCBjb2RlICkgewoJCXZhciByZXN1bHQ7CgkJdHJ5IHsKCQkJcmVzdWx0ID0gZXZhbCggJyJ1c2Ugc3RyaWN0Ijt1bmRlZmluZWQ7XG4nICsgY29kZSApOwoJCX0KCQljYXRjaCAoIGUgKSB7CgkJCXJlc3VsdCA9IGUudG9TdHJpbmcoKTsKCQl9CgoJCXJldHVybiByZXN1bHQ7Cgl9CgoJc2VsZi5vbm1lc3NhZ2UgPSBmdW5jdGlvbiAoIGV2ZW50ICkgewoJCXZhciBqc29uU3RyaW5naWZ5ID0gSlNPTi5zdHJpbmdpZnksIC8qYmFja3VwKi8KCQkJcmVzdWx0ID0gZXhlYyggZXZlbnQuZGF0YS5jb2RlICk7CgoJCS8qSlNPTi5zdHJpbmdpZnkgZG9lcyBub3QgbGlrZSBmdW5jdGlvbnMsIGVycm9ycyBvciB1bmRlZmluZWQqLwoJCXZhciBzdHJ1bmcgPSB7IEZ1bmN0aW9uIDogdHJ1ZSwgRXJyb3IgOiB0cnVlLCBVbmRlZmluZWQgOiB0cnVlIH07CgkJdmFyIHJldml2ZXIgPSBmdW5jdGlvbiAoIGtleSwgdmFsdWUgKSB7CgkJCXZhciB0eXBlID0gKCB7fSApLnRvU3RyaW5nLmNhbGwoIHZhbHVlICkuc2xpY2UoIDgsIC0xICksCgkJCQlvdXRwdXQ7CgoJCQlpZiAoIHR5cGUgaW4gc3RydW5nICkgewoJCQkJb3V0cHV0ID0gJycgKyB2YWx1ZTsKCQkJfQoJCQllbHNlIHsKCQkJCW91dHB1dCA9IHZhbHVlOwoJCQl9CgoJCQlyZXR1cm4gb3V0cHV0OwoJCX07CgoJCXBvc3RNZXNzYWdlKHsKCQkJYW5zd2VyIDoganNvblN0cmluZ2lmeSggcmVzdWx0LCByZXZpdmVyICksCgkJCWxvZyAgICA6IGpzb25TdHJpbmdpZnkoIGNvbnNvbGUuX2l0ZW1zLCByZXZpdmVyICkuc2xpY2UoMSwgLTEpCgkJfSk7Cgl9OwoKfSkoKTsK' );
var blob = new Blob( [worker_code], { type : 'application/javascript' } ),
	code_url = window.URL.createObjectURL( blob );

return function ( msg ) {
	var timeout,
		worker = new Worker( code_url );

	worker.onmessage = function ( evt ) {
		finish( dressUpAnswer(evt.data) );
	};

	worker.onerror = function ( error ) {
		finish( error.toString() );
	};

	worker.postMessage({
		code : msg.content.replace( /^>/, '' )
	});

	timeout = window.setTimeout(function() {
		finish( 'Maximum execution time exceeded' );
	}, 50 );

	function finish ( result ) {
		clearTimeout( timeout );
		worker.terminate();
		msg.directreply( result );
	}
};

function dressUpAnswer ( answerObj ) {
	console.log( answerObj, 'eval answerObj' );
	var answer = answerObj.answer,
		log = answerObj.log,
		result;

	result = snipAndCodify( answer );

	if ( log && log.length ) {
		result += ' Logged: ' + snipAndCodify( log );
	}

	return result;
}
function snipAndCodify ( str ) {
	var ret;

	if ( str.length > 400 ) {
		ret = '`' +  str.slice(0, 400) + '` (snip)';
	}
	else {
		ret = '`' + str +'`';
	}

	return ret;
}
}());

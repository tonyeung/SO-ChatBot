var WebSocket = require( 'websocket' ).client,
    http = require( 'http' ),
    qs = require( 'querystring' ),
    util = require( 'util' );

var opts = require( './data/opts.json' ),
    data  = require( './data/results.json' );

function retrieveSocketURL ( next ) {
    var request = http.request({
        hostname : 'chat.stackoverflow.com',
        method : 'POST',
        path : '/ws-auth',
        headers : {
            'User-Agent' : opts.user_agent,
            'Content-Type' : 'application/x-www-form-urlencoded',
            Cookie : data.cookies
        }
    }, done);

    request.on( 'error', function (e) {
        console.log( 'request error: ' + e.toString() );
    });

    request.write(qs.stringify({
        fkey : data.headers.fkey,
        roomid : opts.roomid
    }));

    request.end();

    function done ( response ) {
        console.log( 'status: ' + response.statusCode );
        response.setEncoding( 'utf8' );
        response.on( 'data', read );

        function read ( body ) {
            next( JSON.parse(body).url );
        }
    }
}

function openSocket ( url ) {
    console.log( url );
    var ws = new WebSocket();
    
    ws.on('connectFailed', function ( e ) {
        console.log( 'ws connect error: ' + e.toString() );
    });
    ws.on( 'connect', listen );
    ws.connect( url, null, null, {
        'User-Agent' : opts.user_agent,
        Cookies : data.cookies
    });
    
    function listen ( conn ) {
        util.debug( 'connected' );
        
        conn.on( 'error', util.error.bind(util) );
        conn.on( 'close', console.log.bind(console) );
        
        conn.on( 'message', function ( msg ) {
            console.log( msg );
        });
    }
}

retrieveSocketURL( openSocket );
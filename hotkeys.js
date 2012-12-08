document.body.addEventListener( 'keypress', function ( e ) {
	var nodeName = e.target.nodeName.toLowerCase();
	if ( nodeName !== 'textarea' && nodeName !== 'input' ) {
		input.inpt.focus();
	}
});

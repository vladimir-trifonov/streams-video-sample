import $ from 'jquery';
import Stream from 'components/stream/module.js';
import Studio from 'components/studio/module.js';
import io from 'socket.io-client';
import ss from 'socket.io-stream';

$(() => {
	let str = null;
	let socket = io();
	var stream = ss.createStream();
	switch (window.location.pathname) {
		case '/studio':
			let src = new Studio('#view');
			str = new Stream('#view', false);
			str.toCanvas(src);

			str.toSocket(socket, stream);
			break;
		default:
			str = new Stream('#view');
			
			str.fromSocket(socket, stream);
			break;
	}
});
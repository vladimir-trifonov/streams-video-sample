var ss = require('socket.io-stream');
var studio = null;

module.exports = function(io) {
	io.on('connection', (socket) => {
		ss(socket).on('studio', (stream) => {
			studio = stream;
		});
		ss(socket).on('stream', (stream) => {
			studio && studio.pipe(stream);
		})
	});
}
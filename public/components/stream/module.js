import $ from 'jquery';
import tpl from './index.html';
import ss from 'socket.io-stream';

class Stream {
	constructor(sel, visible) {
		this._render(sel);
		this._init(visible);
	}

	_render(sel) {
		$(sel).append(tpl);
	}

	_init(visible) {
		this.canvas = $('#stream #watch');

		if(visible === false) {
			this.canvas.hide();
		}

		this.canvas = this.canvas[0];
		this.context = this.canvas.getContext('2d');

		this.canvas.width = 800;
		this.canvas.height = 600;

		this.context.width = this.canvas.width;
		this.context.height = this.canvas.height;
	}

	_viewVideo(video) {
		this.context.drawImage(video, 0, 0, this.context.width, this.context.height);	
		this.stream && this.stream.write(this.canvas.toDataURL('image.webp'));	
	}

	toCanvas(src) {
		setInterval(() => {
			this._viewVideo.call(this, src);
		}, 500);

		return this;
	}

	toSocket(socket, stream) {
		this.stream = stream;
		socket && ss(socket).emit('studio', this.stream);

		return this;
	}

	fromSocket(socket, stream) {
		socket && ss(socket).emit('stream', stream);
		stream && stream.on('data', (data) => {
			var img = new Image;
			img.onload = () => {
				this._viewVideo.call(this, img);
			};
			img.src = data;
		});
	}
}

export default Stream;
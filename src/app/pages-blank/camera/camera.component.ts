import { API } from './../../config/api';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

@Component({
	selector: 'app-camera',
	templateUrl: './camera.component.html',
	styleUrls: ['./camera.component.css'],
})
export class CameraComponent implements OnInit {
	@ViewChild('videoRoot', { static: true })
	videoElement: ElementRef;

	canvas: HTMLCanvasElement;

	canvasContext: CanvasRenderingContext2D;

	webSocket: WebSocket;

	constructor() {}

	async ngOnInit() {
		this.initCanvas();

		this.initWebSocket();

		this.initStream();
	}

	initCanvas() {
		this.canvas = document.createElement('canvas');
		this.canvas.width = window.innerWidth;
		this.canvas.height = window.innerHeight;
		this.canvasContext = this.canvas.getContext('2d');
	}

	initWebSocket() {
		this.webSocket = new WebSocket(API.webSocketUrl);
	}

	async initStream() {
		const stream = await navigator.mediaDevices.getUserMedia({
			video: { width: window.innerWidth, height: window.innerHeight },
		});

		this.webSocket.addEventListener('open', () => {
			requestAnimationFrame(() => {
				this.webSocket.send(this.getFrame());
			});
		});
	}

	getFrame() {
		this.canvasContext.drawImage(this.videoElement.nativeElement, 0, 0);
		const image = this.canvas.toDataURL('image/png');
		console.log(image);
		return image;
	}
}

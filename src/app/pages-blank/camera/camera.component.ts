import { API } from './../../config/api';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

@Component({
	selector: 'app-camera',
	templateUrl: './camera.component.html',
	styleUrls: ['./camera.component.css'],
})
export class CameraComponent implements OnInit {
	@ViewChild('videoRoot', { static: true })
	videoRef: ElementRef;

	@ViewChild('canvasRoot', { static: true })
	canvasRef: ElementRef;

	canvasContext: CanvasRenderingContext2D;

	webSocket: WebSocket;

	constructor() {}

	async ngOnInit() {
		this.initCanvas();

		this.initWebSocket();

		this.initStream();
	}

	initCanvas() {
		this.canvasRef.nativeElement = document.createElement('canvas');
		this.canvasRef.nativeElement.width = window.innerWidth;
		this.canvasRef.nativeElement.height = window.innerHeight;
		this.canvasContext = this.canvasRef.nativeElement.getContext('2d');
	}

	initWebSocket() {
		this.webSocket = new WebSocket(API.webSocketUrl);

		this.webSocket.addEventListener('open', () => {
			requestAnimationFrame(() => {
				this.webSocket.send(this.getFrame());
			});
		});
	}

	async initStream() {
		const stream = await navigator.mediaDevices.getUserMedia({
			video: { width: window.innerWidth, height: window.innerHeight },
		});
	}

	getFrame() {
		this.canvasContext.drawImage(this.videoRef.nativeElement, 0, 0);
		const image = this.canvasRef.nativeElement.toDataURL('image/png');
		console.log(image);
		return image;
	}
}

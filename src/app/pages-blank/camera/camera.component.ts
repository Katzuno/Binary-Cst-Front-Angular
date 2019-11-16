import { CONFIG } from './../../config/api';
import { Component, ElementRef, OnInit, OnDestroy, ViewChild } from '@angular/core';
import Nes from '@hapi/nes/lib/client';

@Component({
	selector: 'app-camera',
	templateUrl: './camera.component.html',
	styleUrls: ['./camera.component.css'],
})
export class CameraComponent implements OnInit, OnDestroy {
	@ViewChild('videoRoot', { static: true })
	videoRef: ElementRef;

	@ViewChild('canvasRoot', { static: true })
	canvasRef: ElementRef;

	canvasContext: CanvasRenderingContext2D;

	nesClient;

	lastUpdateTimestamp: number;

	lastFrame;

	videoRect: ClientRect;

	rectData = [];

	videoResizeObserver;

	constructor() {}

	ngOnInit() {
		this.initCanvas();

		this.initStream();

		this.initWebSocket();
	}

	ngOnDestroy() {
		this.videoResizeObserver.unobserve(this.videoRef.nativeElement);
	}

	initCanvas() {
		this.canvasRef.nativeElement.width = window.innerWidth;
		this.canvasRef.nativeElement.height = window.innerHeight;
		this.canvasContext = this.canvasRef.nativeElement.getContext('2d');
	}

	async initWebSocket() {
		this.nesClient = new Nes.Client(CONFIG.webSocketUrl);
		await this.nesClient.connect();

		this.nesClient.onUpdate = ({ type, data }) => {
			if (type === 'imageData') {
				this.rectData = [];

				if (!this.videoRect) return;

				data.forEach(
					({
						name: label,
						direction,
						area,
						confidence,
						vertex: { x1, x2, x3, x4, y1, y2, y3, y4 },
					}) => {
						this.rectData.push({
							width: (x2 - x1) * this.videoRect.width,
							height: (y4 - y2) * this.videoRect.height,
							x: x1 * this.videoRect.width,
							y: y1 * this.videoRect.height,

							label,
							confidence: confidence.toFixed(2),
						});
					}
				);
			} else {
				//
			}
		};

		this.lastUpdateTimestamp = performance.now();
		requestAnimationFrame(() => {
			this.sendFrameToWebSocket();
		});
	}

	async initStream() {
		const stream = await navigator.mediaDevices.getUserMedia({
			video: {
				width: window.innerWidth,
				height: window.innerHeight,
				facingMode: 'environment',
			},
		});

		this.videoRef.nativeElement.srcObject = stream;

		// @ts-ignore
		this.videoResizeObserver = new ResizeObserver(entries => {
			this.videoRect = entries[0].contentRect;

			this.canvasRef.nativeElement.width = this.videoRect.width;
			this.canvasRef.nativeElement.height = this.videoRect.height;
		});

		this.videoResizeObserver.observe(this.videoRef.nativeElement);
	}

	sendFrameToWebSocket() {
		requestAnimationFrame(() => {
			this.sendFrameToWebSocket();
		});

		const currentTimestamp = performance.now();
		const deltaTime = currentTimestamp - this.lastUpdateTimestamp;

		this.canvasContext.drawImage(this.videoRef.nativeElement, 0, 0);
		const image = this.canvasRef.nativeElement.toDataURL('image/jpeg');
		this.lastFrame = image;
		this.drawRect();

		if (deltaTime < 1000 / CONFIG.fps) {
			return;
		}

		this.lastUpdateTimestamp = currentTimestamp;
		this.nesClient.message(image);
	}

	drawRect() {
		if (!this.rectData || this.rectData.length <= 0) return;

		console.log(this.rectData);

		const fontSize = 16;
		const padding = 8;
		const strokeSize = 2;
		const rectColor = 'green';
		const rectColorContrast = 'white';

		this.rectData.forEach(({ x, y, width, height, label, confidence }) => {
			const text = `${label}: ${confidence}`;

			const textWidth = this.canvasContext.measureText(text).width;
			const textHeight = fontSize + 2 * padding;

			this.canvasContext.fillRect(
				x,
				y - (fontSize + padding * 2 - textHeight),
				textWidth + padding * 2,
				fontSize + padding * 2
			);

			this.canvasContext.font = `${fontSize}px Roboto`;
			this.canvasContext.fillStyle = rectColorContrast;
			this.canvasContext.fillText(text, x + padding, y + padding + textHeight / 2);

			this.canvasContext.beginPath();
			this.canvasContext.lineWidth = 2;
			this.canvasContext.fillStyle = rectColor;
			this.canvasContext.strokeStyle = rectColor;
			this.canvasContext.rect(x, y, width, height);
			this.canvasContext.stroke();
		});
	}
}

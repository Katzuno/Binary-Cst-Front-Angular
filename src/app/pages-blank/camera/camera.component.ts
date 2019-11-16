import {CONFIG} from './../../config/api';
import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import Nes from '@hapi/nes/lib/client';

@Component({
    selector: 'app-camera',
    templateUrl: './camera.component.html',
    styleUrls: ['./camera.component.css'],
})
export class CameraComponent implements OnInit {
    @ViewChild('videoRoot', {static: true})
    videoRef: ElementRef;

    @ViewChild('canvasRoot', {static: true})
    canvasRef: ElementRef;

    canvasContext: CanvasRenderingContext2D;

    nesClient;

    lastUpdateTimestamp: number;

    lastFrame;

    constructor() {
    }

    async ngOnInit() {
        this.initCanvas();

        this.initStream();

        this.initWebSocket();
    }

    initCanvas() {
        this.canvasRef.nativeElement.width = window.innerWidth;
        this.canvasRef.nativeElement.height = window.innerHeight;
        this.canvasContext = this.canvasRef.nativeElement.getContext('2d');
    }

    async initWebSocket() {
        this.nesClient = new Nes.Client(CONFIG.webSocketUrl);
        await this.nesClient.connect();

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

        if (deltaTime < 1000 / CONFIG.fps) {
            return;
        }

        this.lastUpdateTimestamp = currentTimestamp;
        this.nesClient.message(image);
    }
}

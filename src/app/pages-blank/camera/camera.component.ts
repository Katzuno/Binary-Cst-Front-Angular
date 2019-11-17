import {CONFIG} from './../../config/api';
import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import Nes from '@hapi/nes/lib/client';
import {VoiceService} from 'src/app/services/voice.service';

@Component({
    selector: 'app-camera',
    templateUrl: './camera.component.html',
    styleUrls: ['./camera.component.css'],
})
export class CameraComponent implements OnInit, OnDestroy {
    @ViewChild('videoRoot', {static: true})
    videoRef: ElementRef;

    @ViewChild('canvasRoot', {static: true})
    canvasRef: ElementRef;

    canvasContext: CanvasRenderingContext2D;

    nesClient;

    lastUpdateTimestamp: number;

    lastFrame;

    videoRect: ClientRect;

    rectData = [];

    videoResizeObserver;

    searchObjects = {};

    constructor(private voiceService: VoiceService) {
    }

    ngOnInit() {
        this.initCanvas();

        this.initStream();

        this.initWebSocket();

        this.alertObjects();

    }

    ngOnDestroy() {
        this.videoResizeObserver.unobserve(this.videoRef.nativeElement);
    }

    alertObjects() {
        setInterval(() => {
            let text = 'You have ';

            const alertData = this.rectData
                .filter(obj => ['Person', 'Table', 'Chair', 'Furniture'].map(e => e.toLowerCase()).includes(obj.label));
            alertData.sort((a, b) => {
                const ac = a.area * a.distance;
                const bc = b.area * b.distance;
                if (ac < bc) {
                    return -1;
                }
                if (ac > bc) {
                    return 1;
                }
                return 0;
            });

            if (alertData[0]) {
                text += `a ${alertData[0].label} on ${alertData[0].direction}`;
            }
            if (alertData[1]) {
                text += ` and a ${alertData[1].label} on ${alertData[1].direction}`;
            }

            if (text === 'You have ') {
                return;
            }
            this.voiceService.read(text);
        }, 5000);
    }

    initCanvas() {
        this.canvasRef.nativeElement.width = window.innerWidth;
        this.canvasRef.nativeElement.height = window.innerHeight;
        this.canvasContext = this.canvasRef.nativeElement.getContext('2d');
    }

    async initWebSocket() {
        this.nesClient = new Nes.Client(CONFIG.webSocketUrl);
        await this.nesClient.connect();

        this.nesClient.onUpdate = ({type, data}) => {
            if (type === 'imageData') {
                this.rectData = [];

                if (!this.videoRect) {
                    return;
                }

                data.forEach(({name: label, direction, area, distance, confidence, vertex: {x1, x2, x3, x4, y1, y2, y3, y4}}) => {
                        if (area > 0.1 && distance < 40) {
                            this.rectData.push({
                                width: (x2 - x1) * this.videoRect.width,
                                height: (y4 - y2) * this.videoRect.height,
                                x: x1 * this.videoRect.width,
                                y: y1 * this.videoRect.height,

                                label,
                                confidence: confidence.toFixed(2),
                                area: area.toFixed(2),
                                direction,
                                distance: (distance / 10).toFixed(2)
                            });
                        }

                        //Check if search objects are in frame
                        let text = 'I found ';
                        for (let objLabel in this.searchObjects) {
                            if (this.searchObjects[objLabel].includes(label)) {
                                text += label + ' on ' + direction;
                                delete this.searchObjects[objLabel];
                            }
                        }
                        if (text !== 'I found ') {
                            this.voiceService.read(text);
                        }
                    }
                );
            } else if (type === 'responses') {
                let res = 'You have ' + data.length + ' responses to your question. ';
                data.forEach(response => {
                    res += response.response + ', ';
                });
                this.voiceService.read(res);
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
        this.nesClient.message({
            image,
            width: Math.max(window.innerWidth, window.innerHeight),
            height: Math.min(window.innerWidth, window.innerHeight),
        });
    }

    drawRect() {
        if (!this.rectData || this.rectData.length <= 0) {
            return;
        }

        // console.log(this.rectData);

        const fontSize = 16;
        const padding = 8;
        const strokeSize = 2;
        const rectColor = 'green';
        const rectColorContrast = 'white';

        // this.rectData = this.rectData.filter(e => e.area > 0.1 && e.distance < 1.5);

        this.rectData.forEach(({x, y, width, height, label, confidence, area, direction, distance}) => {
            const text = `${label}: ${distance} | ${area} | ${direction}`;

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

    callCommand(cmd) {
        this.voiceService.read('Sure! I will search the room for a ' + cmd.label);
        this.searchObjects[cmd.label] = cmd.tags;
        // console.log(this.searchObjects);
    }
}

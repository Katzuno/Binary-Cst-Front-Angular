import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { VoiceService } from 'src/app/services/voice.service';

@Component({
	selector: 'app-stot',
	templateUrl: './stot.component.html',
	styleUrls: ['./stot.component.css'],
})
export class StotComponent implements OnInit {
	@ViewChild('readButton', { static: true })
	readButton: ElementRef;

	constructor(private voiceService: VoiceService) {}

	ngOnInit() {
		window.addEventListener('click', () => {
			this.voiceService.start(this.onResult.bind(this));
		});
	}

	onResult(event) {
		const current = event.resultIndex;

		const transcript = event.results[current][0].transcript;

		const mobileRepeatBug = current === 1 && transcript === event.results[0][0].transcript;

		if (!mobileRepeatBug) {
			console.log(transcript);
			this.voiceService.read(transcript);
		}
	}
}

import { Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root',
})
export class VoiceService {
	recognition;

	constructor() {
		try {
			// @ts-ignore
			const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
			this.recognition = new SpeechRecognition();
		} catch (e) {
			console.error(e);
		}
	}

	start(f) {
		this.recognition.onresult = f;

		this.recognition.continuous = true;
		this.recognition.start();

		this.recognition.onstart = () => {};

		this.recognition.onspeechend = () => {
			setTimeout(() => {
				this.recognition.start();
			}, 10);
		};
	}

	read(message) {
		const speech = new SpeechSynthesisUtterance();

		// Set the text and voice attributes.
		speech.text = message;
		speech.volume = 1;
		speech.rate = 1.4;
		speech.pitch = 1;

		window.speechSynthesis.speak(speech);
	}
}

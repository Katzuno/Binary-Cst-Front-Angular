import {Injectable} from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class VoiceService {
    recognition;

    constructor() {
        try {
            // @ts-ignore
            const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
            this.recognition = new SpeechRecognition();

            this.recognition.continuous = true;
        } catch (e) {
            console.error(e);
        }
    }

    start(f) {
        this.recognition.onresult = f;

        this.recognition.start();

        this.recognition.onstart = function () {
            console.log('Voice recognition activated. Try speaking into the microphone.');
        };

        this.recognition.onspeechend = function () {
            console.log('You were quiet for a while so voice recognition turned itself off.');
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

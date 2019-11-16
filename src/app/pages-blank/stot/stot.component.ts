import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'app-stot',
    templateUrl: './stot.component.html',
    styleUrls: ['./stot.component.css']
})
export class StotComponent implements OnInit {
    recognition;

    constructor() {
    }

    ngOnInit() {
        try {
            // @ts-ignore
            const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
            this.recognition = new SpeechRecognition();

            this.initRec();
        } catch (e) {
            console.error(e);
        }
    }

    initRec() {
        this.recognition.continuous = true;

        this.recognition.onresult = this.onResult.bind(this);

        this.recognition.start();

        this.recognition.onstart = function () {
            console.log('Voice recognition activated. Try speaking into the microphone.');
        };

        this.recognition.onspeechend = function () {
            console.log('You were quiet for a while so voice recognition turned itself off.');
        };

        // setTimeout(() => {
        //     this.recognition.stop();
        // }, 5000);
    }

    readOutLoud(message) {
        const speech = new SpeechSynthesisUtterance();

        // Set the text and voice attributes.
        speech.text = message;
        speech.volume = 1;
        speech.rate = 1;
        speech.pitch = 1;

        window.speechSynthesis.speak(speech);
    }

    onResult(event) {
        const current = event.resultIndex;

        const transcript = event.results[current][0].transcript;

        const mobileRepeatBug = (current === 1 && transcript === event.results[0][0].transcript);

        if (!mobileRepeatBug) {
            console.log(transcript);
            this.readOutLoud(transcript);
        }
    }


}

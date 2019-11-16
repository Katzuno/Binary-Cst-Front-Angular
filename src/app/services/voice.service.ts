import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {CONFIG} from 'src/app/config/api';

@Injectable({
    providedIn: 'root',
})
export class VoiceService {
    recognition;

    constructor(private http: HttpClient) {
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

        this.recognition.onstart = () => {
        };

        this.recognition.onspeechend = () => {
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

    postQuestion(q, img) {
        return this.http.post(CONFIG.apiUrl + '/questions', {questions: q, image: img});
        // console.log('post question', q, img);
    }

    get questions() {
        return this.http.get(CONFIG.apiUrl + '/questions');
    }
}

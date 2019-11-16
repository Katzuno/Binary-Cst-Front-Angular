import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {VoiceService} from 'src/app/services/voice.service';

@Component({
    selector: 'app-stot',
    templateUrl: './stot.component.html',
    styleUrls: ['./stot.component.css'],
})
export class StotComponent implements OnInit {
    @Input() img;
    @ViewChild('readButton', {static: true})
    readButton: ElementRef;

    postQuestion = false;
    question: string;

    constructor(private voiceService: VoiceService) {
    }

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
            if (this.postQuestion) {
                if (transcript.includes('yes')) {
                    this.voiceService.postQuestion(this.question, this.img).toPromise().then(res => {
                        console.log(res);
                    });
                    this.voiceService.read('Great, just posted it for you. Have a great day!');
                }
                this.postQuestion = false;
                return;
            }
            // console.log(transcript);
            // this.voiceService.read(transcript);
            this.checkCommand(transcript);
        }
    }

    checkCommand(command: string) {
        if (command.includes('water')) {
            console.log('I NEED WATER');
        } else {
            this.question = command;
            this.voiceService.read('Sorry, I can not help you with this. Wold you like to post this question ?');
            this.postQuestion = true;
        }
    }
}

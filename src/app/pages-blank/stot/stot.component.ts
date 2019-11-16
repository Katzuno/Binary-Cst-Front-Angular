import {Component, OnInit} from '@angular/core';
import {VoiceService} from 'src/app/services/voice.service';

@Component({
    selector: 'app-stot',
    templateUrl: './stot.component.html',
    styleUrls: ['./stot.component.css']
})
export class StotComponent implements OnInit {


    constructor(private voiceService: VoiceService) {
    }

    ngOnInit() {
        this.voiceService.start(this.onResult.bind(this));
    }


    onResult(event) {
        const current = event.resultIndex;

        const transcript = event.results[current][0].transcript;

        const mobileRepeatBug = (current === 1 && transcript === event.results[0][0].transcript);

        if (!mobileRepeatBug) {
            console.log(transcript);
            // this.readOutLoud(transcript);
            this.voiceService.read(transcript);
        }
    }


}

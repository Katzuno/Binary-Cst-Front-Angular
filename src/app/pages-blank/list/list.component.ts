import {Component, OnInit} from '@angular/core';
import {VoiceService} from 'src/app/services/voice.service';
import swal from 'sweetalert2';

declare var $: any;

@Component({
    selector: 'app-list',
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
    questions;

    constructor(private voiceService: VoiceService) {
    }

    ngOnInit() {
        this.questions = this.voiceService.questions;
    }

    showAlert(q_id) {
        swal({
            title: 'Input something',
            html: '<div class="form-group">' +
                '<input id="input-field" type="text" class="form-control" />' +
                '</div>',
            showCancelButton: true,
            confirmButtonClass: 'btn btn-success',
            cancelButtonClass: 'btn btn-danger',
            buttonsStyling: false
        }).then(result => {
            this.voiceService.postResponse(q_id, $('#input-field').val()).toPromise().then((res) => {
                // @ts-ignore
                if (res.data != false) {
                    document.getElementById('q' + q_id).remove();
                }
                swal({
                    type: 'success',
                    html: 'Response submitted!',
                    confirmButtonClass: 'btn btn-success',
                    buttonsStyling: false

                });
            });
        }).catch(swal.noop);
    }
}

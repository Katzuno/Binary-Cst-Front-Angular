import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {StotComponent} from './stot.component';

describe('StotComponent', () => {
    let component: StotComponent;
    let fixture: ComponentFixture<StotComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [StotComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(StotComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});

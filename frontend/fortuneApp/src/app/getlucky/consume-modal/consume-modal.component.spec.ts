import { async, ComponentFixture, inject, TestBed } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { I18nModule } from 'src/app/i18n/i18n.module';

import { ConsumeModalComponent } from './consume-modal.component';

describe('ConsumeModalComponent', () => {
  let component: ConsumeModalComponent;
  let fixture: ComponentFixture<ConsumeModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [I18nModule],
      declarations: [ ConsumeModalComponent ],
      providers: [ NgbActiveModal ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsumeModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', async(inject([NgbActiveModal], (activeModal: NgbActiveModal) => {
    expect(component).toBeTruthy();
  })));
});

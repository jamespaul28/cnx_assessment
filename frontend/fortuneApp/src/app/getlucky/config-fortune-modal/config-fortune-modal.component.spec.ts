import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigFortuneModalComponent } from './config-fortune-modal.component';

describe('ConfigFortuneModalComponent', () => {
  let component: ConfigFortuneModalComponent;
  let fixture: ComponentFixture<ConfigFortuneModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfigFortuneModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfigFortuneModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

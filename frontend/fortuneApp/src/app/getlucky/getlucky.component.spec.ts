import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GetluckyComponent } from './getlucky.component';

describe('GetluckyComponent', () => {
  let component: GetluckyComponent;
  let fixture: ComponentFixture<GetluckyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GetluckyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GetluckyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

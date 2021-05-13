import { async, ComponentFixture, inject, TestBed } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { I18nModule } from 'src/app/i18n/i18n.module';
import {HttpClientTestingModule} from '@angular/common/http/testing'

import { ConfigFortuneModalComponent } from './config-fortune-modal.component';
import { FortuneService } from 'src/app/fortune.service';
import { of } from 'rxjs';

function delay(ms: number) {
  return new Promise( resolve => setTimeout(resolve, ms) );
}

describe('ConfigFortuneModalComponent', () => {
  let component: ConfigFortuneModalComponent;
  let fixture: ComponentFixture<ConfigFortuneModalComponent>;
  let fortuneService: FortuneService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports : [ I18nModule, HttpClientTestingModule], 
      declarations: [ ConfigFortuneModalComponent ],
      providers : [ NgbActiveModal]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfigFortuneModalComponent);
    component = fixture.componentInstance;

    fortuneService = TestBed.inject(FortuneService)
    fixture.detectChanges();
  });

  it('should create', async(inject([NgbActiveModal], (activeModal: NgbActiveModal) => {
    expect(component).toBeTruthy();
  })));

  it('should have correct values after edit function is called', () => {
    var initMode = component.editMode
    component.edit()

    expect(component.editMode).not.toEqual(initMode)
    expect(component.listToDel.IDs.length).toEqual(0)
    expect(component.newFortune.fortune).toBe('')
  });

  it('should have correct values after isDelete function is called - add new id to delete', () => {
    component.listToDel.IDs = [1,2,3,4,5]
    component.isDelete(6)

    expect(component.listToDel.IDs).toEqual([1,2,3,4,5,6])
  });

  it('should have correct values after isDelete function is called - remove id in delete list', () => {
    component.listToDel.IDs = [1,2,3,4,5]
    component.isDelete(5)

    expect(component.listToDel.IDs).toEqual([1,2,3,4])
  });

  it('should have correct values after DeleteFortune function is called', async () => {
    var sampleData = [{id: 1, fortune: 'hello fortune'}];
    spyOn(fortuneService, 'deleteFortune').and.returnValue(of(sampleData));
    spyOn(fortuneService, 'getFortune').and.returnValue(of(sampleData));
    component.DeleteFortune();

    await delay(1000);

    expect(fortuneService.deleteFortune).toHaveBeenCalled();
    expect(fortuneService.getFortune).toHaveBeenCalled();
    expect(component.listToDel.IDs.length).toEqual(0);
    expect(component.allFortune).toEqual(sampleData);
    expect(component.isDeleting).toBeFalsy();
  });

  it('should have correct values after AddFortune function is called', async () => {
    var sampleData = [{id: 1, fortune: 'hello fortune'}];
    spyOn(fortuneService, 'addFortune').and.returnValue(of(sampleData));
    spyOn(fortuneService, 'getFortune').and.returnValue(of(sampleData));
    component.AddFortune();

    await delay(1000);

    expect(fortuneService.addFortune).toHaveBeenCalled();
    expect(fortuneService.getFortune).toHaveBeenCalled();
    expect(component.newFortune.fortune).toBe('');
    expect(component.allFortune).toEqual(sampleData);
    expect(component.isAdding).toBeFalsy();
  });

});

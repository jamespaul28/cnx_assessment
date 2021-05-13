import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';

import { GetluckyComponent } from './getlucky.component';
import { I18nModule } from '../i18n/i18n.module';
import { FortuneService } from '../fortune.service';
import { of } from 'rxjs';
import { translate } from '@angular/localize/src/utils';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { faLastfm } from '@fortawesome/free-brands-svg-icons';

class MockNgbModalRefYes {
  result: Promise<any> = new Promise((resolve, reject) => resolve('Yes'));
}

class MockNgbModalRefNo {
  result: Promise<any> = new Promise((resolve, reject) => resolve('No'));
}

class MockNgbModalRefFortune {
  componentInstance = {allFortune: {id: 321, fortune:"Hello world"}}

  result: Promise<any> = new Promise((resolve, reject) => resolve([{id:0, fortune:"sample"}]));
}

function delay(ms: number) {
  return new Promise( resolve => setTimeout(resolve, ms) );
}

describe('GetluckyComponent', () => {
  let component: GetluckyComponent;
  let fixture: ComponentFixture<GetluckyComponent>;
  let fortuneService: FortuneService;
  let modalService: NgbModal;
  let sampleData = [{id: 1, fortune: 'hello fortune'}]

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports : [HttpClientModule, I18nModule],
      declarations: [GetluckyComponent]
    }).compileComponents();
  }));

  beforeEach(async () => {
    fixture = TestBed.createComponent(GetluckyComponent);
    component = fixture.componentInstance;

    fortuneService = TestBed.inject(FortuneService);
    modalService = TestBed.inject(NgbModal)

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have correct init values', () => {
    spyOn(fortuneService, 'getFortune').and.returnValue(of(sampleData));
    component.ngOnInit();

    expect(component.state).toBe("draw");
    expect(component.userFortune).toBeNull();
    expect(component.newFortune).toBe('');
    expect(fortuneService.getFortune).toHaveBeenCalled();
    expect(component.allFortune).toEqual(sampleData);
  });

  it('should have correct values after getFortune call', () => {
    spyOn(fortuneService, 'getFortune').and.returnValue(of(sampleData));
    component.getFortune();

    expect(component.state).toBe("draw");
    expect(component.userFortune).toBeNull();
    expect(component.newFortune).toBe('');
    expect(fortuneService.getFortune).toHaveBeenCalled();
    expect(component.allFortune).toEqual(sampleData);
  });

  it('should have correct values after drawFortune call', () => {
    component.allFortune = sampleData;
    component.drawFortune()
    expect(component.userFortune).toBeDefined();
    expect(component.lastAction).toEqual(component.translate.instant('LastActionDrawFortune'));
    expect(component.state).toBe('show')
  });

  it('should have correct values after updateFortune call', () => {
    spyOn(fortuneService, 'consumeFortune').and.returnValue(of({affected: 1}));
    component.newFortune = 'update fortune to'
    component.userFortune = {id: 1, fortune: 'sample'}
    component.updateFortune()

    expect(fortuneService.consumeFortune).toHaveBeenCalled()
    expect(component.lastAction).toEqual(component.translate.instant('LastActionSuccessUpdate'))
    expect(component.state).toBe('draw')
  });

  it('should have correct values after updateFortune call - other user deleted target fortune', () => {
    spyOn(fortuneService, 'consumeFortune').and.returnValue(of({affected: 0}));
    component.newFortune = 'update fortune to'
    component.userFortune = {id: 1, fortune: 'sample'}
    component.updateFortune()

    expect(fortuneService.consumeFortune).toHaveBeenCalled()
    expect(component.lastAction).toEqual(component.translate.instant('LastActionSomeoneDeleted'))
    expect(component.state).toBe('draw')
  });

  it('should have correct values after updateFortune call - user forgot to input new fortune', () => {
    spyOn(fortuneService, 'consumeFortune').and.returnValue(of({affected: 1}));
    component.updateFortune()

    expect(fortuneService.consumeFortune).not.toHaveBeenCalled()
    expect(component.lastAction).toEqual(component.translate.instant('LastActionForgotToUpdate'))
  });

  it('should have correct values after cancelUpdate call', () => {
    component.cancelUpdate()

    expect(component.lastAction).toEqual(component.translate.instant('LastActionConsumedFortune'))
    expect(component.userFortune).toBeNull()
    expect(component.newFortune).toBe('')
    expect(component.state).toBe('draw')
  });

  it('should have correct values after openConsumption call - yes', async () => {
    var mockModalRef = new MockNgbModalRefYes()
    spyOn(modalService, 'open').and.returnValue(mockModalRef as any);
    
    component.openConsumption()

    expect(modalService.open).toHaveBeenCalled();
    // delay and wait for callback to finish
    await delay(1000);
    expect(component.state).toBe('update')
    expect(component.lastAction).toEqual('LastActionInputFortune') 
  });

  it('should have correct values after openConsumption call - no', async () => {
    var mockModalRef = new MockNgbModalRefNo()
    spyOn(modalService, 'open').and.returnValue(mockModalRef as any);
    
    component.openConsumption()

    expect(modalService.open).toHaveBeenCalled();
    // delay and wait for callback to finish
    await delay(1000);
    expect(component.state).toBe('draw')
    expect(component.lastAction).toEqual('LastActionConsumedFortune')
    expect(component.userFortune).toBeNull()
  });

  it('should have correct values after showAllFortune call', async () => {
    var mockModalRef = new MockNgbModalRefFortune()
    spyOn(modalService, 'open').and.returnValue(mockModalRef as any);
    
    component.allFortune = [{id: 123, fortune: "Sample"}]
    component.showAllFortune()

    expect(modalService.open).toHaveBeenCalled();
    // delay and wait for callback to finish
    await delay(1000);
    expect(component.allFortune).toEqual([{id:0,fortune:"sample"}])
  });

});

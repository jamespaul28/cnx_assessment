import { TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { FortuneService } from './fortune.service';

describe('FortuneService', () => {
  let service: FortuneService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports : [HttpClientModule]
    });
    service = TestBed.inject(FortuneService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

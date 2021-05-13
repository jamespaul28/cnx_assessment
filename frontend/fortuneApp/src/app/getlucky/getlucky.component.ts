import { Component, OnInit } from '@angular/core';
import { FortuneService, Fortune } from '../fortune.service';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { ConsumeModalComponent } from './consume-modal/consume-modal.component'
import { ConfigFortuneModalComponent } from './config-fortune-modal/config-fortune-modal.component';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-getlucky',
  templateUrl: './getlucky.component.html',
  styleUrls: ['./getlucky.component.css']
})
export class GetluckyComponent implements OnInit {
  allFortune: Fortune[];
  userFortune: Fortune;
  newFortune: string;
  lastAction: string;
  state = 'draw'; // There are 3 states draw, show, update.

  constructor(
    private fortuneService: FortuneService,
    private modalService: NgbModal,
    public translate:TranslateService
  ) {}

  ngOnInit(): void {
    this.getFortune();
  }

  getFortune(): void {
    this.fortuneService
      .getFortune()
      .subscribe((fortune) => (this.allFortune = fortune));
    this.userFortune = null;
    this.newFortune = '';
  }

  drawFortune(): void {
    this.userFortune = this.allFortune[
      Math.floor(Math.random() * this.allFortune.length)
    ];
    this.lastAction = this.translate.instant('LastActionDrawFortune');
    this.state = 'show';
  }

  updateFortune(): void {
    this.newFortune = this.newFortune.trim();
    if (this.newFortune != '') {
      const newFortune = { id: this.userFortune.id, fortune: this.newFortune };
      this.fortuneService
        .consumeFortune(newFortune)
        .subscribe((updated) => {
          if (updated) {
            this.lastAction = this.translate.instant('LastActionSuccessUpdate');
          } else {
            this.lastAction = this.translate.instant('LastActionSomeoneDeleted');
          }
          this.state = 'draw';
          this.getFortune()
        });
    } else {
      this.lastAction =
        this.translate.instant('LastActionForgotToUpdate');
    }
  }

  cancelUpdate(): void {
    this.lastAction = this.translate.instant('LastActionConsumedFortune');
    this.userFortune = null;
    this.newFortune = '';
    this.state = 'draw';
  }

  openConsumption() {
    const ngbModalOptions: NgbModalOptions = {
      backdrop: 'static',
      keyboard: false,
      ariaLabelledBy: 'modal-basic-title'
    };
    this.modalService.open(ConsumeModalComponent, ngbModalOptions).result.then((result) => {
      if (result === 'Yes') {
        this.state = 'update';
        this.lastAction =
          this.translate.instant('LastActionInputFortune');
      } else {
        this.state = 'draw';
        this.lastAction = this.translate.instant('LastActionConsumedFortune');
        this.userFortune = null;
      }
    });
  }

  showAllFortune() {
    const ngbModalOptions: NgbModalOptions = {
      backdrop: 'static',
      scrollable: true,
      keyboard: false,
      centered: true,
      ariaLabelledBy: 'modal-basic-title'
    };
    const configModalRef = this.modalService.open(ConfigFortuneModalComponent, ngbModalOptions);
    configModalRef.componentInstance.allFortune = this.allFortune
    configModalRef.result
      .then((result) => {
        this.allFortune = result
      })
  }
}

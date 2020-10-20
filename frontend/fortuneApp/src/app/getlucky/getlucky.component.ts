import { Component, OnInit } from '@angular/core';
import { FortuneService, Fortune } from '../fortune.service';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';

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
    private modalService: NgbModal
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
    this.lastAction =
      'You opened a fortune cookie! Consume it to open another cookie.';
    this.state = 'show';
  }

  updateFortune(): void {
    this.newFortune = this.newFortune.trim();
    if (this.newFortune != '') {
      const newFortune = { id: this.userFortune.id, fortune: this.newFortune };
      this.fortuneService
        .consumeFortune(newFortune)
        .subscribe((_) => this.getFortune());
      this.lastAction = 'You consumed a fortune cookie and changed a fortune!';
      this.state = 'draw';
    } else {
      this.lastAction =
        'You forgot to input a new fortune! you may click "Cancel Update" to open another cookie without updating the fortune.';
    }
  }

  cancelUpdate(): void {
    this.lastAction = 'You consumed a fortune cookie!';
    this.userFortune = null;
    this.newFortune = '';
    this.state = 'draw';
  }

  openConsumption(content) {
    const ngbModalOptions: NgbModalOptions = {
      backdrop: 'static',
      keyboard: false,
      centered: true,
      ariaLabelledBy: 'modal-basic-title'
    };
    this.modalService.open(content, ngbModalOptions).result.then((result) => {
      if (result === 'Yes') {
        this.state = 'update';
        this.lastAction =
          'Input the new fortune you want in the text field and click "Update Fortune".';
      } else {
        this.state = 'draw';
        this.lastAction = 'You consumed a fortune cookie!';
        this.userFortune = null;
      }
    });
  }

  showAllFortune(content) {
    const ngbModalOptions: NgbModalOptions = {
      scrollable: true,
      keyboard: false,
      centered: true,
      ariaLabelledBy: 'modal-basic-title'
    };
    this.modalService.open(content, ngbModalOptions);
  }
}

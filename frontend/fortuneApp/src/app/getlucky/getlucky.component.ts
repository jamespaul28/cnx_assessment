import { Component, OnInit } from '@angular/core';
import { FortuneService, Fortune} from '../fortune.service';
import {NgbModal, NgbModalOptions} from '@ng-bootstrap/ng-bootstrap';

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
  state = "draw";

  constructor(
    private fortuneService: FortuneService,
    private modalService: NgbModal) { }

  ngOnInit(): void {
    this.getFortune();
  }

  drawFortune(): void {
    this.userFortune = this.allFortune[Math.floor(Math.random() * this.allFortune.length)];
    this.lastAction = "You opened a fortune cookie!"
    this.state = "show";
  }

  getFortune(): void {
    this.fortuneService.getFortune().subscribe(fortune => this.allFortune = fortune);
    this.userFortune = null;
    this.newFortune = "";
  }

  consumeFortune(): void {
    if (this.newFortune != ""){
      var newFortune = {id: this.userFortune.id, fortune: this.newFortune};
      this.fortuneService.consumeFortune(newFortune).subscribe(_ => this.getFortune());
      this.lastAction = "You consumed a fortune cookie and changed a fortune!";
    } else {
      this.userFortune = null;
      this.lastAction = "You consumed a fortune cookie!";
    }
    this.state = "draw";
  }

  open(content) {
    let ngbModalOptions: NgbModalOptions = {
      backdrop : 'static',
      keyboard : false,
      centered : true,
      ariaLabelledBy : 'modal-basic-title'
    };
    this.modalService.open(content, ngbModalOptions).result.then((result) => {
      this.lastAction = `Closed with: ${result}`;
      if (result==="Yes"){
        this.state="update";
      } else {
        this.state="draw";
        this.userFortune = null;
      }
    });
  }


}

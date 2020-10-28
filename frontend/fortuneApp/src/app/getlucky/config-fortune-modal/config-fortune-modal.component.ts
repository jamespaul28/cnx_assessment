import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { faCogs } from '@fortawesome/free-solid-svg-icons';
import { FortuneService, AddFortuneRequest, DeleteFortuneRequest} from 'src/app/fortune.service';
import { TranslateService } from '@ngx-translate/core';


@Component({
  selector: 'app-config-fortune-modal',
  templateUrl: './config-fortune-modal.component.html',
  styleUrls: ['./config-fortune-modal.component.css']
})
export class ConfigFortuneModalComponent implements OnInit {
  @Input() allFortune;
  faCogs = faCogs;
  editMode = false;
  isDeleting = false;
  isAdding = false;
  listToDel = new DeleteFortuneRequest();
  newFortune = new AddFortuneRequest()

  constructor(
    public activeModal: NgbActiveModal, 
    private fortuneService: FortuneService,
    public translate: TranslateService
  ) {}

  ngOnInit(): void {
  }

  edit(){
    this.editMode = !this.editMode
    this.listToDel.IDs = []
    this.newFortune.fortune = ''
  }

  isDelete(isDelete){
    var indexExist = this.listToDel.IDs.indexOf(isDelete);
    if (indexExist == -1) {
      this.listToDel.IDs.push(isDelete)
    } else {
      this.listToDel.IDs.splice(indexExist,1)
    }
  }

  DeleteFortune(){
    this.isDeleting = true;
    this.fortuneService.deleteFortune(this.listToDel).subscribe(() => 
      this.fortuneService.getFortune().subscribe((fortune) => {
        this.listToDel.IDs = [];
        this.allFortune = fortune;
        this.isDeleting = false;
      })
    )
  }

  AddFortune(){
    this.isAdding = true;
    this.fortuneService.addFortune(this.newFortune).subscribe(() =>
      this.fortuneService.getFortune().subscribe((fortune) => {
        this.newFortune.fortune = '';
        this.allFortune = fortune;
        this.isAdding = false;
      })
    )
  }
}

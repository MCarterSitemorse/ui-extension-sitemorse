import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-priority-expansion',
  templateUrl: './priority-expansion.component.html',
  styleUrls: ['./priority-expansion.component.scss']
})
export class PriorityExpansionComponent implements OnInit {
  @Input() data;
  @Input() multi;
  @Input() expanded;
  public dataArray;

  constructor() {
    this.multi = true;
    //this.expanded = true;
  }

  ngOnInit() {
    console.log(this.data);
    this.dataArray = Object.keys(this.data); //Needed because ngFor can't loop over Object
    this.multi = true;
  }

}

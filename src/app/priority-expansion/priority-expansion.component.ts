import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-priority-expansion',
  templateUrl: './priority-expansion.component.html',
  styleUrls: ['./priority-expansion.component.scss']
})
export class PriorityExpansionComponent implements OnInit {
  @Input() data;
  public dataArray;

  constructor() {
  }

  ngOnInit() {
    console.log(this.data);
    this.dataArray = Object.keys(this.data); //Needed because ngFor can't loop over Object
  }

}

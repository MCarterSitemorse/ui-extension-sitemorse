import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-priority',
  templateUrl: './priority.component.html',
  styleUrls: ['./priority.component.scss']
})
export class PriorityComponent implements OnInit {
  @Input() data: any;

  constructor() {
  }

  ngOnInit() {
    console.log(this.data);
  }

}

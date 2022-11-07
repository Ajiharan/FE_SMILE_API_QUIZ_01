import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-common-table',
  templateUrl: './common-table.component.html',
  styleUrls: ['./common-table.component.scss'],
})
export class CommonTableComponent implements OnInit {
  @Input() data: any;
  @Input() name: string = '';

  constructor() {}

  ngOnInit(): void {}
}

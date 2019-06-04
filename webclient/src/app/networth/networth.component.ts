import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'fc-networth',
  templateUrl: './networth.component.html',
  styleUrls: ['./networth.component.scss']
})
export class NetworthComponent implements OnInit {
  @Input() netWorth;
  @Input() liabilities;
  @Input() assets;
  @Input() accountName: string;
  constructor() { }

  ngOnInit() {
  }

}

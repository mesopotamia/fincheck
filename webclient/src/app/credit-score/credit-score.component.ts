import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'fc-credit-score',
  templateUrl: './credit-score.component.html',
  styleUrls: ['./credit-score.component.scss']
})
export class CreditScoreComponent implements OnInit {
  @Input() score: string;
  @Input() description: string;
  constructor() { }

  ngOnInit() {
  }

}

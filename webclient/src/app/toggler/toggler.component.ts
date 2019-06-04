import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'fc-toggler',
  templateUrl: './toggler.component.html',
  styleUrls: ['./toggler.component.scss']
})
export class TogglerComponent implements OnInit {
  shouldShow = true;
  constructor() { }

  ngOnInit() {
  }

  toggle() {
    this.shouldShow = !this.shouldShow;
  }

}

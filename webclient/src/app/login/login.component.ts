import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'fc-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  @Input() loginType: string;
  @Input() username = '';
  @Output() loginEvent: EventEmitter<LoginEvent> = new EventEmitter();
  model = { username: '', password: ''};

  ngOnInit() {
    this.model.username = this.username;
  }
  onSubmit() {
    this.loginEvent.emit({
      type: this.loginType,
      loginModel: this.model
    });
  }

}

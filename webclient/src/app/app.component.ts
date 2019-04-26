import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  onLogin(event: LoginEvent) {
    switch (event.type) {
      case 'CIBC':
        console.log('calling CIBC');
        console.log('with credentials', event.loginModel);
        break;

    }
  }
}

import { Component } from '@angular/core';
import { ResultManagementService} from './services/result-management.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(public resultManagementService : ResultManagementService ){

  }
  title = 'AngularFrontend';
}

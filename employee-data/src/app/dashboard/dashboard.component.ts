import { Component } from '@angular/core';
import { CheckboxModule } from 'primeng/checkbox';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CheckboxModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

}

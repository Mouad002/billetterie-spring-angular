import { Component } from '@angular/core';
import { LayoutComponent } from '../app/features/admin/components/layout/layout.component';
import { HeaderComponent } from '../app/shared/components/header/header.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'billetterie-frontend';
}

import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarMenuComponent } from './shared/components/sidebar-menu/sidebar-menu.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, SidebarMenuComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'RHDashboard';
}

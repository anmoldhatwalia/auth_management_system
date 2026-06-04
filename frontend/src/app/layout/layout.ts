import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Router, RouterOutlet,RouterLinkActive, RouterLink } from '@angular/router';

@Component({
  selector: 'app-layout',
  imports: [RouterOutlet,RouterLink,MatIconModule,RouterLinkActive],
  templateUrl: './layout.html',
  styleUrl: './layout.css',
})
export class Layout {
  constructor(
    private router: Router
  ) {}

  logout() {

    localStorage.removeItem('token');

    this.router.navigate(['/login']);

  }
}

import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [CommonModule, RouterLink],
  standalone: true,
  templateUrl: './home.html',
  styleUrls: ['./home.css'],
})
export class Home {
  isDark = false;

  toggleTheme() {
    this.isDark = !this.isDark;
    document.body.classList.toggle('dark-neon');
  }
}

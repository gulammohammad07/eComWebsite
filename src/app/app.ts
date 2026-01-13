import { Component, signal } from '@angular/core';
import { Header } from './Components/header/header';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [Header],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App {
  protected readonly title = signal('eCom');
}

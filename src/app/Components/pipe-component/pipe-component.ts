import { Component } from '@angular/core';
import { ProductPipePipe } from '../../pipe/product-pipe-pipe';

@Component({
  selector: 'app-pipe-component',
  imports: [ProductPipePipe],
  standalone: true,
  templateUrl: './pipe-component.html',
  styleUrls: ['./pipe-component.css'],
})
export class PipeComponent {
  productId="A10";
}

import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Cart } from '../../services/cart';
import { Product } from '../../services/product';

@Component({
  selector: 'app-laptop-component',
  imports: [CommonModule],
  templateUrl: './laptop-component.html',
  styleUrls: ['./laptop-component.css'],
})
export class LaptopComponent {
  constructor(private productServices: Product, private cartServices: Cart) {}

  laptopData: any;

  ngOnInit() {
    this.productServices.laptopApi().subscribe((data: any) => {
      this.laptopData = data;
    });
  }

  add(item: any) {
    this.cartServices.addToCart(item);
    item.added = true;
  }
}

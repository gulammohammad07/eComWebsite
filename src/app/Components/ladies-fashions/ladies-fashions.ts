import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Cart } from '../../services/cart';
import { Product } from '../../services/product';

@Component({
  selector: 'app-ladies-fashions',
  imports: [CommonModule],
  standalone: true,
  templateUrl: './ladies-fashions.html',
  styleUrls: ['./ladies-fashions.css'],
})
export class LadiesFashions {
  constructor(private ladiesFashion:Product, private cartServices:Cart) {}

  ladiesFashions:any

  ngOnInit(){
    this.ladiesFashion.ladiesFashionApi().subscribe((data:any)=>{
      console.log(data);
      this.ladiesFashions=data;
    })
}

add(product:any){
  this.cartServices.addToCart(product);
  product.added=true;
}
}
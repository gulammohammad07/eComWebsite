import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Cart } from '../../services/cart';
import { Product } from '../../services/product';

@Component({
  selector: 'app-shoes-component',
  imports: [CommonModule],
  templateUrl: './shoes-component.html',
  styleUrls: ['./shoes-component.css'],
})
export class ShoesComponent {

  constructor (private productServices:Product, private cartServices:Cart){}

  shoesList:any;

  ngOnInit(){
    this.productServices.shoesApi().subscribe((data:any)=>{
      this.shoesList=data;
    })
  }


  add(product:any){
    this.cartServices.addToCart(product);
    product.added=true;
  }
}

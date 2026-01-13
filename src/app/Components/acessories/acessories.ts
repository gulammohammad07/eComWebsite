import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Cart } from '../../services/cart';
import { Product } from '../../services/product';

@Component({
  selector: 'app-acessories',
  imports: [CommonModule],
  standalone: true,
  templateUrl: './acessories.html',
  styleUrls: ['./acessories.css'],
})
export class Acessories {
  constructor(private accessoriesList: Product, private cartService: Cart) {}

  accessories:any

ngOnInit(){
  this.accessoriesList.accessoriesApi().subscribe((data:any)=>{
    console.log(data);
    this.accessories=data
  })
}
add(product:any){
  this.cartService.addToCart(product);
  product.added=true;
}
}

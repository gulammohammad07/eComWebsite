import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Cart } from '../../services/cart';
import { Product } from '../../services/product';

@Component({
  selector: 'app-mobile-component',
  imports: [CommonModule],
  templateUrl: './mobile-component.html',
  styleUrls: ['./mobile-component.css'],
})
export class MobileComponent {
constructor(private productServices:Product, private cartServices:Cart ){}

mobiledata:any;

ngOnInit(){
  this.productServices.mobileApi().subscribe((data:any)=>{
    this.mobiledata=data;
  })
}

add(item:any){
  this.cartServices.addToCart(item);
  item.added=true;
}
}

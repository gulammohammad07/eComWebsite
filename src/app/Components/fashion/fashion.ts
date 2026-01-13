import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Cart } from '../../services/cart';
import { Product } from '../../services/product';

@Component({
  selector: 'app-fashion',
  imports: [CommonModule, ],
  standalone: true,
  templateUrl: './fashion.html',
  styleUrls: ['./fashion.css'],
})
export class Fashion {

  
  fashion:any;

  constructor(private fashionList:Product,private cartService:Cart){}

  ngOnInit(){
    this.fashionList.fashionApi().subscribe((data:any)=>{
      console.log(data)
      this.fashion=data ;

    })
  }

  add(product:any){
    this.cartService.addToCart(product);
    product.added=true
  }


}

import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Cart } from '../../services/cart';
import { Product } from '../../services/product';

@Component({
  selector: 'app-carts',
  imports: [CommonModule],
  standalone: true,
  templateUrl: './carts.html',
  styleUrls: ['./carts.css'],
})
export class Carts {
  cartItem: any[] = [];
  total: number = 0;


  constructor(private cartService: Cart, private router:Router, private productServices:Product) {}

  ngOnInit() {
    this.cartItem = this.cartService.getCartItem();
    this.total = this.cartService.getTotal();
  }

  remove(id: number) {
    this.cartService.removeItem(id);
    this.cartItem = this.cartService.getCartItem();
    this.total = this.cartService.getTotal();
  }

  increase(item: any) {
    this.cartService.incrementItem(item);
    // refresh view and totals from service (ensures persistence)
    this.cartItem = this.cartService.getCartItem();
    this.total = this.cartService.getTotal();
  }

  decrease(item: any) {
    this.cartService.decrementItem(item);
    // refresh view and totals from service (ensures persistence)
    this.cartItem = this.cartService.getCartItem();
    this.total = this.cartService.getTotal();
  }

  checkOutDetails:any[]=[];

  onCheckOut(){
 this.checkOutDetails=this.cartService.getCartItem();
 console.log(this.checkOutDetails)  ; 
 this.router.navigate(['/buy']),{queryParams:{q:this.checkOutDetails.values}}

  }

}

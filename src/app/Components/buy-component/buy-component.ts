import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Cart } from '../../services/cart';
import { OrderService } from '../../services/order-service';
import { Product } from '../../services/product';

@Component({
  selector: 'app-buy-component',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './buy-component.html',
  styleUrls: ['./buy-component.css'],
})
export class BuyComponent {
  constructor(
    private cartServices: Cart,
    private productServices: Product,
    private router: Router,
    private orderServices:OrderService,
  ) {}
  checkOutProducts: any[] = [];
  totalAmount: number = 0;

  ngOnInit() {
    this.checkOutProducts = this.cartServices.getCartItem();
    this.totalAmount = this.cartServices.getTotal();
  }

  checkoutForm = new FormGroup({
    name: new FormControl(''),
    phone: new FormControl(''),
    address: new FormControl(''),
    city: new FormControl(''),
    pincode: new FormControl(''),
    email: new FormControl(''),
  });

  onPlaceOrder() {
    const order = {
      customerDetails: this.checkoutForm.value,
      products: this.checkOutProducts,
      amountTotal: this.totalAmount,
      orderDate: new Date(),
      orderStatus: 'Order Placed',
    };

    this.orderServices.addOrder(order);

    console.log('order placed', order);

    this.checkoutForm.reset();
    this.cartServices.clearCart();

    // this.router.navigate(['/order'],{
    //   state:{orderData:order}
    // });

    this.checkOutProducts = [];
    this.totalAmount = 0;
    alert('🎉 Order placed successfully!');
  }
}

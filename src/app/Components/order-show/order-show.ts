import { CommonModule } from '@angular/common';
import { Component, OnInit, signal } from '@angular/core';
import { Router } from '@angular/router';
import { OrderService } from '../../services/order-service';

@Component({
  selector: 'app-order-show',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './order-show.html',
  styleUrls: ['./order-show.css'],
})
export class OrderShow implements OnInit {

  // Use a signal so template updates are fast and explicit
  orders = signal<any[]>([]);

  constructor(
    private router: Router,
    private orderServices: OrderService
  ) {}

  ngOnInit() {
    this.orders.set(this.orderServices.getOrders());

    // if no orders, send to home
    if (!this.orders() || this.orders().length === 0) {
      this.router.navigate(['/']);
    }
  }

  onClearAllOrders() {
    this.orderServices.clearAllOrders();
    this.orders.set(this.orderServices.getOrders());
    alert('All orders cleared from browser storage.');
    this.router.navigate(['/']);
  }

  onRemoveOrder(orderIndex: number) {
    const ok = confirm('Remove this entire order?');
    if (!ok) return;
    const removed = this.orderServices.removeOrder(orderIndex);
    if (removed) {
      this.orders.set(this.orderServices.getOrders());
      alert('Order removed.');
      if (!this.orders() || this.orders().length === 0) {
        setTimeout(() => this.router.navigate(['/']), 200);
      }
    } else {
      alert('Could not remove order.');
    }
  }

  onCancelOrder(orderIndex: number) {
    const ok = confirm('Are you sure you want to cancel this order?');
    if (!ok) return;
    const cancelled = this.orderServices.cancelOrder(orderIndex);
    if (cancelled) {
      this.orders.set(this.orderServices.getOrders());
      alert('Order cancelled.');
    } else {
      alert('Could not cancel the order.');
    }
  }

  onRemoveProduct(orderIndex: number, productId?: any, productIndex?: number) {
    const ok = confirm('Remove this product from the order?');
    if (!ok) return;
    const removed = this.orderServices.removeProductFromOrder(orderIndex, productId, productIndex);
    if (removed) {
      this.orders.set(this.orderServices.getOrders());
      alert('Product removed from order.');
      // if that order now has no products, optionally remove the order
      const order = this.orderServices.getOrder(orderIndex);
      if (!order || !order.products || order.products.length === 0) {
        // auto-remove empty order
        this.orderServices.removeOrder(orderIndex);
        this.orders.set(this.orderServices.getOrders());
        if (!this.orders() || this.orders().length === 0) setTimeout(() => this.router.navigate(['/']), 200);
      }
    } else {
      alert('Could not remove the product.');
    }
  }
}

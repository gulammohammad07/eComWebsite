import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Cart {
  private carts: any[] = [];
  private storageKey = 'cart';

  // stream of total items count
  public cartCount$ = new BehaviorSubject<number>(0);

  constructor() {
    this.loadCart();
  }

  private saveCart() {
    try {
      localStorage.setItem(this.storageKey, JSON.stringify(this.carts));
    } catch (e) {
      console.error('Failed to save cart to localStorage', e);
    }
  }

  private loadCart() {
    try {
      const data = localStorage.getItem(this.storageKey);
      if (data) {
        this.carts = JSON.parse(data) || [];
      } else {
        this.carts = [];
      }
    } catch (e) {
      console.error('Failed to load cart from localStorage', e);
      this.carts = [];
    }

    // initialize the stream with current count
    this.cartCount$.next(this.getTotalNumberOfCart());
  }

  addToCart(product: any) {
    // use id + name to uniquely identify products across categories
    const item = this.carts.find((i) => i.id === product.id && i.name === product.name);

    if (item) {
      item.quantity++;
    } else {
      const copy = { ...product, quantity: 1 };
      this.carts.push(copy);
    }

    this.cartCount$.next(this.getTotalNumberOfCart());
    this.saveCart();
  }

  // increment quantity for a specific product (identifies by id + name)
  incrementItem(product: any) {
    const item = this.carts.find((i) => i.id === product.id && i.name === product.name);
    if (item) {
      item.quantity++;
      this.cartCount$.next(this.getTotalNumberOfCart());
      this.saveCart();
    }
  }

  // decrement quantity for a specific product; removes it if quantity reaches zero
  decrementItem(product: any) {
    const item = this.carts.find((i) => i.id === product.id && i.name === product.name);
    if (!item) return;

    if (item.quantity > 1) {
      item.quantity--;
    } else {
      this.carts = this.carts.filter((i) => !(i.id === product.id && i.name === product.name));
    }

    this.cartCount$.next(this.getTotalNumberOfCart());
    this.saveCart();
  }

  getCartItem(): any[] {
    return this.carts;
  }

  removeItem(id: number) {
    this.carts = this.carts.filter((item) => item.id !== id);
    this.cartCount$.next(this.getTotalNumberOfCart());
    this.saveCart();
  }

  getTotal(): number {
    return this.carts.reduce((sum, item: any) => sum + item.price * item.quantity, 0);
  }

  getTotalNumberOfCart(): number {
    return this.carts.reduce((sum, item: any) => sum + item.quantity, 0);
  }

  clearCart() {
    this.carts = [];
    this.cartCount$.next(0); 
    this.saveCart();
  }
}

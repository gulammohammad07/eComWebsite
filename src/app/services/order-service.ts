import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private orders: any[] = [];
  private STORAGE_KEY = 'orders';

  private saveOrders(): void {
    try {
      if (this.orders && this.orders.length) {
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.orders));
      } else {
        localStorage.removeItem(this.STORAGE_KEY);
      }
    } catch (e) {
      // ignore storage errors
    }
  }

  /** Add a new order to the stored orders array */
  public addOrder(order: any): void {
    if (!order) return;
    if (!order.products) order.products = [];
    order.orderDate = new Date();
    this.getOrders();
    this.orders.push(order);
    this.saveOrders();
  }

  /** Return list of saved orders. Also migrates legacy 'lastOrder' if present. */
  public getOrders(): any[] {
    if (this.orders && this.orders.length) return this.orders;
    try {
      const raw = localStorage.getItem(this.STORAGE_KEY);
      if (raw) {
        this.orders = JSON.parse(raw);
        return this.orders;
      }
      // legacy support: migrate 'lastOrder' into orders[]
      const legacy = localStorage.getItem('lastOrder');
      if (legacy) {
        const o = JSON.parse(legacy);
        this.orders = [o];
        this.saveOrders();
        try { localStorage.removeItem('lastOrder'); } catch(e) {}
        return this.orders;
      }
    } catch (e) {
      // ignore parse/storage errors
    }
    return [];
  }

  /** Get a specific order by index */
  public getOrder(index: number): any {
    const list = this.getOrders();
    return list && index >= 0 && index < list.length ? list[index] : null;
  }

  /** Remove entire order by index */
  public removeOrder(index: number): boolean {
    const list = this.getOrders();
    if (!list || index < 0 || index >= list.length) return false;
    list.splice(index, 1);
    this.orders = list;
    this.saveOrders();
    return true;
  }

  /** Cancel an order (mark status as 'Cancelled') */
  public cancelOrder(index: number): boolean {
    const list = this.getOrders();
    if (!list || index < 0 || index >= list.length) return false;
    list[index].orderStatus = 'Cancelled';
    this.orders = list;
    this.saveOrders();
    return true;
  }

  /** Remove a product from a specific order by id or by product index */
  public removeProductFromOrder(orderIndex: number, productId?: any, productIndex?: number): boolean {
    const order = this.getOrder(orderIndex);
    if (!order || !Array.isArray(order.products)) return false;
    if (productId !== undefined && productId !== null) {
      const idx = order.products.findIndex((p: any) => p && (p.id === productId || p._id === productId));
      if (idx === -1) return false;
      order.products.splice(idx, 1);
      this.orders[orderIndex] = order;
      this.saveOrders();
      return true;
    }
    if (typeof productIndex === 'number') {
      if (productIndex < 0 || productIndex >= order.products.length) return false;
      order.products.splice(productIndex, 1);
      this.orders[orderIndex] = order;
      this.saveOrders();
      return true;
    }
    return false;
  }

  /** Clear all orders */
  public clearAllOrders(): void {
    this.orders = [];
    this.saveOrders();
  }

  // Backwards-compatible helpers
  public setOrder(order: any): void { this.addOrder(order); }
  public appendOrder(newOrder: any): void { this.addOrder(newOrder); }
}

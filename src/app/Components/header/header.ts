

import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { Subscription } from 'rxjs';
import { Cart } from '../../services/cart';
import { Product } from '../../services/product';

@Component({
  selector: 'app-header',
  imports: [
    RouterLink,
    RouterOutlet,
    RouterLinkActive,
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
  ],
  standalone: true,
  templateUrl: './header.html',
  styleUrls: ['./header.css'],
})
export class Header implements OnInit, OnDestroy {
  constructor(private search: Product, private cartServices: Cart, private router: Router) {}
  totalCart: number = 0;

  private sub: Subscription | undefined;

  searchBar = new FormControl('');

  ngOnInit() {
    // initialize with current cart count and subscribe to updates
    this.totalCart = this.cartServices.getTotalNumberOfCart();
    this.sub = this.cartServices.cartCount$.subscribe((count) => (this.totalCart = count));
  }

  ngOnDestroy() {
    this.sub?.unsubscribe();
  }

  onSearch() {
    this.router.navigate(['/search'], { queryParams: { q: this.searchBar.value } });
  }
}


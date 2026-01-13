import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, forkJoin, of } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class Product {
  constructor(private http: HttpClient) {}
  fashionApi() {
    const url = 'http://localhost:3000/fashion';
    return this.http.get(url);
  }

  accessoriesApi() {
    const url = 'http://localhost:3000/accessories';
    return this.http.get(url);
  }

  ladiesFashionApi() {
    const url = 'http://localhost:3000/ladiesFashion';
    return this.http.get(url);
  }

  perfumeApi() {
    const url = 'http://localhost:3000/perfumes';
    return this.http.get(url);
  }

  shoesApi() {
    const url = 'http://localhost:3000/shoes';
    return this.http.get(url);
  }

  mobileApi() {
    const url = 'http://localhost:3000/mobiles';
    return this.http.get(url);
  }

  laptopApi() {
    const url = 'http://localhost:3000/laptops';
    return this.http.get(url);
  }

  searchProducts(query: string) {
    const q = query?.trim() ?? '';
    if (!q) {
      return of([]);
    }

    return forkJoin({
      fashion: this.http.get<any[]>(`http://localhost:3000/fashion?name_like=${q}`),
      accessories: this.http.get<any[]>(`http://localhost:3000/accessories?name_like=${q}`),
      ladies: this.http.get<any[]>(`http://localhost:3000/ladiesFashion?name_like=${q}`),
      perfume: this.http.get<any[]>(`http://localhost:3000/perfumes?name_like=${q}`),
      shoes: this.http.get<any[]>(`http://localhost:3000/shoes?name_like=${q}`),
      mobile: this.http.get<any[]>(`http://localhost:3000/mobile?name_like=${q}`),
      laptop: this.http.get<any[]>(`http://localhost:3000/laptop?name_like=${q}`),
    }).pipe(
      map((res: any) => [
        ...(res.fashion || []),
        ...(res.accessories || []),
        ...(res.ladies || []),
        ...(res.perfume || []),
        ...(res.shoes || []),
        ...(res.mobile || []),
        ...(res.laptop || []),
      ])
    );
  }

  private searchData = new BehaviorSubject<any[]>([]);

  searchData$ = this.searchData.asObservable();

  updateSearchData(data: any[]) {
    this.searchData.next(data);
  }
}

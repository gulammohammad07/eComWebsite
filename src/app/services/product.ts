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
    const url = 'http://https://remarkable-arithmetic-499f75.netlify.app/fashion';
    return this.http.get(url);
  }

  accessoriesApi() {
    const url = 'http://https://remarkable-arithmetic-499f75.netlify.app/accessories';
    return this.http.get(url);
  }

  ladiesFashionApi() {
    const url = 'http://https://remarkable-arithmetic-499f75.netlify.app/ladiesFashion';
    return this.http.get(url);
  }

  perfumeApi() {
    const url = 'http://https://remarkable-arithmetic-499f75.netlify.app/perfumes';
    return this.http.get(url);
  }

  shoesApi() {
    const url = 'http://https://remarkable-arithmetic-499f75.netlify.app/shoes';
    return this.http.get(url);
  }

  mobileApi() {
    const url = 'http://https://remarkable-arithmetic-499f75.netlify.app/mobiles';
    return this.http.get(url);
  }

  laptopApi() {
    const url = 'http://https://remarkable-arithmetic-499f75.netlify.app/laptops';
    return this.http.get(url);
  }

  searchProducts(query: string) {
    const q = query?.trim() ?? '';
    if (!q) {
      return of([]);
    }

    return forkJoin({
      fashion: this.http.get<any[]>(`http://https://remarkable-arithmetic-499f75.netlify.app/fashion?name_like=${q}`),
      accessories: this.http.get<any[]>(`http://https://remarkable-arithmetic-499f75.netlify.app/accessories?name_like=${q}`),
      ladies: this.http.get<any[]>(`http://https://remarkable-arithmetic-499f75.netlify.app/ladiesFashion?name_like=${q}`),
      perfume: this.http.get<any[]>(`http://https://remarkable-arithmetic-499f75.netlify.app/perfumes?name_like=${q}`),
      shoes: this.http.get<any[]>(`http://https://remarkable-arithmetic-499f75.netlify.app/shoes?name_like=${q}`),
      mobile: this.http.get<any[]>(`http://https://remarkable-arithmetic-499f75.netlify.app/mobile?name_like=${q}`),
      laptop: this.http.get<any[]>(`http://https://remarkable-arithmetic-499f75.netlify.app/laptop?name_like=${q}`),
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

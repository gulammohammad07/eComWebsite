import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, forkJoin, map, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SuggestionService {
  constructor(private http: HttpClient) {}

  suggestionProduct(query: string) {
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

  private suggestData = new BehaviorSubject<any[]>([]);

  suggestData$ = this.suggestData.asObservable();

  updateSuggestData(data: any[]) {
    this.suggestData.next(data);
  }
}

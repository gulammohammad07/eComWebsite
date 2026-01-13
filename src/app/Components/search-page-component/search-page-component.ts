import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Cart } from '../../services/cart';
import { Product } from '../../services/product';

@Component({
  selector: 'app-search-page-component',
  imports: [CommonModule],
  standalone: true,
  templateUrl: './search-page-component.html',
  styleUrls: ['./search-page-component.css'],
})
export class SearchPageComponent {
  constructor(private router: ActivatedRoute, private productServices: Product, private cartServices:Cart) {}

  searchQuery: string = '';
  foundSearchResults:any[]=[];

  // ngOnInit() {
  //   console.log(this.router.snapshot.queryParams['q']);
  //   this.searchQuery = this.router.snapshot.queryParams['q'];

  //   this.allApi.searchProducts(this.searchQuery).subscribe((data: any) => {
  //     console.log(data);
  //     this.foundSearchResults=data;
  //   });
  // }

ngOnInit(){
  this.router.queryParams.subscribe(params=>{
    this.searchQuery=params['q'] ||'';
    this.productServices.searchProducts(this.searchQuery).subscribe((data:any)=>{
      this.foundSearchResults=data;
    })
  })
}

  get filteredResults(){
    return this.foundSearchResults.filter(item=>item.name.toLowerCase().includes(this.searchQuery.toLocaleLowerCase()));
  }

  add(product:any){
    this.cartServices.addToCart(product);
    product.added=true;
  }

}

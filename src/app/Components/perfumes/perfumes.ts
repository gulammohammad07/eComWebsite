import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Cart } from '../../services/cart';
import { Product } from '../../services/product';

@Component({
  selector: 'app-perfumes',
  imports: [CommonModule],
  standalone: true,
  templateUrl: './perfumes.html',
  styleUrls: ['./perfumes.css'],
})
export class Perfumes {
  constructor(private perfume:Product, private cartServices:Cart) {}

  perfumeData: any;

  ngOnInit(){
    this.perfume.perfumeApi().subscribe((data:any)=>{
      console.log(data);
      this.perfumeData=data;
    });
  }

  add(item:any){
    this.cartServices.addToCart(item);
    item.added=true;
  }

}

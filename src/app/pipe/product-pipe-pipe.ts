import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'SuperProduct',
  standalone: true
})
export class ProductPipePipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return "Product Id:"+value;
  }

}

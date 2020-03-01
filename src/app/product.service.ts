import {Injectable} from '@angular/core';
import {PRODUCTS, CAR_ITEMS} from './mock-products';
import {Product} from './product';
import {Observable, of} from 'rxjs';
import {delay} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor() {
  }

  create(product: Product): Observable<Product> {
    product.id = (Math.floor(Math.random() * 500) + 1).toString();
    product.createdAt = new Date().toISOString();
    product.image = `https://picsum.photos/id/${product.id}/300/300`;

    PRODUCTS.push(product);

    return of(product).pipe(delay(500));
  }

  list(): Observable<Product[]> {
    return of(PRODUCTS).pipe(delay(500));
  }

  addToShoppingCar(product: Product): Observable<string> {
    CAR_ITEMS.push(product);
    return of('OK').pipe(delay(500));
  }

  listCarItems(): Observable<Product[]> {
    return of([...CAR_ITEMS]).pipe(delay(500));
  }

  removeFromShoppingCar(product: Product): Observable<string> {
    const id = CAR_ITEMS.findIndex(value => value.id === product.id);
    CAR_ITEMS.splice(id, 1);

    return of('OK').pipe(delay(500));
  }
}

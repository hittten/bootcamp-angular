import {Injectable} from '@angular/core';
import {Product} from './product';
import {Observable, of} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {environment} from '../environments/environment';

const apiUrl = {
  products: environment.apiUrl + '/products/' + environment.user + '/',
  shoppingCar: environment.apiUrl + '/shoppingCar/' + environment.user + '/',
};

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) {
  }

  create(product: Product): Observable<Product> {
    return this.http.post<Product>(apiUrl.products, product);
  }

  list(): Observable<Product[]> {
    return this.http.get<Product[]>(apiUrl.products);
  }

  addToShoppingCar(product: Product): Observable<string> {
    return this.http.put(apiUrl.shoppingCar + product.id, null, {responseType: 'text'});
  }

  listCarItems(): Observable<Product[]> {
    return this.http.get<Product[]>(apiUrl.shoppingCar);
  }

  removeFromShoppingCar(product: Product): Observable<string> {
    return this.http.delete(apiUrl.shoppingCar + product.id, {responseType: 'text'});
  }
}

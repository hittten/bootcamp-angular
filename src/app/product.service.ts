import {Injectable} from '@angular/core';
import {PRODUCTS, CAR_ITEMS} from './mock-products';
import {Product} from './product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor() {
  }

  create(product: Product) {
    product.id = (Math.floor(Math.random() * 500) + 1).toString();
    product.createdAt = new Date().toISOString();
    product.image = `https://picsum.photos/id/${product.id}/300/300`;

    PRODUCTS.push(product);

    return product;
  }

  list(): Product[] {
    return PRODUCTS;
  }

  addToShoppingCar(product: Product): void {
    CAR_ITEMS.push(product);
  }

  listCarItems(): Product[] {
    return CAR_ITEMS;
  }

  removeFromShoppingCar(product: Product): void {
    const id = CAR_ITEMS.findIndex(value => value.id === product.id);
    CAR_ITEMS.splice(id, 1);
  }
}

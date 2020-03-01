import {Component, OnDestroy, OnInit} from '@angular/core';
import {ProductService} from '../product.service';
import {Product} from '../product';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit, OnDestroy {
  private subscriptions: Subscription[] = [];
  products$ = this.productService.list();

  constructor(private productService: ProductService) {
  }

  ngOnInit(): void {
  }

  addToCar(event: { product: Product, element: HTMLButtonElement }) {
    event.element.disabled = true;
    const subscription = this.productService.addToShoppingCar(event.product)
      .subscribe(() => {
        event.element.disabled = false;
        console.log('product added to shopping car', event.product);
      });

    this.subscriptions.push(subscription);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }
}

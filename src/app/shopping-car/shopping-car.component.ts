import {Component, OnDestroy, OnInit} from '@angular/core';
import {ProductService} from '../product.service';
import {Product} from '../product';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-shopping-car',
  templateUrl: './shopping-car.component.html',
  styleUrls: ['./shopping-car.component.scss']
})
export class ShoppingCarComponent implements OnInit, OnDestroy {
  private subscriptions: Subscription[] = [];
  carItems$ = this.productService.listShoppingCarItems();

  constructor(private productService: ProductService) {
  }

  ngOnInit(): void {
  }

  removeFromCar(event: { product: Product, element: HTMLButtonElement }) {
    event.element.disabled = true;
    const subscription = this.productService.removeFromShoppingCar(event.product)
      .subscribe(() => {
        event.element.disabled = false;
        this.carItems$ = this.productService.listShoppingCarItems();
        console.log('product removed from shopping car', event.product);
      });

    this.subscriptions.push(subscription);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }
}

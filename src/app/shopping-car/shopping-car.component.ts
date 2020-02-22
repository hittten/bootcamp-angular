import {Component, OnInit} from '@angular/core';
import {ProductService} from '../product.service';
import {Product} from '../product';

@Component({
  selector: 'app-shopping-car',
  templateUrl: './shopping-car.component.html',
  styleUrls: ['./shopping-car.component.scss']
})
export class ShoppingCarComponent implements OnInit {
  carItems = this.productService.listCarItems();

  constructor(private productService: ProductService) {
  }

  ngOnInit(): void {
  }

  removeFromCar(product: Product) {
    this.productService.removeFromShoppingCar(product);
  }
}

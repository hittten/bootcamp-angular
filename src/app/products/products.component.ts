import {Component, OnInit} from '@angular/core';
import {ProductService} from '../product.service';
import {Product} from '../product';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  products = this.productService.list();

  constructor(private productService: ProductService) {
  }

  ngOnInit(): void {
  }

  addToCar(product: Product) {
    this.productService.addToShoppingCar(product);
  }
}

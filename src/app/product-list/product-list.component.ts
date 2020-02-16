import {Component, OnInit} from '@angular/core';
import {PRODUCTS} from '../mock-products';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  products = PRODUCTS;
  gridView = false;

  constructor() {
  }

  ngOnInit(): void {
  }
}

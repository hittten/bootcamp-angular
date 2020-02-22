import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {Product} from '../product';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  @Input() products: Product[];
  @Input() buttonText: string;
  @Output() buttonClick = new EventEmitter<Product>();
  gridView = false;

  constructor() {
  }

  ngOnInit(): void {
  }
}

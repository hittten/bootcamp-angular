import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {Product} from '../product';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  @Input() products$: Observable<Product[]>;
  @Input() buttonText: string;
  @Output() buttonClick = new EventEmitter<{ product: Product, element: HTMLButtonElement }>();
  gridView = false;

  constructor() {
  }

  ngOnInit(): void {
  }
}

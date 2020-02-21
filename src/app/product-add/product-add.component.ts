import {Component, OnDestroy, OnInit} from '@angular/core';
import {Validators, FormBuilder} from '@angular/forms';
import {ProductService} from '../product.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.scss']
})
export class ProductAddComponent implements OnInit, OnDestroy {
  private subscriptions: Subscription[] = [];
  productForm = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(4)]],
    price: ['', [Validators.required, Validators.minLength(4)]],
    description: ['', Validators.required],
  });

  constructor(
    private fb: FormBuilder,
    private productService: ProductService
  ) {
  }

  ngOnInit(): void {
  }

  onSubmit() {
    const newProduct$ = this.productService.create(this.productForm.value);

    const subscription = newProduct$.subscribe(product => {
      this.productForm.reset({name: '', price: '', description: ''});
      console.log('new product', product);
    });

    this.subscriptions.push(subscription);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }
}

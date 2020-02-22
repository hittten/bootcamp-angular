import {Component, OnInit} from '@angular/core';
import {Validators, FormBuilder} from '@angular/forms';
import {ProductService} from '../product.service';

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.scss']
})
export class ProductAddComponent implements OnInit {
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
    const newProduct = this.productService.create(this.productForm.value);
    this.productForm.reset({name: '', price: '', description: ''});

    console.log('new product', newProduct);
  }
}

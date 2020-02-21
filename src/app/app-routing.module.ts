import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {ProductsComponent} from './products/products.component';
import {ShoppingCarComponent} from './shopping-car/shopping-car.component';
import {ProductAddComponent} from './product-add/product-add.component';

const routes: Routes = [
  {path: 'products', component: ProductsComponent},
  {path: 'shopping-car', component: ShoppingCarComponent},
  {path: 'products/add', component: ProductAddComponent},
  {path: '', redirectTo: '/products', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}

import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HeaderComponent} from './header/header.component';
import {ProductListComponent} from './product-list/product-list.component';
import {TooltipDirective} from './tooltip.directive';
import {EuroCurrencyPipe} from './euro-currency.pipe';
import {ShoppingCarComponent} from './shopping-car/shopping-car.component';
import {ProductsComponent} from './products/products.component';
import {ProductAddComponent} from './product-add/product-add.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ProductListComponent,
    TooltipDirective,
    EuroCurrencyPipe,
    ShoppingCarComponent,
    ProductsComponent,
    ProductAddComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}

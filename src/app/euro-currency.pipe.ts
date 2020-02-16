import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'euroCurrency'
})
export class EuroCurrencyPipe implements PipeTransform {

  transform(value: number): string {
    return value.toLocaleString('es-ES', {
      style: 'currency',
      currency: 'EUR',
      currencyDisplay: 'symbol',
    });
  }
}

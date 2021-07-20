import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'currencyPipe'
})

export class CurrencyPipe implements PipeTransform {
    transform(value: any, Currency: string): string {
        if(Currency === 'vnd') {
            return value.replace(/\d(?=(\d{3})+\.)/g, '$&.');
        }
        return value;
        // const index = arrRole.findIndex(x => x.value.toString() === value.toString());
        // return arrRole[index].valueView;
    }
}

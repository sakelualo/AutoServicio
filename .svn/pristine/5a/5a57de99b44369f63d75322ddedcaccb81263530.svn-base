
import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe, registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es';


registerLocaleData(localeEs, 'es');

const DATE_FMT = 'dd-MMMM-yyyy';
@Pipe({ name: 'dateFormat' })
export class DateFormatPipe extends DatePipe implements PipeTransform {
    minDate: Date = new Date('4000/01/01 00:00:00');

    transform(value: any, args?: any): any {
        let dateString :string =value;
        let fecha : Date = new Date(dateString);
        if (fecha.getFullYear() == this.minDate.getFullYear()) {
            return '';
        }else{
            return new DatePipe('es-MXN').transform(value, DATE_FMT);
        }
       

        
    }
}
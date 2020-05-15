import { Directive, forwardRef } from '@angular/core';
import { Validator, AbstractControl, NG_VALIDATORS, FormGroup } from '@angular/forms';
import { CalendarModule } from 'primeng/calendar/calendar';

@Directive({
    selector: '[ValidatorCalendar] [ngModel]',
    providers: [{
        provide: NG_VALIDATORS,
        useExisting: forwardRef(() => ValidatorCalendar),
        multi: true
    }]
})
export class ValidatorCalendar implements Validator {
    validate(group: FormGroup): { [key: string]: any } | null {
        group.parent.controls['endDate'].setErrors(null);
        group.parent.controls['startDate'].setErrors(null);
        const formGroup = group.parent.controls;
        if (group.parent.controls['startDate'].value !== undefined && group.parent.controls['endDate'].value !== undefined) {
            if (group.parent.controls['startDate'].value > group.parent.controls['endDate'].value) {

                return { 'startDateIsLess': true }
            }

        }

        if (group.parent.controls['startDate'].value == undefined) {
            return { 'startDateIsRequired': true }
        }
        if (group.parent.controls['endDate'].value == undefined) {
            return { 'endDateIsRequired': true }
        }

        return null; // return null if validation is passed.
    }
}
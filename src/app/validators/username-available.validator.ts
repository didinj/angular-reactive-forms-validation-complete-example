import { AbstractControl, AsyncValidatorFn, ValidationErrors } from '@angular/forms';
import { of, timer } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

export function usernameAvailableValidator(existingUsernames: string[]): AsyncValidatorFn {
    return (control: AbstractControl) => {
        return timer(500).pipe( // simulate HTTP delay
            switchMap(() => {
                const isTaken = existingUsernames.includes(control.value);
                return of(isTaken ? { usernameTaken: true } : null);
            })
        );
    };
}
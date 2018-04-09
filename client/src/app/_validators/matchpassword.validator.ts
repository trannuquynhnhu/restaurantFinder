/**
 * File: matchpassword.validator.ts
 * File Created: 02/04/2018
 * Author: annguyen
 * Description: Custom validator to check if the password match with confirmPassword.
 */

import { FormGroup } from "@angular/forms";

export function matchPassword(group: FormGroup): {[s: string] : boolean} {
    const pwd = group.controls["password"].value;
    const confirmPwd = group.controls["confirmPassword"].value;
    if (pwd !== "" && confirmPwd !=="" && pwd !== confirmPwd) {
        const error = {"MatchPassword": true};
        group.controls["confirmPassword"].setErrors(error);
        return error;
    } else {
        return null;
    }
}
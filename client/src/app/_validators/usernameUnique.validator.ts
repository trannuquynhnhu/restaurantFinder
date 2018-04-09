/**
 * File: usernameUnique.validator.ts
 * File Created: 02/04/2018
 * Author: annguyen
 * Description: Custom validator to check if the username of user already existed or not.
 */

import { FormControl } from "@angular/forms";
import { UserService } from "../_services/user.service";
import { User } from "../_models/user";

export class UsernameUnique {
    static createValidator(userService: UserService) {
        return (fc: FormControl) => {
            if (fc.value == "") return null;
            return new Promise<any>((resolve, reject) => userService.getAllUsers().subscribe(users => {
                console.log(users);
                if (users.find(u => u.username === fc.value)) {
                    resolve({'UsernameUnique': true});
                } else {
                    resolve(null);
                }
            }));
        }
    }
}
import { HttpInterceptor } from "@angular/common/http/src/interceptor";
import { HttpRequest, HttpHandler, HttpEvent } from "@angular/common/http";
import { Observable } from "rxjs/Observable";

export class AuthInterceptor implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const token = localStorage.getItem('id_token');
        const authReq = req.clone({headers: req.headers.set('Authorization', 'Bearer ' + token)});
        if (token) {

        }
        return next.handle(authReq);
    }    
}
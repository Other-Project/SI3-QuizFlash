import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {UserService} from "../service/user.service";
import {User} from "../models/user.models";
import {Admin} from "../models/admin.models";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private user?: User;

  constructor(userService: UserService) {
    userService.user$.subscribe(user => this.user = user);
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.user)
      req = req.clone({
        setHeaders: {
          "Authorization": `Basic ${btoa(`${this.user.id}:${(this.user as Admin)?.password}`)}`
        }
      });

    return next.handle(req);
  }
}

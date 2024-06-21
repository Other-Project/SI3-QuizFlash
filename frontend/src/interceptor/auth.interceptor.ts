import {inject} from "@angular/core";
import {Router} from "@angular/router";
import {HttpInterceptorFn} from "@angular/common/http";
import {catchError, throwError} from "rxjs";

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);
  return next(req).pipe(catchError((err) => {
    if ([401, 403].includes(err.status))
      router.navigate(["/"]).then();
    return throwError(() => err);
  }));
};

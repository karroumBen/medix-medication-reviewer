import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from './features/auth/auth.service';

export const addTokenInterceptor: HttpInterceptorFn = (req, next) => {
  const jwt = inject(AuthService).authState().jwt;

  if(jwt) {
    const clonedReq = req.clone({
      setHeaders: {
        'Authorization': `Bearer ${jwt}`}
    });

    return next(clonedReq);
  } else {
    return next(req);
  }
};

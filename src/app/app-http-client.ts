import { HttpInterceptorFn } from '@angular/common/http';

export const authTokenInterceptor: HttpInterceptorFn = (req, next) => {
  const isAuthApi = req.url.includes('api-auth-token');
  const token = isAuthApi ? null : localStorage.getItem('authToken');

  const commonHeaders = {
    'Accept': 'application/json'
  };

  const clonedReq = req.clone({
    setHeaders: {
      ...commonHeaders,
      ...(token ? { Authorization: `Token ${token}` } : {})
    }
  });

  return next(clonedReq);
};

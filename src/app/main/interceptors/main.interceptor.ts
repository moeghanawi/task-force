import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaders,
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class MainInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const token = localStorage.getItem('token');
    if (request.headers.get('Authorization') !== token && token !== null) {
      const options = {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      };

      const newReq = request.clone(options);

      return next.handle(newReq);
    }
    return next.handle(request);
  }
}

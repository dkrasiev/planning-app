import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private get accessToken(): string {
    return localStorage.getItem(environment.ACCESS_TOKEN_KEY) || '';
  }

  public intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (req.url.includes(environment.apiUrl) && this.accessToken) {
      const newHeaders = req.headers.append(
        'authorization',
        `Bearer ${this.accessToken}`
      );

      const clonedRequest = req.clone({ headers: newHeaders });

      return next.handle(clonedRequest);
    }

    return next.handle(req);
  }
}

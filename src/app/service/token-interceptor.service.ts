import { Injectable, Injector } from '@angular/core';
import { HttpInterceptor } from '@angular/common/http';
import { AuthService } from './auth.service';
import { environment } from 'src/environments/environment.prod';

@Injectable()
export class TokenInterceptorService implements HttpInterceptor {

  private apiServerUrl = environment.apiLoginBaseUrl;
  ignoreUrl: string

  constructor(private injector: Injector) { 
    this.ignoreUrl = `${this.apiServerUrl}/auth/login`
  }

  intercept(req,next) {

    if (req.url === this.ignoreUrl) {
      return next.handle(req);
    }     

    let authService = this.injector.get(AuthService);
    let tokenizedReq = req.clone({
      setHeaders : {
        Authorization: `Bearer ${authService.getToken()}`
      }
    })
    return next.handle(tokenizedReq)
  }

}

import { Injectable } from '@angular/core'
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpParams } from '@angular/common/http'
import { Observable } from 'rxjs';
import * as _ from 'lodash'

@Injectable()
export class EncodeUriInterceptor implements HttpInterceptor {

  /**
   * Intercept an outgoing `HttpRequest` and optionally transform it or the
   * response.
   *
   * Typically an interceptor will transform the outgoing request before returning
   * `next.handle(transformedReq)`. An interceptor may choose to transform the
   * response event stream as well, by applying additional Rx operators on the stream
   * returned by `next.handle()`.
   *
   * More rarely, an interceptor may choose to completely handle the request itself,
   * and compose a new event stream instead of invoking `next.handle()`. This is
   * acceptable behavior, but keep in mind further interceptors will be skipped entirely.
   *
   * It is also rare but valid for an interceptor to return multiple responses on the
   * event stream for a single request.
   */
  public intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const params = this.getParamsObject(request)

    const encodedReq = request.clone({
      params
    })

    return next.handle(encodedReq)
  }

  private getParamsObject(request: HttpRequest<any>): HttpParams {
    const httpParams = request.params

    const [url, paramsSection] = _.split(request.url, '?')

    if (_.isNil(paramsSection)) {
      return httpParams
    }

    const params = paramsSection.split('&')
    const paramKeyValuePairs = params.map(param => param.split('='))

    paramKeyValuePairs.forEach(([key, value]) => httpParams.set(key, value))

    return httpParams
  }
}

import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core'
import { NativeScriptModule } from 'nativescript-angular/nativescript.module'

import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'


/* ************************************************************************
* Importing all rxjs operators increases build output and duration
* so it is better to import the operators in use only
* also, due to the polyfill-ish nature of the RxJS modules,
* it is enough to import an operator once at a single, centralized location.
**************************************************************************/
import './rxjs.imports'
import { NativeScriptRegistrar } from './services/nativescript-registrar'
import { NativeScriptHttpClientModule } from 'nativescript-angular/http-client'
import { NativeScriptUISideDrawerModule } from 'nativescript-ui-sidedrawer/angular'

import { NativeScriptFormsModule } from 'nativescript-angular/forms'
import { HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http'
import * as localStorage from 'nativescript-localstorage'

import { services as mobileServices } from '~/services/services'
import { EncodeUriInterceptor } from '~/services/encode-uri-interceptor'
declare var GMSServices: any
import * as _ from 'lodash'
import * as platform from 'platform'
import { components as pageComponents } from '~/pages/components'
import { components as mobileComponents } from '~/components/components'

const components = _({
  AppComponent,
  ...pageComponents,
  ...mobileComponents
})
  .toPairs()
  .map(([name, component]) => ({ name, component }))
  .value()

const registrar = new NativeScriptRegistrar('app.common')
  .addNgxComponents(components)
  .addServices(mobileServices)

const ngxProviders = registrar.createNgProviders()

if (platform.isIOS) {
  GMSServices.provideAPIKey('AIzaSyB1CaF3uz9Mv27pssBj4l-j5jc_-AQLrdU')
}

@NgModule({
  bootstrap: [
    AppComponent,
  ],
  imports: [
    NativeScriptModule,
    AppRoutingModule,
    NativeScriptHttpClientModule,
    NativeScriptFormsModule,
    NativeScriptUISideDrawerModule,
  ],
  exports: [
  ],
  declarations: [
    ...registrar.ngxComponents.map(component => component.component),
  ],
  schemas: [
    NO_ERRORS_SCHEMA,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: EncodeUriInterceptor, multi: true },
    ...ngxProviders,
  ]
})
export class AppModule { }

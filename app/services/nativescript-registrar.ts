import * as _ from 'lodash'

import {Registrar} from './registrar'

// import {directives, ngxDirectives} from './directives/directives'
// import {factories} from './factories/factories'
// import {services} from './services/services'
// import {services as nativeScriptServices} from './services/nativescript-services'

export class NativeScriptRegistrar extends Registrar {
  constructor(public moduleName: string) {
    super()
  }

  protected addDefaults(): void {
    // this.addDirectives(directives)
    // this.addFactories(factories)
    // this.addServices(services)
    // this.addServices(nativeScriptServices)
    // this.addNgxDirectives(ngxDirectives)
  }

  public registerForAngularJS(): this {
    return this
  }
}

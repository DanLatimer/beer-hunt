import * as _ from 'lodash'
import { InjectionToken } from '@angular/core';

export abstract class Registrar {
  public configs: any[] = []
  public components: IComponentList = {}
  public directives: IDirectiveList = {}
  public factories: IFactoryList = {}
  public filters: IFilterList = {}
  public ngxComponents: INgxComponent[] = []
  public ngxDirectives: any[] = []
  public ngxOverrideServices: INgxOverrideService[] = []
  public ngInjectionTokens: InjectionToken<any>[] = []
  public services: IServiceList = {}
  public angularJsUpgradeServices: IServiceList = {}

  constructor() {
    this.addDefaults()
  }

  protected abstract addDefaults(): void
  public abstract registerForAngularJS(): this

  public addConfigs(configs: any[]): Registrar {
    this.configs.push(...configs)
    return this
  }

  public addComponents(components: IComponentList): this {
    this.assertAllValuesDefined('component', components)
    _.merge(this.components, components)
    return this
  }

  public addFilters(filters: IFilterList): this {
    this.assertAllValuesDefined('filter', filters)
    _.merge(this.filters, filters)
    return this
  }

  public addNgxComponents(ngxComponents: INgxComponent[]): this {
    this.assertAllItemsDefined('NgX Component', ngxComponents)
    this.ngxComponents.push(...ngxComponents)
    return this
  }

  public addNgxDirectives(ngxDirectives: any[]): this {
    this.assertAllItemsDefined('NgX Directive', ngxDirectives)
    this.ngxDirectives.push(...ngxDirectives)
    return this
  }

  public addServices(services: IServiceList): this {
    this.assertAllValuesDefined('service', services)
    _.merge(this.services, services)
    return this
  }

  public addAngularJsUpgradedServices(services: IServiceList): this {
    this.assertAllValuesDefined('angularJS upgraded service', services)
    _.merge(this.angularJsUpgradeServices, services)
    return this
  }

  private assertAllValuesDefined(registrationType: string, objectDefinition: IObjectDefinition): void {
    _.toPairs(objectDefinition).forEach(([serviceName, service]) => {
      if (_.isNil(service)) {
        console.error(`Attempted to register an undefined ${registrationType}: ${serviceName}`)
      }
    })
  }

  private assertAllItemsDefined(registrationType: string, arrayDefinition: any[]): void {
    arrayDefinition.forEach(item => {
      if (_.isNil(item)) {
        console.error(`Attempted to register an undefined ${registrationType}: ${JSON.stringify(arrayDefinition)}`)
      }
    })
  }

  /*
   * Used to override the service which gets injected for a given class.
   *
   * This does not change anything in AngularJS land
   */
  public addNgxOverrideServices(overrideServices: INgxOverrideService[]): this {
    this.assertAllItemsDefined('NgX Override Service', overrideServices)
    this.ngxOverrideServices.push(...overrideServices)
    return this
  }

  public addDirectives(directives: IDirectiveList): this {
    this.assertAllValuesDefined('directive', directives)
    _.merge(this.directives, directives)
    return this
  }

  public addFactories(factories: IFactoryList): this {
    this.assertAllValuesDefined('Factory', factories)
    _.merge(this.factories, factories)
    return this
  }

  public createNgxProviders(): any[] {
    const providers = _.toPairs(this.services)
      .map(([serviceName, service]) => this.createAngularJsProvider(service, serviceName))
      .concat(
        this.ngxOverrideServices
          .map(overrideService => this.createNgxOverrideProvider(overrideService))
      )

    providers.forEach((provider: any) => console.log('[Angular] registered upgrade ' + provider.provide, provider))

    return providers
  }

  public createNgProviders(): any[] {
    const services = _.toPairs(this.services)
      .map(([serviceName, service]) => (<any>service).injectByName === true
        ? [serviceName, service]
        : [service, service])
      .map(([injectionToken, injectable]) => this.createNgProvider(injectable, injectionToken))

    const providers = [
      ...services,
      ..._.toPairs(this.angularJsUpgradeServices)
          .map(([serviceName, service]) => this.createAngularJsProvider(service, serviceName)),
    ]
    providers.forEach((provider: any) => {
      console.log('[Angular] registered ' + (provider.provide.name || provider.provide), provider)
    })

    return providers
  }

  private createAngularJsProvider(injectable, angularJsInjectionToken) {
    return {
      provide: injectable,
      useFactory: $injector => {
        console.log('attempt to get downgraded service: ' + angularJsInjectionToken, angularJsInjectionToken)
        return $injector.get(angularJsInjectionToken)
      },
      deps: ['$injector']
    }
  }

  private createNgProvider(injectable, injectionToken) {
    return {
      provide: injectionToken,
      useClass: injectable
    }
  }

  private createNgxOverrideProvider(overrideService: INgxOverrideService) {
    return {
      provide: overrideService.serviceToOverride,
      useFactory: (...injectedDependencies) => new overrideService.serviceToUse(...injectedDependencies),
      deps: overrideService.deps,
    }
  }
}

export interface IComponentList {
  [componentName: string]: ng.IComponentOptions
}

export interface IDirectiveList {
  [directiveName: string]: ng.Injectable<ng.IDirectiveFactory>
}

export interface IFactoryList {
  [factoryName: string]: ng.Injectable<Function>
}

export interface IFilterList {
  [filterName: string]: ng.Injectable<Function>
}

interface IObjectDefinition {
  [key: string]: any
}

export interface INgxComponent {
  name: string,
  component: any,
}

export interface INgxOverrideService {
  serviceToUse: any
  serviceToOverride: any
  deps: any[]
}

export interface IServiceList {
  [serviceName: string]: ng.Injectable<Function>
}

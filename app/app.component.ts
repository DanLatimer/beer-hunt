import { Component, OnInit, ViewChild } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Frame } from 'tns-core-modules/ui/frame';
import { RouterExtensions } from 'nativescript-angular/router';
import * as app from 'application';
import * as Platform from 'platform';
import * as orientation from 'nativescript-orientation';

import { ROUTE_PATH } from './app-routing.module';
import { DrawerTransitionBase, RadSideDrawer, SlideInOnTopTransition } from 'nativescript-ui-sidedrawer';
import { filter } from 'rxjs/operators';


@Component({
  selector: 'ns-app',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  private currentRoutePath: ROUTE_PATH
  private _sideDrawerTransition: DrawerTransitionBase

  public ROUTE_PATH: typeof ROUTE_PATH = ROUTE_PATH

  constructor(
    private router: Router,
    private routerExtensions: RouterExtensions) {
  }

  public ngOnInit(): void {
    this.lockScreenOrientation()
    this.setCurrentRoutePath()
    Frame.defaultTransition = { name: 'fade' }
  }

  get sideDrawerTransition(): DrawerTransitionBase {
    return this._sideDrawerTransition
  }

  private lockScreenOrientation(): void {
    orientation.setOrientation('portrait')
  }

  private setCurrentRoutePath(): void {
    this.currentRoutePath =  ROUTE_PATH.SCAVENGER_HUNT
    this._sideDrawerTransition = new SlideInOnTopTransition()

    this.router.events
      .pipe(filter((event: any) => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.currentRoutePath = <ROUTE_PATH> event.urlAfterRedirects;
      })
  }

  private isComponentSelected(url: ROUTE_PATH): boolean {
    return this.currentRoutePath === '/' + url
  }

  public onNavItemTap(navItemRoute: string): void {
    this.routerExtensions.navigate(['/' + navItemRoute])

    const sideDrawer = < RadSideDrawer > app.getRootView()
    sideDrawer.closeDrawer()
  }
}

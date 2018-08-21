import { Component, OnInit } from '@angular/core'
import { RouterExtensions } from 'nativescript-angular/router'
import * as _ from 'lodash'
import { RadSideDrawer } from 'nativescript-ui-sidedrawer';
import * as app from 'application';

export class BaseComponent {
  constructor(protected routerExtensions: RouterExtensions) {
  }

  public onBackToPreviousPage() {
    this.routerExtensions.backToPreviousPage()
  }

  public onShowSideDrawerTap(): void {
    const sideDrawer = <RadSideDrawer>app.getRootView()
    sideDrawer.showDrawer()
  }

  public onNavBtnTap(): void {
    this.routerExtensions.back();
  }
}

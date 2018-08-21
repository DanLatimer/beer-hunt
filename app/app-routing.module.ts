import { NgModule } from '@angular/core'
import { Routes } from '@angular/router'
import { NativeScriptRouterModule } from 'nativescript-angular/router'
import { ScavengerHuntComponent } from '~/pages/scavenger-hunt/scavenger-hunt.component'

export enum ROUTE_PATH {
  SCAVENGER_HUNT = 'scavenger-hunt'
}

const routes: Routes = [
  { path: '', redirectTo: '/' + ROUTE_PATH.SCAVENGER_HUNT, pathMatch: 'full' },
  { path: ROUTE_PATH.SCAVENGER_HUNT, component: ScavengerHuntComponent },
]

@NgModule({
  imports: [NativeScriptRouterModule.forRoot(routes)],
  exports: [NativeScriptRouterModule]
})

export class AppRoutingModule { }

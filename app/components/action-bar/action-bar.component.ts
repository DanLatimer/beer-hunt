import { Component, OnInit, Input } from '@angular/core'
import { RouterExtensions } from 'nativescript-angular/router'
import { ROUTE_PATH } from '~/app-routing.module'
import { BaseComponent } from '~/pages/base/base.component';

@Component({
  selector: 'action-bar',
  templateUrl: './components/action-bar/action-bar.html',
  styleUrls: ['./components/action-bar/action-bar-common.scss']
})
export class ActionBarComponent extends BaseComponent implements OnInit {
  @Input() public includeMenu: boolean
  @Input() public includeBack: boolean

  public ROUTE_PATH: typeof ROUTE_PATH = ROUTE_PATH

  constructor(
    protected routerExtensions: RouterExtensions) {
    super(routerExtensions)

  }

  public ngOnInit(): void {
  }
}

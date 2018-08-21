import { Component, OnInit } from '@angular/core'
import { RouterExtensions } from 'nativescript-angular/router'
import { ROUTE_PATH } from '~/app-routing.module'
import { BaseComponent } from '~/pages/base/base.component';
import { BeerService } from '../../services/beer-service';
import { Beer, BeerStyle } from '../../services/beer-classes'

@Component({
  selector: 'scavenget-hunt',
  templateUrl: './pages/scavenger-hunt/scavenger-hunt.html',
  styleUrls: ['./pages/scavenger-hunt/scavenger-hunt-common.css']
})
export class ScavengerHuntComponent extends BaseComponent implements OnInit {
  private isLoading: boolean = false
  public beers: Beer[] = []
  public beerStyles: BeerStyle[] = []

  public ROUTE_PATH: typeof ROUTE_PATH = ROUTE_PATH

  constructor(
    protected routerExtensions: RouterExtensions,
    private BeerService: BeerService) {
    super(routerExtensions)
  }

  public ngOnInit(): void {
    this.beers = this.BeerService.beers
    this.beerStyles = this.BeerService.beerStyles
  }

  public onStyleDrunkToggled(style: BeerStyle) {
    style.isDrunk = !style.isDrunk
    this.BeerService.save();
  }
}


import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as _ from 'lodash'
import { BeerData, BeerStyleData } from '../data/beers'
import { Beer, BeerStyle } from './beer-classes'
import * as localStorage from 'nativescript-localstorage'

@Injectable()
export class BeerService {
  public beers: Beer[]
  public beerStyles: BeerStyle[]

  public constructor(
    private httpClient: HttpClient
  ) {
    this.load();
  }

  private load() {
    this.beers = JSON.parse(localStorage.getItem('beers') || 'null') || _.cloneDeep(BeerData)
    this.beerStyles = JSON.parse(localStorage.getItem('beerStyles') || 'null') || _.cloneDeep(BeerStyleData)
  }

  public save() {
    localStorage.setItem('beers', JSON.stringify(this.beers))
    localStorage.setItem('beerStyles', JSON.stringify(this.beerStyles))
  }
}

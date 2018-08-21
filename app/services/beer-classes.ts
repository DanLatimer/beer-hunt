export class Beer {
  public constructor(
    public name: string,
    // public style: BeerStyle,
    public image: string
  ) {

  }
}

export class BeerStyle {
  public isDrunk: boolean = false

  public constructor(
    public beerType: BeerType,
    public image: string
  ) {}
}

export const enum BeerType {
  // Germany
  ALT = 'Alt (Dusseldorf)',
  BOCK = 'Bock',
  MAI_BOCK = 'MaiBock / Helles Bock',
  DOPPLE_BOCK = 'DoppleBock',
  EIS_BOCK = 'Eisbock (ice bock)',
  KOLSH = 'Kolsch (Cologne)',
  HEFEWEIZEN = 'Hefeweizen',
  BERLINER_WEISS = 'Berliner Weiss',
  DUNKLEWEIZEN = 'Dunkelweizen',
  GOSE = 'Gose',
  DORTMUNDER = 'Dortmunder',
  PILSNER = 'Pilsner',
  MARZEN = 'Märzen / Oktoberfest',
  DUNKEL = 'Munich Dunkel',
  HELLES = 'Munich Helles',
  SCHWARZBIER = 'Schwarzbier',
  // Belgian
  TRAPIST = 'Trapist Ale',
  DARK_STRONG_BELGIAN = 'Dark Strong Belgian',
  TRIPLE = 'Triple',
  SAISON = 'Saison',
  LAMBIC = 'Lambic',
  GUEUZE = 'Gueuze',
  FLANDERS_RED = 'Flanders Red',
  OUDE_BRUIN = 'Oude Bruin',
  // France
  BIERE_DE_GUARD = 'Biere de guard',
}

export const enum Country {
  FRANCE = 'France',
  GERMANY = 'Germany',
  BELGIUM = 'Belgium',
  NETHERLANDS = 'Netherlands'
}

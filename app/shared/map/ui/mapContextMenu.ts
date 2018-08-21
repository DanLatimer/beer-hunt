import { IMapContextMenu, IMarkerMenuContext } from '../type_defs/interfaces'

export class MapContextMenu<Context> implements IMapContextMenu {
  constructor(map: google.maps.Map) {

  }

  public handleEvent(event: google.maps.MouseEvent, position: google.maps.LatLng, context: IMarkerMenuContext) {
  }

  public addItem(name: string, callback: (this: JQuery, map: google.maps.Map, latLng: google.maps.LatLng, context: IMarkerMenuContext) => void) {
  }
}

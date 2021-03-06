import { Injectable } from '@angular/core';
import {Jsonp, Http, RequestOptions, Headers, URLSearchParams} from '@angular/http';
import {EndpointSettings} from './_settings/endpoint.settings';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/operator/delay';
import 'rxjs/operator/mergeMap';
import 'rxjs/operator/switchMap';
import {PaletteCategoryModel} from './_models/PaletteCategory.model';
import {PaletteElementModel} from './_models/PaletteElement.model';
import {GraphicalElementModel} from './_models/GraphicalElement.model';

@Injectable()
export class ModellerService {
  private options: RequestOptions;
  paletteCategorie$: Observable<PaletteCategoryModel> = Observable.of(null);
  paletteElement$: Observable<PaletteElementModel> = Observable.of(null);
  paletteElements: PaletteElementModel[];

  constructor(private http: Http, private jsonp: Jsonp) {
    const headers = new Headers({ 'Content-Type': 'application/json'});
    this.options = new RequestOptions({headers: headers });
  }

  queryPaletteElements(): void {
    this.http.get(EndpointSettings.getPaletteElementsEndpoint())
      .map(response => response.json()).subscribe(
        data => {
          // console.log('PaletteElements received: ' + JSON.stringify(data));
          this.paletteElement$ = Observable.of(data);
          this.paletteElements = data;
          console.log(data);
    }, error => console.log('Could not query PaletteElements'));
  }

  queryPaletteCategories(): void {
    this.http.get(EndpointSettings.getPaletteCategoriesEndpoint())
      .map(response => response.json()).subscribe(
      data => {
        // console.log('PaletteCategories received: ' + JSON.stringify(data));
        this.paletteCategorie$ = Observable.of(data);
      }, error => console.log('Could not query PaletteElements'));
  }

  getCss(element: PaletteElementModel): string {
    let cssString = '';
    cssString += 'background-color:' + element.backgroundColor + ';';
    cssString += 'border:solid 1px black';
    return cssString;
  }

  createElementInOntology(graphicElement: GraphicalElementModel): string {
    let result = '';

    this.http.post(EndpointSettings.getCreateElementEndpoint(), JSON.stringify(graphicElement))
      .map(response => response.json()).subscribe(
      data => {
        result = 'OK';

      }, error =>
        result = 'ERROR'
    );

    return result;
  }
}

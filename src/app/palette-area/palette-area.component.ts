import {Component, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {MetamodelElementModel} from '../_models/MetamodelElement.model';
import {ModellerService} from '../modeller.service';
import {PaletteElementModel} from '../_models/PaletteElement.model';

import {UUID} from 'angular2-uuid';

@Component({
  selector: 'app-palette-area',
  templateUrl: './palette-area.component.html',
  styleUrls: ['./palette-area.component.css']
})
export class PaletteAreaComponent implements OnInit {
  @Output()  sendElementFromPalette = new EventEmitter();

  public items = [
   // { name: 'John', otherProperty: 'Foo' },
   // { name: 'Joe', otherProperty: 'Bar' }
  ];

  constructor(private mService: ModellerService) {
    console.log('constructor of pallette');
    this.mService.queryPaletteCategories();
    this.mService.queryPaletteElements();

  }

  ngOnInit() {
    console.log('init pallette');
  }

  private addNewShape(a: PaletteElementModel): void {
    //Here i give to the paletteElement a new ID, so that when this is received by the modeller, it recognize it as a new Element to create
    const uuid = UUID.UUID();
    const b: PaletteElementModel = Object.assign({}, a);
    b.id = a.id;
    b.uuid = uuid;
    this.sendElementFromPalette.emit(b);
  }
}

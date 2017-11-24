import {Component, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {MetamodelElementModel} from '../_models/MetamodelElement.model';
import {ModellerService} from '../modeller.service';
import {PaletteElementModel} from '../_models/PaletteElement.model';
import {ContextMenuComponent} from 'ngx-contextmenu';
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
  @ViewChild(ContextMenuComponent) public basicMenu: ContextMenuComponent;

  constructor(private mService: ModellerService) {
    this.mService.queryPaletteCategories();
    this.mService.queryPaletteElements();

  }

  ngOnInit() {
  }

  private addNewShape(a: MetamodelElementModel): void {
    //Here i give to the paletteElement a new ID, so that when this is received by the modeller, it recognize it as a new Element to create
    let uuid = UUID.UUID();
    let b: MetamodelElementModel = Object.assign({}, a);
    b.id = 'id' + uuid;
    this.sendElementFromPalette.emit(b);
      }
}

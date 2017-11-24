import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {PaletteElementModel} from "../_models/PaletteElement.model";
import {MetamodelElementModel} from "../_models/MetamodelElement.model";

@Component({
  selector: 'app--tool-recursive-palette-element',
  templateUrl: './-tool-recursive-palette-element.component.html',
  styleUrls: ['./-tool-recursive-palette-element.component.css']
})
export class ToolRecursivePaletteElementComponent implements OnInit {
@Input() child: PaletteElementModel;
@Output() sendElementFromRecursiveElement = new EventEmitter();
  constructor() {

  }

  ngOnInit() {
    //console.log(this.child.id);
  }

  private addNewShape(a: MetamodelElementModel): void {
    let b: MetamodelElementModel = Object.assign({}, a);
    this.sendElementFromRecursiveElement.emit(b);
  }

}

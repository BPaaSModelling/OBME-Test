import { Component, OnInit } from '@angular/core';
import {ModellerService} from "../modeller.service";
import {MetamodelElementModel} from "../_models/GraphicalElement.model";
import {PaletteElementModel} from "../_models/PaletteElement.model";

@Component({
  selector: 'app-modelling-environment',
  templateUrl: './modelling-environment.component.html',
  styleUrls: ['./modelling-environment.component.css']
})
export class ModellingEnvironmentComponent implements OnInit {
  //count: number;
  //elements: MetamodelElementModel[];
  new_element: PaletteElementModel;

  constructor(private modellerService: ModellerService) {
    console.log('constructor');
    //this.count = 0;
    //this.modellerService.queryPaletteElements();
  }

  ngOnInit() {
    console.log('Inside init');
  }

  sendElementToCanvas(new_element: PaletteElementModel) {
    this.new_element = new_element;
    console.log('Hello');
  }

}

// https://github.com/shlomiassaf/ngx-modialog

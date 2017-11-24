import { Component, OnInit } from '@angular/core';
import {ModellerService} from "../modeller.service";
import {MetamodelElementModel} from "../_models/MetamodelElement.model";
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
    //this.count = 0;
    //this.modellerService.queryPaletteElements();
  }

  ngOnInit() {
  }

  sendElementToCanvas(new_element: PaletteElementModel) {
    this.new_element = new_element;
  }

}

// https://github.com/shlomiassaf/ngx-modialog

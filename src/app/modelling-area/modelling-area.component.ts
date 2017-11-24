import {Component, EventEmitter, Input, OnInit, OnChanges, ElementRef, HostListener} from '@angular/core';
import cytoscape from 'cytoscape';
import {MetamodelElementModel} from '../_models/MetamodelElement.model';
import {PaletteElementModel} from '../_models/PaletteElement.model';
import {UUID} from 'angular2-uuid';
declare var jQuery: any;
declare var cytoscape: any;


@Component({
  selector: 'app-modelling-area',
  templateUrl: './modelling-area.component.html',
  styleUrls: ['./modelling-area.component.css']
})
export class ModellingAreaComponent implements OnInit {

  @Input() public elements: any;
  @Input() public style: any;
  @Input() public layout: any;
  @Input() public zoom: any;
  @Input() new_element: PaletteElementModel;
  cytoscape = require('cytoscape');

  public constructor(private el: ElementRef) {

    this.layout = this.layout || {
      name: 'grid',
      directed: true,
      padding: 0
    };

    this.zoom = this.zoom || {
      min: 0.1,
      max: 1.5
    };

    this.style = this.style || cytoscape.stylesheet()
      .selector('node')
      .css({
        'content': 'data(name)',
        'shape': 'rectangle',
        'text-valign': 'center',
        'background-color': 'data(faveColor)',
        'width': '200px',
        'height': '100px',
        'color': 'black'
      })
      .selector(':selected')
      .css({
        'border-width': 3,
        'border-color': '#333'
      })
      .selector('edge')
      .css({
        'label': 'data(label)',
        'color': 'black',
        'curve-style': 'bezier',
        'opacity': 0.666,
        'width': 'mapData(strength, 70, 100, 2, 6)',
        'target-arrow-shape': 'triangle',
        'line-color': 'data(faveColor)',
        'source-arrow-color': 'data(faveColor)',
        'target-arrow-color': 'data(faveColor)'
      })
      .selector('edge.questionable')
      .css({
        'line-style': 'dotted',
        'target-arrow-shape': 'diamond'
      })
      .selector('.faded')
      .css({
        'opacity': 0.25,
        'text-opacity': 0
      });
  }

  public ngOnInit(): any {
    this.render();
  }

  public render() {
    jQuery(this.el.nativeElement).cytoscape({
      layout: this.layout,
      minZoom: this.zoom.min,
      maxZoom: this.zoom.max,
      style: this.style,
      elements: this.elements,
    });
  }
}
// https://github.com/shlomiassaf/ngx-modialog

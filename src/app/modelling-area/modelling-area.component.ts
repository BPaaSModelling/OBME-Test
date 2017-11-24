import {Component, Input, OnInit, OnChanges, SimpleChanges} from '@angular/core';
import * as cytoscape from 'cytoscape';
import {MetamodelElementModel} from '../_models/MetamodelElement.model';
import {PaletteElementModel} from '../_models/PaletteElement.model';
let cty: any;


@Component({
  selector: 'app-modelling-area',
  templateUrl: './modelling-area.component.html',
  // template: '<div id="cy"></div>',
  styleUrls: ['./modelling-area.component.css']
})
export class ModellingAreaComponent implements OnInit {

  @Input() public elements: any;
  @Input() public style: any;
  @Input() public layout: any;
  @Input() public zoom: any;
  @Input() new_element: PaletteElementModel;

  public constructor() {
console.log('Constructor of graph');


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

  public render() {
    /*jQuery(this.el.nativeElement).cytoscape({
      layout: this.layout,
      minZoom: this.zoom.min,
      maxZoom: this.zoom.max,
      style: this.style,
      elements: this.elements,
    });*/
  }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
    //TODO to change with ngDoCheck
    // this.printNewElement(changes.new_element.currentValue);
console.log('on changes');
    cty = cytoscape({
      container: document.getElementById('cy'),
      elements: [ // list of graph elements to start with
        { // node a
          data: { id: 'a' }
        },
        { // node b
          data: { id: 'b' }
        },
        { // edge ab
          data: { id: 'ab', source: 'a', target: 'b' }
        }
      ],
      style: [ // the stylesheet for the graph
        {
          selector: 'node',
          style: {
            'background-color': '#666',
            'label': 'data(id)'
          }
        },

        {
          selector: 'edge',
          style: {
            'width': 3,
            'line-color': '#ccc',
            'target-arrow-color': '#ccc',
            'target-arrow-shape': 'triangle'
          }
        }
      ],

      layout: {
        name: 'grid',
        rows: 1
      }
    });

    /*let eles = cty.add([
      { group: "nodes", data: { id: "n0" }, position: { x: 100, y: 100 } },
      { group: "nodes", data: { id: "n1" }, position: { x: 200, y: 200 } },
      { group: "edges", data: { id: "e0", source: "n0", target: "n1" } }
    ]);*/

    //console.log(changes.new_element.currentValue);
  }
}
// https://github.com/shlomiassaf/ngx-modialog

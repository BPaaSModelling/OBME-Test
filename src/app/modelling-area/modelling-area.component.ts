import {Component, Input, OnInit, OnChanges, SimpleChanges, HostListener} from '@angular/core';
import * as cytoscape from 'cytoscape';
import {MetamodelElementModel} from '../_models/MetamodelElement.model';
import {PaletteElementModel} from '../_models/PaletteElement.model';
import {VariablesSettings} from "../_settings/variables.settings";
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
  private elementCnt = 0;
  private node1;
  private node2;
  private key;
  private connectorModeOn: boolean = false;
  private connectorId;

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

    /*this.style = this.style || cytoscape.stylesheet()
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
      });*/
  }

  ngOnInit() {
    cty = cytoscape({
      container: document.getElementById('cy'),
      style: cytoscape.stylesheet()
        .selector('node')
        .css({
          'height': 70,
          'width': 100
          /*'background-fit': 'cover',
          'border': 'none',
          'border-width': 0,
          'background': 'none'*/
        })
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    this.printNewElement(changes.new_element.currentValue);
  }

  printNewElement(element: PaletteElementModel): void {

    if (element !== undefined) {
      console.log('category is: ' + element.paletteCategory);
      console.log(VariablesSettings.paletteCategoryConnectorsURI);
      if (element.paletteCategory === VariablesSettings.paletteCategoryConnectorsURI) {
        this.connectorModeOn = true;
        console.log('connector mode: '+this.connectorModeOn);
        this.connectorId = element.uuid;
      }
      else {
        const elementId = element.uuid;
        const nodeId = '#' + elementId;
        cty.add(
          {group: 'nodes', data: {id: elementId}}
        );
        cty.style()
          .selector(nodeId)
          .css({
            'shape': element.shape,
            'content': element.label,
            'height': element.height,
            'width': element.width,
            'text-valign': 'center',
            'text-halign': 'center',
            'background-color': element.backgroundColor,
            'border': 'solid',
            'border-width': 1
          })
          .update();
        /*if (this.elementCnt === 0) {
          this.node1 = elementId;
          console.log('node1: ' + this.node1);
          this.elementCnt++;
        }
        else if (this.elementCnt === 1) {
          this.node2 = elementId;
          this.elementCnt++;

          console.log('node2: ' + this.node2);
          cty.add(
            {data: {id: 'edge1', source: this.node1, target: this.node2}}
          );
          cty.style()
            .selector('edge')
            .css({
              'curve-style': 'bezier',
              'width': 1,
              'target-arrow-shape': 'triangle',
              'line-color': '#000000',
              'target-arrow-color': '#000000'
            })
            .update();
        }*/
      }
    }
    }

  @HostListener('document:click', ['$event'])
  onClick(event: MouseEvent) {
    let ele = cty.$(':selected');
    console.log(ele);
    if (ele.length === 0) {
      //console.log(ele[0]._private.data.id);
      this.deselectAll();
    }
    else if (ele.length === 1) {
      console.log(ele[0]._private.data.id);
      this.deselectAll();
      this.selectNode(ele[0]._private.data.id);
      if( this.connectorModeOn === true && this.elementCnt === 0) {
        this.node1 = ele[0]._private.data.id;
        this.elementCnt++;
      }
      else if( this.connectorModeOn === true && this.elementCnt === 1) {
        this.node2 = ele[0]._private.data.id;
        this.elementCnt = 0;

        cty.add(
          {data: {id: this.connectorId, source: this.node1, target: this.node2}}
        );
        cty.style()
          .selector('edge')
          .css({
            'curve-style': 'bezier',
            'width': 1,
            'target-arrow-shape': 'triangle',
            'line-color': '#000000',
            'target-arrow-color': '#000000'
          })
          .update();
        this.connectorModeOn = false;
      }
    }
  }

  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    this.key = event.key;
    if ((this.key === 'Backspace' || this.key === 'Delete')
    ) {
        let ele = cty.$(':selected');
      if (ele.length === 1) {
        cty.$(':selected').remove();
      }
        console.log(ele);
    }
  }

  selectNode(id) {
    cty.style()
      .selector('#'+id)
      .css({
        'border': 'solid',
        'border-width': 2
      })
      .update();
  }

  deselectAll() {
    cty.style()
      .selector('node')
      .css({
        'border': 'none',
        'border-width': 0
      })
      .update();
  }
}
// https://github.com/shlomiassaf/ngx-modialog

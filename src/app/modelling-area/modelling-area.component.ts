import {Component, Input, OnInit, OnChanges, SimpleChanges, HostListener} from '@angular/core';
import * as cytoscape from 'cytoscape';
import * as jquery from 'jquery';
//import * as qtip from 'cytoscape-qtip';
import {PaletteElementModel} from '../_models/PaletteElement.model';
import {VariablesSettings} from '../_settings/variables.settings';
import {GraphicalElementModel} from '../_models/GraphicalElement.model';
import {ModellerService} from "../modeller.service";

let cty: any;
//qtip( cytoscape, jquery );
//cytoscape.use(qtip);

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
  txtValue : string = 'Hello There';

  public constructor(private mService: ModellerService) {
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
        console.log('icon url is: '+element.imageURL);
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
            'text-valign': 'bottom',
            'text-halign': 'center',
            'background-color': element.backgroundColor,
            'border': 'solid',
            'border-width': 1,
            'background-image': VariablesSettings.iconLocation + element.iconURL,
            'background-position-x': 2,
            'background-position-y': 2
          })
          .update();

        let ele = cty.getElementById(elementId);
        /*cty.elements().qtip({
          content: function() {
            return 'Example qTip on ele '
          },
          position: {
            target: 'mouse',
            adjust: {
              mouse: false
            }
          },
          show: {
            event: 'cxttap'
          },
          style: {
            classes: 'qtip-bootstrap',
            tip: {
              width: 16,
              height: 8
            }
          }
        });*/

        //console.log(cty.getElementById(elementId).position().x);
        let ge: GraphicalElementModel = new GraphicalElementModel();
        ge.x = cty.getElementById(elementId).position().x;
        ge.y =  cty.getElementById(elementId).position().y;
        ge.uuid = element.uuid;
        ge.classType = element.id;
        ge.label = "New " + element.label

        this.mService.createElementInOntology(ge);

      }
    }
    }

  @HostListener('document:dblclick', ['$event'])
  handleMouseEvent(event: MouseEvent) {
    let ele = cty.$(':selected');
    console.log('invoke qtip on: ');
    console.log(cty.elements());
    if(ele.length > 0) {
      let position = cty.getElementById(ele[0]._private.data.id).renderedPosition();
      console.log(position);
      let showTxtBox = document.getElementById('showTextBox');
      showTxtBox.style.top = position.y;
      showTxtBox.style.left = position.x;
      showTxtBox.style.visibility = 'visible';

      /*let dialogRef = dialog.open(UserProfileComponent, {
        height: '400px',
        width: '600px',
      });*/


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

  editText(newLabel) {
    console.log('inside edittext:'+newLabel);
    let ele = cty.$(':selected');
    let node = cty.getElementById(ele[0]._private.data.id);
    node.data('label', newLabel);
    cty.style()
      .selector('#'+ele[0]._private.data.id)
      .css({
        'content': newLabel
      })
      .update();

    this.deselectAll();

    let showTxtBox = document.getElementById('showTextBox');
    showTxtBox.style.visibility = 'hidden';
  }
}
// https://github.com/shlomiassaf/ngx-modialog

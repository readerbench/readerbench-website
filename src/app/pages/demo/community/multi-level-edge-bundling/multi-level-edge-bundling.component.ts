import { Component, OnInit } from '@angular/core';
import * as d3 from "d3";
import * as vega from "vega";

@Component({
  selector: 'app-multi-level-edge-bundling',
  templateUrl: './multi-level-edge-bundling.component.html',
  styleUrls: ['./multi-level-edge-bundling.component.css']
})
export class MultiLevelEdgeBundlingComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  	vega.loader()
  		//TODO: change URIs for nodes/edges to non-static
  		.load('assets/multi-level-edge-bundling-vega-config.json')
      .then(data => this.render(JSON.parse(data)));
  }

  private render(spec) {
    var view = new vega.View(vega.parse(spec))
      .renderer('svg')  // set renderer (canvas or svg)
      .initialize('#view') // initialize view within parent DOM container
      .hover()             // enable hover encode set processing
      .run();
  }
}

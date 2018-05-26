import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { TwoModeGraph } from "@reader-bench/common";

@Injectable()
export class TwoModeGraphService {

  graph: any;

  constructor() {
    this.graph = new TwoModeGraph();
  }

  getGraph(graph): Observable<TwoModeGraph> {
    this.graph.buildFromObject(graph);
    return Observable.of(this.graph);
  }
}

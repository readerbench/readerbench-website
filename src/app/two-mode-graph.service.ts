import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { TwoModeGraph } from "@reader-bench/common";

@Injectable()
export class TwoModeGraphService {

  graph: any;

  constructor() {
    this.graph = new TwoModeGraph();
  }

  getGraph(graph): Observable<TwoModeGraph> {
    this.graph.buildFromObject(graph);
    return of(this.graph);
  }

}

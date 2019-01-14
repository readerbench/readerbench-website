import { Component, OnInit } from '@angular/core';
import { TwoModeGraphService } from '../../../two-mode-graph.service';
import { TwoModeGraph, TwoModeGraphNode, TwoModeGraphEdge } from '@reader-bench/common';
import { ApiRequestService } from '../api-request.service';

interface Community {
  communityName: string;
  description: string;
}

interface ViewType {
  id: number;
  name: string;
}

interface Category {
  name: string;
  description: string;
  communities: Array<Community>;
}

interface Subcommunity {
  week: string;
  graph: TwoModeGraph;
  edgeBundling: any;
  startDate: Date;
  endDate: Date;
}

@Component({
  selector: 'app-community',
  templateUrl: './community.component.html',
  styleUrls: ['./community.component.css'],
  providers: [ApiRequestService, TwoModeGraphService]
})
export class CommunityComponent implements OnInit {

  // Time to show the next photo
  private NextPhotoInterval: Number = 5000000000;
  // Looping or not
  private noLoopSlides: Boolean = true;
  // Photos
  private slides: Array<any> = [];

  private okbcCategory: Array<Community> = [];
  private moocCategory: Array<Community> = [];

  categories: Category[];
  selectedCommunity: Community;
  participantsCommunity: Community;
  viewTypes: ViewType[] = [
    { id: 0, name: 'Force-Directed Graph' },
    { id: 1, name: 'Hierarchical Edge Bundling' }
  ];

  nodeTypes = {
    '1': 'CENTRAL',
    '2': 'ACTIVE',
    '3': 'PERIPHERAL'
  };

  selectedViewType: ViewType;
  selectedCategory: Category;

  selectedWeek: Number = 0;

  subcommunities: Array<Subcommunity> = [];
  isLoadingGraph: Boolean = false;

  graph: TwoModeGraph;

  directedGraph: Array<any> = [];
  edgeBundling: Array<any> = [];

  constructor(private apiRequestService: ApiRequestService, private twoModeGraphService: TwoModeGraphService) {
  }

  ngOnInit() {
    this.isLoadingGraph = false;
    const data = {};
    this.apiRequestService.setApiService('community');
    const process = this.apiRequestService.process(data);
    process.subscribe((categories: any) => {
      // console.log(categories);
      this.categories = categories;

      if (this.categories.length > 0) {
        this.selectedCategory = this.categories[0];
        this.selectedCommunity = this.categories[0].communities[0];
        // if( this.selectedCategory &&  this.selectedCategory.communities.length > 0) {
        //      this.selectedCommunity = this.selectedCategory.communities[0];
        // }

      }
      // communities.forEach((value: string, key: Array<Community>) => {
      //     console.log("hello");
      // });
    });
    this.selectedViewType = this.viewTypes[0];
  }

  generateParticipantsGraph(community: string) {
    this.isLoadingGraph = true;
    this.participantsCommunity = this.selectedCommunity;
    this.subcommunities = [];

    this.apiRequestService.setApiService('communityDirectedGraph');
    const data = {
      communityName: community
    };
    const process = this.apiRequestService.process(data);
    process.subscribe((participants: any) => {
      this.directedGraph = participants;
      this.apiRequestService.setApiService('communityEdgeBundling');
      process.subscribe((auxParticipants: any) => {
        this.edgeBundling = auxParticipants;

        console.log(this.directedGraph);
        console.log(this.edgeBundling);
        for (let i = 0; i < this.directedGraph.length; i++) {
          if (this.edgeBundling[i].data.length > 0) {
            let graphSubcommunity = new TwoModeGraph();
            graphSubcommunity = this.parseGraphData(this.directedGraph[i]);
            // console.log(this.edgeBundling[i].data);
            // for (var j = 0; j < this.edgeBundling.length; j++) {
            // if(this.edgeBundling[j].week === this.directedGraph[i].week) {
            this.subcommunities.push({
              week: this.directedGraph[i].week,
              graph: graphSubcommunity,
              edgeBundling: this.edgeBundling[i].data,
              startDate: new Date(this.directedGraph[i].startDate),
              endDate: new Date(this.directedGraph[i].endDate)
            });
          }
        }
        // console.log(this.subcommunities);
        this.isLoadingGraph = false;
      });
    });
  }

  private parseGraphData(inGraph): TwoModeGraph {
    const graph = new TwoModeGraph();
    inGraph.nodes.forEach((inNode) => {
      const node = new TwoModeGraphNode();
      node.uri = inNode.id;
      node.displayName = inNode.name;
      if (inNode.group === 1) {
        node.type = 'CENTRAL';
      } else if (inNode.group === 2) {
        node.type = 'ACTIVE';
      } else {
        node.type = 'PERIPHERAL';
      }

      node.group = inNode.group;
      graph.nodeList.push(node);
    });
    inGraph.links.forEach((inLink) => {
      const edge = new TwoModeGraphEdge();
      edge.edgeType = 'ParticipantInteraction';
      edge.score = inLink.score;
      edge.sourceUri = inLink.source;
      edge.targetUri = inLink.target;
      graph.edgeList.push(edge);
    });
    return graph;
  }

}

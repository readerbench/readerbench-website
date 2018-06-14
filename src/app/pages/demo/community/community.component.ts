import { Component, OnInit } from '@angular/core';
import { TwoModeGraphService } from '../../../two-mode-graph.service';
import { TwoModeGraph, TwoModeGraphNode, TwoModeGraphEdge } from '@reader-bench/common';
import { ApiRequestService } from '../api-request.service';
import { ParticipantComponent } from './participant/participant.component';

interface Community {
  communityName: string,
  description: string
}

interface ViewType {
  id: number,
  name: string
}

interface Category {
  name: string,
  description: string,
  communities: Array<Community>;
}

interface Subcommunity {
  week: string, graph: TwoModeGraph, edgeBundling: any, startDate: Date, endDate: Date
}

@Component({
  selector: 'app-community',
  templateUrl: './community.component.html',
  styleUrls: ['./community.component.css'],
  providers: [ApiRequestService, TwoModeGraphService]
})
export class CommunityComponent implements OnInit {

  //The time to show the next photo
  private NextPhotoInterval: number = 5000000000;
  //Looping or not
  private noLoopSlides: boolean = true;
  //Photos
  private slides: Array<any> = [];

  private okbcCategory: Array<Community> = [];
  private moocCategory: Array<Community> = [];

  categories: Category[];
  selectedCommunity: Community;
  participantsCommunity: Community;
  viewTypes: ViewType[] = [
    { id: 0, name: "Force-Directed Graph" },
    { id: 1, name: "Hierarchical Edge Bundling" }
  ];

  nodeTypes = {
    '1': 'CENTRAL',
    '2': 'ACTIVE',
    '3': 'PERIPHERAL'
  }
  selectedViewType: ViewType;
  selectedCategory: Category;

  selectedWeek: number = 0;

  subcommunities: Array<Subcommunity> = [];
  isLoadingGraph: boolean = false;

  graph: TwoModeGraph;

  directedGraph: Array<any> = [];
  edgeBundling: Array<any> = [];

  constructor(private apiRequestService: ApiRequestService, private twoModeGraphService: TwoModeGraphService) {  }

  ngOnInit() {
    document.getElementById("defaultOpen").click();
    this.apiRequestService.setEndpoint('community/communities');
    this.isLoadingGraph = false;
    var data = { };
    var process = this.apiRequestService.process(data);
    process.subscribe((categories: any) => {
      //console.log(categories);
      this.categories = categories.data;

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

    this.apiRequestService.setEndpoint('community/participants/directedGraph');
    var data = {
      communityName: community
    };
    //console.log(data);
    /*
    var process = this.apiRequestService.process(data);
    process.subscribe((participants: any) => {
      this.directedGraph = participants;
      //console.log(participants);
      this.apiRequestService.setEndpoint('community/participants/edgeBundling');
      var data = {
        communityName: community
      }
      process.subscribe((participants: any) => {
        this.edgeBundling = participants;

        console.log(this.directedGraph);
        console.log(this.edgeBundling);
        for (var i = 0; i < this.directedGraph.length; i++) {
          if (this.edgeBundling[i].data.length > 0) {
            var graphSubcommunity = new TwoModeGraph();
            graphSubcommunity = this.parseGraphData(this.directedGraph[i]);
            //console.log(this.edgeBundling[i].data);
            //for (var j = 0; j < this.edgeBundling.length; j++) {
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
        //console.log(this.subcommunities);
        this.isLoadingGraph = false;
      });
    });*/

    this.directedGraph = this.mockData.directedGraph;
    //console.log(participants);
    //this.apiRequestService.setEndpoint('community/participants/edgeBundling');
    //var data = {
    //  communityName: community
    //}
    //process.subscribe((participants: any) => {
    this.edgeBundling = this.mockData.edgeBundling;

    //TODO: request communityData for the participant-evolution component
    //console.log(this.directedGraph);
    //console.log(this.edgeBundling);
    for (var i = 0; i < this.directedGraph.length; i++) {
      if (this.edgeBundling[i].data.length > 0) {
        var graphSubcommunity = new TwoModeGraph();
        graphSubcommunity = this.parseGraphData(this.directedGraph[i]);
        //console.log(this.edgeBundling[i].data);
        //for (var j = 0; j < this.edgeBundling.length; j++) {
        //if(this.edgeBundling[j].week === this.directedGraph[i].week) {
        this.subcommunities.push({
          week: this.directedGraph[i].week,
          graph: graphSubcommunity,
          edgeBundling: this.edgeBundling[i].data,
          startDate: new Date(this.directedGraph[i].startDate),
          endDate: new Date(this.directedGraph[i].endDate)
        });
         // }
      }
    }
    //console.log(this.subcommunities);
    this.isLoadingGraph = false;
  }

  private parseGraphData(inGraph): TwoModeGraph {
    var graph = new TwoModeGraph();
    inGraph.nodes.forEach((inNode) => {
      var node = new TwoModeGraphNode();
      node.uri = inNode.id;
      node.displayName = inNode.name;
      if (inNode.group === 1) {
        node.type = "CENTRAL";
      } else if (inNode.group === 2) {
        node.type = "ACTIVE";
      } else {
        node.type = "PERIPHERAL";
      }

      node.group = inNode.group;
      graph.nodeList.push(node);
    });
    inGraph.links.forEach((inLink) => {
      var edge = new TwoModeGraphEdge();
      edge.edgeType = "ParticipantInteraction";
      edge.score = inLink.score;
      edge.sourceUri = inLink.source;
      edge.targetUri = inLink.target;
      graph.edgeList.push(edge);
    });
    return graph;
  }

  private openTab(tabName) {
    // Declare all variables
    var i, tabcontent, tablinks;

    // Get all elements with class="tabcontent" and hide them
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }

    // Get all elements with class="tablinks" and remove the class "active"
    //tablinks = document.getElementsByClassName("tablinks");
    //for (i = 0; i < tablinks.length; i++) {
    //    tablinks[i].className = tablinks[i].className.replace(" active", "");
    //}

    // Show the current tab, and add an "active" class to the button that opened the tab
    document.getElementById(tabName).style.display = "block";
    //evt.currentTarget.className += " active";
}

  private mockData = {
    directedGraph:[
      {
        week:0,
        startDate:0,
        endDate:1,
        nodes:[
          {
            id:1,
            name:"A",
            group:1
          },
          {
            id:2,
            name:"B",
            group:2
          },
        ],
        links:[
          {
            score:13,
            source:1,
            target:2
          }
        ]
      },

      {
        week:1,
        startDate:0,
        endDate:1,
        nodes:[
          {
            id:1,
            name:"A",
            group:1
          },
          {
            id:2,
            name:"B",
            group:2
          },
        ],
        links:[
          {
            score:13,
            source:1,
            target:2
          }
        ]
      }
    ],
    edgeBundling:[
      {
        data:[{
          name: "A",
          imports: ["C"],
          size:1,
          group:"PERIPHERAL"
        }, {
          name: "C",
          imports: ["B"],
          size:2,
          group:"CENTRAL"
        }, {
          name: "B",
          imports: ["D"],
          size:5,
          group:"ACTIVE"
        }, {
          name: "D",
          imports: ["C"],
          size:3,
          group:"ACTIVE"
        }]
      },
      {
        data:[{
          name: "A",
          imports: ["C", "D"],
          size:1,
          group:"CENTRAL"
        }, {
          name: "C",
          imports: ["B", "D"],
          size:2,
          group:"CENTRAL"
        }, {
          name: "B",
          imports: ["D"],
          size:5,
          group:"ACTIVE"
        }, {
          name: "D",
          imports: ["C"],
          size:3,
          group:"PERIPHERAL"
        }]
      },
    ]
  }
}

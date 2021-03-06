import { Component, OnInit } from '@angular/core';
import { TwoModeGraphService } from '../../../two-mode-graph.service';
import { TwoModeGraph, TwoModeGraphNode, TwoModeGraphEdge } from '@reader-bench/common';
import { ApiRequestService } from '../api-request.service';
import { ParticipantComponent } from './participant/participant.component';
import { CarouselComponent } from '../../home/sections/carousel/carousel.component';
import { CommunityCarouselComponent } from './carousel/community-carousel.component';

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
  clustered: any;
  startDate: Date;
  endDate: Date;
}

@Component({
  selector: 'app-community',
  templateUrl: './community.component.html',
  styleUrls: ['./community.component.css'],
  providers: [ApiRequestService, TwoModeGraphService, CommunityCarouselComponent]
})
export class CommunityComponent implements OnInit {

  private chordMookData = [['Arsenal', 'Aston Villa', 6]
    , ['Arsenal', 'Bournemouth', 4]
    , ['Arsenal', 'Chelsea', 0]
    , ['Arsenal', 'Crystal Palace', 3]
    , ['Arsenal', 'Everton', 4]
    , ['Arsenal', 'Leicester City', 7]
    , ['Arsenal', 'Liverpool', 3]
    , ['Arsenal', 'Manchester City', 4]
    , ['Arsenal', 'Manchester Utd', 5]
    , ['Arsenal', 'Newcastle Utd', 2]
    , ['Arsenal', 'Norwich City', 2]
    , ['Arsenal', 'Southampton', 0]
    , ['Arsenal', 'Stoke City', 2]
    , ['Arsenal', 'Sunderland', 3]
    , ['Arsenal', 'Swansea City', 4]
    , ['Arsenal', 'Tottenham', 3]
    , ['Arsenal', 'Watford', 7]
    , ['Arsenal', 'West Bromwich', 3]
    , ['Arsenal', 'West Ham Utd', 3]
    , ['Aston Villa', 'Arsenal', 0]
    , ['Aston Villa', 'Bournemouth', 2]
    , ['Aston Villa', 'Chelsea', 0]
    , ['Aston Villa', 'Crystal Palace', 2]
    , ['Aston Villa', 'Everton', 1]
    , ['Aston Villa', 'Leicester City', 3]
    , ['Aston Villa', 'Liverpool', 2]
    , ['Aston Villa', 'Manchester City', 0]
    , ['Aston Villa', 'Manchester Utd', 0]
    , ['Aston Villa', 'Newcastle Utd', 1]
    , ['Aston Villa', 'Norwich City', 2]
    , ['Aston Villa', 'Southampton', 3]
    , ['Aston Villa', 'Stoke City', 1]
    , ['Aston Villa', 'Sunderland', 3]
    , ['Aston Villa', 'Swansea City', 1]
    , ['Aston Villa', 'Tottenham', 1]
    , ['Aston Villa', 'Watford', 4]
    , ['Aston Villa', 'West Bromwich', 0]
    , ['Aston Villa', 'West Ham Utd', 1]
    , ['Bournemouth', 'Arsenal', 0]
    , ['Bournemouth', 'Aston Villa', 2]
    , ['Bournemouth', 'Chelsea', 2]
    , ['Bournemouth', 'Crystal Palace', 2]
    , ['Bournemouth', 'Everton', 4]
    , ['Bournemouth', 'Leicester City', 1]
    , ['Bournemouth', 'Liverpool', 1]
    , ['Bournemouth', 'Manchester City', 1]
    , ['Bournemouth', 'Manchester Utd', 3]
    , ['Bournemouth', 'Newcastle Utd', 3]
    , ['Bournemouth', 'Norwich City', 4]
    , ['Bournemouth', 'Southampton', 2]
    , ['Bournemouth', 'Stoke City', 2]
    , ['Bournemouth', 'Sunderland', 3]
    , ['Bournemouth', 'Swansea City', 5]
    , ['Bournemouth', 'Tottenham', 1]
    , ['Bournemouth', 'Watford', 1]
    , ['Bournemouth', 'West Bromwich', 3]
    , ['Bournemouth', 'West Ham Utd', 5]
    , ['Chelsea', 'Arsenal', 3]
    , ['Chelsea', 'Aston Villa', 6]
    , ['Chelsea', 'Bournemouth', 4]
    , ['Chelsea', 'Crystal Palace', 4]
    , ['Chelsea', 'Everton', 4]
    , ['Chelsea', 'Leicester City', 2]
    , ['Chelsea', 'Liverpool', 2]
    , ['Chelsea', 'Manchester City', 0]
    , ['Chelsea', 'Manchester Utd', 1]
    , ['Chelsea', 'Newcastle Utd', 7]
    , ['Chelsea', 'Norwich City', 3]
    , ['Chelsea', 'Southampton', 3]
    , ['Chelsea', 'Stoke City', 1]
    , ['Chelsea', 'Sunderland', 5]
    , ['Chelsea', 'Swansea City', 2]
    , ['Chelsea', 'Tottenham', 2]
    , ['Chelsea', 'Watford', 2]
    , ['Chelsea', 'West Bromwich', 5]
    , ['Chelsea', 'West Ham Utd', 3]
    , ['Crystal Palace', 'Arsenal', 2]
    , ['Crystal Palace', 'Aston Villa', 2]
    , ['Crystal Palace', 'Bournemouth', 1]
    , ['Crystal Palace', 'Chelsea', 2]
    , ['Crystal Palace', 'Everton', 1]
    , ['Crystal Palace', 'Leicester City', 0]
    , ['Crystal Palace', 'Liverpool', 3]
    , ['Crystal Palace', 'Manchester City', 0]
    , ['Crystal Palace', 'Manchester Utd', 0]
    , ['Crystal Palace', 'Newcastle Utd', 5]
    , ['Crystal Palace', 'Norwich City', 4]
    , ['Crystal Palace', 'Southampton', 2]
    , ['Crystal Palace', 'Stoke City', 4]
    , ['Crystal Palace', 'Sunderland', 2]
    , ['Crystal Palace', 'Swansea City', 1]
    , ['Crystal Palace', 'Tottenham', 1]
    , ['Crystal Palace', 'Watford', 2]
    , ['Crystal Palace', 'West Bromwich', 4]
    , ['Crystal Palace', 'West Ham Utd', 3]
    , ['Everton', 'Arsenal', 1]
    , ['Everton', 'Aston Villa', 7]
    , ['Everton', 'Bournemouth', 5]
    , ['Everton', 'Chelsea', 6]
    , ['Everton', 'Crystal Palace', 1]
    , ['Everton', 'Leicester City', 3]
    , ['Everton', 'Liverpool', 1]
    , ['Everton', 'Manchester City', 0]
    , ['Everton', 'Manchester Utd', 0]
    , ['Everton', 'Newcastle Utd', 4]
    , ['Everton', 'Norwich City', 4]
    , ['Everton', 'Southampton', 4]
    , ['Everton', 'Stoke City', 6]
    , ['Everton', 'Sunderland', 6]
    , ['Everton', 'Swansea City', 1]
    , ['Everton', 'Tottenham', 1]
    , ['Everton', 'Watford', 3]
    , ['Everton', 'West Bromwich', 3]
    , ['Everton', 'West Ham Utd', 3]
    , ['Leicester City', 'Arsenal', 3]
    , ['Leicester City', 'Aston Villa', 4]
    , ['Leicester City', 'Bournemouth', 1]
    , ['Leicester City', 'Chelsea', 3]
    , ['Leicester City', 'Crystal Palace', 2]
    , ['Leicester City', 'Everton', 6]
    , ['Leicester City', 'Liverpool', 2]
    , ['Leicester City', 'Manchester City', 3]
    , ['Leicester City', 'Manchester Utd', 2]
    , ['Leicester City', 'Newcastle Utd', 4]
    , ['Leicester City', 'Norwich City', 3]
    , ['Leicester City', 'Southampton', 3]
    , ['Leicester City', 'Stoke City', 5]
    , ['Leicester City', 'Sunderland', 6]
    , ['Leicester City', 'Swansea City', 7]
    , ['Leicester City', 'Tottenham', 2]
    , ['Leicester City', 'Watford', 3]
    , ['Leicester City', 'West Bromwich', 5]
    , ['Leicester City', 'West Ham Utd', 4]
    , ['Liverpool', 'Arsenal', 3]
    , ['Liverpool', 'Aston Villa', 9]
    , ['Liverpool', 'Bournemouth', 3]
    , ['Liverpool', 'Chelsea', 4]
    , ['Liverpool', 'Crystal Palace', 3]
    , ['Liverpool', 'Everton', 5]
    , ['Liverpool', 'Leicester City', 1]
    , ['Liverpool', 'Manchester City', 7]
    , ['Liverpool', 'Manchester Utd', 1]
    , ['Liverpool', 'Newcastle Utd', 2]
    , ['Liverpool', 'Norwich City', 6]
    , ['Liverpool', 'Southampton', 3]
    , ['Liverpool', 'Stoke City', 5]
    , ['Liverpool', 'Sunderland', 3]
    , ['Liverpool', 'Swansea City', 2]
    , ['Liverpool', 'Tottenham', 1]
    , ['Liverpool', 'Watford', 2]
    , ['Liverpool', 'West Bromwich', 3]
    , ['Liverpool', 'West Ham Utd', 0]
    , ['Manchester City', 'Arsenal', 3]
    , ['Manchester City', 'Aston Villa', 4]
    , ['Manchester City', 'Bournemouth', 9]
    , ['Manchester City', 'Chelsea', 6]
    , ['Manchester City', 'Crystal Palace', 5]
    , ['Manchester City', 'Everton', 2]
    , ['Manchester City', 'Leicester City', 1]
    , ['Manchester City', 'Liverpool', 1]
    , ['Manchester City', 'Manchester Utd', 0]
    , ['Manchester City', 'Newcastle Utd', 7]
    , ['Manchester City', 'Norwich City', 2]
    , ['Manchester City', 'Southampton', 5]
    , ['Manchester City', 'Stoke City', 4]
    , ['Manchester City', 'Sunderland', 5]
    , ['Manchester City', 'Swansea City', 3]
    , ['Manchester City', 'Tottenham', 2]
    , ['Manchester City', 'Watford', 4]
    , ['Manchester City', 'West Bromwich', 5]
    , ['Manchester City', 'West Ham Utd', 3]
    , ['Manchester Utd', 'Arsenal', 3]
    , ['Manchester Utd', 'Aston Villa', 2]
    , ['Manchester Utd', 'Bournemouth', 4]
    , ['Manchester Utd', 'Chelsea', 1]
    , ['Manchester Utd', 'Crystal Palace', 2]
    , ['Manchester Utd', 'Everton', 4]
    , ['Manchester Utd', 'Leicester City', 2]
    , ['Manchester Utd', 'Liverpool', 4]
    , ['Manchester Utd', 'Manchester City', 1]
    , ['Manchester Utd', 'Newcastle Utd', 3]
    , ['Manchester Utd', 'Norwich City', 2]
    , ['Manchester Utd', 'Southampton', 3]
    , ['Manchester Utd', 'Stoke City', 3]
    , ['Manchester Utd', 'Sunderland', 4]
    , ['Manchester Utd', 'Swansea City', 3]
    , ['Manchester Utd', 'Tottenham', 1]
    , ['Manchester Utd', 'Watford', 3]
    , ['Manchester Utd', 'West Bromwich', 2]
    , ['Manchester Utd', 'West Ham Utd', 2]
    , ['Newcastle Utd', 'Arsenal', 0]
    , ['Newcastle Utd', 'Aston Villa', 1]
    , ['Newcastle Utd', 'Bournemouth', 2]
    , ['Newcastle Utd', 'Chelsea', 3]
    , ['Newcastle Utd', 'Crystal Palace', 2]
    , ['Newcastle Utd', 'Everton', 0]
    , ['Newcastle Utd', 'Leicester City', 0]
    , ['Newcastle Utd', 'Liverpool', 4]
    , ['Newcastle Utd', 'Manchester City', 2]
    , ['Newcastle Utd', 'Manchester Utd', 3]
    , ['Newcastle Utd', 'Norwich City', 8]
    , ['Newcastle Utd', 'Southampton', 3]
    , ['Newcastle Utd', 'Stoke City', 0]
    , ['Newcastle Utd', 'Sunderland', 1]
    , ['Newcastle Utd', 'Swansea City', 3]
    , ['Newcastle Utd', 'Tottenham', 7]
    , ['Newcastle Utd', 'Watford', 2]
    , ['Newcastle Utd', 'West Bromwich', 1]
    , ['Newcastle Utd', 'West Ham Utd', 2]
    , ['Norwich City', 'Arsenal', 1]
    , ['Norwich City', 'Aston Villa', 2]
    , ['Norwich City', 'Bournemouth', 3]
    , ['Norwich City', 'Chelsea', 1]
    , ['Norwich City', 'Crystal Palace', 1]
    , ['Norwich City', 'Everton', 1]
    , ['Norwich City', 'Leicester City', 1]
    , ['Norwich City', 'Liverpool', 5]
    , ['Norwich City', 'Manchester City', 1]
    , ['Norwich City', 'Manchester Utd', 2]
    , ['Norwich City', 'Newcastle Utd', 5]
    , ['Norwich City', 'Southampton', 1]
    , ['Norwich City', 'Stoke City', 2]
    , ['Norwich City', 'Sunderland', 3]
    , ['Norwich City', 'Swansea City', 1]
    , ['Norwich City', 'Tottenham', 0]
    , ['Norwich City', 'Watford', 4]
    , ['Norwich City', 'West Bromwich', 1]
    , ['Norwich City', 'West Ham Utd', 4]
    , ['Southampton', 'Arsenal', 4]
    , ['Southampton', 'Aston Villa', 5]
    , ['Southampton', 'Bournemouth', 2]
    , ['Southampton', 'Chelsea', 4]
    , ['Southampton', 'Crystal Palace', 4]
    , ['Southampton', 'Everton', 1]
    , ['Southampton', 'Leicester City', 2]
    , ['Southampton', 'Liverpool', 4]
    , ['Southampton', 'Manchester City', 5]
    , ['Southampton', 'Manchester Utd', 3]
    , ['Southampton', 'Newcastle Utd', 5]
    , ['Southampton', 'Norwich City', 3]
    , ['Southampton', 'Stoke City', 2]
    , ['Southampton', 'Sunderland', 2]
    , ['Southampton', 'Swansea City', 4]
    , ['Southampton', 'Tottenham', 2]
    , ['Southampton', 'Watford', 2]
    , ['Southampton', 'West Bromwich', 3]
    , ['Southampton', 'West Ham Utd', 2]
    , ['Stoke City', 'Arsenal', 0]
    , ['Stoke City', 'Aston Villa', 3]
    , ['Stoke City', 'Bournemouth', 5]
    , ['Stoke City', 'Chelsea', 2]
    , ['Stoke City', 'Crystal Palace', 2]
    , ['Stoke City', 'Everton', 4]
    , ['Stoke City', 'Leicester City', 2]
    , ['Stoke City', 'Liverpool', 1]
    , ['Stoke City', 'Manchester City', 2]
    , ['Stoke City', 'Manchester Utd', 2]
    , ['Stoke City', 'Newcastle Utd', 1]
    , ['Stoke City', 'Norwich City', 4]
    , ['Stoke City', 'Southampton', 2]
    , ['Stoke City', 'Sunderland', 1]
    , ['Stoke City', 'Swansea City', 3]
    , ['Stoke City', 'Tottenham', 2]
    , ['Stoke City', 'Watford', 2]
    , ['Stoke City', 'West Bromwich', 1]
    , ['Stoke City', 'West Ham Utd', 2]
    , ['Sunderland', 'Arsenal', 1]
    , ['Sunderland', 'Aston Villa', 5]
    , ['Sunderland', 'Bournemouth', 1]
    , ['Sunderland', 'Chelsea', 4]
    , ['Sunderland', 'Crystal Palace', 3]
    , ['Sunderland', 'Everton', 5]
    , ['Sunderland', 'Leicester City', 2]
    , ['Sunderland', 'Liverpool', 2]
    , ['Sunderland', 'Manchester City', 1]
    , ['Sunderland', 'Manchester Utd', 2]
    , ['Sunderland', 'Newcastle Utd', 4]
    , ['Sunderland', 'Norwich City', 4]
    , ['Sunderland', 'Southampton', 1]
    , ['Sunderland', 'Stoke City', 3]
    , ['Sunderland', 'Swansea City', 5]
    , ['Sunderland', 'Tottenham', 1]
    , ['Sunderland', 'Watford', 2]
    , ['Sunderland', 'West Bromwich', 0]
    , ['Sunderland', 'West Ham Utd', 2]
    , ['Swansea City', 'Arsenal', 2]
    , ['Swansea City', 'Aston Villa', 3]
    , ['Swansea City', 'Bournemouth', 4]
    , ['Swansea City', 'Chelsea', 3]
    , ['Swansea City', 'Crystal Palace', 1]
    , ['Swansea City', 'Everton', 2]
    , ['Swansea City', 'Leicester City', 0]
    , ['Swansea City', 'Liverpool', 3]
    , ['Swansea City', 'Manchester City', 2]
    , ['Swansea City', 'Manchester Utd', 3]
    , ['Swansea City', 'Newcastle Utd', 2]
    , ['Swansea City', 'Norwich City', 1]
    , ['Swansea City', 'Southampton', 1]
    , ['Swansea City', 'Stoke City', 2]
    , ['Swansea City', 'Sunderland', 3]
    , ['Swansea City', 'Tottenham', 3]
    , ['Swansea City', 'Watford', 1]
    , ['Swansea City', 'West Bromwich', 2]
    , ['Swansea City', 'West Ham Utd', 4]
    , ['Tottenham', 'Arsenal', 3]
    , ['Tottenham', 'Aston Villa', 5]
    , ['Tottenham', 'Bournemouth', 8]
    , ['Tottenham', 'Chelsea', 2]
    , ['Tottenham', 'Crystal Palace', 4]
    , ['Tottenham', 'Everton', 1]
    , ['Tottenham', 'Leicester City', 1]
    , ['Tottenham', 'Liverpool', 1]
    , ['Tottenham', 'Manchester City', 6]
    , ['Tottenham', 'Manchester Utd', 3]
    , ['Tottenham', 'Newcastle Utd', 2]
    , ['Tottenham', 'Norwich City', 6]
    , ['Tottenham', 'Southampton', 3]
    , ['Tottenham', 'Stoke City', 6]
    , ['Tottenham', 'Sunderland', 5]
    , ['Tottenham', 'Swansea City', 4]
    , ['Tottenham', 'Watford', 3]
    , ['Tottenham', 'West Bromwich', 2]
    , ['Tottenham', 'West Ham Utd', 4]
    , ['Watford', 'Arsenal', 0]
    , ['Watford', 'Aston Villa', 6]
    , ['Watford', 'Bournemouth', 1]
    , ['Watford', 'Chelsea', 2]
    , ['Watford', 'Crystal Palace', 2]
    , ['Watford', 'Everton', 3]
    , ['Watford', 'Leicester City', 1]
    , ['Watford', 'Liverpool', 3]
    , ['Watford', 'Manchester City', 1]
    , ['Watford', 'Manchester Utd', 1]
    , ['Watford', 'Newcastle Utd', 4]
    , ['Watford', 'Norwich City', 4]
    , ['Watford', 'Southampton', 0]
    , ['Watford', 'Stoke City', 3]
    , ['Watford', 'Sunderland', 3]
    , ['Watford', 'Swansea City', 1]
    , ['Watford', 'Tottenham', 1]
    , ['Watford', 'West Bromwich', 1]
    , ['Watford', 'West Ham Utd', 3]
    , ['West Bromwich', 'Arsenal', 2]
    , ['West Bromwich', 'Aston Villa', 1]
    , ['West Bromwich', 'Bournemouth', 2]
    , ['West Bromwich', 'Chelsea', 4]
    , ['West Bromwich', 'Crystal Palace', 3]
    , ['West Bromwich', 'Everton', 3]
    , ['West Bromwich', 'Leicester City', 4]
    , ['West Bromwich', 'Liverpool', 3]
    , ['West Bromwich', 'Manchester City', 1]
    , ['West Bromwich', 'Manchester Utd', 1]
    , ['West Bromwich', 'Newcastle Utd', 1]
    , ['West Bromwich', 'Norwich City', 1]
    , ['West Bromwich', 'Southampton', 0]
    , ['West Bromwich', 'Stoke City', 3]
    , ['West Bromwich', 'Sunderland', 1]
    , ['West Bromwich', 'Swansea City', 1]
    , ['West Bromwich', 'Tottenham', 2]
    , ['West Bromwich', 'Watford', 0]
    , ['West Bromwich', 'West Ham Utd', 1]
    , ['West Ham Utd', 'Arsenal', 5]
    , ['West Ham Utd', 'Aston Villa', 3]
    , ['West Ham Utd', 'Bournemouth', 6]
    , ['West Ham Utd', 'Chelsea', 4]
    , ['West Ham Utd', 'Crystal Palace', 5]
    , ['West Ham Utd', 'Everton', 4]
    , ['West Ham Utd', 'Leicester City', 3]
    , ['West Ham Utd', 'Liverpool', 5]
    , ['West Ham Utd', 'Manchester City', 4]
    , ['West Ham Utd', 'Manchester Utd', 3]
    , ['West Ham Utd', 'Newcastle Utd', 3]
    , ['West Ham Utd', 'Norwich City', 4]
    , ['West Ham Utd', 'Southampton', 2]
    , ['West Ham Utd', 'Stoke City', 1]
    , ['West Ham Utd', 'Sunderland', 3]
    , ['West Ham Utd', 'Swansea City', 1]
    , ['West Ham Utd', 'Tottenham', 2]
    , ['West Ham Utd', 'Watford', 3]
    , ['West Ham Utd', 'West Bromwich', 4]
  ];


  private mockData: any = {
    directedGraph: [
      {
        week: 0,
        startDate: 0,
        endDate: 1,
        nodes: [
          {
            id: 1,
            name: 'A',
            group: 1
          },
          {
            id: 2,
            name: 'B',
            group: 2
          },
        ],
        links: [
          {
            score: 13,
            source: 1,
            target: 2
          }
        ]
      },

      {
        week: 1,
        startDate: 0,
        endDate: 1,
        nodes: [
          {
            id: 1,
            name: 'A',
            group: 1
          },
          {
            id: 2,
            name: 'B',
            group: 2
          },
        ],
        links: [
          {
            score: 13,
            source: 1,
            target: 2
          }
        ]
      }
    ],
    edgeBundling: [
      {
        data: [{
          name: 'A',
          imports: ['C'],
          size: 1,
          group: 'PERIPHERAL'
        }, {
          name: 'C',
          imports: ['B'],
          size: 2,
          group: 'CENTRAL'
        }, {
          name: 'B',
          imports: ['D'],
          size: 5,
          group: 'ACTIVE'
        }, {
          name: 'D',
          imports: ['C'],
          size: 3,
          group: 'ACTIVE'
        }]
      },
      {
        data: [{
          name: 'A',
          imports: ['C', 'D'],
          size: 1,
          group: 'CENTRAL'
        }, {
          name: 'C',
          imports: ['B', 'D'],
          size: 2,
          group: 'CENTRAL'
        }, {
          name: 'B',
          imports: ['D'],
          size: 5,
          group: 'ACTIVE'
        }, {
          name: 'D',
          imports: ['C'],
          size: 3,
          group: 'PERIPHERAL'
        }]
      },
    ]
  };

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
    { id: 1, name: 'Hierarchical Edge Bundling' },
    { id: 2, name: 'Clustered Force Layout' }
  ];
  overviewTypes: ViewType[] = [
    { id: 0, name: 'Multi-level Edge Bundling' }
  ];

  nodeTypes = {
    '1': 'CENTRAL',
    '2': 'ACTIVE',
    '3': 'PERIPHERAL'
  };

  selectedViewType: ViewType;
  selectedOverviewType: ViewType;
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
    document.getElementById('defaultOpen').click();
    this.apiRequestService.setApiService('community');
    this.isLoadingGraph = false;
    const data = null;
    const process = this.apiRequestService.process(data);
    process.subscribe((categories: any) => {
      // console.log(categories);
      this.categories = categories.data;
      if (this.categories.length > 0) {
        this.selectedCategory = this.categories[0];
        this.selectedCommunity = this.categories[0].communities[0];
      }
      this.selectedViewType = this.viewTypes[0];
      this.selectedOverviewType = this.overviewTypes[0];
    });
  }

  generateParticipantsGraph(community: string) {
    this.isLoadingGraph = true;
    this.participantsCommunity = this.selectedCommunity;
    this.subcommunities = [];

    this.apiRequestService.setApiService('communityDirectedGraph');
    var data = {
      name: community
    };
    this.apiRequestService.process(data).subscribe((participants: any) => {
      this.directedGraph = participants.data.sort((a, b) => a.week - b.week);
      this.apiRequestService.setApiService('communityEdgeBundling');
      var data = {
        name: community
      }
      this.apiRequestService.process(data).subscribe((participants: any) => {
        this.edgeBundling = participants.data.sort((a, b) => a.week - b.week);
        //console.log(this.directedGraph);
        //console.log(this.edgeBundling);
        for (var i = 0; i < this.directedGraph.length; i++) {
          var clusteredData = [];
          for (var j = 0; j < this.directedGraph[i].nodes.length; j++) {
            let node = this.directedGraph[i].nodes[j];
            clusteredData.push({
              "text":node.name,
              "size":node.value,
              "group":node.group
            });
          }
          if (this.edgeBundling[i]["data"].length > 0) {
            var graphSubcommunity = new TwoModeGraph();
            graphSubcommunity = this.parseGraphData(this.directedGraph[i]);
            this.subcommunities.push({
              week: this.directedGraph[i].week,
              graph: graphSubcommunity,
              edgeBundling: this.edgeBundling[i].data,
              clustered: clusteredData,
              startDate: new Date(this.directedGraph[i].startDate),
              endDate: new Date(this.directedGraph[i].endDate)
            });
          }
        }
        this.isLoadingGraph = false;
      });
    });
    console.log(this.subcommunities);
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

  private openTab(tabName) {
    let tabcontent;
    tabcontent = document.getElementsByClassName('tabcontent');
    for (let i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = 'none';
    }
    document.getElementById(tabName).style.display = 'block';
  }

}

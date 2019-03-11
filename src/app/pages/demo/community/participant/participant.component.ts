import { Component, OnInit, Input } from '@angular/core';
import { ParticipantDO } from './participant.do';
import { ApiRequestService } from '../../api-request.service';

@Component({
  selector: 'app-participant',
  templateUrl: './participant.component.html',
  styleUrls: ['./participant.component.css'],
  providers: [ApiRequestService]
})
export class ParticipantComponent implements OnInit {

  private mockData = [
    {
      'NN': 53.0,
      'Scr': 57.759,
      'week': 1,
      'endDate': 1377862964000,
      'VB': 33.0,
      'participantNickname': 'Member 1',
      'Contrib': 5.0,
      'OutDegree': 87.801,
      'communityName': 'Online Math Course',
      'InterAnim': 79.135,
      'participantName': '117670883',
      'InDegree': 43.178,
      'SocialKB': 30.042,
      'startDate': 1377258164000,
      'group': 'CENTRAL'
    },
    {},
    {}
  ];

  participants: ParticipantDO[];
  private _communityName: string;
  private _week: number;
  biggerThan = 7;
  smallerThan = 5;
  showName = false;
  @Input() communityName: string;
  @Input() week: number;
  // columns: string[] = ["Name", "Nickname", "Contributions", "Cumulated contribution scores",
  //                     "Cumulated social KB scores", "Degree of inter-animation", "In-degree centrality", "Out-degree centrality"];
  filter: ParticipantDO = new ParticipantDO();

  constructor(private apiRequestService: ApiRequestService) { }

  ngOnInit() {
    this.apiRequestService.setApiService('communityParticipants');
    const process = this.apiRequestService.process({
      name: this.communityName,
    });
    process.subscribe(participantObjects => {
      const participantList: ParticipantDO[] = [];
      for (let i = 0; i < participantObjects.data.length; i++) {
        if (participantObjects.data[i]['week'] === this.week) {
          const participant = new ParticipantDO();
          participant.buildFromObject(participantObjects.data[i]);
          participantList.push(participant);
        }
      }
      this.participants = participantList;
    });
  }

}

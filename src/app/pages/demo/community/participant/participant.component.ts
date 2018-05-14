import { Component, OnInit, Input } from '@angular/core';
import { ParticipantDO } from './participant.do';
import { ParticipantService } from './participant.service';

@Component({
  selector: 'app-participant',
  templateUrl: './participant.component.html',
  styleUrls: ['./participant.component.css']
})
export class ParticipantComponent implements OnInit {

  participants: ParticipantDO[];
  private _communityName: string;
  private _week: number;
  biggerThan: number = 7;
  smallerThan: number = 5;
  showName: boolean = false;
  // columns: string[] = ["Name", "Nickname", "Contributions", "Cumulated contribution scores",
  //                     "Cumulated social KB scores", "Degree of inter-animation", "In-degree centrality", "Out-degree centrality"];
  filter: ParticipantDO = new ParticipantDO();

  public get communityName(): string {
    return this._communityName;
  }
  @Input()
  public set communityName(communityName: string) {
    this._communityName = communityName;
  }

  public get week(): number {
    return this._week;
  }
  @Input()
  public set week(week: number) {
    this._week = week;
  }

  constructor(private _participantService: ParticipantService) { }

  ngOnInit() {
    this._participantService.getParticipantsStats(this._communityName, this._week).subscribe((participantList: ParticipantDO[]) => {
      this.participants = [];
      this.participants = participantList;
    });
  }
  
}

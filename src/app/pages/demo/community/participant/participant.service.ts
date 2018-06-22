import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { ParticipantDO } from './participant.do';
import { ReaderbenchService } from '../../../../readerbench.service';
import { ApiRequestService } from '../../api-request.service';

@Injectable()
export class ParticipantService {
    //private static _participantLists: Map<number, ParticipantDO[]> = null;

    constructor(private apiRequestService: ApiRequestService) { }

    public getParticipantsStats(communityName: string, week: number): ParticipantDO[] {
        //if (ParticipantService._participantLists == null) {
            this.apiRequestService.setEndpoint('community/participants');
            var process = this.apiRequestService.process({
                name: communityName,
            });
            process.subscribe(participantObjects => {
                var participantList: ParticipantDO[] = [];
                for (var p in participantObjects.data) {
                   var participant = new ParticipantDO();
                   participant.buildFromObject(p);
                   participantList.push(participant);
                }
               //ParticipantService._participantLists = participantLists;
               //return participantLists[week];
               return participantList;
            });
            return null;
        //}
        //return Observable.from(ParticipantService._participantLists[week]);
    }
}
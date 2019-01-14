import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { ParticipantDO } from './participant.do';
import { ApiRequestService } from '../../api-request.service';
// import _ = require('underscore');

@Injectable()
export class ParticipantService {
    private _participantList: ParticipantDO[] = [];

    constructor(private apiRequestService: ApiRequestService) { }

    public getParticipantsStats(communityName: string, week: number): Observable<ParticipantDO[]> {
        this.apiRequestService.setApiService('communityParticipants');
        const process = this.apiRequestService.process({
            communityName: communityName,
            week: week
        });
        process.subscribe(participantObjects => {
            const participantList: ParticipantDO[] = [];
            //     _.forEach(participantObjects, (participant: Object) => {
            //        var p = new ParticipantDO();
            //        p.buildFromObject(participant);
            //        participantList.push(p);
            //    });
            this._participantList = participantList;
            return participantList;
        });
        return null;
    }
}

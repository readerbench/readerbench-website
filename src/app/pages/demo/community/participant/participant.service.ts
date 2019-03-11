import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { ParticipantDO } from './participant.do';
import { ApiRequestService } from '../../api-request.service';

@Injectable()
export class ParticipantService {

    constructor(private apiRequestService: ApiRequestService) { }

    public getParticipantsStats(communityName: string, week: number): Observable<ParticipantDO[]> {
        this.apiRequestService.setApiService('communityParticipants');
        const process = this.apiRequestService.process({
            communityName: communityName,
            week: week
        });
        process.subscribe(participantObjects => {
            const participantList: ParticipantDO[] = [];
            for (const p in participantObjects.data) {
                if (true) {
                    const participant = new ParticipantDO();
                    participant.buildFromObject(p);
                    participantList.push(participant);
                }
            }
            return participantList;
        });
        return null;
    }

}

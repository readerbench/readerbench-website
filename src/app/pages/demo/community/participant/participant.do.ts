import { ReaderBenchService } from "../../../../readerbench.service";
import { DemoDO } from "../../demo.do";

export class ParticipantDO extends DemoDO {
    participantName: string;
    participantNickname: string;
    Contrib: number;
    Scr: number;
    SocialKB: number;
    InterAnim: number;
    InDegree: number;
    OutDegree: number;
    group: string;

    protected getPrimitivePropertyKeys(): string[] {
        return ["participantName", "participantNickname", "Contrib", "Scr", "SocialKB", "InterAnim", "InDegree", "OutDegree", "group"];
    }

    public buildFromObject(object: Object) {
		super.buildFromObject(object);
        var rbUtils = new ReaderBenchService();
        
        this.Scr = rbUtils.roundNumberToTwoDecimals(this.Scr);
        this.SocialKB = rbUtils.roundNumberToTwoDecimals(this.SocialKB);
        this.InterAnim = rbUtils.roundNumberToTwoDecimals(this.InterAnim);
        this.InDegree = rbUtils.roundNumberToTwoDecimals(this.InDegree);
        this.OutDegree = rbUtils.roundNumberToTwoDecimals(this.OutDegree);
    }
}
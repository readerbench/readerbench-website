export enum RbServerApi {
    ServiceUploadFile,
    GetSentiment,
    LakNodes,
    LakGraph,
    LakMeasures,
    LakYears,
    LakTopics,
    LakTopicEvolution,
    CiModel,
    CommunityParticipants,
    CommunityAllCommunities,
    CommunityParticipantsStats,
    CommunityParticipantsDirectedGraph,
    CommunityParticipantsEdgeBundling,
    TopicsAdvanced,
}

var RbServerApiUrl: { [index: number]: string; } = {};
RbServerApiUrl[RbServerApi.ServiceUploadFile] = "fileUpload";
RbServerApiUrl[RbServerApi.GetSentiment] = "getSentiment";
RbServerApiUrl[RbServerApi.LakNodes] = "lak/nodes";
RbServerApiUrl[RbServerApi.LakGraph] = "lak/graph";
RbServerApiUrl[RbServerApi.LakMeasures] = "lak/measures";
RbServerApiUrl[RbServerApi.LakYears] = "lak/years";
RbServerApiUrl[RbServerApi.LakTopics] = "lak/topics";
RbServerApiUrl[RbServerApi.CommunityParticipants] = "vcopD3";
RbServerApiUrl[RbServerApi.LakTopicEvolution] = "lak/topicEvolution";
RbServerApiUrl[RbServerApi.CiModel] = "ci-model/analyzer";
RbServerApiUrl[RbServerApi.CommunityAllCommunities] = "community/communities";
RbServerApiUrl[RbServerApi.CommunityParticipantsStats] = "community/participants";
RbServerApiUrl[RbServerApi.CommunityParticipantsDirectedGraph] = "community/participants/directedGraph";
RbServerApiUrl[RbServerApi.CommunityParticipantsEdgeBundling] = "community/participants/edgeBundling";
RbServerApiUrl[RbServerApi.TopicsAdvanced] = "__TODO__";

export class ServerApiBuilder {
    // TODO: to be changed!
    public static ApiRoot = "http://readerbench.com/api/";

    constructor(private _thServerApi: RbServerApi) {
    }

    public getUrl(): string {
        return ServerApiBuilder.ApiRoot + RbServerApiUrl[this._thServerApi];
    }
}
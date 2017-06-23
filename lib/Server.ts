import * as fetch from 'node-fetch';
import {AchievementInfo, AchievementInfoFactory} from "./AchievementInfo";
import {Methods} from "./Methods";

export class Server{
    private static _achievements : Promise<AchievementInfo[]> = null;

    static achievements(forceRefresh: boolean = false): Promise<AchievementInfo[]>{
        if(Server._achievements == null || forceRefresh){
            Server._achievements = fetch(Methods.GLOBAL_ACHIEVEMENT_LIST())
                .then(res => res.json())
                .then(res => res.map(achievement => new AchievementInfoFactory().fromResponse(achievement).create()))
        }

        return Server._achievements;
    }
}
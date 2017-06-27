import {fetch, AchievementInfo, AchievementInfoFactory, Methods} from "./main";

/**
 * contains static methods to get the general data about the server
 */
export class Server{
    /**
     * gets the list of serverwide achievements
     * @param forceRefresh ignore the cache
     */
    static achievements(forceRefresh: boolean = false): Promise<AchievementInfo[]>{
        return fetch(Methods.GLOBAL_ACHIEVEMENT_LIST(), forceRefresh)
            .then(res => res.map(achievement => new AchievementInfoFactory().fromResponse(achievement).create()))
    }
}
import {fetch, AchievementInfo, AchievementInfoFactory, Methods} from "./main";

/**
 * contains static methods to get the general data about the server
 */
export class Server{
    /**
     * gets the list of serverwide achievements
     * @param maxCacheAge maximum age of the cache
     */
    static achievements(maxCacheAge: number = 24*60*60*1000): Promise<AchievementInfo[]>{
        return fetch(Methods.GLOBAL_ACHIEVEMENT_LIST(), maxCacheAge)
            .then(res => res.map(achievement => new AchievementInfoFactory().fromResponse(achievement).create()))
    }
}
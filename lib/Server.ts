import {fetch, AchievementInfo, AchievementInfoFactory, Methods, Player, ChatReport, ChatReportFactory} from "./main";

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

    /**
     * get a list of the team members of the hive
     * @param maxCacheAge maximum age of the cache
     */
    static teamMembers(maxCacheAge: number = 24 * 60 * 60 * 1000): Promise<Player[]>{
        return Promise.all([
            Server.moderators(maxCacheAge),
            Server.seniorModerators(maxCacheAge),
            Server.developers(maxCacheAge),
            Server.owners(maxCacheAge)
        ]).then(res => [].concat.apply([], res));
    }

    /**
     * get a list of the moderators of the hive
     * @param maxCacheAge maximum age of the cache
     */
    static moderators(maxCacheAge: number = 24 * 60 * 60 * 1000): Promise<Player[]>{
        return fetch(Methods.STAFF_LIST(), maxCacheAge)
            .then(res => res[5])
            .then(res => res.map(a => new Player(a)));
    }

    /**
     * get a list of the senior moderators of the hive
     * @param maxCacheAge maximum age of the cache
     */
    static seniorModerators(maxCacheAge: number = 24 * 60 * 60 * 1000): Promise<Player[]>{
        return fetch(Methods.STAFF_LIST(), maxCacheAge)
            .then(res => res[6])
            .then(res => res.map(a => new Player(a)));
    }

    /**
     * get a list of the developers of the hive
     * @param maxCacheAge maximum age of the cache
     */
    static developers(maxCacheAge: number = 24 * 60 * 60 * 1000): Promise<Player[]>{
        return fetch(Methods.STAFF_LIST(), maxCacheAge)
            .then(res => res[7])
            .then(res => res.map(a => new Player(a)));
    }

    /**
     * get a list of the owners of the hive
     * @param maxCacheAge maximum age of the cache
     */
    static owners(maxCacheAge: number = 24 * 60 * 60 * 1000): Promise<Player[]>{
        return fetch(Methods.STAFF_LIST(), maxCacheAge)
            .then(res => res[8])
            .then(res => res.map(a => new Player(a)));
    }

    /**
     * gets the [[ChatReport]] of the id, data about these are currently only available for the chatreports without the W_
     * prefix
     */
    static chatreport(chatReportId: string, maxCacheAge: number = 30 * 24 * 60 * 60 * 1000): Promise<ChatReport>{
        return fetch(Methods.CHAT_REPORT(chatReportId))
            .then(res => new ChatReportFactory().fromResponse(res).id(chatReportId).create())
            .catch(() => new ChatReportFactory().id(chatReportId).create());
    }
}
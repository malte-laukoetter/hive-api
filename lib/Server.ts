import {fetch, AchievementInfo, AchievementInfoFactory, Methods, Player, ChatReport, ChatReportFactory, Ranks} from "./main";

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
     * gets the amount of unique players
     * @param maxCacheAge maximum age of the cache
     */
    static uniquePlayers(maxCacheAge: number = 60*60*1000): Promise<Number>{
        return fetch(Methods.UNIQUE_PLAYER_COUNT(), maxCacheAge).then(res => res.count);
    }

    /**
     * gets the current amount of players on the server
     * @param maxCacheAge maximum age of the cache
     */
    static currentPlayers(maxCacheAge: number = 60*1000): Promise<Number>{
        return fetch(Methods.PLAYER_COUNT(), maxCacheAge).then(res => res.count);
    }

    /**
     * get a list of the team members of the hive
     * @param maxCacheAge maximum age of the cache
     * @deprecated Use {@link Rank#listPlayers} instead
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
     * @deprecated Use {@link Rank#listPlayers} instead
     */
    static moderators(maxCacheAge: number = 24 * 60 * 60 * 1000): Promise<Player[]>{
        return Ranks.MODERATOR.listPlayers(maxCacheAge);
    }

    /**
     * get a list of the senior moderators of the hive
     * @param maxCacheAge maximum age of the cache
     * @deprecated Use {@link Rank#listPlayers} instead
     */
    static seniorModerators(maxCacheAge: number = 24 * 60 * 60 * 1000): Promise<Player[]>{
        return Ranks.SRMODERATOR.listPlayers(maxCacheAge);
    }

    /**
     * get a list of the developers of the hive
     * @param maxCacheAge maximum age of the cache
     * @deprecated Use {@link Rank#listPlayers} instead
     */
    static developers(maxCacheAge: number = 24 * 60 * 60 * 1000): Promise<Player[]>{
        return Ranks.DEVELOPER.listPlayers(maxCacheAge);
    }

    /**
     * get a list of the owners of the hive
     * @param maxCacheAge maximum age of the cache
     * @deprecated Use {@link Rank#listPlayers} instead
     */
    static owners(maxCacheAge: number = 24 * 60 * 60 * 1000): Promise<Player[]>{
        return Ranks.OWNER.listPlayers(maxCacheAge);
    }

    /**
     * get a list of the nectar members
     * @param maxCacheAge maximum age of the cache
     * @deprecated Use {@link Rank#listPlayers} instead
     */
    static nectar(maxCacheAge: number = 24 * 60 * 60 * 1000): Promise<Player[]> {
        return Ranks.OWNER.listPlayers(maxCacheAge)
    }

    /**
     * gets the [[ChatReport]] of the id, data about these are currently only available for the chatreports without the W_
     * prefix
     */
    static chatreport(chatReportId: string, maxCacheAge: number = 30 * 24 * 60 * 60 * 1000): Promise<ChatReport>{
        return fetch(Methods.CHAT_REPORT(chatReportId), maxCacheAge)
            .then(res => new ChatReportFactory().fromResponse(res).id(chatReportId).create())
            .catch(() => new ChatReportFactory().id(chatReportId).create());
    }
}
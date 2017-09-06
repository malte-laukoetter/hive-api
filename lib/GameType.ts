import {fetch, Game, Methods, gameInfoFactoryForGametype, playerGameInfoFactoryForGametype, AchievementInfo,
    AchievementInfoFactory, GameMap} from "./main";

/**
 * a type of game available on the hive
 */
export class GameType {
    /**
     * creates a new [[GameType]]
     * @param id the id of the type used by the api
     * @param name the human readable name
     */
    constructor(readonly id: string, public name: string = "") {}

    /**
     * gets the [[Factory]] to create a [[PlayerGameInfo]] instance of this GameType
     * @return see [[playerGameInfoFactoryForGametype]]
     */
    get playerGameInfoFactory():any {
        return playerGameInfoFactoryForGametype(this);
    }

    /**
     * gets the [[Factory]] to create a [[GameInfo]] instance of this GameType
     * @return see [[gameInfoFactoryForGametype]]
     */
    get gameInfoFactory():any {
        return gameInfoFactoryForGametype(this);
    }

    /**
     * gets the information about the GameType
     * @param maxCacheAge maximum age of the cache
     */
    private info(maxCacheAge: number = 60*60*1000) : Promise<GameTypeInfo> {
        return fetch(Methods.GAMETYPE_INFO(this.id), maxCacheAge)
            .then(res => new GameTypeInfo(
                res.uniqueplayers,
                res.achievements.map(a => new AchievementInfoFactory().fromResponse(a).create())
            ));
    }

    /**
     * gets the latest 10 games
     */
    latestGames = (maxCacheAge: number = 10*1000) : Promise<Game[]> => fetch(Methods.GAMETYPE_LATEST(this.id), maxCacheAge)
        .then(res => res.map((gameId) => new Game(this, gameId)))
        .catch(err => []);

    /**
     * gets the amount of unique players that have played the game
     * @param maxCacheAge maximum age of the cache
     */
    uniquePlayers = (maxCacheAge: number = 60*60*1000) : Promise<number> =>
        this.info(maxCacheAge).then(res => res.uniquePlayers);

    /**
     * gets the achievements that are available
     * @param maxCacheAge maximum age of the cache
     */
    achievements = (maxCacheAge: number = 24*60*60*1000) : Promise<[AchievementInfo]> =>
        this.info(maxCacheAge).then(res => res.achievements);

    /**
     * gets the maps
     * @param maxCacheAge maximum age of the cache
     */
    maps(maxCacheAge: number = 24*60*60*1000): Promise<GameMap[]>{
        return fetch(Methods.MAP_LIST(this.id), maxCacheAge).then(res => Object.values(res).map(map =>
            new GameMap(this, map.worldname, map.mapname, map.mapauthor)
        ));
    }
}

/**
 * the information about a [[GameType]]
 */
class GameTypeInfo {
    constructor(readonly uniquePlayers : number, readonly achievements : [AchievementInfo]) {}
}

/**
 * A completely static class that contains all the [[GameType]]s available on the hive.
 * It has a initial list of the GameTypes available at creation of the file and can be updated from the api through
 * calling of the [[GameTypes#update]] method.
 */
export class GameTypes {
    static readonly SG   = new GameType("SG"); // done
    static readonly BP   = new GameType("BP"); // done
    static readonly CAI  = new GameType("CAI"); // done
    static readonly CR   = new GameType("CR"); // done
    static readonly DR   = new GameType("DR"); // done
    static readonly HB   = new GameType("HB"); // done
    static readonly HERO = new GameType("HERO"); // done
    static readonly HIDE = new GameType("HIDE"); // done
    static readonly OITC = new GameType("OITC"); // done
    static readonly SP   = new GameType("SP"); // done
    static readonly TIMV = new GameType("TIMV"); // done
    static readonly SKY  = new GameType("SKY"); // done
    static readonly LAB  = new GameType("LAB"); // done
    static readonly DRAW = new GameType("DRAW"); // done
    static readonly SLAP = new GameType("SLAP"); // done
    static readonly EF   = new GameType("EF"); // done
    static readonly MM   = new GameType("MM"); // done
    static readonly GRAV = new GameType("GRAV"); // done
    static readonly RR   = new GameType("RR"); // done
    static readonly GNT  = new GameType("GNT"); // done
    static readonly GNTM = new GameType("GNTM"); // done
    static readonly PMK  = new GameType("PMK"); // no achievements done
    static readonly SGN  = new GameType("SGN"); // no achievements done
    static readonly BD   = new GameType("BD"); // no achievements done
    static readonly SPL  = new GameType("SPL"); // done
    static readonly MIMV = new GameType("MIMV"); // done
    static readonly BED  = new GameType("BED"); // done

    private static _list : GameType[] = [GameTypes.SG, GameTypes.BP, GameTypes.CAI, GameTypes.CR, GameTypes.DR,
        GameTypes.HB, GameTypes.HERO, GameTypes.HIDE, GameTypes.OITC, GameTypes.SP, GameTypes.TIMV, GameTypes.SKY,
        GameTypes.LAB, GameTypes.DRAW, GameTypes.SLAP, GameTypes.EF, GameTypes.MM, GameTypes.GRAV, GameTypes.RR,
        GameTypes.GNT, GameTypes.GNTM, GameTypes.PMK, GameTypes.BD, GameTypes.SGN, GameTypes.SPL, GameTypes.MIMV,
        GameTypes.BED];

    /**
     * updates the list of [[GameType]]s and also the names of the entries that are still in the list
     * @return resolves after the update is finished and contains no data
     */
    static async update() {
        GameTypes._list = await fetch(Methods.GAMETYPE_LIST(), 0)
            .then(res => Object.entries(res).map(([id, name]) => {
                if(GameTypes[id]){
                    GameTypes[id].name = name;
                    return GameTypes[id];
                }else{
                    return new GameType(id, name)
                }
            }));
    }

    /**
     * a list of all available [[GameType]]s
     */
    static get list(): GameType[] {
        return GameTypes._list;
    }
}
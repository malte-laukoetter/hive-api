import {fetch, Game, Methods, gameInfoFactoryForGametype, playerGameInfoFactoryForGametype, AchievementInfo,
    AchievementInfoFactory, GameMap} from "./main";

/**
 * a type of game available on the hive
 */
export class GameType {
    private _info: Promise<GameTypeInfo> = null;

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
     * @param forceRefresh ignore the cache
     */
    private info(forceRefresh: boolean = false) : Promise<GameTypeInfo> {
        return fetch(Methods.GAMETYPE_INFO(this.id), forceRefresh)
            .then(res => res.json())
            .then(res => new GameTypeInfo(
                res.uniqueplayers,
                res.achievements.map(a => new AchievementInfoFactory().fromResponse(a).create())
            ));
    }

    /**
     * gets the latest 10 games
     */
    latestGames = () : Promise<Game[]> => fetch(Methods.GAMETYPE_LATEST(this.id), true)
        .then(res => res.json())
        .then(res => res.map((gameId) => new Game(this, gameId)))
        .catch(err => []);

    /**
     * gets the amount of unique players that have played the game
     * @param forceRefresh ignore the cache
     */
    uniquePlayers = (forceRefresh: boolean = false) : Promise<number> =>
        this.info(forceRefresh).then(res => res.uniquePlayers);

    /**
     * gets the achievements that are available
     * @param forceRefresh ignore the cache
     */
    achievements = (forceRefresh: boolean = false) : Promise<[AchievementInfo]> =>
        this.info(forceRefresh).then(res => res.achievements);

    /**
     * gets the maps
     * @param forceRefresh ignore the cache
     */
    maps(forceRefresh: boolean = false): Promise<GameMap[]>{
        return fetch(Methods.MAP_LIST(this.id), forceRefresh).then(res => res.map(map =>
            new GameMap(this, res.worldname, res.mapname, res.mapauthor)
        ))
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
    static readonly SG   = new GameType("SG");
    static readonly BP   = new GameType("BP");
    static readonly CAI  = new GameType("CAI");
    static readonly CR   = new GameType("CR");
    static readonly DR   = new GameType("DR");
    static readonly HB   = new GameType("HB");
    static readonly HERO = new GameType("HERO");
    static readonly HIDE = new GameType("HIDE");
    static readonly OITC = new GameType("OITC");
    static readonly SP   = new GameType("SP");
    static readonly TIMV = new GameType("TIMV");
    static readonly SKY  = new GameType("SKY");
    static readonly LAB  = new GameType("LAB");
    static readonly DRAW = new GameType("DRAW");
    static readonly SLAP = new GameType("SLAP");
    static readonly EF   = new GameType("EF");
    static readonly MM   = new GameType("MM");
    static readonly GRAV = new GameType("GRAV");
    static readonly RR   = new GameType("RR");
    static readonly GNT  = new GameType("GNT");
    static readonly GNTM = new GameType("GNTM");
    static readonly PMK  = new GameType("PMK");
    static readonly SGN  = new GameType("SGN");
    static readonly BD   = new GameType("BD");
    static readonly SPL  = new GameType("SPL");
    static readonly MIMV = new GameType("MIMV");
    static readonly BED  = new GameType("BED");

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
        GameTypes._list = await fetch(Methods.GAMETYPE_LIST())
            .then(res => res.json())
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
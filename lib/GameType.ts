import {fetch, Game, Methods, gameInfoFactoryForGametype, playerGameInfoFactoryForGametype, AchievementInfo,
    AchievementInfoFactory, GameMap, GameTitle} from "./main";
import { Leaderboard } from './Leaderboard';

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
        return fetch(Methods.MAP_LIST(this.id), maxCacheAge).then(res => Object.values(res).map((map: any) =>
            new GameMap(this, map.worldname, map.mapname, map.mapauthor, new Date(map.added * 1000))
        ));
    }

    async titles(maxCacheAge: number = 24*60*60*1000): Promise<GameTitle[]>{
        const res = await fetch(Methods.GAME_TITLES(this.id), maxCacheAge)

        const titles = Object.values(res).map((title: any) =>
            new GameTitle(this, title.name, title.required_points, title.human_name, title.plain_name, title.name_group ? title.name_group : undefined)
        );

        // BED top rank is not included by api
        if (this.id === 'BED') {
            titles.push(new GameTitle(this, 'ZZZZZZ', -1, '&f&l✹Zzzzzz', '✹Zzzzzz', 'Top Rank'))
        }
    }

    leaderboard(): Leaderboard {
        return new Leaderboard(this)
    }

    specialLeaderboard(key): Leaderboard {
        if(!this.specialLeaderboardKeys().has(key)) throw new Error(`Unknown special leaderboard ${key}`)

        return new Leaderboard(this, key)
    }

    private _specialLeaderboardKeys: Set<string> = new Set()

    addSpecialLeaderboardKey(key: string) {
        this._specialLeaderboardKeys.add(key);
        return this;
    }

    specialLeaderboardKeys(): Set<string> {
        return this._specialLeaderboardKeys;
    }

    private _subTypes: Set<GameType> = new Set()

    addSubType(type: GameType) {
        this._subTypes.add(type);
        return this;
    }

    subTypes(): Set<GameType> {
        return this._subTypes
    }
}

/**
 * the information about a [[GameType]]
 */
class GameTypeInfo {
    constructor(readonly uniquePlayers : number, readonly achievements : [AchievementInfo]) {}
}

export class BedGameType extends GameType {
    constructor(id: string, name: string, readonly mapId: string) {
        super(id, name)
    }

    async maps(maxCacheAge: number = 24 * 60 * 60 * 1000): Promise<GameMap[]> {
        const maps = await GameTypes.BED.maps(maxCacheAge)

        return maps.filter(map => map.worldName.endsWith(this.mapId))
    }

    titles(maxCacheAge: number = 24 * 60 * 60 * 1000): Promise<GameTitle[]> {
        return GameTypes.BED.titles(maxCacheAge)
    }

    leaderboard(): Leaderboard {
        return new Leaderboard(GameTypes.BED, this.id)
    }

    specialLeaderboard(key): Leaderboard {
        if (!this.specialLeaderboardKeys().has(key)) throw new Error(`Unknown special leaderboard ${key}`)        
        
        return new Leaderboard(GameTypes.BED, `${this.id}/${key}`)
    }

    addSpecialLeaderboardKey(key: string): this {
        throw new Error(`Special Leaderboard Keys need to be added on the Base GameType`);
    }

    specialLeaderboardKeys(): Set<string> {
        return GameTypes.BED.specialLeaderboardKeys();
    }
}

/**
 * A completely static class that contains all the [[GameType]]s available on the hive.
 * It has a initial list of the GameTypes available at creation of the file and can be updated from the api through
 * calling of the [[GameTypes#update]] method.
 */
export class GameTypes {
    static readonly SG   = new GameType("SG", "Survival Games");
    static readonly BP   = new GameType("BP", "BlockParty");
    static readonly CAI  = new GameType("CAI", "Cowboys and Indians");
    static readonly CR   = new GameType("CR", "Cranked");
    static readonly DR   = new GameType("DR", "DeathRun");
    static readonly HB   = new GameType("HB", "The Herobrine");
    static readonly HERO = new GameType("HERO", "SG:Heroes");
    static readonly HIDE = new GameType("HIDE", "Hide and Seek");
    static readonly OITC = new GameType("OITC", "One in the Chamber");
    static readonly SP   = new GameType("SP", "Splegg");
    static readonly TIMV = new GameType("TIMV", "Trouble in Mineville");
    static readonly SKY  = new GameType("SKY", "SkyWars");
    static readonly LAB  = new GameType("LAB", "The Lab");
    static readonly DRAW = new GameType("DRAW", "Draw It");
    static readonly SLAP = new GameType("SLAP", "Slaparoo");
    static readonly EF   = new GameType("EF", "Electric Floor");
    static readonly MM   = new GameType("MM", "Music Masters");
    static readonly GRAV = new GameType("GRAV", "Gravity");
    static readonly RR   = new GameType("RR", "Restaurant Rush");
    static readonly GNT  = new GameType("GNT", "SkyGiants");
    static readonly GNTM = new GameType("GNTM", "SkyGiants: Mini");
    static readonly PMK  = new GameType("PMK", "Pumpkinfection");
    static readonly SGN  = new GameType("SGN", "Survival Games 2");
    static readonly BD   = new GameType("BD", "BatteryDash");
    static readonly SPL  = new GameType("SPL", "Sploop");
    static readonly MIMV = new GameType("MIMV", "Murder in Mineville");
    static readonly BEDS = new BedGameType("BEDS", 'BedWars:Solo', 'SOLO');
    static readonly BEDD = new BedGameType("BEDD", 'BedWars:Duos', 'TEAM');
    static readonly BEDT = new BedGameType("BEDT", 'BedWars:Teams', '4');
    static readonly BEDX = new BedGameType("BEDX", 'BedWars:DoubleFun', 'TEAM');
    static readonly BED  = new GameType("BED", "BedWars").addSubType(GameTypes.BEDS).addSubType(GameTypes.BEDD).addSubType(GameTypes.BEDT).addSubType(GameTypes.BEDX).addSpecialLeaderboardKey('win_streak');
    static readonly SURV = new GameType("SURV", "Survive the Night"); // playerGameInfo missing
    static readonly EE   = new GameType("EE", "Explosive Eggs") // playerGameInfo missing
    static readonly SHU = new GameType("SHU", "Arcade Shuffle") // not in api

    private static _list : GameType[] = [GameTypes.SG, GameTypes.BP, GameTypes.CAI, GameTypes.CR, GameTypes.DR,
        GameTypes.HB, GameTypes.HERO, GameTypes.HIDE, GameTypes.OITC, GameTypes.SP, GameTypes.TIMV, GameTypes.SKY,
        GameTypes.LAB, GameTypes.DRAW, GameTypes.SLAP, GameTypes.EF, GameTypes.MM, GameTypes.GRAV, GameTypes.RR,
        GameTypes.GNT, GameTypes.GNTM, GameTypes.PMK, GameTypes.BD, GameTypes.SGN, GameTypes.SPL, GameTypes.MIMV,
        GameTypes.BED, GameTypes.SURV, GameTypes.EE, GameTypes.SHU];

    /**
     * updates the list of [[GameType]]s and also the names of the entries that are still in the list
     * @return resolves after the update is finished and contains no data
     */
    static async update() {
        GameTypes._list = await fetch(Methods.GAMETYPE_LIST(), 0)
            .then(res => Object.entries(res).map(([id, name]) => {
                if(GameTypes[id]){
                    GameTypes[id].name = name.toString();
                    return GameTypes[id];
                }else{
                    return new GameType(id, name.toString())
                }
            }));
        GameTypes._list.push(this.SHU)
    }

    /**
     * a list of all available [[GameType]]s
     */
    static get list(): GameType[] {
        return GameTypes._list;
    }
}
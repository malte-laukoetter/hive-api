import * as fetch from 'node-fetch';
import {Game} from "./Game";
import {Methods} from "./Methods";
import {gameInfoFactoryForGametype, playerGameInfoFactoryForGametype} from "./Factory";

/**
 * a type of game available on the hive
 */
export class GameType {
    private _id : string = "";
    private _name : string = "";
    private _info : Promise<GameTypeInfo> = null;

    /**
     * creates a new [[GameType]]
     * @param id the id of the type used by the api
     * @param name the human readable name
     */
    constructor(id: string, name: string = "") {
        this._id = id;
        this._name = name;
    }

    /**
     * the id used by the id to identify this [[GameType]]
     */
    get id(): string {
        return this._id;
    }

    /**
     * the human readable name of the [[GameType]]
     */
    get name(): string {
        return this._name;
    }

    /**
     * sets the name
     * @param value
     */
    set name(value: string) {
        this._name = value;
    }

    /**
     * gets the [[Factory]] to create a [[PlayerGameInfo]] instance of this GameType
     * @return see [[playerGameInfoFactoryForGametype]]
     */
    get playerGameInfoFactory() {
        return playerGameInfoFactoryForGametype(this);
    }

    /**
     * gets the [[Factory]] to create a [[GameInfo]] instance of this GameType
     * @return see [[gameInfoFactoryForGametype]]
     */
    get gameInfoFactory() {
        return gameInfoFactoryForGametype(this);
    }

    info() : Promise<GameTypeInfo> {
        if(this._info == null){
            this._info = fetch(Methods.GAMETYPE_INFO(this.id))
                .then(res => res.json())
                .then(res => new GameTypeInfo(res.uniqueplayers, res.achievements));
        }

        return this._info;
    }

    latestGames = () : Promise<[Game]> => fetch(Methods.GAMETYPE_LATEST(this.id))
        .then(res => res.json())
        .then(res => res.map((gameId) => new Game(this, gameId)))
        .catch(err => []);

    uniquePlayers = () : Promise<number> => this.info().then(res => res.uniquePlayers);

    achievements = () : Promise<number> => this.info().then(res => res.achievements);
}

class GameTypeInfo {
    private _uniquePlayers : number;
    private _achievements : number;

    constructor(uniquePlayers : number, achievements : number) {
        this._uniquePlayers = uniquePlayers;
        this._achievements = achievements;
    }

    get uniquePlayers() : number {
        return this._uniquePlayers;
    }

    get achievements() : number {
        return this._achievements;
    }
}

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

    private static _list : [GameType] = [GameTypes.SG, GameTypes.BP, GameTypes.CAI, GameTypes.CR, GameTypes.DR,
        GameTypes.HB, GameTypes.HERO, GameTypes.HIDE, GameTypes.OITC, GameTypes.SP, GameTypes.TIMV, GameTypes.SKY,
        GameTypes.LAB, GameTypes.DRAW, GameTypes.SLAP, GameTypes.EF, GameTypes.MM, GameTypes.GRAV, GameTypes.RR,
        GameTypes.GNT, GameTypes.GNTM, GameTypes.PMK, GameTypes.BD, GameTypes.SGN, GameTypes.SPL, GameTypes.MIMV,
        GameTypes.BED];

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

    static get list(): [GameType] {
        return GameTypes._list;
    }
}
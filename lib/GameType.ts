import * as fetch from 'node-fetch';
import {Game} from "./Game";
import {Methods} from "./Methods";
import {PlayerGameInfoFactories} from "./Factory";

export class GameTypes {
    private _list : [GameType] = null;

    constructor() {}

    async update() {
        this._list = await fetch(Methods.GAMETYPE_LIST())
                .then(res => res.json())
                .then(res => Object.entries(res).map(([id, name]) => new GameType(id, name)));
    }

    get list(): [GameType] {
        return this._list;
    }
}

export class GameType {
    private _id : string = "";
    private _name : string = "";
    private _info : Promise<GameTypeInfo> = null;

    constructor(id: string, name: string = "") {
        this._id = id;
        this._name = name;
    }

    get id(): string {
        return this._id;
    }

    get name(): string {
        return this._name;
    }

    get playerGameInfoFactory() {
        return PlayerGameInfoFactories[this.id];
    }

    info() : Promise<GameTypeInfo> {
        if(this._info == null){
            this._info = fetch(Methods.GAMETYPE_INFO(this.id))
                .then(res => res.json())
                .then(res => new GameTypeInfo(res.uniqueplayers, res.achievements));
        }

        return this._info;
    }

    latestGames = () : [number] => fetch(Methods.GAMETYPE_LATEST(this.id))
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

import * as fetch from 'node-fetch';
import {Game} from "./Game";
import {Methods} from "./Methods";

export class GameTypes {
    private _list = null;

    constructor() {}

    list(){
        if(this._list == null){
            this._list = fetch(Methods.GAMETYPE_LIST())
                .then(res => res.json())
                .then(res => Object.entries(res).map(([id, name]) => new GameType(id, name)));
        }

        return this._list;
    }
}

export class GameType {
    private _id = "";
    private _name = "";
    private _info = null;

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

    info(){
        if(this._info == null){
            this._info = fetch(Methods.GAMETYPE_INFO(this.id))
                .then(res => res.json())
                .then(res => new GameTypeInfo(res.uniqueplayers, res.achievements));
        }

        return this._info;
    }

    latestGames = () => fetch(Methods.GAMETYPE_LATEST(this.id))
        .then(res => res.json())
        .then(res => res.map((gameId) => new Game(this, gameId)))
        .catch(err => []);

    uniquePlayers = () => this.info().then(res => res.uniquePlayers);

    achievements = () => this.info().then(res => res.achievements);
}

class GameTypeInfo {
    private _uniquePlayers;
    private _achievements;

    constructor(uniquePlayers, achievements) {
        this._uniquePlayers = uniquePlayers;
        this._achievements = achievements;
    }

    get uniquePlayers() {
        return this._uniquePlayers;
    }

    get achievements() {
        return this._achievements;
    }
}

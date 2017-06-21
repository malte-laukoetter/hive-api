import * as fetch from 'node-fetch';
import {GameType} from "./GameType";
import {Methods} from "./Methods";
import {Factory} from "./Factory";
import {PlayerGameInfoTimv} from "./PlayerGameInfoTimv";

export class Player {
    private _uuid;
    private _name;
    private _info : PlayerInfo = null;
    private _gameInfos = {};

    constructor(uuidOrName) {
        if(uuidOrName.length > 16){
            this._uuid = uuidOrName;
        }else{
            this._name = uuidOrName;

        }
    }

    get uuid() {
        return this._uuid;
    }

    get name() {
        return this._name;
    }

    info(forceRefresh : boolean = false){
        if(this._info == null || forceRefresh){
            this._info = fetch(Methods.PLAYER(this.requestUuid))
                .then(res => res.json())
                .then(createPlayerInfoFromResponse);

            this._uuid = this._info.uuid;
            this._name = this._info.name;
        }

        return this._info;
    }

    gameInfo(gameType : GameType, forceRefresh : boolean = false){
        if(!this._gameInfos[gameType.id] || forceRefresh){
            this._gameInfos[gameType.id] = fetch(Methods.PLAYER_GAME_STATS(this.requestUuid, gameType.id))
                .then(res => res.json()).then(gameType.playerGameInfoFactory.createFromResponse)
        }

        return this._gameInfos[gameType.id];
    }

    private get requestUuid() {
        return this.uuid?this.uuid:this.name;
    }
}

class PlayerInfo {
    private _uuid;
    private _name;
    private _rank;
    private _tokens;
    private _medals;
    private _credits;
    private _crates;
    private _status;
    private _firstLogin;
    private _lastLogin;
    private _lastLogout;
    private _achievements;
    private _trophies;

    constructor(uuid, name, rank, tokens, medals, credits, crates, status, firstLogin, lastLogin, lastLogout,
                achievements, trophies) {
        this._uuid = uuid;
        this._name = name;
        this._rank = rank;
        this._tokens = tokens;
        this._medals = medals;
        this._credits = credits;
        this._crates = crates;
        this._status = status;
        this._firstLogin = firstLogin;
        this._lastLogin = lastLogin;
        this._lastLogout = lastLogout;
        this._achievements = achievements;
        this._trophies = trophies;
    }

    get uuid() {
        return this._uuid;
    }

    get name() {
        return this._name;
    }

    get rank() {
        return this._rank;
    }

    get tokens() {
        return this._tokens;
    }

    get medals() {
        return this._medals;
    }

    get credits() {
        return this._credits;
    }

    get crates() {
        return this._crates;
    }

    get status() {
        return this._status;
    }

    get firstLogin() {
        return this._firstLogin;
    }

    get lastLogin() {
        return this._lastLogin;
    }

    get lastLogout() {
        return this._lastLogout;
    }

    get achievements() {
        return this._achievements;
    }

    get trophies() {
        return this._trophies;
    }
}

class PlayerInfoFactory implements Factory<PlayerInfo>{
    private _uuid;
    private _name;
    private _rank;
    private _tokens;
    private _medals;
    private _credits;
    private _crates;
    private _status;
    private _firstLogin;
    private _lastLogin;
    private _lastLogout;
    private _achievements;
    private _trophies;

    constructor() {}

    create = () : PlayerInfo => new PlayerInfo(this._uuid, this._name, this._rank, this._tokens, this._medals,
        this._credits, this._crates, this._status, this._firstLogin, this._lastLogin, this._lastLogout,
        this._achievements, this._trophies);

    uuid = (uuid) => {
        this._uuid = uuid;
        return this;
    };

    name = (name) => {
        this._name = name;
        return this;
    };

    rank = (rank) => {
        this._rank = rank;
        return this;
    };

    tokens = (tokens) => {
        this._tokens = tokens;
        return this;
    };

    medals = (medals) => {
        this._medals = medals;
        return this;
    };

    credits = (credits) => {
        this._credits = credits;
        return this;
    };

    crates = (crates) => {
        this._crates = crates;
        return this;
    };

    status = (status) => {
        this._status = status;
        return this;
    };

    firstLogin = (firstLogin) => {
        this._firstLogin = firstLogin;
        return this;
    };

    lastLogin = (lastLogin) => {
        this._lastLogin = lastLogin;
        return this;
    };

    lastLogout = (lastLogout) => {
        this._lastLogout = lastLogout;
        return this;
    };

    achievements = (achievements) => {
        this._achievements = achievements;
        return this;
    };

    trophies = (trophies) => {
        this._trophies = trophies;
        return this;
    };
}

const createPlayerInfoFromResponse : (any) => PlayerInfo = (res) => {
    return new PlayerInfoFactory()
        .name(res.username)
        .rank(res.rankName)
        .tokens(res.tokens)
        .credits(res.credits)
        .medals(res.medals)
        .crates(res.crates)
        .uuid(res.UUID)
        .status(res.status)
        .firstLogin(res.firstLogin)
        .lastLogin(res.lastLogin)
        .lastLogout(res.lastLogout)
        .achievements(res.achievements)
        .trophies(res.trophies)
        .create();
};
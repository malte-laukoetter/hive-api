import {FromResponseFactory} from "./Factory";

export class PlayerInfo {
    constructor(readonly uuid : string, readonly name : string, readonly rank, readonly tokens : number,
                readonly medals : number, readonly credits : number, readonly crates : number, readonly status,
                readonly firstLogin : Date, readonly lastLogin : Date, readonly lastLogout : Date,
                readonly achievements, readonly trophies) {}
}

export class PlayerInfoFactory implements FromResponseFactory<PlayerInfo>{
    private _uuid : string;
    private _name : string;
    private _rank;
    private _tokens : number;
    private _medals : number;
    private _credits : number;
    private _crates : number;
    private _status;
    private _firstLogin : Date;
    private _lastLogin : Date;
    private _lastLogout : Date;
    private _achievements;
    private _trophies;

    constructor() {}

    create = () : PlayerInfo => new PlayerInfo(this._uuid, this._name, this._rank, this._tokens, this._medals,
        this._credits, this._crates, this._status, this._firstLogin, this._lastLogin, this._lastLogout,
        this._achievements, this._trophies);

    fromResponse(res: any): FromResponseFactory<PlayerInfo> {
        return this.name(res.username)
            .rank(res.rankName)
            .tokens(res.tokens)
            .credits(res.credits)
            .medals(res.medals)
            .crates(res.crates)
            .uuid(res.UUID)
            .status(res.status)
            .firstLogin(new Date(res.firstLogin*1000))
            .lastLogin(new Date(res.lastLogin*1000))
            .lastLogout(new Date(res.lastLogout*1000))
            .achievements(res.achievements)
            .trophies(res.trophies)
    }

    uuid(uuid) {
        this._uuid = uuid;
        return this;
    }

    name(name) {
        this._name = name;
        return this;
    }

    rank(rank) {
        this._rank = rank;
        return this;
    }

    tokens(tokens) {
        this._tokens = tokens;
        return this;
    }

    medals(medals) {
        this._medals = medals;
        return this;
    }

    credits(credits) {
        this._credits = credits;
        return this;
    }

    crates(crates) {
        this._crates = crates;
        return this;
    }

    status(status) {
        this._status = status;
        return this;
    }

    firstLogin(firstLogin) {
        this._firstLogin = firstLogin;
        return this;
    }

    lastLogin(lastLogin) {
        this._lastLogin = lastLogin;
        return this;
    }

    lastLogout(lastLogout) {
        this._lastLogout = lastLogout;
        return this;
    }

    achievements(achievements) {
        this._achievements = achievements;
        return this;
    }

    trophies(trophies) {
        this._trophies = trophies;
        return this;
    }
}
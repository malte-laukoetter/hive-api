import {FromResponseFactory} from "./Factory";
import {Achievement, AchievementFactory, AchievementTypes} from "./Achievement";

/**
 * contains the global information about a [[Player]] like it's rank and medals
 */
export class PlayerInfo {
    constructor(readonly uuid: string, readonly name: string, readonly rank, readonly tokens: number,
                readonly medals: number, readonly credits: number, readonly crates: number, readonly status,
                readonly firstLogin: Date, readonly lastLogin: Date, readonly lastLogout: Date,
                readonly achievements: Achievement[], readonly trophies) {}
}

/**
 * factory to create a [[PlayerInfo]] instance
 */
export class PlayerInfoFactory implements FromResponseFactory<PlayerInfo>{
    private _uuid : string = "";
    private _name : string = "";
    private _rank;
    private _tokens : number = 0;
    private _medals : number = 0;
    private _credits : number = 0;
    private _crates : number = 0;
    private _status;
    private _firstLogin : Date;
    private _lastLogin : Date;
    private _lastLogout : Date;
    private _achievements : Achievement[] = [];
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
            .achievements(Object.entries(res.achievements).map(([id, data]) =>
                new AchievementFactory()
                    .id(id)
                    .type(AchievementTypes.SERVER)
                    .fromResponse(data)
                    .create()
            ))
            .trophies(res.trophies)
    }

    uuid(uuid : string) {
        this._uuid = uuid;
        return this;
    }

    name(name : string) {
        this._name = name;
        return this;
    }

    rank(rank) {
        this._rank = rank;
        return this;
    }

    tokens(tokens : number) {
        this._tokens = tokens;
        return this;
    }

    medals(medals : number) {
        this._medals = medals;
        return this;
    }

    credits(credits : number) {
        this._credits = credits;
        return this;
    }

    crates(crates : number) {
        this._crates = crates;
        return this;
    }

    status(status) {
        this._status = status;
        return this;
    }

    firstLogin(firstLogin : Date) {
        this._firstLogin = firstLogin;
        return this;
    }

    lastLogin(lastLogin : Date) {
        this._lastLogin = lastLogin;
        return this;
    }

    lastLogout(lastLogout : Date) {
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
import {FromResponseFactory, Achievement, AchievementFactory, AchievementTypes} from "./main";
import {isNullOrUndefined} from "util";

export enum Rank{
    REGULAR = "Regular Hive Member",
    GOLD = "Gold Hive Member",
    DIAMOND = "Diamond Hive Member",
    EMERALD = "Lifetime Emerald Hive Member",
    VIP = "VIP Player",
    MODERATOR = "Hive Moderator",
    SENIOR_MODERATOR = "Senior Hive Moderator",
    DEVELOPER = "Hive Developer",
    OWNER = "Hive Founder and Owner"
}

export function rankFromString(str: string): Rank{
    switch(str){
        case Rank.REGULAR.toString():
            return Rank.REGULAR;
        case Rank.GOLD.toString():
            return Rank.GOLD;
        case Rank.DIAMOND.toString():
            return Rank.DIAMOND;
        case Rank.EMERALD.toString():
            return Rank.EMERALD;
        case Rank.VIP.toString():
            return Rank.VIP;
        case Rank.MODERATOR.toString():
            return Rank.MODERATOR;
        case Rank.SENIOR_MODERATOR.toString():
            return Rank.SENIOR_MODERATOR;
        case Rank.DEVELOPER.toString():
            return Rank.DEVELOPER;
        case Rank.OWNER.toString():
            return Rank.OWNER;
    }

    console.error(`Unknown Rank: ${str}`);

    return Rank.REGULAR
}

/**
 * contains the global information about a [[Player]] like it's rank and medals
 */
export class PlayerInfo {
    constructor(readonly uuid: string, readonly name: string, readonly rank: Rank, readonly tokens: number,
                readonly medals: number, readonly credits: number, readonly crates: number, readonly status,
                readonly firstLogin: Date, readonly lastLogin: Date, readonly lastLogout: Date,
                readonly achievements: Achievement[], readonly trophies) {
    }
}

/**
 * factory to create a [[PlayerInfo]] instance
 */
export class PlayerInfoFactory implements FromResponseFactory<PlayerInfo>{
    private _uuid : string = "";
    private _name : string = "";
    private _rank: Rank = Rank.REGULAR;
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
        this.name(res.username)
            .rank(rankFromString(res.rankName))
            .tokens(res.tokens)
            .credits(res.credits)
            .medals(res.medals)
            .crates(res.crates)
            .uuid(res.UUID)
            .status(res.status)
            .firstLogin(new Date(res.firstLogin*1000))
            .lastLogin(new Date(res.lastLogin*1000))
            .lastLogout(new Date(res.lastLogout*1000))
            .trophies(res.trophies);


        if(!isNullOrUndefined(res.achievements)){
            this.achievements(Object.entries(res.achievements)
                .filter(([id, data]) => id !== "version")
                .map(([id, data]) =>
                    new AchievementFactory()
                        .type(AchievementTypes.SERVER)
                        .id(id)
                        .fromResponse(data)
                        .create()
                ))
        }

        return this;

    }

    uuid(uuid : string) {
        this._uuid = uuid;
        return this;
    }

    name(name : string) {
        this._name = name;
        return this;
    }

    rank(rank: Rank) {
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
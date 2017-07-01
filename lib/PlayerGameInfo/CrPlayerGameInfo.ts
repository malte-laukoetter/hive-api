import {PlayerGameInfo, PlayerGameInfoFactory, GameTypes, Achievement, createAchievementsFromAchievementResponse,
    PlayerGameInfoAchievements, PlayerGameInfoFactoryAchievements} from "../main";

export class CrPlayerGameInfo extends PlayerGameInfo implements PlayerGameInfoAchievements{
    constructor(points: number, readonly firstLogin: Date, readonly lastLogin: Date, readonly gamesPlayed: number,
                readonly victories: number, readonly deaths: number, readonly kills: number,
                readonly rccatCount: number, readonly rccatKills: number, readonly airstrikeCount: number,
                readonly airstrikeKills: number, readonly title: string, readonly achievements: Achievement[]) {
        super(points);
    }
}

export class CrPlayerGameInfoFactory extends PlayerGameInfoFactory<CrPlayerGameInfo>
    implements PlayerGameInfoFactoryAchievements{
    private _firstLogin : Date;
    private _lastLogin : Date;
    private _gamesPlayed: number;
    private _victories: number;
    private _title : string;
    private _achievements: Achievement[];
    private _kills: number;
    private _deaths: number;
    private _rccatCount: number;
    private _rccatKills: number;
    private _airstrikeCount: number;
    private _airstrikeKills: number;

    create(): CrPlayerGameInfo {
        return new CrPlayerGameInfo(this._points, this._firstLogin, this._lastLogin, this._gamesPlayed,
            this._victories, this._deaths, this._kills, this._rccatCount, this._rccatKills, this._airstrikeCount,
            this._airstrikeKills, this._title, this._achievements);
    }

    fromResponse(res){
        if(res.code == 404){
            return this;
        }

        return this.points(res.total_points)
            .firstLogin(new Date(res.firstlogin * 1000))
            .lastLogin(new Date(res.lastlogin * 1000))
            .achievements(createAchievementsFromAchievementResponse(GameTypes.CR, res.achievements))
            .title(res.title)
            .gamesPlayed(res.gamesplayed)
            .victories(res.victories)
            .kills(res.kills)
            .deaths(res.deaths)
            .rccatCount(res.rccat_count)
            .rccatKills(res.rccat_kills)
            .airstrikeCount(res.airstrike_count)
            .airstrikeKills(res.airstrike_kills);
    }

    firstLogin(firstLogin : Date){
        this._firstLogin = firstLogin;
        return this;
    }

    lastLogin(lastLogin : Date){
        this._lastLogin = lastLogin;
        return this;
    }

    achievements(achievements: Achievement[]){
        this._achievements = achievements;
        return this;
    }

    title(title : string){
        this._title = title;
        return this;
    }

    gamesPlayed(gamesPlayed: number){
        this._gamesPlayed = gamesPlayed;
        return this;
    }

    victories(victories: number){
        this._victories = victories;
        return this;
    }

    deaths(deaths: number){
        this._deaths = deaths;
        return this;
    }

    kills(kills: number){
        this._kills = kills;
        return this;
    }

    rccatCount(rccatCount: number){
        this._rccatCount = rccatCount;
        return this;
    }

    rccatKills(rccatKills: number){
        this._rccatKills = rccatKills;
        return this;
    }

    airstrikeCount(airstrikeCount: number){
        this._airstrikeCount = airstrikeCount;
        return this;
    }

    airstrikeKills(airstrikeKills: number){
        this._airstrikeKills = airstrikeKills;
        return this;
    }
}
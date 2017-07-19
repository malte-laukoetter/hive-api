import {PlayerGameInfo, PlayerGameInfoFactory, GameTypes, Achievement, createAchievementsFromAchievementResponse,
    PlayerGameInfoAchievements, PlayerGameInfoFactoryAchievements, createDateFromResponse} from "../main";

export class OitcPlayerGameInfo extends PlayerGameInfo implements PlayerGameInfoAchievements{
    constructor(points: number, readonly firstLogin: Date, readonly lastLogin: Date, readonly gamesPlayed: number,
                readonly victories: number, readonly kills: number, readonly deaths: number,
                readonly arrowsFired: number, readonly cupidUnlock: boolean, readonly rainbowUnlock: boolean,
                readonly musicUnlock: boolean, readonly herobrineUnlock: boolean, readonly title: string,
                readonly achievements: Achievement[]) {
        super(GameTypes.OITC, points);
    }
}

export class OitcPlayerGameInfoFactory extends PlayerGameInfoFactory<OitcPlayerGameInfo>
    implements PlayerGameInfoFactoryAchievements{
    private _firstLogin : Date;
    private _lastLogin : Date;
    private _gamesPlayed: number;
    private _victories: number;
    private _title: string;
    private _achievements: Achievement[];
    private _kills: number;
    private _deaths: number;
    private _arrowsFired: number;
    private _cupidUnlock: boolean;
    private _rainbowUnlock: boolean;
    private _musicUnlock: boolean;
    private _herobrineUnlock: boolean;

    create(): OitcPlayerGameInfo {
        return new OitcPlayerGameInfo(this._points, this._firstLogin, this._lastLogin, this._gamesPlayed,
            this._victories, this._kills, this._deaths, this._arrowsFired, this._cupidUnlock, this._rainbowUnlock,
            this._musicUnlock, this._herobrineUnlock, this._title, this._achievements);
    }

    fromResponse(res){
        if(res.code == 404){
            return this;
        }

        return this.points(res.total_points)
            .firstLogin(createDateFromResponse(res.firstlogin))
            .lastLogin(createDateFromResponse(res.lastlogin))
            .achievements(createAchievementsFromAchievementResponse(GameTypes.OITC, res.achievements))
            .title(res.title)
            .gamesPlayed(res.gamesplayed)
            .victories(res.victories)
            .kills(res.kills)
            .deaths(res.deaths)
            .arrowsFired(res.arrowsfired)
            .cupidUnlock(res.cupidunlock)
            .rainbowUnlock(res.rainbowunlock)
            .musicUnlock(res.musicunlock)
            .herobrineUnlock(res.herobrineunlock);
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

    arrowsFired(arrowsFired: number){
        this._arrowsFired = arrowsFired;
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

    cupidUnlock(cupidUnlock: boolean){
        this._cupidUnlock = cupidUnlock;
        return this;
    }

    herobrineUnlock(herobrineUnlock: boolean){
        this._herobrineUnlock = herobrineUnlock;
        return this;
    }

    musicUnlock(musicUnlock: boolean){
        this._musicUnlock = musicUnlock;
        return this;
    }

    rainbowUnlock(rainbowUnlock: boolean){
        this._rainbowUnlock = rainbowUnlock;
        return this;
    }
}
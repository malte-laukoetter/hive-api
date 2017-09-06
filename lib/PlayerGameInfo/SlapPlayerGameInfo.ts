import {PlayerGameInfo, PlayerGameInfoFactory, GameTypes, createDateFromResponse} from "../main";

export class SlapPlayerGameInfo extends PlayerGameInfo {
    constructor(points: number, readonly firstLogin: Date, readonly lastLogin: Date, readonly gamesPlayed: number,
                readonly victories: number, readonly deaths: number, readonly kills: number,
                readonly title: string) {
        super(GameTypes.SLAP, points);
    }
}

export class SlapPlayerGameInfoFactory extends PlayerGameInfoFactory<SlapPlayerGameInfo> {
    private _firstLogin : Date;
    private _lastLogin : Date;
    private _gamesPlayed: number;
    private _victories: number;
    private _title: string;
    private _deaths: number;
    private _kills: number;

    create(): SlapPlayerGameInfo {
        return new SlapPlayerGameInfo(this._points, this._firstLogin, this._lastLogin, this._gamesPlayed,
            this._victories, this._deaths, this._kills, this._title);
    }

    fromResponse(res){
        if(res.code == 404){
            return this;
        }

        return this.points(res.points)
            .firstLogin(createDateFromResponse(res.firstlogin))
            .lastLogin(createDateFromResponse(res.lastlogin))
            .title(res.title)
            .gamesPlayed(res.gamesplayed)
            .victories(res.victories)
            .kills(res.kills)
            .deaths(res.deaths);
    }

    firstLogin(firstLogin : Date){
        this._firstLogin = firstLogin;
        return this;
    }

    lastLogin(lastLogin : Date){
        this._lastLogin = lastLogin;
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
}
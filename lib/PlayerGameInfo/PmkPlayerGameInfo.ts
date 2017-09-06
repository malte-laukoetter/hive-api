import {PlayerGameInfo, PlayerGameInfoFactory, GameTypes, createDateFromResponse} from "../main";

export class PmkPlayerGameInfo extends PlayerGameInfo {
    constructor(points: number, readonly firstLogin: Date, readonly gamesPlayed: number,
                readonly victories: number, readonly infections: number, readonly kills: number,
                readonly title: string) {
        super(GameTypes.PMK, points);
    }
}

export class PmkPlayerGameInfoFactory extends PlayerGameInfoFactory<PmkPlayerGameInfo> {
    private _firstLogin : Date;
    private _gamesPlayed: number;
    private _victories: number;
    private _title: string;
    private _infections: number;
    private _kills: number;

    create(): PmkPlayerGameInfo {
        return new PmkPlayerGameInfo(this._points, this._firstLogin, this._gamesPlayed,
            this._victories, this._infections, this._kills, this._title);
    }

    fromResponse(res){
        if(res.code == 404){
            return this;
        }

        return this.points(res.total_points)
            .firstLogin(createDateFromResponse(res.firstLogin))
            .title(res.title)
            .gamesPlayed(res.games_played)
            .victories(res.victories)
            .kills(res.kills)
            .infections(res.infections);
    }

    firstLogin(firstLogin : Date){
        this._firstLogin = firstLogin;
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

    infections(infections: number){
        this._infections = infections;
        return this;
    }

    kills(kills: number){
        this._kills = kills;
        return this;
    }
}
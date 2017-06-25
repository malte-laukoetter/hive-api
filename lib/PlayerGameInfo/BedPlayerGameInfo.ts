import {PlayerGameInfo, PlayerGameInfoFactory} from "../main";

export class BedPlayerGameInfo extends PlayerGameInfo{
    constructor(readonly firstLogin: Date, readonly lastLogin: Date, readonly totalPoints: number,
                readonly victories: number, readonly gamesPlayed: number, readonly kills: number,
                readonly deaths: number, readonly bedsDestroyed: number, readonly teamsEliminated,
                readonly achievements) {
        super();
    }
}

export class BedPlayerGameInfoFactory implements PlayerGameInfoFactory<BedPlayerGameInfo> {
    private _firstLogin : Date;
    private _lastLogin : Date;
    private _totalPoints : number;
    private _victories : number;
    private _gamesPlayed : number;
    private _kills : number;
    private _deaths : number;
    private _bedsDestroyed : number;
    private _teamsEliminated : number;
    private _achievements;

    constructor() {}

    create(): BedPlayerGameInfo {
        return new BedPlayerGameInfo(this._firstLogin, this._lastLogin, this._totalPoints, this._victories,
            this._gamesPlayed, this._kills, this._deaths, this._bedsDestroyed,
            this._teamsEliminated, this._achievements);
    }

    fromResponse(res){
        return this.totalPoints(res.total_points)
            .victories(res.victories)
            .gamesPlayed(res.games_played)
            .kills(res.kills)
            .deaths(res.deaths)
            .bedsDestroyed(res.beds_destroyed)
            .teamsEliminated(res.teams_eliminated)
            .firstLogin(new Date(res.firstLogin * 1000))
            .lastLogin(new Date(res.lastlogin*1000))
            .achievements(res.achievements);
    }

    firstLogin(firstLogin : Date){
        this._firstLogin = firstLogin;
        return this;
    }

    lastLogin(lastLogin : Date){
        this._lastLogin = lastLogin;
        return this;
    }

    totalPoints(totalPoints : number){
        this._totalPoints = totalPoints;
        return this;
    }

    victories(victories : number){
        this._victories = victories;
        return this;
    }

    gamesPlayed(gamesPlayed : number){
        this._gamesPlayed = gamesPlayed;
        return this;
    }

    kills(kills : number){
        this._kills = kills;
        return this;
    }

    deaths(deaths : number){
        this._deaths = deaths;
        return this;
    }

    bedsDestroyed(bedsDestroyed : number){
        this._bedsDestroyed = bedsDestroyed;
        return this;
    }

    teamsEliminated(teamsEliminated : number){
        this._teamsEliminated = teamsEliminated;
        return this;
    }

    achievements(achievements){
        this._achievements = achievements;
        return this;
    }
}
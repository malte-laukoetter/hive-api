import {PlayerGameInfo, PlayerGameInfoFactory, GameTypes, Achievement, createAchievementsFromAchievementResponse,
    PlayerGameInfoAchievements, PlayerGameInfoFactoryAchievements, createDateFromResponse} from "../main";

export class BedPlayerGameInfo extends PlayerGameInfo implements PlayerGameInfoAchievements{
    constructor(points: number, readonly firstLogin: Date, readonly lastLogin: Date, readonly victories: number,
                readonly gamesPlayed: number, readonly kills: number, readonly deaths: number,
                readonly bedsDestroyed: number, readonly teamsEliminated, readonly winStreak: number,
                readonly achievements: Achievement[], readonly title: string) {
        super(GameTypes.BED, points);
    }
}

export class BedPlayerGameInfoFactory extends PlayerGameInfoFactory<BedPlayerGameInfo>
    implements PlayerGameInfoFactoryAchievements{
    private _firstLogin : Date;
    private _title : string;
    private _lastLogin : Date;
    private _victories : number;
    private _gamesPlayed : number;
    private _kills : number;
    private _deaths : number;
    private _bedsDestroyed : number;
    private _teamsEliminated : number;
    private _winStreak : number;
    private _achievements: Achievement[];

    create(): BedPlayerGameInfo {
        return new BedPlayerGameInfo(this._points, this._firstLogin, this._lastLogin, this._victories,
            this._gamesPlayed, this._kills, this._deaths, this._bedsDestroyed,
            this._teamsEliminated, this._winStreak, this._achievements, this._title);
    }

    fromResponse(res){
        if(res.code == 404){
            return this;
        }

        return this.points(res.total_points)
            .victories(res.victories)
            .gamesPlayed(res.games_played)
            .kills(res.kills)
            .deaths(res.deaths)
            .bedsDestroyed(res.beds_destroyed)
            .teamsEliminated(res.teams_eliminated)
            .winStreak(res.win_streak)
            .title(res.title)
            .firstLogin(createDateFromResponse(res.firstLogin))
            .lastLogin(createDateFromResponse(res.lastlogin))
            .achievements(createAchievementsFromAchievementResponse(GameTypes.BED, res.achievements));
    }

    firstLogin(firstLogin : Date){
        this._firstLogin = firstLogin;
        return this;
    }

    lastLogin(lastLogin : Date){
        this._lastLogin = lastLogin;
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

    title(title : string){
        this._title = title;
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

    winStreak(winStreak : number){
        this._winStreak = winStreak;
        return this;
    }

    achievements(achievements){
        this._achievements = achievements;
        return this;
    }
}
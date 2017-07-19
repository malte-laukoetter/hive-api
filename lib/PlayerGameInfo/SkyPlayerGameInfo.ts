import {PlayerGameInfo, PlayerGameInfoFactory, GameTypes, Achievement, createAchievementsFromAchievementResponse,
    PlayerGameInfoAchievements, PlayerGameInfoFactoryAchievements, Game, createDateFromResponse} from "../main";

export class SkyPlayerGameInfo extends PlayerGameInfo implements PlayerGameInfoAchievements{
    constructor(points: number, readonly firstLogin: Date, readonly lastLogin: Date, readonly victories: number,
                readonly gamesPlayed: number, readonly mostPoints: number, readonly kills: number,
                readonly deaths: number, readonly timeAlive: number, readonly recentGames: Game[],
                readonly title: string, readonly achievements: Achievement[]) {
        super(GameTypes.SKY, points);
    }
}

export class SkyPlayerGameInfoFactory extends PlayerGameInfoFactory<SkyPlayerGameInfo>
    implements PlayerGameInfoFactoryAchievements{
    private _firstLogin : Date;
    private _lastLogin : Date;
    private _victories : number;
    private _gamesPlayed : number;
    private _deaths : number;
    private _mostPoints : number;
    private _kills : number;
    private _timeAlive : number;
    private _title : string;
    private _achievements: Achievement[];
    private _recentGames: Game[];

    create(): SkyPlayerGameInfo {
        return new SkyPlayerGameInfo(this._points, this._firstLogin, this._lastLogin, this._victories, this._gamesPlayed,
            this._mostPoints, this._kills, this._deaths, this._timeAlive, this._recentGames, this._title,
            this._achievements);
    }

    fromResponse(res){
        if(res.code == 404){
            return this;
        }

        return this.points(res.total_points)
            .victories(res.victories)
            .gamesPlayed(res.gamesplayed)
            .firstLogin(createDateFromResponse(res.firstLogin))
            .lastLogin(createDateFromResponse(res.lastlogin))
            .achievements(createAchievementsFromAchievementResponse(GameTypes.SKY, res.achievements))
            .title(res.title)
            .deaths(res.deaths)
            .timeAlive(res.timealive)
            .mostPoints(res.most_points)
            .timeAlive(res.timealive)
            .recentGames(res.recentgames.map(a => new Game(GameTypes.SKY, a)))
            .kills(res.kills);
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

    achievements(achievements: Achievement[]){
        this._achievements = achievements;
        return this;
    }

    title(title : string){
        this._title = title;
        return this;
    }

    mostPoints(mostPoints : number){
        this._mostPoints = mostPoints;
        return this;
    }


    kills(kills : number){
        this._kills = kills;
        return this;
    }


    deaths(deaths: number){
        this._deaths = deaths;
        return this;
    }

    timeAlive(timeAlive : number){
        this._timeAlive = timeAlive;
        return this;
    }

    recentGames(recentGames : Game[]){
        this._recentGames = recentGames;
        return this;
    }
}
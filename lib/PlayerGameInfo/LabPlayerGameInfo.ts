import {PlayerGameInfo, PlayerGameInfoFactory, GameTypes, Achievement, createAchievementsFromAchievementResponse,
    PlayerGameInfoAchievements, PlayerGameInfoFactoryAchievements, createDateFromResponse} from "../main";

export class LabPlayerGameInfo extends PlayerGameInfo implements PlayerGameInfoAchievements{
    constructor(points: number, readonly firstLogin: Date, readonly lastLogin: Date, readonly gamesPlayed: number,
                readonly victories: number, readonly gameVictories, readonly title: string,
                readonly achievements: Achievement[]) {
        super(GameTypes.LAB, points);
    }
}

export class LabPlayerGameInfoFactory extends PlayerGameInfoFactory<LabPlayerGameInfo>
    implements PlayerGameInfoFactoryAchievements{
    private _firstLogin : Date;
    private _lastLogin : Date;
    private _gamesPlayed: number;
    private _victories: number;
    private _title: string;
    private _achievements: Achievement[];
    private _gameVictories;

    create(): LabPlayerGameInfo {
        return new LabPlayerGameInfo(this._points, this._firstLogin, this._lastLogin, this._gamesPlayed,
            this._victories, this._gameVictories, this._title, this._achievements);
    }

    fromResponse(res){
        if(res.code == 404){
            return this;
        }

        return this.points(res.total_points)
            .firstLogin(createDateFromResponse(res.firstLogin))
            .lastLogin(createDateFromResponse(res.lastlogin))
            .achievements(createAchievementsFromAchievementResponse(GameTypes.LAB, res.achievements))
            .title(res.title)
            .gamesPlayed(res.gamesplayed)
            .victories(res.victories)
            .gameVictories(res.game_victories);
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

    gameVictories(gameVictories){
        this._gameVictories = gameVictories;
        return this;
    }
}
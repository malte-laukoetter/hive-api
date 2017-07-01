import {PlayerGameInfo, PlayerGameInfoFactory, GameTypes, Achievement, createAchievementsFromAchievementResponse,
    PlayerGameInfoAchievements, PlayerGameInfoFactoryAchievements} from "../main";

export class CaiPlayerGameInfo extends PlayerGameInfo implements PlayerGameInfoAchievements{
    constructor(points: number, readonly firstLogin: Date, readonly lastLogin: Date, readonly captured: number,
                readonly captures: number, readonly catches: number, readonly caught: number,
                readonly gamesPlayed: number, readonly victories: number, readonly teamSelector,
                readonly creeperFirework, readonly title: string, readonly achievements: Achievement[]) {
        super(points);
    }
}

export class CaiPlayerGameInfoFactory extends PlayerGameInfoFactory<CaiPlayerGameInfo>
    implements PlayerGameInfoFactoryAchievements{
    private _firstLogin : Date;
    private _lastLogin : Date;
    private _captured: number;
    private _captures: number;
    private _catches: number;
    private _caught: number;
    private _gamesPlayed: number;
    private _victories: number;
    private _teamSelector;
    private _creeperFirework;
    private _title : string;
    private _achievements: Achievement[];

    create(): CaiPlayerGameInfo {
        return new CaiPlayerGameInfo(this._points, this._firstLogin, this._lastLogin, this._captured, this._captures,
            this._catches, this._caught, this._gamesPlayed, this._victories, this._teamSelector, this._creeperFirework,
            this._title, this._achievements);
    }

    fromResponse(res){
        if(res.code == 404){
            return this;
        }

        return this.points(res.points)
            .firstLogin(new Date(res.firstlogin * 1000))
            .lastLogin(new Date(res.lastlogin * 1000))
            .achievements(createAchievementsFromAchievementResponse(GameTypes.SP, res.achievements))
            .title(res.title)
            .captures(res.captures)
            .captured(res.captured)
            .catches(res.catches)
            .caught(res.caught)
            .creeperFirework(res.creeperfirework)
            .gamesPlayed(res.gamesplayed)
            .teamSelector(res.teamselector)
            .victories(res.victories);
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

    captures(captures: number){
        this._captures = captures;
        return this;
    }

    captured(captured: number){
        this._captured = captured;
        return this;
    }

    catches(catches: number){
        this._catches = catches;
        return this;
    }

    caught(caught: number){
        this._caught = caught;
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

    teamSelector(teamSelector){
        this._teamSelector = teamSelector;
        return this;
    }

    creeperFirework(creeperFirework){
        this._creeperFirework = creeperFirework;
        return this;
    }
}
import {PlayerGameInfo, PlayerGameInfoFactory, GameTypes, Achievement, createAchievementsFromAchievementResponse,
    PlayerGameInfoAchievements, PlayerGameInfoFactoryAchievements, createDateFromResponse} from "../main";

export class HbPlayerGameInfo extends PlayerGameInfo implements PlayerGameInfoAchievements{
    constructor(points: number, readonly firstLogin: Date, readonly captures: number, readonly kills: number,
                readonly deaths: number, readonly unlockedClasses, readonly activeClass, readonly title: string,
                readonly achievements: Achievement[]) {
        super(points);
    }
}

export class HbPlayerGameInfoFactory extends PlayerGameInfoFactory<HbPlayerGameInfo>
    implements PlayerGameInfoFactoryAchievements{
    private _firstLogin : Date;
    private _captures: number;
    private _kills: number;
    private _deaths: number;
    private _unlockedClasses;
    private _activeClass;
    private _title : string;
    private _achievements: Achievement[];

    create(): HbPlayerGameInfo {
        return new HbPlayerGameInfo(this._points, this._firstLogin, this._captures, this._kills, this._deaths,
            this._unlockedClasses, this._activeClass, this._title, this._achievements);
    }

    fromResponse(res){
        if(res.code == 404){
            return this;
        }

        this.points(res.points)
            .firstLogin(createDateFromResponse(res.firstlogin))
            .achievements(createAchievementsFromAchievementResponse(GameTypes.HB, res.achievements))
            .title(res.title)
            .captures(res.captures)
            .kills(res.kills)
            .deaths(res.deaths)
            .activeClass(res.active_class);

        if(res.unlocked_classes){
            this.unlockedClasses(res.unlocked_classes.split(",").filter(a => a != ""))
        }

        return this;
    }

    firstLogin(firstLogin : Date){
        this._firstLogin = firstLogin;
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

    activeClass(activeClass){
        this._activeClass = activeClass;
        return this;
    }

    unlockedClasses(unlockedClasses){
        this._unlockedClasses = unlockedClasses;
        return this;
    }

    captures(captures: number){
        this._captures = captures;
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
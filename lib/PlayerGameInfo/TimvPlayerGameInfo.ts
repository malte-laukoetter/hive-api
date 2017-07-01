import {PlayerGameInfo, PlayerGameInfoFactory, Achievement, createAchievementsFromAchievementResponse, GameTypes,
    PlayerGameInfoAchievements, PlayerGameInfoFactoryAchievements, createDateFromResponse} from "../main";

export class TimvPlayerGameInfo extends PlayerGameInfo implements PlayerGameInfoAchievements{
    constructor(points: number, readonly lastLogin: Date, readonly mostPoints: number,
                readonly rolePoints: number, readonly traitorPoints: number,
                readonly innocentPoints: number, readonly detectivePoints: number,
                readonly activeDetectiveStick, readonly detectiveSticks, readonly activeFlareUpgrade, readonly flareUpgrades,
                readonly detectiveBook: boolean, readonly achievements: Achievement[], readonly title) {
        super(points);
    }
}

export class TimvPlayerGameInfoFactory extends PlayerGameInfoFactory<TimvPlayerGameInfo>
    implements PlayerGameInfoFactoryAchievements{
    private _lastLogin : Date;
    private _mostPoints : number;
    private _rolePoints : number;
    private _traitorPoints : number;
    private _innocentPoints : number;
    private _detectivePoints : number;
    private _activeDetectiveStick;
    private _detectiveSticks;
    private _activeFlareUpgrade;
    private _flareUpgrades;
    private _detectiveBook : boolean;
    private _achievements: Achievement[];
    private _title;

    create(): TimvPlayerGameInfo {
        return new TimvPlayerGameInfo(this._points, this._lastLogin, this._mostPoints, this._rolePoints,
            this._traitorPoints, this._innocentPoints, this._detectivePoints, this._activeDetectiveStick,
            this._detectiveSticks, this._activeFlareUpgrade, this._flareUpgrades, this._detectiveBook,
            this._achievements, this._title);
    }

    fromResponse(res){
        if(res.code == 404){
            return this;
        }

        return this.lastLogin(createDateFromResponse(res.lastlogin))
            .points(res.total_points)
            .mostPoints(res.most_points)
            .rolePoints(res.role_points)
            .traitorPoints(res.t_points)
            .innocentPoints(res.i_points)
            .detectivePoints(res.d_points)
            .activeDetectiveStick(res.active_detectivestick)
            .detectiveSticks(res.detectivesticks)
            .activeFlareUpgrade(res.active_flareupgrade)
            .flareUpgrades(res.flareupgrade)
            .detectiveBook(res.detectivebook)
            .achievements(createAchievementsFromAchievementResponse(GameTypes.TIMV, res.achievements))
            .title(res.title);
    }

    lastLogin(lastLogin: Date){
        this._lastLogin = lastLogin;
        return this;
    }

    mostPoints(mostPoints: number){
        this._mostPoints = mostPoints;
        return this;
    }

    rolePoints(rolePoints){
        this._rolePoints = rolePoints;
        return this;
    }

    traitorPoints(traitorPoints){
        this._traitorPoints = traitorPoints;
        return this;
    }

    innocentPoints(innocentPoints){
        this._innocentPoints = innocentPoints;
        return this;
    }

    detectivePoints(detectivePoints){
        this._detectivePoints = detectivePoints;
        return this;
    }

    activeDetectiveStick(activeDetectiveStick){
        this._activeDetectiveStick = activeDetectiveStick;
        return this;
    }

    detectiveSticks(detectiveSticks){
        this._detectiveSticks = detectiveSticks;
        return this;
    }

    activeFlareUpgrade(activeFlareUpgrade){
        this._activeFlareUpgrade = activeFlareUpgrade;
        return this;
    }

    flareUpgrades(flareUpgrades){
        this._flareUpgrades = flareUpgrades;
        return this;
    }

    detectiveBook(detectiveBook){
        this._detectiveBook = detectiveBook;
        return this;
    }

    achievements(achievements){
        this._achievements = achievements;
        return this;
    }

    title(title){
        this._title = title;
        return this;
    }
}
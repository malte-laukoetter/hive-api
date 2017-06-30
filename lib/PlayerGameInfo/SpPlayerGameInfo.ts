import {PlayerGameInfo, PlayerGameInfoFactory, GameTypes, Achievement, createAchievementsFromAchievementResponse,
    PlayerGameInfoAchievements, PlayerGameInfoFactoryAchievements} from "../main";

export class SpPlayerGameInfo extends PlayerGameInfo implements PlayerGameInfoAchievements{
    constructor(points: number, readonly firstLogin: Date, readonly lastLogin: Date, readonly victories: number,
                readonly gamesPlayed: number, readonly eggsFired: number, readonly blocksDestroyed: number,
                readonly deaths: number, readonly timeAlive: number, readonly rainbowEggs: boolean,
                readonly sheepUnlock: boolean, readonly shovelUpgrade: boolean, readonly title: string,
                readonly achievements: Achievement[]) {
        super(points);
    }
}

export class SpPlayerGameInfoFactory extends PlayerGameInfoFactory<SpPlayerGameInfo>
    implements PlayerGameInfoFactoryAchievements{
    private _firstLogin : Date;
    private _lastLogin : Date;
    private _victories : number;
    private _gamesPlayed : number;
    private _eggsFired : number;
    private _blocksDestroyed : number;
    private _deaths : number;
    private _timeAlive : number;
    private _rainbowEggs : boolean;
    private _sheepUnlock : boolean;
    private _shovelUpgrade : boolean;
    private _title : string;
    private _achievements: Achievement[];

    create(): SpPlayerGameInfo {
        return new SpPlayerGameInfo(this._points, this._firstLogin, this._lastLogin, this._victories, this._gamesPlayed,
            this._eggsFired, this._blocksDestroyed, this._deaths, this._timeAlive, this._rainbowEggs, this._sheepUnlock,
            this._shovelUpgrade, this._title, this._achievements);
    }

    fromResponse(res){
        if(res.code == 404){
            return this;
        }

        return this.points(res.points)
            .victories(res.victories)
            .gamesPlayed(res.gamesplayed)
            .firstLogin(new Date(res.firstlogin * 1000))
            .lastLogin(new Date(res.lastlogin * 1000))
            .achievements(createAchievementsFromAchievementResponse(GameTypes.SP, res.achievements))
            .title(res.title)
            .eggsFired(res.eggsfired)
            .blocksDestroyed(res.blocksdestroyed)
            .deaths(res.deaths)
            .timeAlive(res.timealive)
            .rainbowEggs(res.rainboweggs)
            .sheepUnlock(res.sheepunlock)
            .shovelUpgrade(res.shovelupgrade);
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

    eggsFired(eggsFired : number){
        this._eggsFired = eggsFired;
        return this;
    }


    blocksDestroyed(blocksDestroyed : number){
        this._blocksDestroyed = blocksDestroyed;
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

    rainbowEggs(rainbowEggs : boolean){
        this._rainbowEggs = rainbowEggs;
        return this;
    }

    sheepUnlock(sheepUnlock : boolean){
        this._sheepUnlock = sheepUnlock;
        return this;
    }

    shovelUpgrade(shovelUpgrade : boolean){
        this._shovelUpgrade = shovelUpgrade;
        return this;
    }
}
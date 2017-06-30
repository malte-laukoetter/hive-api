import {PlayerGameInfo, PlayerGameInfoFactory, GameTypes, Achievement, createAchievementsFromAchievementResponse,
    PlayerGameInfoAchievements, PlayerGameInfoFactoryAchievements} from "../main";

export class HeroPlayerGameInfo extends PlayerGameInfo implements PlayerGameInfoAchievements{
    constructor(points: number, readonly firstLogin: Date, readonly lastLogin: Date, readonly victories: number,
                readonly gamesPlayed: number, readonly kills: number, readonly deaths: number,
                readonly oneVsOneWins: number, readonly deathmatches: number, readonly tntUsed: number,
                readonly foodConsumed: number, readonly cratesOpened, readonly achievements: Achievement[]) {
        super(points);
    }
}

export class HeroPlayerGameInfoFactory extends PlayerGameInfoFactory<HeroPlayerGameInfo>
    implements PlayerGameInfoFactoryAchievements{
    private _firstLogin : Date;
    private _lastLogin : Date;
    private _victories : number;
    private _gamesPlayed : number;
    private _kills : number;
    private _deaths : number;
    private _oneVsOneWins : number;
    private _deathmatches : number;
    private _tntUsed : number;
    private _foodConsumed : number;
    private _cratesOpened : number;
    private _achievements: Achievement[];

    create(): HeroPlayerGameInfo {
        return new HeroPlayerGameInfo(this._points, this._firstLogin, this._lastLogin, this._victories,
            this._gamesPlayed, this._kills, this._deaths, this._oneVsOneWins, this._deathmatches, this._tntUsed,
            this._foodConsumed, this._cratesOpened, this._achievements);
    }

    fromResponse(res){
        if(res.code == 404){
            return this;
        }

        return this.points(res.total_points)
            .victories(res.victories)
            .gamesPlayed(res.games_played)
            .firstLogin(new Date(res.firstLogin * 1000))
            .lastLogin(new Date(res.lastlogin * 1000))
            .achievements(createAchievementsFromAchievementResponse(GameTypes.HERO, res.achievements))
            .deathmatches(res.deathmatches)
            .deaths(res.deaths)
            .foodConsumed(res.food_consumed)
            .kills(res.kills).oneVsOneWins(res.one_vs_one_wins)
            .tntUsed(res.tnt_used)
            .cratesOpened(res.crates_opened);
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

    deathmatches(deathmatches : number){
        this._deathmatches = deathmatches;
        return this;
    }

    deaths(deaths : number){
        this._deaths = deaths;
        return this;
    }

    foodConsumed(foodConsumed : number){
        this._foodConsumed = foodConsumed;
        return this;
    }

    kills(kills : number){
        this._kills = kills;
        return this;
    }

    oneVsOneWins(oneVsOneWins : number){
        this._oneVsOneWins = oneVsOneWins;
        return this;
    }

    tntUsed(tntUsed : number){
        this._tntUsed = tntUsed;
        return this;
    }

    cratesOpened(cratesOpened : number){
        this._cratesOpened = cratesOpened;
        return this;
    }
}
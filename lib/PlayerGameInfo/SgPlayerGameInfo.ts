import {PlayerGameInfo, PlayerGameInfoFactory, GameTypes, Achievement, createAchievementsFromAchievementResponse,
    Game, PlayerGameInfoAchievements, PlayerGameInfoFactoryAchievements} from "../main";

export class SgPlayerGameInfo extends PlayerGameInfo implements PlayerGameInfoAchievements{
    constructor(points: number, readonly firstLogin: Date, readonly lastLogin: Date, readonly victories: number,
                readonly mostPoints: number, readonly cratesOpened: number, readonly deathmatches: number,
                readonly timeAlive: number, readonly gamesPlayed: number, readonly kills: number,
                readonly deaths: number, readonly unlockDeathcrate, readonly unlockMySword, readonly vanityColors,
                readonly activeVanityColor, readonly arrowTrails, readonly battleCries, readonly activeDeathcrate,
                readonly firstWinDay: Date, readonly recentGames: Game[], readonly achievements: Achievement[]) {
        super(points);
    }
}

export class SgPlayerGameInfoFactory extends PlayerGameInfoFactory<SgPlayerGameInfo>
    implements PlayerGameInfoFactoryAchievements{
    private _firstLogin : Date;
    private _lastLogin : Date;
    private _victories : number;
    private _gamesPlayed : number;
    private _kills : number;
    private _deaths : number;
    private _achievements: Achievement[];
    private _mostPoints: number;
    private _cratesOpened: number;
    private _deathmatches: number;
    private _timeAlive: number;
    private _unlockDeathcrate;
    private _unlockMySword;
    private _vanityColors;
    private _activeVanityColor;
    private _arrowTrails;
    private _battleCries;
    private _activeDeathcrate;
    private _firstWinDay: Date;
    private _recentGames: Game[];

    create(): SgPlayerGameInfo {
        return new SgPlayerGameInfo(this._points, this._firstLogin, this._lastLogin, this._victories, this._mostPoints,
            this._cratesOpened, this._deathmatches, this._timeAlive, this._gamesPlayed, this._kills, this._deaths,
            this._unlockDeathcrate, this._unlockMySword, this._vanityColors, this._activeVanityColor, this._arrowTrails,
            this._battleCries, this._activeDeathcrate, this._firstWinDay, this._recentGames, this._achievements);
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
            .firstLogin(new Date(res.firstLogin * 1000))
            .lastLogin(new Date(res.lastlogin*1000))
            .achievements(createAchievementsFromAchievementResponse(GameTypes.SG, res.achievements))
            .cratesOpened(res.cratesopened)
            .deathmatches(res.deathmatches)
            .timeAlive(res.timealive)
            .unlockDeathcrate(res.unlock_deathcrate)
            .unlockMySword(res.unlock_mysword)
            .vanityColors(res.vanitycolors)
            .activeVanityColor(res.active_vanitycolor)
            .arrowTrails(res.arrowtrails)
            .battleCries(res.battlecries)
            .activeDeathcrate(res.active_deathcrate)
            .firstWinDay(new Date(res.firstwinday*1000))
            .recentGames(res.recentgames.map(game => new Game(GameTypes.SG, game)))
            .mostPoints(res.most_points);
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

    kills(kills : number){
        this._kills = kills;
        return this;
    }

    deaths(deaths : number){
        this._deaths = deaths;
        return this;
    }

    achievements(achievements: Achievement[]){
        this._achievements = achievements;
        return this;
    }

    cratesOpened(cratesOpened: number){
        this._cratesOpened = cratesOpened;
        return this;
    }

    deathmatches(deathmatches: number){
        this._deathmatches = deathmatches;
        return this;
    }

    timeAlive(timeAlive: number){
        this._timeAlive = timeAlive;
        return this;
    }

    unlockDeathcrate(unlockDeathcrate){
        this._unlockDeathcrate = unlockDeathcrate;
        return this;
    }

    unlockMySword(unlockMySword){
        this._unlockMySword = unlockMySword;
        return this;
    }

    vanityColors(vanityColors){
        this._vanityColors = vanityColors;
        return this;
    }

    activeVanityColor(activeVanityColor){
        this._activeVanityColor = activeVanityColor;
        return this;
    }

    arrowTrails(arrowTrails){
        this._arrowTrails = arrowTrails;
        return this;
    }

    battleCries(battleCries){
        this._battleCries = battleCries;
        return this;
    }

    activeDeathcrate(activeDeathcrate){
        this._activeDeathcrate = activeDeathcrate;
        return this;
    }

    firstWinDay(firstWinDay: Date){
        this._firstWinDay = firstWinDay;
        return this;
    }

    recentGames(recentGames: Game[]){
        this._recentGames = recentGames;
        return this;
    }

    mostPoints(mostPoints: number){
        this._mostPoints = mostPoints;
        return this;
    }
}
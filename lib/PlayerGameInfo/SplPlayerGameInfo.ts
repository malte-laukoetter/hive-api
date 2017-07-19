import {PlayerGameInfo, PlayerGameInfoFactory, GameTypes, Achievement, createAchievementsFromAchievementResponse,
    PlayerGameInfoAchievements, PlayerGameInfoFactoryAchievements, createDateFromResponse} from "../main";

export class SplPlayerGameInfo extends PlayerGameInfo implements PlayerGameInfoAchievements{
    constructor(points: number, readonly firstLogin: Date, readonly lastLogin: Date, readonly gamesPlayed: number,
                readonly victories: number, readonly deaths: number, readonly kills: number,
                readonly blocksPainted: number, readonly ultimatesEarned: number, readonly characterStats,
                readonly title: string, readonly achievements: Achievement[]) {
        super(GameTypes.SPL, points);
    }
}

export class SplPlayerGameInfoFactory extends PlayerGameInfoFactory<SplPlayerGameInfo>
    implements PlayerGameInfoFactoryAchievements{
    private _firstLogin : Date;
    private _lastLogin : Date;
    private _gamesPlayed: number;
    private _victories: number;
    private _title: string;
    private _achievements: Achievement[];
    private _deaths: number;
    private _kills: number;
    private _blocksPainted: number;
    private _ultimatesEarned: number;
    private _characterStats;

    create(): SplPlayerGameInfo {
        return new SplPlayerGameInfo(this._points, this._firstLogin, this._lastLogin, this._gamesPlayed,
            this._victories, this._deaths, this._kills, this._blocksPainted, this._ultimatesEarned,
            this._characterStats, this._title, this._achievements);
    }

    fromResponse(res){
        if(res.code == 404){
            return this;
        }

        return this.points(res.total_points)
            .firstLogin(createDateFromResponse(res.firstLogin))
            .lastLogin(createDateFromResponse(res.lastlogin))
            .achievements(createAchievementsFromAchievementResponse(GameTypes.SPL, res.achievements))
            .title(res.title)
            .gamesPlayed(res.games_played)
            .victories(res.victories)
            .kills(res.kills)
            .deaths(res.deaths)
            .blocksPainted(res.blocks_painted)
            .ultimatesEarned(res.ultimates_earned)
            .characterStats(res.character_stats);
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

    deaths(deaths: number){
        this._deaths = deaths;
        return this;
    }

    kills(kills: number){
        this._kills = kills;
        return this;
    }

    blocksPainted(blocksPainted: number){
        this._blocksPainted = blocksPainted;
        return this;
    }

    ultimatesEarned(ultimatesEarned: number){
        this._ultimatesEarned = ultimatesEarned;
        return this;
    }

    characterStats(characterStats){
        this._characterStats = characterStats;
        return this;
    }
}
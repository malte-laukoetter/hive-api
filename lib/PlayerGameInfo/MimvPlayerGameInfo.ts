import {PlayerGameInfo, PlayerGameInfoFactory, Achievement, createAchievementsFromAchievementResponse, GameTypes,
    PlayerGameInfoAchievements, PlayerGameInfoFactoryAchievements, createDateFromResponse} from "../main";

export enum MimvEmoteSelector{
    WHEEL = "WheelEmoteSelectorMenu",
    CIRCLE = "CircleEmoteSelectorMenu"
}

export enum MimvEmote{
    SMILE = "SMILE",
    BIG_GRIN = "BIG_GRIN",
    SURPRISED = "SURPRISED",
    COOL = "COOL",
    SCARED = "SCARED",
    ANGEL = "ANGEL",
    WINK = "WINK",
    SAD = "SAD",
    SOB = "SOB",
    EMBARRASSED = "EMBARRASSED"
}

export class MimvPlayerGameInfo extends PlayerGameInfo implements PlayerGameInfoAchievements{
    constructor(points: number, readonly lastLogin: Date, readonly firstLogin: Date, readonly gamesPlayed: number,
                readonly victories: number, readonly kills: number, readonly deaths: number,
                readonly lastUsedEmote: MimvEmote, readonly preferredEmoteSelectorMenu: MimvEmoteSelector,
                readonly achievements: Achievement[], readonly title) {
        super(points);
    }
}

export class MimvPlayerGameInfoFactory extends PlayerGameInfoFactory<MimvPlayerGameInfo>
    implements PlayerGameInfoFactoryAchievements{
    private _lastLogin: Date;
    private _firstLogin: Date;
    private _gamesPlayed: number;
    private _victories: number;
    private _kills: number;
    private _deaths: number;
    private _lastUsedEmote: MimvEmote;
    private _preferredEmoteSelectorMenu: MimvEmoteSelector;
    private _achievements: Achievement[];
    private _title;

    create(): MimvPlayerGameInfo {
        return new MimvPlayerGameInfo(this._points, this._lastLogin, this._firstLogin, this._gamesPlayed,
            this._victories, this._kills, this._deaths, this._lastUsedEmote, this._preferredEmoteSelectorMenu,
            this._achievements, this._title);
    }

    fromResponse(res){
        if(res.code == 404){
            return this;
        }

        return this
            .lastLogin(createDateFromResponse(res.lastlogin))
            .firstLogin(createDateFromResponse(res.firstLogin))
            .points(res.total_points)
            .gamesPlayed(res.games_played)
            .victories(res.victories)
            .kills(res.kills)
            .deaths(res.deaths)
            .lastUsedEmote(res.lastUsedEmote)
            .preferredEmoteSelectorMenu(res.preferredEmoteSelectorMenu)
            .achievements(createAchievementsFromAchievementResponse(GameTypes.MIMV, res.achievements))
            .title(res.title);
    }

    lastLogin(lastLogin: Date){
        this._lastLogin = lastLogin;
        return this;
    }

    firstLogin(firstLogin: Date){
        this._firstLogin = firstLogin;
        return this;
    }

    deaths(deaths: number){
        this._deaths = deaths;
        return this;
    }

    gamesPlayed(gamesPlayed: number){
        this._gamesPlayed = gamesPlayed;
        return this;
    }

    kills(kills: number){
        this._kills = kills;
        return this;
    }

    victories(victories: number){
        this._victories = victories;
        return this;
    }

    lastUsedEmote(lastUsedEmote: MimvEmote){
        this._lastUsedEmote = lastUsedEmote;
        return this;
    }

    preferredEmoteSelectorMenu(preferredEmoteSelectorMenu: MimvEmoteSelector){
        this._preferredEmoteSelectorMenu = preferredEmoteSelectorMenu;
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
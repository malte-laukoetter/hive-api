import {PlayerGameInfo, PlayerGameInfoFactory, GameTypes, Achievement, createAchievementsFromAchievementResponse,
    PlayerGameInfoAchievements, PlayerGameInfoFactoryAchievements, createDateFromResponse} from "../main";

export class DrawPlayerGameInfo extends PlayerGameInfo implements PlayerGameInfoAchievements{
    constructor(points: number, readonly firstLogin: Date, readonly gamesPlayed: number, readonly victories: number,
                readonly correctGuesses: number, readonly incorrectGuesses: number, readonly skips: number,
                readonly title: string, readonly achievements: Achievement[]) {
        super(points);
    }
}

export class DrawPlayerGameInfoFactory extends PlayerGameInfoFactory<DrawPlayerGameInfo>
    implements PlayerGameInfoFactoryAchievements{
    private _firstLogin : Date;
    private _gamesPlayed: number;
    private _victories: number;
    private _title: string;
    private _achievements: Achievement[];
    private _correctGuesses: number;
    private _incorrectGuesses: number;
    private _skips: number;


    create(): DrawPlayerGameInfo {
        return new DrawPlayerGameInfo(this._points, this._firstLogin, this._gamesPlayed, this._victories,
            this._correctGuesses, this._incorrectGuesses, this._skips, this._title,
            this._achievements);
    }

    fromResponse(res){
        if(res.code == 404){
            return this;
        }

        return this.points(res.total_points)
            .firstLogin(createDateFromResponse(res.firstLogin))
            .achievements(createAchievementsFromAchievementResponse(GameTypes.DRAW, res.achievements))
            .title(res.title)
            .gamesPlayed(res.gamesplayed)
            .victories(res.victories)
            .correctGuesses(res.correct_guesses)
            .incorrectGuesses(res.incorrect_guesses)
            .skips(res.skips);
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

    gamesPlayed(gamesPlayed: number){
        this._gamesPlayed = gamesPlayed;
        return this;
    }

    victories(victories: number){
        this._victories = victories;
        return this;
    }

    correctGuesses(correctGuesses: number){
        this._correctGuesses = correctGuesses;
        return this;
    }

    incorrectGuesses(incorrectGuesses: number){
        this._incorrectGuesses = incorrectGuesses;
        return this;
    }

    skips(skips: number){
        this._skips = skips;
        return this;
    }
}
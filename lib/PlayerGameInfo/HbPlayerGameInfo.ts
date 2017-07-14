import {PlayerGameInfo, PlayerGameInfoFactory, GameTypes, Achievement, createAchievementsFromAchievementResponse,
    PlayerGameInfoAchievements, PlayerGameInfoFactoryAchievements, createDateFromResponse,
    arrayFromListString} from "../main";

export enum HbClass{
    SORCERER = "SORCERER",
    PALADIN = "PALADIN",
    MAGE = "MAGE",
    PRIEST = "PRIEST",
    WIZARD = "WIZARD",
    SCOUT = "SCOUT",
    ARCHER = "ARCHER"
}

export class HbPlayerGameInfo extends PlayerGameInfo implements PlayerGameInfoAchievements{
    constructor(points: number, readonly firstLogin: Date, readonly captures: number, readonly kills: number,
                readonly deaths: number, readonly unlockedClasses: HbClass[], readonly activeClass: HbClass, readonly title: string,
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
    private _unlockedClasses: HbClass[] = [HbClass.PRIEST, HbClass.WIZARD, HbClass.SCOUT, HbClass.ARCHER];
    private _activeClass: HbClass;
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
            this.unlockedClasses(arrayFromListString(res.unlocked_classes))
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

    activeClass(activeClass: HbClass){
        this._activeClass = activeClass;
        return this;
    }

    unlockedClasses(unlockedClasses: HbClass[]){
        if(unlockedClasses.indexOf(HbClass.PRIEST) == -1){
            unlockedClasses.push(HbClass.PRIEST);
        }

        if(unlockedClasses.indexOf(HbClass.WIZARD) == -1){
            unlockedClasses.push(HbClass.WIZARD);
        }

        if(unlockedClasses.indexOf(HbClass.SCOUT) == -1){
            unlockedClasses.push(HbClass.SCOUT);
        }

        if(unlockedClasses.indexOf(HbClass.ARCHER) == -1){
            unlockedClasses.push(HbClass.ARCHER);
        }

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
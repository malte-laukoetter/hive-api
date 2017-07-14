import {PlayerGameInfo, PlayerGameInfoFactory, GameTypes, Achievement, createAchievementsFromAchievementResponse,
    PlayerGameInfoAchievements, PlayerGameInfoFactoryAchievements, createDateFromResponse,
    arrayFromListString} from "../main";

export enum BpBling{
    DIAMOND_BOOTS = "DIAMOND_BOOTS",
    GOLD_BOOTS = "GOLD_BOOTS",
    IRON_BOOTS = "IRON_BOOTS",
    LEATHER_BOOTS = "LEATHER_BOOTS"
}

export enum BpDeathSound{
    CAT_MEOW = "CAT_MEOW",
    GHAST_DEATH = "GHAST_DEATH",
    HORSE_DEATH = "HORSE_DEATH",
    SPLASH = "SPLASH",
    VILLAGER_YES = "VILLAGER_YES"
}

export enum BpTrail{
    FLAME = "FLAME",
    FLYING_GLYPH = "FLYING_GLYPH",
    HEART = "HEART",
    NOTE = "NOTE",
    VILLAGER_THUNDERCLOUD = "VILLAGER_THUNDERCLOUD"
}

export class BpPlayerGameInfo extends PlayerGameInfo implements PlayerGameInfoAchievements{
    constructor(points: number, readonly firstLogin: Date, readonly victories: number,
                readonly gamesPlayed: number, readonly selectedBling: BpBling,
                readonly selectedDeathSound: BpDeathSound, readonly selectedTrail: BpTrail,
                readonly selectedVictorySound, readonly totalElimination: number, readonly totalPlacing: number,
                readonly unlockedBling: BpBling[], readonly unlockedDeathSounds: BpDeathSound[],
                readonly unlockedTrails: BpTrail[], readonly windDisableNarration: boolean, readonly title: string,
                readonly achievements: Achievement[]) {
        super(points);
    }
}

export class BpPlayerGameInfoFactory extends PlayerGameInfoFactory<BpPlayerGameInfo>
    implements PlayerGameInfoFactoryAchievements{
    private _firstLogin : Date;
    private _victories : number;
    private _gamesPlayed : number;
    private _selectedBling: BpBling;
    private _selectedDeathSound: BpDeathSound;
    private _selectedTrail: BpTrail;
    private _selectedVictorySound;
    private _totalElimination: number;
    private _totalPlacing: number;
    private _unlockedBling: BpBling[] = [];
    private _unlockedDeathSounds: BpDeathSound[] = [];
    private _unlockedTrails: BpTrail[] = [];
    private _windDisableNarration: boolean;
    private _title: string;
    private _achievements: Achievement[] = [];

    create(): BpPlayerGameInfo {
        return new BpPlayerGameInfo(this._points, this._firstLogin, this._victories, this._gamesPlayed,
            this._selectedBling, this._selectedDeathSound, this._selectedTrail, this._selectedVictorySound,
            this._totalElimination, this._totalPlacing, this._unlockedBling, this._unlockedDeathSounds,
            this._unlockedTrails, this._windDisableNarration, this._title, this._achievements);
    }

    fromResponse(res){
        if(res.code == 404){
            return this;
        }

        this.points(res.total_points)
            .victories(res.victories)
            .gamesPlayed(res.games_played)
            .firstLogin(createDateFromResponse(res.firstLogin))
            .achievements(createAchievementsFromAchievementResponse(GameTypes.BP, res.achievements))
            .selectedBling(res.selected_bling)
            .selectedDeathSound(res.selected_death_sound)
            .selectedTrail(res.selected_trail)
            .selectedVictorySound(res.selected_victory_sound)
            .title(res.title)
            .totalPlacing(res.total_placing)
            .totalElimination(res.total_eliminations)
            .windDisableNarration(res.wing_disable_narration);

        if(res.unlocked_bling){
            this.unlockedBling(arrayFromListString(res.unlocked_bling))
        }

        if(res.unlocked_trails){
            this.unlockedTrails(arrayFromListString(res.unlocked_trails))
        }

        if(res.unlocked_death_sounds){
            this.unlockedDeathSounds(arrayFromListString(res.unlocked_death_sounds))
        }

        return this;
    }

    firstLogin(firstLogin : Date){
        this._firstLogin = firstLogin;
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

    selectedBling(selectedBling){
        this._selectedBling = selectedBling;
        return this;
    }

    selectedDeathSound(selectedDeathSound){
        this._selectedDeathSound = selectedDeathSound;
        return this;
    }

    selectedTrail(selectedTrail){
        this._selectedTrail = selectedTrail;
        return this;
    }

    selectedVictorySound(selectedVictorySound){
        this._selectedVictorySound = selectedVictorySound;
        return this;
    }

    title(title){
        this._title = title;
        return this;
    }

    totalElimination(totalElimination: number){
        this._totalElimination = totalElimination;
        return this;
    }

    totalPlacing(totalPlacing: number){
        this._totalPlacing = totalPlacing;
        return this;
    }

    unlockedBling(unlockedBling){
        this._unlockedBling = unlockedBling;
        return this;
    }

    unlockedDeathSounds(unlockedDeathSounds){
        this._unlockedDeathSounds = unlockedDeathSounds;
        return this;
    }

    unlockedTrails(unlockedTrails){
        this._unlockedTrails = unlockedTrails;
        return this;
    }

    windDisableNarration(windDisableNarration: boolean){
        this._windDisableNarration = windDisableNarration;
        return this;
    }
}
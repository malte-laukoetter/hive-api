import {PlayerGameInfo, PlayerGameInfoFactory, GameTypes, Achievement, createAchievementsFromAchievementResponse} from "../main";

export class BpPlayerGameInfo extends PlayerGameInfo {
    constructor(points: number, readonly firstLogin: Date, readonly victories: number,
                readonly gamesPlayed: number, readonly selectedBling, readonly selectedDeathSound,
                readonly selectedTrail, readonly selectedVictorySound, readonly totalElimination: number,
                readonly totalPlacing: number, readonly unlockedBling, readonly unlockedDeathSounds,
                readonly unlockedTrails, readonly windDisableNarration: boolean, readonly title: string,
                readonly achievements: Achievement[]) {
        super(points);
    }
}

export class BpPlayerGameInfoFactory extends PlayerGameInfoFactory<BpPlayerGameInfo> {
    private _firstLogin : Date;
    private _victories : number;
    private _gamesPlayed : number;
    private _selectedBling;
    private _selectedDeathSound;
    private _selectedTrail;
    private _selectedVictorySound;
    private _totalElimination: number;
    private _totalPlacing: number;
    private _unlockedBling;
    private _unlockedDeathSounds;
    private _unlockedTrails;
    private _windDisableNarration: boolean;
    private _title: string;
    private _achievements: Achievement[];

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

        return this.points(res.total_points)
            .victories(res.victories)
            .gamesPlayed(res.games_played)
            .firstLogin(new Date(res.firstLogin * 1000))
            .achievements(createAchievementsFromAchievementResponse(GameTypes.BP, res.achievements))
            .selectedBling(res.selected_bling)
            .selectedDeathSound(res.selected_death_sound)
            .selectedTrail(res.selected_trail)
            .selectedVictorySound(res.selected_victory_sound)
            .title(res.title)
            .totalPlacing(res.total_placing)
            .totalElimination(res.total_eleminations)
            .unlockedBling(res.unlocked_bling)
            .unlockedTrails(res.unlocked_trails)
            .unlockedDeathSounds(res.unlocked_death_sounds)
            .windDisableNarration(res.wing_disable_narration);
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
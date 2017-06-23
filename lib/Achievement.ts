import {GameType} from "./GameType";

export enum AchievementTypes {
    SERVER,
    GAME
}


export class Achievement {
    constructor(readonly id: string, readonly progress: number, readonly unlockedAt: Date = null,
                type: AchievementTypes = AchievementTypes.SERVER, game: GameType = null){

    }
}

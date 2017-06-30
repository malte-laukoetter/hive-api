import {FromResponseFactory, GameType, AchievementFactory, AchievementTypes, Achievement} from "../main";
import {isNullOrUndefined} from "util";

export class PlayerGameInfo {
    constructor(readonly points: number) {}
}

export class RawPlayerGameInfo extends PlayerGameInfo {
    constructor(readonly data) {
        super(data["total_points"] || data["points"] || 0);
    }
}

export abstract class PlayerGameInfoAchievements{
    achievements: Achievement[];
}

export interface PlayerGameInfoFactoryAchievements{
    achievements(achievements: Achievement[]): this;
}

export abstract class PlayerGameInfoFactory<T> implements FromResponseFactory<T> {
    protected _points: number = 0;

    points(points: number){
        this._points = points;
        return this;
    }

    create(): T {
        return null;
    }

    fromResponse(res: any): FromResponseFactory<T> {
        return this;
    }
}

export class RawPlayerGameInfoFactory extends PlayerGameInfoFactory<RawPlayerGameInfo> {
    private _data;

    create(): RawPlayerGameInfo {
        return new RawPlayerGameInfo(this._data);
    }

    fromResponse(res: any): FromResponseFactory<RawPlayerGameInfo> {
        return this.data(res);
    }

    data(data){
        this._data = data;
        return this;
    }
}

export function createAchievementsFromAchievementResponse(type: GameType, data): Achievement[]{
    if(isNullOrUndefined(data)) return [];

    return Object.entries(data)
        .filter(([id, data]) => id !== "version")
        .map(([id, data]) =>
            new AchievementFactory()
                .type(AchievementTypes.GAME)
                .game(type)
                .id(id)
                .fromResponse(data)
                .create()
        )
}
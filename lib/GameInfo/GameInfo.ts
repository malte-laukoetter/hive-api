import {FromResponseFactory, createDateFromResponse} from "../main";

/**
 * Information about a Game (not GameType / Mode)
 */
export class GameInfo {
    constructor(readonly gameEvents, readonly server: string, readonly endTime: Date, readonly startTime: Date, readonly map) {}
}

/**
 * a factory to create a [[GameInfo]] instance
 */
export abstract class GameInfoFactory<T extends GameInfo> implements FromResponseFactory<T> {
    protected _gameEvents;
    protected _server: string;
    protected _endTime: Date;
    protected _startTime: Date;
    protected _map;

    abstract create(): T;

    fromResponse(res: any): GameInfoFactory<T> {
        return this.gameEvents(res.gameevents)
            .server(res.server)
            .endTime(createDateFromResponse(res.endtime))
            .startTime(createDateFromResponse(res.starttime))
            .map(res.map);
    }

    gameEvents(gameEvents){
        this._gameEvents = gameEvents;
        return this;
    }

    server(server: string){
        this._server = server;
        return this;
    }

    endTime(endTime: Date){
        this._endTime = endTime;
        return this;
    }

    startTime(startTime: Date){
        this._startTime = startTime;
        return this;
    }

    map(map){
        this._map = map;
        return this;
    }
}

/**
 * a factory to create a [[GameInfo]] instance with just the basic data
 */
export class BasicGameInfoFactory extends GameInfoFactory<GameInfo> {
    create(): GameInfo{
        return new GameInfo(this._gameEvents, this._server, this._endTime, this._startTime, this._map);
    }
}
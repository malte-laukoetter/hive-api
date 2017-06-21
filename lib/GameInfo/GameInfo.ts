import {FromResponseFactory} from "../Factory";

export class GameInfo {
    constructor(readonly gameEvents, readonly server, readonly endTime, readonly startTime, readonly map) {}
}

export abstract class GameInfoFactory<T extends GameInfo> implements FromResponseFactory<T> {
    protected _gameEvents;
    protected _server;
    protected _endTime;
    protected _startTime;
    protected _map;


    abstract create(): T;

    fromResponse(res: any): GameInfoFactory<T> {
        return this.gameEvents(res.gameevents)
            .server(res.server)
            .endTime(res.endtime)
            .startTime(res.starttime)
            .map(res.map);
    }

    gameEvents(gameEvents){
        this._gameEvents = gameEvents;
        return this;
    }

    server(server){
        this._server = server;
        return this;
    }

    endTime(endTime){
        this._endTime = new Date(endTime * 1000);
        return this;
    }

    startTime(startTime){
        this._startTime = new Date(startTime * 1000);
        return this;
    }

    map(map){
        this._map = map;
        return this;
    }
}

export class DefaultGameInfoFactory extends GameInfoFactory<GameInfo> {
    create(): GameInfo{
        return new GameInfo(this._gameEvents, this._server, this._endTime, this._startTime, this._map);
    }
}
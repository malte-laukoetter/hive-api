import {GameInfo, GameInfoFactory} from "./GameInfo";

export class SingleWinnerGameInfo extends GameInfo {
    constructor(gameEvents, server, endTime, startTime, map, readonly players, readonly winner) {
        super(gameEvents, server, endTime, startTime, map);
    }
}

export abstract class SingleWinnerGameInfoFactory<T extends SingleWinnerGameInfo> extends GameInfoFactory<T> {
    protected _players;
    protected _winner;

    abstract create(): T;

    fromResponse(res: any): SingleWinnerGameInfoFactory<T> {
        return (super.fromResponse(res) as SingleWinnerGameInfoFactory<T>)
            .players(res.players)
            .winner(res.winner);
    }

    players(players){
        this._players = players;
        return this;
    }

    winner(winner){
        this._winner = winner;
        return this;
    }
}
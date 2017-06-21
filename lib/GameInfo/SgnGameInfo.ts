import {SingleWinnerGameInfo, SingleWinnerGameInfoFactory} from "./SingleWinnerGameInfo";

export class SgnGameInfo extends SingleWinnerGameInfo {
    constructor(gameEvents, server, endTime, startTime, map, players, winner, readonly deathMatchPlayers) {
        super(gameEvents, server, endTime, startTime, map, players, winner);
    }
}

export class SgnGameInfoFactory extends SingleWinnerGameInfoFactory<SgnGameInfo> {
    protected _deathMatchPlayers;

    create(): SgnGameInfo{
        return new SgnGameInfo(this._gameEvents, this._server, this._endTime, this._startTime, this._map, this._players,
            this._winner, this._deathMatchPlayers);
    }

    fromResponse(res: any): SgnGameInfoFactory {
        return (super.fromResponse(res) as SgnGameInfoFactory)
            .deathMatchPlayers(res.dmplayers);
    }

    deathMatchPlayers(deathMatchPlayers){
        this._deathMatchPlayers = deathMatchPlayers;
        return this;
    }
}
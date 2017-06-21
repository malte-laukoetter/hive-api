import {SingleWinnerGameInfo, SingleWinnerGameInfoFactory} from "./SingleWinnerGameInfo";

export class SgGameInfo extends SingleWinnerGameInfo {
    constructor(gameEvents, server, endTime, startTime, map, players, winner, readonly deathMatchPlayers) {
        super(gameEvents, server, endTime, startTime, map, players, winner);
    }
}

export class SgGameInfoFactory extends SingleWinnerGameInfoFactory<SgGameInfo> {
    protected _deathMatchPlayers;

    create(): SgGameInfo{
        return new SgGameInfo(this._gameEvents, this._server, this._endTime, this._startTime, this._map, this._players,
            this._winner, this._deathMatchPlayers);
    }

    fromResponse(res: any): SgGameInfoFactory {
        return (super.fromResponse(res) as SgGameInfoFactory)
            .deathMatchPlayers(res.dmplayers);
    }

    deathMatchPlayers(deathMatchPlayers){
        this._deathMatchPlayers = deathMatchPlayers;
        return this;
    }
}
import {SingleWinnerGameInfo, SingleWinnerGameInfoFactory, Player} from "../main";

export class SgGameInfo extends SingleWinnerGameInfo {
    constructor(gameEvents, server, endTime, startTime, map, players: Player[], winner: Player, readonly deathMatchPlayers: Player[]) {
        super(gameEvents, server, endTime, startTime, map, players, winner);
    }
}

export class SgGameInfoFactory extends SingleWinnerGameInfoFactory<SgGameInfo> {
    protected _deathMatchPlayers: Player[];

    create(): SgGameInfo{
        return new SgGameInfo(this._gameEvents, this._server, this._endTime, this._startTime, this._map, this._players,
            this._winner, this._deathMatchPlayers);
    }

    fromResponse(res: any): SgGameInfoFactory {
        return (super.fromResponse(res) as SgGameInfoFactory)
            .deathMatchPlayers(res.dmplayers.map(player => new Player(player)));
    }

    deathMatchPlayers(deathMatchPlayers: Player[]){
        this._deathMatchPlayers = deathMatchPlayers;
        return this;
    }
}
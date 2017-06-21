import {GameInfo, GameInfoFactory} from "./GameInfo";

export class TimvGameInfo extends GameInfo {
    constructor(gameEvents, server, endTime, startTime, map, readonly winningTeam, readonly innocent,
                readonly detective, readonly traitor) {
        super(gameEvents, server, endTime, startTime, map);
    }
}

export class TimvGameInfoFactory extends GameInfoFactory<TimvGameInfo> {
    protected _winningTeam;
    protected _innocent;
    protected _detective;
    protected _traitor;

    create(): TimvGameInfo{
        return new TimvGameInfo(this._gameEvents, this._server, this._endTime, this._startTime, this._map, this._winningTeam,
            this._innocent, this._detective, this._traitor);
    }

    fromResponse(res: any): TimvGameInfoFactory {
        return (super.fromResponse(res) as TimvGameInfoFactory)
            .winningTeam(res.winner)
            .innocent(res.players.INNOCENT)
            .detective(res.players.DETECTIVE)
            .traitor(res.players.TRAITOR);
    }

    winningTeam(winningTeam){
        this._winningTeam = winningTeam;
        return this;
    }

    innocent(innocent){
        this._innocent = innocent;
        return this;
    }

    detective(detective){
        this._detective = detective;
        return this;
    }

    traitor(traitor){
        this._traitor = traitor;
        return this;
    }
}
import {GameInfo, GameInfoFactory} from "./GameInfo";

export class DrGameInfo extends GameInfo {
    constructor(gameEvents, server, endTime, startTime, map, readonly runners, readonly winners, readonly winningRole,
                readonly deaths) {
        super(gameEvents, server, endTime, startTime, map);
    }
}
export class DrGameInfoFactory extends GameInfoFactory<DrGameInfo> {
    protected _runners;
    protected _winners;
    protected _winningRole;
    protected _deaths;

    create(): DrGameInfo{
        return new DrGameInfo(this._gameEvents, this._server, this._endTime, this._startTime, this._map, this._runners,
            this._winners, this._winningRole, this._deaths);
    }

    fromResponse(res: any): DrGameInfoFactory {
        return (super.fromResponse(res) as DrGameInfoFactory)
            .runners(res.runners)
            .winners(res.winners)
            .winningRole(res.winningRole)
            .deaths(res.deaths);
    }

    runners(runners){
        this._runners = runners;
        return this;
    }

    winners(winners){
        this._winners = winners;
        return this;
    }

    winningRole(winningRole){
        this._winningRole = winningRole;
        return this;
    }

    deaths(deaths){
        this._deaths = deaths;
        return this;
    }
}
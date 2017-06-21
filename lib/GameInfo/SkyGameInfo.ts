import {SingleWinnerGameInfo, SingleWinnerGameInfoFactory} from "./SingleWinnerGameInfo";
import {GameInfo, GameInfoFactory} from "./GameInfo";

export class SkySoloGameInfo extends SingleWinnerGameInfo {}

export class SkySoloGameInfoFactory extends SingleWinnerGameInfoFactory<SkySoloGameInfo> {
    create(): SkySoloGameInfo{
        return new SkySoloGameInfo(this._gameEvents, this._server, this._endTime, this._startTime, this._map,
            this._players, this._winner);
    }
}

export class SkyTeamGameInfo extends GameInfo {
    constructor(gameEvents, server, endTime, startTime, map, readonly winners, readonly teamPlayers) {
        super(gameEvents, server, endTime, startTime, map);
    }
}

export class SkyTeamGameInfoFactory extends GameInfoFactory<SkyTeamGameInfo> {
    protected _winners;
    protected _teamPlayers;

    create(): SkyTeamGameInfo{
        return new SkyTeamGameInfo(this._gameEvents, this._server, this._endTime, this._startTime, this._map, this._winners,
            this._teamPlayers);
    }

    fromResponse(res: any): SkyTeamGameInfoFactory {
        return (super.fromResponse(res) as SkyTeamGameInfoFactory)
            .winners([res.winner, res.winner2])
            .teamPlayers(res.teamplayers)
    }

    winners(winners){
        this._winners = winners;
        return this;
    }

    teamPlayers(teamPlayers){
        this._teamPlayers = teamPlayers;
        return this;
    }
}

export class SkyGameInfoFactory extends GameInfoFactory<GameInfo> {
    create(): GameInfo {
        throw "the teams property is needed";
    }

    fromResponse(res: any): GameInfoFactory<GameInfo> {
        return (super.fromResponse(res) as SkyGameInfoFactory).teams(res.teams).fromResponse(res);
    }

    teams(teams){
        if(teams){
            return new SkyTeamGameInfoFactory();
        }else{
            return new SkySoloGameInfoFactory();
        }
    }
}
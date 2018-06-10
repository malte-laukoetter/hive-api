import {GameInfo, GameInfoFactory, SingleWinnerGameInfo, SingleWinnerGameInfoFactory, Player} from "../main";

export class SkySoloGameInfo extends SingleWinnerGameInfo {}

export class SkySoloGameInfoFactory extends SingleWinnerGameInfoFactory<SkySoloGameInfo> {
    create(): SkySoloGameInfo{
        return new SkySoloGameInfo(this._gameEvents, this._server, this._endTime, this._startTime, this._map,
            this._players, this._winner);
    }
}

export class SkyTeam {
    constructor(readonly color, readonly players: Player[]){}
}

export class SkyTeamGameInfo extends GameInfo {
    constructor(gameEvents, server, endTime, startTime, map, readonly winners: Player[],
                readonly teamPlayers: SkyTeam[]) {
        super(gameEvents, server, endTime, startTime, map);
    }
}

export class SkyTeamGameInfoFactory extends GameInfoFactory<SkyTeamGameInfo> {
    protected _winners: Player[];
    protected _teamPlayers: SkyTeam[];

    create(): SkyTeamGameInfo{
        return new SkyTeamGameInfo(this._gameEvents, this._server, this._endTime, this._startTime, this._map, this._winners,
            this._teamPlayers);
    }

    fromResponse(res: any): SkyTeamGameInfoFactory {
        return (super.fromResponse(res) as SkyTeamGameInfoFactory)
            .winners([res.winner, res.winner2].map(player => new Player(player)))
            .teamPlayers(Object.entries(res.teamplayers).map(
                ([color, players]: any) => new SkyTeam(color, players.map(player => new Player(player)))
            ));
    }

    winners(winners: Player[]){
        this._winners = winners;
        return this;
    }

    teamPlayers(teamPlayers: SkyTeam[]){
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

    teams(teams: boolean){
        let factory: GameInfoFactory<GameInfo> = null;

        if(teams){
            factory = new SkyTeamGameInfoFactory();
        }else{
            factory = new SkySoloGameInfoFactory();
        }

        return factory
            .gameEvents(this._gameEvents)
            .server(this._server)
            .endTime(this._endTime)
            .startTime(this._startTime)
            .map(this._map);
    }
}
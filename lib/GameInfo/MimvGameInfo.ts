import {GameInfo, GameInfoFactory} from "../main";

export class MimvGameInfo extends GameInfo {
    constructor(gameEvents, server, endTime, startTime, map, readonly winningTeam, readonly citizen,
                readonly detective, readonly murderer) {
        super(gameEvents, server, endTime, startTime, map);
    }
}

export class MimvGameInfoFactory extends GameInfoFactory<MimvGameInfo> {
    protected _winningTeam;
    protected _citizen;
    protected _detective;
    protected _murderer;

    create(): MimvGameInfo{
        return new MimvGameInfo(this._gameEvents, this._server, this._endTime, this._startTime, this._map, this._winningTeam,
            this._citizen, this._detective, this._murderer);
    }

    fromResponse(res: any): MimvGameInfoFactory {
        return (super.fromResponse(res) as MimvGameInfoFactory)
            .winningTeam(res.winner)
            .citizen(res.players.CITIZEN)
            .detective(res.players.DETECTIVE)
            .murderer(res.players.MURDERER);
    }

    winningTeam(winningTeam){
        this._winningTeam = winningTeam;
        return this;
    }

    citizen(citizen){
        this._citizen = citizen;
        return this;
    }

    detective(detective){
        this._detective = detective;
        return this;
    }

    murderer(murderer){
        this._murderer = murderer;
        return this;
    }
}
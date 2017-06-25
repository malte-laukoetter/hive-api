import {GameInfo, GameInfoFactory, Player} from "../main";

export enum MimvTeam {
    CITIZEN,
    MURDERER
}

export function mimvTeamFromText(text: string): MimvTeam{
    switch(text.toLowerCase()){
        case "citizen":
            return MimvTeam.CITIZEN;
        case "murderer":
            return MimvTeam.MURDERER;
    }

    throw new Error(`Unknown MimvTeam ${text}`);
}


export class MimvGameInfo extends GameInfo {
    constructor(gameEvents, server, endTime, startTime, map, readonly winningTeam: MimvTeam, readonly citizen: Player[],
                readonly detective: Player[], readonly murderer: Player[]) {
        super(gameEvents, server, endTime, startTime, map);
    }
}

export class MimvGameInfoFactory extends GameInfoFactory<MimvGameInfo> {
    protected _winningTeam: MimvTeam;
    protected _citizen: Player[];
    protected _detective: Player[];
    protected _murderer: Player[];

    create(): MimvGameInfo{
        return new MimvGameInfo(this._gameEvents, this._server, this._endTime, this._startTime, this._map, this._winningTeam,
            this._citizen, this._detective, this._murderer);
    }

    fromResponse(res: any): MimvGameInfoFactory {
        return (super.fromResponse(res) as MimvGameInfoFactory)
            .winningTeam(mimvTeamFromText(res.winner))
            .citizen(res.players.CITIZEN.map(player => new Player(player)))
            .detective(res.players.DETECTIVE.map(player => new Player(player)))
            .murderer(res.players.MURDERER.map(player => new Player(player)));
    }

    winningTeam(winningTeam: MimvTeam){
        this._winningTeam = winningTeam;
        return this;
    }

    citizen(citizen: Player[]){
        this._citizen = citizen;
        return this;
    }

    detective(detective: Player[]){
        this._detective = detective;
        return this;
    }

    murderer(murderer: Player[]){
        this._murderer = murderer;
        return this;
    }
}
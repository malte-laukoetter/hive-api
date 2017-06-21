import * as fetch from 'node-fetch';
import {GameType} from "./GameType";
import {Methods} from "./Methods";

export class Game {
    private _id;
    private _type : GameType;
    private _info = null;

    constructor(type, id) {
        this._type = type;
        this._id = id;
    }

    get id() {
        return this._id;
    }

    get type() {
        return this._type;
    }

    info(){
        if(this._info == null){
            this._info = fetch(Methods.GAME_INFO(this.type.id, this.id))
                .then(res => res.json())
                .then(res => createGameInfoFromResponse(res, this.type));
        }

        return this._info;
    }
}

class GameInfo{
    private _gameEvents;
    private _server;
    private _endTime;
    private _startTime;
    private _map;


    constructor(gameEvents, server, endTime, startTime, map) {
        this._gameEvents = gameEvents;
        this._server = server;
        this._endTime = endTime;
        this._startTime = startTime;
        this._map = map;
    }


    get gameEvents() {
        return this._gameEvents;
    }

    get server() {
        return this._server;
    }

    get endTime() {
        return new Date(this._endTime * 1000);
    }

    get startTime() {
        return new Date(this._startTime * 1000);
    }

    get map() {
        return this._map;
    }
}

class SingleWinnerGameInfo extends GameInfo {
    private _players;
    private _winner;

    constructor(gameEvents, server, endTime, startTime, map, players, winner) {
        super(gameEvents, server, endTime, startTime, map);
        this._players = players;
        this._winner = winner;
    }

    get players() {
        return this._players;
    }

    get winner() {
        return this._winner;
    }
}

class SkyTeamGameInfo extends GameInfo {
    private _winners; // build from winner and winner2
    private _teamPlayers;

    constructor(gameEvents, server, endTime, startTime, map, winner1, winner2, teamPlayers) {
        super(gameEvents, server, endTime, startTime, map);
        this._winners = [winner1, winner2];
        this._teamPlayers = teamPlayers;
    }

    get winners() {
        return this._winners;
    }

    get teamPlayers() {
        return this._teamPlayers;
    }
}

class SkySoloGameInfo extends SingleWinnerGameInfo {}

class TimvGameInfo extends GameInfo {
    private _winningTeam;
    private _innocent;
    private _detective;
    private _traitor;

    constructor(gameEvents, server, endTime, startTime, map, winningTeam, innocent, detective, traitor) {
        super(gameEvents, server, endTime, startTime, map);
        this._winningTeam = winningTeam;
        this._innocent = innocent;
        this._detective = detective;
        this._traitor = traitor;
    }

    get winningTeam() {
        return this._winningTeam;
    }

    get innocent() {
        return this._innocent;
    }

    get detective() {
        return this._detective;
    }

    get traitor() {
        return this._traitor;
    }
}

class DrGameInfo extends GameInfo {
    private _runners;
    private _winners;
    private _winningRole;
    private _deaths;

    constructor(gameEvents, server, endTime, startTime, map, runners, winners, winningRole, deaths) {
        super(gameEvents, server, endTime, startTime, map);
        this._runners = runners;
        this._winners = winners;
        this._winningRole = winningRole;
        this._deaths = deaths;
    }

    get runners() {
        return this._runners;
    }

    get winners() {
        return this._winners;
    }

    get winningRole() {
        return this._winningRole;
    }

    get deaths() {
        return this._deaths;
    }
}

class MimvGameInfo extends GameInfo {
    private _winningTeam;
    private _citizen;
    private _detective;
    private _murderer;

    constructor(gameEvents, server, endTime, startTime, map, winningTeam, citizen, detective, murderer) {
        super(gameEvents, server, endTime, startTime, map);
        this._winningTeam = winningTeam;
        this._citizen = citizen;
        this._detective = detective;
        this._murderer = murderer;
    }

    get winningTeam() {
        return this._winningTeam;
    }

    get citizen() {
        return this._citizen;
    }

    get detective() {
        return this._detective;
    }

    get murderer() {
        return this._murderer;
    }
}

class SgnGameInfo extends SingleWinnerGameInfo {
    private _dmPlayers;

    constructor(gameEvents, server, endTime, startTime, map, players, winner, dmPlayers) {
        super(gameEvents, server, endTime, startTime, map, players, winner);
        this._dmPlayers = dmPlayers;
    }

    get dmPlayers() {
        return this._dmPlayers;
    }
}

class SgGameInfo extends SingleWinnerGameInfo {
    private _dmPlayers;

    constructor(gameEvents, server, endTime, startTime, map, players, winner, dmPlayers) {
        super(gameEvents, server, endTime, startTime, map, players, winner);
        this._dmPlayers = dmPlayers;
    }

    get dmPlayers() {
        return this._dmPlayers;
    }
}

function createGameInfoFromResponse(res, gameType){
    if(res){
        switch (gameType.id) {
            case "SKY":
                if(res.teams){
                    return new SkyTeamGameInfo(res.gameevents, res.server, res.endtime, res.starttime, res.map, res.winner,
                        res.winner2, res.teamplayers);
                }else{
                    return new SkySoloGameInfo(res.gameevents, res.server, res.endtime, res.starttime, res.map, res.players,
                        res.winner);
                }
            case "TIMV":
                return new TimvGameInfo(res.gameevents, res.server, res.endtime, res.starttime, res.map, res.winner,
                    res.players.INNOCENT, res.players.DETECTIVE, res.players.TRAITOR);
            case "DR":
                return new DrGameInfo(res.gameevents, res.server, res.endtime, res.starttime, res.map, res.runners,
                    res.winners, res.winningRole, res.deaths);
            case "MIMV":
                return new MimvGameInfo(res.gameevents, res.server, res.endtime, res.starttime, res.map, res.winner,
                    res.players.CITIZEN, res.players.DETECTIVE, res.players.MURDERER);
            case "SGN":
                return new SgnGameInfo(res.gameevents, res.server, res.endtime, res.starttime, res.map, res.players,
                    res.winner, res.dmplayers);
            case "SG":
                return new SgGameInfo(res.gameevents, res.server, res.endtime, res.starttime, res.map, res.players,
                    res.winner, res.dmplayers);
            default:
                return new GameInfo(res.gameevents, res.server, res.endtime, res.starttime, res.map);
        }
    }else{
        return new GameInfo([], "", 0, 0, "");
    }
}
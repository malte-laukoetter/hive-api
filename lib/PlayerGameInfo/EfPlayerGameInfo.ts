import {PlayerGameInfo, PlayerGameInfoFactory, GameTypes, createDateFromResponse} from "../main";

export class EfPlayerGameInfo extends PlayerGameInfo {
    constructor(points: number, readonly firstLogin: Date, readonly lastLogin: Date, readonly gamesPlayed: number,
                readonly victories: number, readonly title: string, readonly outlived: number, readonly blocksActivated: number) {
        super(GameTypes.EF, points);
    }
}

export class EfPlayerGameInfoFactory extends PlayerGameInfoFactory<EfPlayerGameInfo> {
    private _firstLogin : Date;
    private _lastLogin : Date;
    private _gamesPlayed: number;
    private _victories: number;
    private _title: string;
    private _outlived: number;
    private _blocksActivated: number;

    create(): EfPlayerGameInfo {
        return new EfPlayerGameInfo(this._points, this._firstLogin, this._lastLogin, this._gamesPlayed,
            this._victories, this._title, this._outlived, this._blocksActivated);
    }

    fromResponse(res){
        if(res.code == 404){
            return this;
        }

        return this.points(res.points)
            .firstLogin(createDateFromResponse(res.firstlogin))
            .lastLogin(createDateFromResponse(res.lastlogin))
            .title(res.title)
            .gamesPlayed(res.gamesplayed)
            .victories(res.victories)
            .blocksActivated(res.blocksactivated)
            .outlived(res.outlived);
    }

    firstLogin(firstLogin : Date){
        this._firstLogin = firstLogin;
        return this;
    }

    lastLogin(lastLogin : Date){
        this._lastLogin = lastLogin;
        return this;
    }

    title(title : string){
        this._title = title;
        return this;
    }

    gamesPlayed(gamesPlayed: number){
        this._gamesPlayed = gamesPlayed;
        return this;
    }

    victories(victories: number){
        this._victories = victories;
        return this;
    }

    outlived(outlived: number){
        this._outlived = outlived;
        return this;
    }

    blocksActivated(blocksActivated: number){
        this._blocksActivated = blocksActivated;
        return this;
    }
}
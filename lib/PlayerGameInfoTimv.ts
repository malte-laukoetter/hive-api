import {PlayerGameInfo} from "./PlayerGameInfo";
import {Factory} from "./Factory";

export class PlayerGameInfoTimv extends PlayerGameInfo{
    private _lastLogin : Date;
    private _totalPoints : number;
    private _mostPoints : number;
    private _rolePoints : number;
    private _traitorPoints : number;
    private _innocentPoints : number;
    private _detectivePoints : number;
    private _activeDetectiveStick;
    private _detectiveSticks;
    private _activeFlareUpgrade;
    private _flareUpgrades;
    private _detectiveBook : boolean;
    private _achievements;
    private _title;


    constructor(lastLogin: Date, totalPoints: number, mostPoints: number, rolePoints: number, traitorPoints: number,
                innocentPoints: number, detectivePoints: number, activeDetectiveStick, detectiveSticks,
                activeFlareUpgrade, flareUpgrades, detectiveBook: boolean, achievements, title) {
        super();
        this._lastLogin = lastLogin;
        this._totalPoints = totalPoints;
        this._mostPoints = mostPoints;
        this._rolePoints = rolePoints;
        this._traitorPoints = traitorPoints;
        this._innocentPoints = innocentPoints;
        this._detectivePoints = detectivePoints;
        this._activeDetectiveStick = activeDetectiveStick;
        this._detectiveSticks = detectiveSticks;
        this._activeFlareUpgrade = activeFlareUpgrade;
        this._flareUpgrades = flareUpgrades;
        this._detectiveBook = detectiveBook;
        this._achievements = achievements;
        this._title = title;
    }

    get lastLogin(): Date {
        return this._lastLogin;
    }

    get totalPoints(): number {
        return this._totalPoints;
    }

    get mostPoints(): number {
        return this._mostPoints;
    }

    get rolePoints(): number {
        return this._rolePoints;
    }

    get traitorPoints(): number {
        return this._traitorPoints;
    }

    get innocentPoints(): number {
        return this._innocentPoints;
    }

    get detectivePoints(): number {
        return this._detectivePoints;
    }

    get activeDetectiveStick() {
        return this._activeDetectiveStick;
    }

    get detectiveSticks() {
        return this._detectiveSticks;
    }

    get activeFlareUpgrade() {
        return this._activeFlareUpgrade;
    }

    get flareUpgrades() {
        return this._flareUpgrades;
    }

    get detectiveBook(): boolean {
        return this._detectiveBook;
    }

    get achievements() {
        return this._achievements;
    }

    get title() {
        return this._title;
    }
}

export class PlayerGameInfoTimvFactory implements Factory<PlayerGameInfoTimv> {
    private _lastLogin : Date;
    private _totalPoints : number;
    private _mostPoints : number;
    private _rolePoints : number;
    private _traitorPoints : number;
    private _innocentPoints : number;
    private _detectivePoints : number;
    private _activeDetectiveStick;
    private _detectiveSticks;
    private _activeFlareUpgrade;
    private _flareUpgrades;
    private _detectiveBook : boolean;
    private _achievements;
    private _title;

    constructor() {}

    create(): PlayerGameInfoTimv {
        return new PlayerGameInfoTimv(this._lastLogin, this._totalPoints, this._mostPoints, this._rolePoints,
            this._traitorPoints, this._innocentPoints, this._detectivePoints, this._activeDetectiveStick,
            this._detectiveSticks, this._activeFlareUpgrade, this._flareUpgrades, this._detectiveBook,
            this._achievements, this._title);
    }

    lastLogin(lastLogin){
        this._lastLogin = new Date(lastLogin * 1000);

        return this;
    }

    totalPoints(totalPoints){
        this._totalPoints = totalPoints;
        return this;
    }

    mostPoints(mostPoints){
        this._mostPoints = mostPoints;
        return this;
    }

    rolePoints(rolePoints){
        this._rolePoints = rolePoints;
        return this;
    }

    traitorPoints(traitorPoints){
        this._traitorPoints = traitorPoints;
        return this;
    }

    innocentPoints(innocentPoints){
        this._innocentPoints = innocentPoints;
        return this;
    }

    detectivePoints(detectivePoints){
        this._detectivePoints = detectivePoints;
        return this;
    }

    activeDetectiveStick(activeDetectiveStick){
        this._activeDetectiveStick = activeDetectiveStick;
        return this;
    }

    detectiveSticks(detectiveSticks){
        this._detectiveSticks = detectiveSticks;
        return this;
    }

    activeFlareUpgrade(activeFlareUpgrade){
        this._activeFlareUpgrade = activeFlareUpgrade;
        return this;
    }

    flareUpgrades(flareUpgrades){
        this._flareUpgrades = flareUpgrades;
        return this;
    }

    detectiveBook(detectiveBook){
        this._detectiveBook = detectiveBook;
        return this;
    }

    achievements(achievements){
        this._achievements = achievements;
        return this;
    }

    title(title){
        this._title = title;
        return this;
    }

    static createFromResponse(res){
        return new PlayerGameInfoTimvFactory()
            .lastLogin(res.lastlogin)
            .totalPoints(res.total_points)
            .mostPoints(res.most_points)
            .rolePoints(res.role_points)
            .traitorPoints(res.t_points)
            .innocentPoints(res.i_points)
            .detectivePoints(res.d_points)
            .activeDetectiveStick(res.active_detectivestick)
            .detectiveSticks(res.detectivesticks)
            .activeFlareUpgrade(res.active_flareupgrade)
            .flareUpgrades(res.flareupgrade)
            .detectiveBook(res.detectivebook)
            .achievements(res.achievements)
            .title(res.title)
            .create();
    }
}
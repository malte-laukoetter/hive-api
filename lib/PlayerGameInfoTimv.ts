import {PlayerGameInfo} from "./PlayerGameInfo";
import {Factory} from "./Factory";

export class PlayerGameInfoTimv extends PlayerGameInfo{

}

export class PlayerGameInfoTimvFactory implements Factory<PlayerGameInfoTimv> {
    private lastLogin;
    private totalPoints;
    private mostPoints;
    private rolePoints;
    private traitorPoints;
    private innocentPoints;
    private detectivePoints;
    private activeDetectiveStick;
    private detectiveSticks;
    private activeFlareUpgrade;
    private flareUpgrades;
    private detectiveBook : boolean;
    private achivements;
    private title;

    constructor() {}

    create(): PlayerGameInfoTimv {
        return new PlayerGameInfoTimv();
    }
}
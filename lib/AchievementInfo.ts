import { FromResponseFactory, createBannerFromString } from "./main";

/**
 * the type of the reward of an achievement.
 * NONE if no reward is awarded and UNKNOWN if the type is not known by this code
 */
export enum RewardTypes {
    NONE,
    TOKEN,
    BANNER,
    UNKNOWN
}

export const noLongerOptainableAchievementIds = [
    // SKY
    "DEFENDER", "SKYLANDER", "WARRIOR", "GLADIATOR", "VETERAN", "VOYAGER", "WARLORD", "WARMONGER", "KEEPER", "OVERSEER", "HERO", "GUARDIAN", "PALADIN", "CHAMPION", "ZEUS", "GODLY",

    // TIMV
    "KARMA10000", "KARMA20000", // ??? are not in the achievement list

    // BP
    "DIVERSITY", "MICHAEL",
    "RAVER", "FREESTYLER", "STAR", "MCHAMMER", "CARLTON", "DESTROYER", "DOMINATOR", "KING",

    // CAI
    "LEADER500", "LEADER1000", // "WIN1000", "WIN500" -> they would make this routine a lot more complicated so we just ignore them :P

    // LAB
    "SCIENTIST", "WIN",

    // HB
    "NOMATCH", "HOWMANY", "DOMUST", "IKILLED",

    // SP
    "NOTMUSHROOM", "TREEFIDDY", "POKEMON", "AURA", "PETALPOWER", "BALANCE", "BIOMES", "GOLD", "RINGRING", "SATURN", "STARMIE", "TIMETRAVEL", "TREEISLAND", "TREESNOWLAND", "CELL", "CHOCOLATE", "INFERNO", "MAKINGITUP", "PALETTE", "TRIBAL", "TROPICALSNOW", "WRATH",
    "POWERUP15", "POWERUP20",
    "DESTROY100000", "DESTROY250000", "DESTROY500000", "DESTROY1000000", "DESTROY2500000", 
    "SHOOT100000", "SHOOT250000", "SHOOT500000", "SHOOT1000000", "SHOOT2500000",

    // OITC
    "AUTUMN", "CANDYLAND", "CHINESETREE", "CHRISTMAS", "COLLORAM", "DAIRY", "MELTY", "TEMPUS", "PORTAL", "TREE", "WILDWEST",
    "WIN1000", "WIN500",

    // SPL
    "TO500MORE", "TO1000MORE",

    // HERO
    "BOOTIES", "BIRTHDAY", "SLIMMINGDOWN", "QUICKY", "FREERIDE",
    "NOWIGETIT", "MANFIGHT", "SHOTS", "NOWIHAVETO", "IRIDE", "ATTEMPTCHAMPION", "NOOTHER", "DEATHMATCHCHAMPION",

    // HIDE
    "HIDER2000", "HIDER3000", "HIDER5000", "HIDER10000", "SEEKER100"
]

/**
 * creates the [[RewardTypes RewardType]] the string represents
 */
export function rewardTypeFromString(str: string) : RewardTypes {
    switch (str.toUpperCase()){
        case "NONE":
            return RewardTypes.NONE;
        case "TOKEN":
            return RewardTypes.TOKEN;
        case "BANNER":
            return RewardTypes.BANNER;
        default:
            return RewardTypes.UNKNOWN;
    }
}

/**
 * general information about an achievement
 */
export class AchievementInfo {
    constructor(readonly id: string, readonly name: string, readonly description: string, readonly stages: number = 1,
                readonly secret: boolean = false, readonly custom: boolean = false, readonly disabled: boolean = false,
                readonly rewardType = RewardTypes.NONE, readonly rewardArguments: string = ""){}

    get noLongerOptainable(): boolean {
        return noLongerOptainableAchievementIds.includes(this.id) || this.disabled
    }
}

/**
 * [[Factory]] to create a new [[AchievementInfo]]
 */
export class AchievementInfoFactory implements FromResponseFactory<AchievementInfo>{
    private _id: string = "";
    private _name: string = "";
    private _description: string = "";
    private _stages: number = 1;
    private _secret: boolean = false;
    private _custom: boolean = false;
    private _disabled: boolean = false;
    private _rewardType: RewardTypes = RewardTypes.NONE;
    private _rewardArguments: any = "";

    create(): AchievementInfo {
        return new AchievementInfo(this._id, this._name, this._description, this._stages, this._secret, this._custom,
            this._disabled, this._rewardType, this._rewardArguments);
    }

    fromResponse(res: any): FromResponseFactory<AchievementInfo> {
        return this.id(res.name)
            .name(res.publicname)
            .description(res.description)
            .stages(res.stages)
            .custom(res.custom)
            .secret(res.secret)
            .disabled(res.disabled)
            .rewardType(rewardTypeFromString(res.rewardtype))
            .rewardArguments(res.rewardarguments);
    }

    id(id: string){
        this._id = id;
        return this;
    }

    name(name: string){
        this._name = name;
        return this;
    }

    description(description: string){
        this._description = description;
        return this;
    }

    stages(stages: number){
        this._stages = stages;
        return this;
    }

    secret(secret: boolean){
        this._secret = secret;
        return this;
    }

    custom(custom: boolean){
        this._custom = custom;
        return this;
    }

    disabled(disabled: boolean){
        this._disabled = disabled;
        return this;
    }

    rewardType(rewardType: RewardTypes){
        this._rewardType = rewardType;
        return this;
    }

    /**
     * rewardType should be set first!
     */
    rewardArguments(rewardArguments: any){
        switch (this._rewardType) {
            case RewardTypes.TOKEN:
                this._rewardArguments = rewardArguments as number;
                break;
            case RewardTypes.BANNER:
                this._rewardArguments = createBannerFromString(rewardArguments);
                break;
            default:
                this._rewardArguments = rewardArguments;
        }

        return this;
    }
}
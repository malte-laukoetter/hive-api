import {FromResponseFactory} from "./Factory";

/**
 * the type of the reward of an achievement, currently only NONE should be in use but if there is another one later the
 * code should just set it to UNKNOWN till it is added so please report it if you see an UNKNOWN :)
 */
export enum RewardTypes {
    NONE,
    UNKNOWN
}

/**
 * creates the [[RewardTypes RewardType]] the string represents
 */
export function rewardTypeFromString(str: string) : RewardTypes {
    switch (str.toUpperCase()){
        case "NONE":
            return RewardTypes.NONE;
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
    private _rewardArguments: string = "";

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

    rewardArguments(rewardArguments: string){
        this._rewardArguments = rewardArguments;
        return this;
    }
}
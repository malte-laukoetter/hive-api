import { expect } from "chai";
import "mocha";
import {AchievementFactory, AchievementTypes, GameAchievement, ServerAchievement, TheSwarmAchievement,
    theSwarmGameToGameType, GameTypes} from "../lib/main";

describe("AchievementFactory", () => {
    describe("#create()", () => {
        it("if the type is Server it should be a ServerAchievement", () => {
            expect(new AchievementFactory().type(AchievementTypes.SERVER).create() instanceof ServerAchievement).to.be.true;
        });

        it("if the type is Game it should be a GameAchievement", () => {
            expect(new AchievementFactory().type(AchievementTypes.GAME).create() instanceof GameAchievement).to.be.true;
        });

        it("if the type is Server and the id THESWARM it should be a TheSwarmAchievement", () => {
            expect(new AchievementFactory().type(AchievementTypes.SERVER).id("THESWARM").create() instanceof TheSwarmAchievement).to.be.true;
        });

        it("the latest type should count", () => {
            expect(new AchievementFactory().type(AchievementTypes.SERVER).type(AchievementTypes.GAME).create() instanceof GameAchievement).to.be.true;
        });
    })
});

describe("theSwarmGameToGameType()", () => {
    describe("Using the random names some games have", () => {
        it("HideAndSeek", () => {
            expect(theSwarmGameToGameType("HideAndSeek")).to.be.equal(GameTypes.HIDE);
        });

        it("SurvivalGames", () => {
            expect(theSwarmGameToGameType("SurvivalGames")).to.be.equal(GameTypes.SG);
        });

        it("DeathRun", () => {
            expect(theSwarmGameToGameType("DeathRun")).to.be.equal(GameTypes.DR);
        });

        it("SGHeroes", () => {
            expect(theSwarmGameToGameType("SGHeroes")).to.be.equal(GameTypes.HERO);
        });

        it("TheHerobrine", () => {
            expect(theSwarmGameToGameType("TheHerobrine")).to.be.equal(GameTypes.HB);
        });

        it("Cranked", () => {
            expect(theSwarmGameToGameType("Cranked")).to.be.equal(GameTypes.CR);
        });
    });

    describe("Using the Id", () => {
        for(let type of GameTypes.list){
            it(type.id, () => {
                expect(theSwarmGameToGameType(type.id)).to.be.equal(type);
            })
        }
    });
});
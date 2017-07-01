import { expect } from 'chai';
import 'mocha';
import {GameTypes, GameType, playerGameInfoFactoryForGametype, BpPlayerGameInfo, BpPlayerGameInfoFactory,
    SgPlayerGameInfo, SgPlayerGameInfoFactory, TimvPlayerGameInfo, TimvPlayerGameInfoFactory, BedPlayerGameInfo,
    BedPlayerGameInfoFactory, HeroPlayerGameInfo, HeroPlayerGameInfoFactory, RrPlayerGameInfo, RrPlayerGameInfoFactory,
    SpPlayerGameInfo, SpPlayerGameInfoFactory, DrPlayerGameInfo, DrPlayerGameInfoFactory, SkyPlayerGameInfo,
    SkyPlayerGameInfoFactory, MimvPlayerGameInfo, MimvPlayerGameInfoFactory, HbPlayerGameInfo, HbPlayerGameInfoFactory
} from "../lib/main";
import {getMethods} from "./utils";

describe("Player Game Info Factories", () => {
    let tests = new Set([
        [GameTypes.SG, new SgPlayerGameInfo(0, new Date(), new Date(), 0, 0, 0, 0, 0, 0, 0, 0, true, true, [], 0, [], [], false, new Date(), [], []), new SgPlayerGameInfoFactory()],
        [GameTypes.BED, new BedPlayerGameInfo(0, new Date(), new Date(), 0, 0, 0, 0, 0, 0, []), new BedPlayerGameInfoFactory()],
        [GameTypes.TIMV, new TimvPlayerGameInfo(0, new Date(), 0, 0, 0, 0, 0, 0, [], 0, [], false, [], ""), new TimvPlayerGameInfoFactory()],
        [GameTypes.BP, new BpPlayerGameInfo(0, new Date(), 0, 0, 0, 0, 0, 0, 0, 0, [], [], [], false, "", []), new BpPlayerGameInfoFactory()],
        [GameTypes.RR, new RrPlayerGameInfo(0, new Date(), new Date(), 0, 0, 0, "", []), new RrPlayerGameInfoFactory()],
        [GameTypes.SP, new SpPlayerGameInfo(0, new Date(), new Date(), 0, 0, 0, 0, 0, 0, false, false, false, "", []), new SpPlayerGameInfoFactory()],
        [GameTypes.DR, new DrPlayerGameInfo(0, new Date(), new Date(), 0, 0, 0, 0, 0, 0, 0, 0, "", 0, 0, 0, 0, 0, 0, 0, false, false, [], []), new DrPlayerGameInfoFactory()],
        [GameTypes.SKY, new SkyPlayerGameInfo(0, new Date(), new Date(), 0, 0, 0, 0, 0, 0, [], "", []), new SkyPlayerGameInfoFactory()],
        [GameTypes.MIMV, new MimvPlayerGameInfo(0, new Date(), new Date(), 0, 0, 0, 0, 0, 0, [], ""), new MimvPlayerGameInfoFactory()],
        [GameTypes.HB, new HbPlayerGameInfo(0, new Date(), 0, 0, 0, 0, 0, "", []), new HbPlayerGameInfoFactory()],
        [GameTypes.HERO, new HeroPlayerGameInfo(0, new Date(), new Date(), 0, 0, 0, 0, 0, 0, 0, 0, 0, []), new HeroPlayerGameInfoFactory()]
    ]);

    describe("factory has everything", () => {
        tests.forEach(([type, cls, factory]) => {
            it((type as GameType).id, () => {
                expect(getMethods(factory).sort()).to.include.members(Object.getOwnPropertyNames(cls).sort());
            });
        });
    });

    describe("instance has everything", () => {
        tests.forEach(([type, cls, factory]) => {
            it((type as GameType).id, () => {
                expect(Object.getOwnPropertyNames(cls).concat(["create", "fromResponse"]).sort()).to.include.members(
                    getMethods(factory).sort()
                );
            });
        });
    });

    describe("is registered in Factory->playerGameInfoFactoryForGametype()", () => {
        tests.forEach(([type, cls, factory]) => {
            it((type as GameType).id, () => {
                expect(factory).to.be.instanceof(
                    playerGameInfoFactoryForGametype((type as GameType))
                );
            });
        });
    });
});
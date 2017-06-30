import { expect } from 'chai';
import 'mocha';
import {BpPlayerGameInfo, BpPlayerGameInfoFactory, SgPlayerGameInfo, SgPlayerGameInfoFactory, TimvPlayerGameInfo, TimvPlayerGameInfoFactory, BedPlayerGameInfo, BedPlayerGameInfoFactory} from "../lib/main";
import {getMethods} from "./utils";
import {HeroPlayerGameInfo, HeroPlayerGameInfoFactory} from "../lib/PlayerGameInfo/HeroPlayerGameInfo";

describe("Game Info Factories", () => {
    let tests = new Set([
        [new SgPlayerGameInfo(0, new Date(), new Date(), 0, 0, 0, 0, 0, 0, 0, 0, true, true, [], null, [], [], false, new Date(), [], []), new SgPlayerGameInfoFactory()],
        [new BedPlayerGameInfo(0, new Date(), new Date(), 0,0,0,0,0,0,[]), new BedPlayerGameInfoFactory()],
        [new TimvPlayerGameInfo(0, new Date(), 0,0,0,0,0,null,[],null,[],false, [], ""), new TimvPlayerGameInfoFactory()],
        [new BpPlayerGameInfo(0, new Date(), 0,0, null, null, null,null, 0,0,[],[],[], false, "", []), new BpPlayerGameInfoFactory()],
        [new HeroPlayerGameInfo(0, new Date(), new Date(), 0, 0, 0, 0, 0, 0, 0, 0, 0, []), new HeroPlayerGameInfoFactory()]
    ]);

    describe("factory has everything", () => {
        tests.forEach(([cls, factory]) => {
            it(`same for ${cls.constructor.name} and ${factory.constructor.name}`, () => {
                expect(getMethods(factory).sort()).to.include.members(Object.getOwnPropertyNames(cls).sort());
            });
        });
    });

    describe("instance has everything", () => {
        tests.forEach(([cls, factory]) => {
            it(`same for ${cls.constructor.name} and ${factory.constructor.name}`, () => {
                expect(Object.getOwnPropertyNames(cls).concat(["create", "fromResponse"]).sort()).to.include.members(
                    getMethods(factory).sort()
                );
            });
        });
    });
});
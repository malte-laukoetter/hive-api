import { expect } from 'chai';
import 'mocha';
import {PlayerInfo, PlayerInfoFactory} from "../lib/PlayerInfo";
import {ServerAchievement} from "../lib/Achievement";

describe("PlayerInfoFactory", () => {
    describe("#fromResponse()", () => {
        let response = {"username":"Malte662","rankName":"Regular Hive Member","tokens":61782,"credits":0,"medals":22,"crates":1,"UUID":"ebdf264aabda45708f61f2d7a2bb4758","status":{"description":"Currently hibernating in","game":"the Land of Nods!"},"cached":1498288736,"firstLogin":1385846011,"lastLogin":1385846011,"lastLogout":1498250997,"achievements":{"PLAY168":{"progress":1,"unlockedAt":1491750600}},"trophies":[{"game":"Global","achievement":"JOIN1"},{"game":"BED","achievement":"MASTER"}]};

        it("the created PlayerInfo should have the same data as the response", () => {
            expect(new PlayerInfoFactory().fromResponse(response).create()).to.eql(
                new PlayerInfo("ebdf264aabda45708f61f2d7a2bb4758", "Malte662", "Regular Hive Member", 61782, 22, 0, 1,{"description":"Currently hibernating in","game":"the Land of Nods!"},new Date(1385846011000), new Date(1385846011000), new Date(1498250997000), [new ServerAchievement("PLAY168", 1, new Date(1491750600000))], [{"game":"Global","achievement":"JOIN1"},{"game":"BED","achievement":"MASTER"}])
            );
        })
    })
});
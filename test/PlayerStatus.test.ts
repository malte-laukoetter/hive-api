import { expect } from 'chai';
import 'mocha';
import { GameTypes, PlayerStatus, NonGameTypeStatus, GameTypeMode } from '../lib/main';

describe("PlayerStatus", () => {
  describe("#fromResponse", () => {
    it("Offline", () => {
      expect(PlayerStatus.fromResponse('OFFLINE').status).to.eql(NonGameTypeStatus.OFFLINE);
      expect(PlayerStatus.fromResponse('OFFLINE').gameTypeMode).to.be.undefined;
    })
    it("HUB", () => {
      expect(PlayerStatus.fromResponse('HUB').status).to.eql(NonGameTypeStatus.HUB);
      expect(PlayerStatus.fromResponse('HUB').gameTypeMode).to.be.undefined;
    
    })
    it("PREMHUB", () => {
      expect(PlayerStatus.fromResponse('PREMHUB').status).to.eql(NonGameTypeStatus.PREMHUB);
      expect(PlayerStatus.fromResponse('PREMHUB').gameTypeMode).to.be.undefined;
    })
    it("BED", () => {
      expect(PlayerStatus.fromResponse('BED').status).to.eql(GameTypes.BED);
      expect(PlayerStatus.fromResponse('BED').gameTypeMode).to.eql(GameTypeMode.SOLO);
    })
    it("BEDT", () => {
      expect(PlayerStatus.fromResponse('BEDT').status).to.eql(GameTypes.BED);
      expect(PlayerStatus.fromResponse('BEDT').gameTypeMode).to.eql(GameTypeMode.TEAMS);
    })
    it("BEDD", () => {
      expect(PlayerStatus.fromResponse('BEDD').status).to.eql(GameTypes.BED);
      expect(PlayerStatus.fromResponse('BEDD').gameTypeMode).to.eql(GameTypeMode.DUO);
    })
    it("SKY", () => {
      expect(PlayerStatus.fromResponse('SKY').status).to.eql(GameTypes.SKY);
      expect(PlayerStatus.fromResponse('SKY').gameTypeMode).to.eql(GameTypeMode.SOLO);
    })
    it("SKYT", () => {
      expect(PlayerStatus.fromResponse('SKYT').status).to.eql(GameTypes.SKY);
      expect(PlayerStatus.fromResponse('SKYT').gameTypeMode).to.eql(GameTypeMode.TEAMS);
    })
    it("SKYD", () => {
      expect(PlayerStatus.fromResponse('SKYD').status).to.eql(GameTypes.SKY);
      expect(PlayerStatus.fromResponse('SKYD').gameTypeMode).to.eql(GameTypeMode.DUO);
    })
    it("MIMV", () => {
      expect(PlayerStatus.fromResponse('MIMV').status).to.eql(GameTypes.MIMV);
      expect(PlayerStatus.fromResponse('MIMV').gameTypeMode).to.be.undefined;
    })
    it("unknown type", () => {
      expect(() => PlayerStatus.fromResponse('sadjajsd')).to.throw()
    })
  })
});
import {
  GameType,
  GameTypes,
  RawPlayerGameInfoFactory,
  TimvPlayerGameInfoFactory,
  SgGameInfoFactory,
  SgnGameInfoFactory,
  MimvGameInfoFactory,
  SkyGameInfoFactory,
  TimvGameInfoFactory,
  DrGameInfoFactory,
  BasicGameInfoFactory,
  BedPlayerGameInfoFactory,
  BpPlayerGameInfoFactory,
  SgPlayerGameInfoFactory,
  DrPlayerGameInfoFactory,
  HeroPlayerGameInfoFactory,
  RrPlayerGameInfoFactory,
  SpPlayerGameInfoFactory,
  SkyPlayerGameInfoFactory,
  MimvPlayerGameInfoFactory,
  HbPlayerGameInfoFactory,
  CaiPlayerGameInfoFactory,
  CrPlayerGameInfoFactory,
  HidePlayerGameInfoFactory,
  OitcPlayerGameInfoFactory,
  LabPlayerGameInfoFactory,
  DrawPlayerGameInfoFactory,
  SplPlayerGameInfoFactory,
  SlapPlayerGameInfoFactory,
  EfPlayerGameInfoFactory,
  MmPlayerGameInfoFactory,
  GravPlayerGameInfoFactory,
  GntPlayerGameInfoFactory,
  GntmPlayerGameInfoFactory,
  PmkPlayerGameInfoFactory,
  SgnPlayerGameInfoFactory,
  BdPlayerGameInfoFactory
} from "./main";

/**
 * an interface for all Factories that creates a instance of T
 */
export interface Factory<T> {
  /**
   * creates the instance of T
   */
  create(): T;
}

/**
 * an interface that extends the [[Factory]] with an method to set its data from a json object
 */
export interface FromResponseFactory<T> extends Factory<T> {
  /**
   * should fill the factory with the data of the given response
   *
   * @param res an object with the data
   */
  fromResponse(res: any): FromResponseFactory<T>;
}

/**
 * gets the [[PlayerGameInfoFactory]] for the given [[GameType]]
 * currently the following games have Factories that parse the data:
 *  * TIMV - [[TimvPlayerGameInfoFactory]]
 *  * BED - [[BedPlayerGameInfoFactory]]
 *  * SG - [[SgPlayerGameInfoFactory]]
 *  * BP - [[BpPlayerGameInfoFactory]]
 *  * DR - [[DrPlayerGameInfoFactory]]
 *  * HERO - [[HeroPlayerGameInfoFactory]]
 *  * RR - [[RrPlayerGameInfoFactory]]
 *  * SP - [[SpPlayerGameInfoFactory]]
 *  * SKY - [[SkyPlayerGameInfoFactory]]
 *  * MIMV - [[MimvPlayerGameInfoFactory]]
 *  * HB - [[HbPlayerGameInfoFactory]]
 *  * CAI - [[CaiPlayerGameInfoFactory]]
 *  * CR - [[CrPlayerGameInfoFactory]]
 *  * HIDE - [[HidePlayerGameInfoFactory]]
 *  * OITC - [[OitcPlayerGameInfoFactory]]
 *  * LAB - [[LabPlayerGameInfoFactory]]
 *  * DRAW - [[DrawPlayerGameInfoFactory]]
 *  * SPL - [[SplPlayerGameInfoFactory]]
 *  * SLAP - [[SlapPlayerGameInfoFactory]]
 *  * EF - [[EfPlayerGameInfoFactory]]
 *  * MM - [[MmPlayerGameInfoFactory]]
 *  * GRAV - [[GravPlayerGameInfoFactory]]
 *  * GNT - [[GntPlayerGameInfoFactory]]
 *  * GNTM - [[GntmPlayerGameInfoFactory]]
 *  * PMK - [[PmkPlayerGameInfoFactory]]
 *  * SGN - [[SgnPlayerGameInfoFactory]]
 *  * BD - [[BdPlayerGameInfoFactory]]
 *
 * all other games just return a [[RawPlayerGameInfoFactory]]
 *
 * @param type the GameType to get the Factory for
 * @return the class for the [[PlayerGameInfoFactory]] of the [[GameType]]
 */
export function playerGameInfoFactoryForGametype(type: GameType) {
  switch (type.id) {
    case GameTypes.TIMV.id:
      return new TimvPlayerGameInfoFactory();
    case GameTypes.BED.id:
    case GameTypes.BEDS.id:
    case GameTypes.BEDD.id:
    case GameTypes.BEDT.id:
    case GameTypes.BEDX.id:
      return new BedPlayerGameInfoFactory();
    case GameTypes.SG.id:
      return new SgPlayerGameInfoFactory();
    case GameTypes.BP.id:
      return new BpPlayerGameInfoFactory();
    case GameTypes.DR.id:
      return new DrPlayerGameInfoFactory();
    case GameTypes.HERO.id:
      return new HeroPlayerGameInfoFactory();
    case GameTypes.RR.id:
      return new RrPlayerGameInfoFactory();
    case GameTypes.SP.id:
      return new SpPlayerGameInfoFactory();
    case GameTypes.SKY.id:
      return new SkyPlayerGameInfoFactory();
    case GameTypes.MIMV.id:
      return new MimvPlayerGameInfoFactory();
    case GameTypes.HB.id:
      return new HbPlayerGameInfoFactory();
    case GameTypes.CAI.id:
      return new CaiPlayerGameInfoFactory();
    case GameTypes.CR.id:
      return new CrPlayerGameInfoFactory();
    case GameTypes.HIDE.id:
      return new HidePlayerGameInfoFactory();
    case GameTypes.OITC.id:
      return new OitcPlayerGameInfoFactory();
    case GameTypes.LAB.id:
      return new LabPlayerGameInfoFactory();
    case GameTypes.DRAW.id:
      return new DrawPlayerGameInfoFactory();
    case GameTypes.SPL.id:
      return new SplPlayerGameInfoFactory();
    case GameTypes.SLAP.id:
      return new SlapPlayerGameInfoFactory();
    case GameTypes.EF.id:
      return new EfPlayerGameInfoFactory();
    case GameTypes.MM.id:
      return new MmPlayerGameInfoFactory();
    case GameTypes.GRAV.id:
      return new GravPlayerGameInfoFactory();
    case GameTypes.GNT.id:
      return new GntPlayerGameInfoFactory();
    case GameTypes.GNTM.id:
      return new GntmPlayerGameInfoFactory();
    case GameTypes.PMK.id:
      return new PmkPlayerGameInfoFactory();
    case GameTypes.SGN.id:
      return new SgnPlayerGameInfoFactory();
    case GameTypes.BD.id:
      return new BdPlayerGameInfoFactory();
    default:
      return new RawPlayerGameInfoFactory().type(type);
  }
}

/**
 * gets the [[GameInfoFactory]] for the given [[GameType]]
 * currently the following games have Factories that parse the data:
 *  * SG - [[SgGameInfoFactory]]
 *  * SGN - [[SgnGameInfoFactory]]
 *  * MIMV - [[MimvGameInfoFactory]]
 *  * DR - [[DrGameInfoFactory]]
 *  * TIMV - [[TimvGameInfoFactory]]
 *  * SKY - [[SkyGameInfoFactory]]
 *
 * all other games just return a [[BasicGameInfoFactory]]
 *
 * @param type the GameType to get the Factory for
 * @return the class for the [[GameInfoFactory]] of the [[GameType]]
 */
export function gameInfoFactoryForGametype(type: GameType) {
  switch (type.id) {
    case GameTypes.SG.id:
      return SgGameInfoFactory;
    case GameTypes.SGN.id:
      return SgnGameInfoFactory;
    case GameTypes.MIMV.id:
      return MimvGameInfoFactory;
    case GameTypes.DR.id:
      return DrGameInfoFactory;
    case GameTypes.TIMV.id:
      return TimvGameInfoFactory;
    case GameTypes.SKY.id:
      return SkyGameInfoFactory;
    default:
      return BasicGameInfoFactory;
  }
}

/**
 * creates an array from a string that has the values slitted by a ,
 */
export function arrayFromListString(str: string): any[] {
  return str.split(",").filter(a => a != "");
}

import { fetch, Methods, Player } from './main';

export class Rank {
  constructor(readonly id: number, readonly name: string, readonly humanName: string, readonly legacyId: number = -1){}

  /**
   * lists the players that have the rank
   * 
   * only works for certain staff ranks and team nectar based on the team nectar website
   */
  listPlayers(maxCacheAge: number = 24 * 60 * 60 * 1000): Promise<Player[]>{
    // we have a (hacky) way for nectar members
    if(this.id === Ranks.NECTAR.id){
      return Rank.listNectarPlayers();
    }

    const legacyIdsOnStaffPage = [5,6,7,8];
    
    if (legacyIdsOnStaffPage.indexOf(this.legacyId) == -1) throw new Error(`The rank ${this.name} (${this.id}) is not supported by the listPlayers function`);

    return fetch(Methods.STAFF_LIST(), maxCacheAge)
      .then(res => res[this.legacyId])
      .then(res => res.map(a => new Player(a)));
  }

  /**
     * get a list of the staff members of the hive
     * @param maxCacheAge maximum age of the cache
     */
  private static listStaffPlayers(legacyId: number, maxCacheAge: number = 24 * 60 * 60 * 1000): Promise<Player[]> {
    return fetch(Methods.STAFF_LIST(), maxCacheAge)
      .then(res => res[legacyId])
      .then(res => res.map(a => new Player(a)));
  }

  /**
    * get a list of the nectar members
    * @param maxCacheAge maximum age of the cache
    */
  private static async listNectarPlayers(maxCacheAge: number = 24 * 60 * 60 * 1000): Promise<Player[]> {
    return fetch(Methods.NECTAR_TEAM(), maxCacheAge, false)
      .then(res => res.match(/([0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12})(?=\?overlay=true)/g))
      .then(uuids =>
        uuids
          .map(uuid => uuid.replace(/-/g, ''))
          .map(uuid => new Player(uuid))
      )
  }
}

export class Ranks {
  static readonly REGULAR        = new Rank(0, "REGULAR",         "Regular", 0);
  static readonly GOLD           = new Rank(10, "GOLD",           "Gold Premium", 1);
  static readonly DIAMOND        = new Rank(20, "DIAMOND",        "Diamond Premium", 2);
  static readonly EMERALD        = new Rank(30, "EMERALD",        "Emerald Premium", 3);
  static readonly ULTIMATE       = new Rank(40, "ULTIMATE",       "Ultimate Premium");
  static readonly VIP            = new Rank(50, "VIP",            "VIP", 4);
  static readonly YOUTUBER       = new Rank(51, "YOUTUBER",       "YouTuber");
  static readonly STREAMER       = new Rank(52, "STREAMER",       "Streamer");
  static readonly CONTRIBUTOR    = new Rank(53, "CONTRIBUTOR",    "Contributor");
  static readonly NECTAR         = new Rank(54, "NECTAR",         "Team Nectar");
  static readonly RESERVED_STAFF = new Rank(60, "RESERVED_STAFF", "Reserved Staff");
  static readonly MODERATOR      = new Rank(70, "MODERATOR",      "Moderator", 5);
  static readonly SRMODERATOR    = new Rank(80, "SRMODERATOR",    "Senior Moderator", 6);
  static readonly STAFFMANAGER   = new Rank(81, "STAFFMANAGER",   "Staff Manager");
  static readonly DEVELOPER      = new Rank(90, "DEVELOPER",      "Developer", 7);
  static readonly OWNER          = new Rank(100, "OWNER",         "Owner", 8);

  private static _list: Rank[] = [
    Ranks.REGULAR, Ranks.GOLD, Ranks.DIAMOND, Ranks.EMERALD, Ranks.ULTIMATE, Ranks.VIP, Ranks.YOUTUBER, Ranks.STREAMER,
    Ranks.CONTRIBUTOR, Ranks.NECTAR, Ranks.RESERVED_STAFF, Ranks.MODERATOR, Ranks.SRMODERATOR, Ranks.STAFFMANAGER, 
    Ranks.DEVELOPER, Ranks.OWNER
  ]

  static async update() {
    return fetch(Methods.RANKS)
      .then(res =>
        this._list = Object.entries(res)
          .map(([id, { enum: name, human: humanName }]) => new Rank(
            parseInt(id),
            name,
            humanName,
            Ranks[name] ? Ranks[name].legacyId : -1 // copy the legacy id if it is in the provided data
          ))
      );
  }

  static get(id: number | string){
    if(typeof id === "number"){
      return Ranks.list.filter(r => r.id == id)[0]
    }else {
      return Ranks.list.filter(r => r.name == id)[0]
    }
  }

  /**
   * a list of all available [[Rank]]s
   */
  static get list(): Rank[] {
    return Ranks._list;
  }
}
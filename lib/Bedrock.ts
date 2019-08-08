import { fetch } from './CacheFetch';

export namespace Bedrock {
  export enum GameType {
    MURDER_MYSTERY = 'murder',
    DEATH_RUN = 'dr',
    TREASURE_WARS = 'wars',
    SURVIVAL_GAMES = 'sg'
  }

  export enum Month {
    JANUARY = 0,
    FEBRUARY,
    MARCH,
    APRIL,
    MAY,
    JUNE,
    JULY,
    AUGUST,
    SEPTEMBER,
    OCTOBER,
    NOVEMBER,
    DECEMBER
  }

  export type LeaderboardEntry = {
    index: number
    human_index: number
    username: string
    UUID: string
    xp: number
    played: number
    victories: number
    uncapped_xp: number
  }

  export type TreasureWarsLeaderboardEntry = LeaderboardEntry & {
    final_kills: number
    kills: number
    treasure_destroyed: number
    deaths: number
  }

  export type DeathRunLeaderboardEntry = LeaderboardEntry & {
    deaths: number
    checkpoints: number
    activated: number
    kills: number
  }

  export type MurderMysteryLeaderboardEntry = LeaderboardEntry & {
    deaths: number
    coins: number
    murders: number
    murderer_eliminations: number
  }

  export type SurvivalGamesLeaderboardEntry = LeaderboardEntry & {
    crates: number,
    deathmatches: number,
    cows: number,
    kills: number
  }

  export type Uuid = string
  export type Name = string
  export type Player = Name | Uuid

  export class Methods {
    static BASE_URL = () => `https://api.playhive.com/v0`
    static MONTHLY_LEADERBOARD(game: GameType): string
    static MONTHLY_LEADERBOARD(game: GameType, year: number, month: Month): string
    static MONTHLY_LEADERBOARD(game: GameType, year?: number, month?: Month) {
      if (month != null) {
        return `${Methods.BASE_URL()}/game/monthly/${game}/${year}/{month}`
      }

      return `${Methods.BASE_URL()}/game/monthly/${game}`
    }

    static PLAYER_MONTHLY = (game: GameType, player: Player) => `${Methods.BASE_URL()}/game/monthly/player/${game}/${player}`
  }

  export function monthlyLeaderboard(game: GameType.TREASURE_WARS): Promise<TreasureWarsLeaderboardEntry[]>
  export function monthlyLeaderboard(game: GameType.TREASURE_WARS, year: number, month: Month, maxCacheAge?: number): Promise<TreasureWarsLeaderboardEntry[]>
  export function monthlyLeaderboard(game: GameType.MURDER_MYSTERY): Promise<MurderMysteryLeaderboardEntry[]>
  export function monthlyLeaderboard(game: GameType.MURDER_MYSTERY, year: number, month: Month, maxCacheAge?: number): Promise<MurderMysteryLeaderboardEntry[]>
  export function monthlyLeaderboard(game: GameType.DEATH_RUN): Promise<DeathRunLeaderboardEntry[]>
  export function monthlyLeaderboard(game: GameType.DEATH_RUN, year: number, month: Month, maxCacheAge?: number): Promise<DeathRunLeaderboardEntry[]>
  export function monthlyLeaderboard(game: GameType.SURVIVAL_GAMES): Promise<SurvivalGamesLeaderboardEntry[]>
  export function monthlyLeaderboard(game: GameType.SURVIVAL_GAMES, year: number, month: Month, maxCacheAge?: number): Promise<SurvivalGamesLeaderboardEntry[]>
  export async function monthlyLeaderboard(game: GameType, year: number = 60 * 60 * 1000, month: Month = null, maxCacheAge: number = 60 * 60 * 1000): Promise<LeaderboardEntry[]> {
    return fetch(Methods.MONTHLY_LEADERBOARD(game, year, month), maxCacheAge);
  }

  export function playerMonthly(game: GameType.TREASURE_WARS, player: Player, maxCacheAge?: number): Promise<TreasureWarsLeaderboardEntry>
  export function playerMonthly(game: GameType.MURDER_MYSTERY, player: Player, maxCacheAge?: number): Promise<MurderMysteryLeaderboardEntry>
  export function playerMonthly(game: GameType.DEATH_RUN, player: Player, maxCacheAge?: number): Promise<DeathRunLeaderboardEntry>
  export function playerMonthly(game: GameType.SURVIVAL_GAMES, player: Player, maxCacheAge?: number): Promise<SurvivalGamesLeaderboardEntry>
  export async function playerMonthly(game: GameType, player: Player, maxCacheAge: number = 60 * 60 * 1000): Promise<LeaderboardEntry> {
    return fetch(Methods.PLAYER_MONTHLY(game, player), maxCacheAge);
  }
}

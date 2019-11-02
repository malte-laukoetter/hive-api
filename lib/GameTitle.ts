import { GameType } from "./main";

export class GameTitle {
  readonly topRank: boolean = false;

  constructor(
    readonly gameType: GameType,
    readonly id: string,
    readonly requiredPoints: number,
    readonly mcFormatName: string,
    readonly name: string,
    readonly group?: string
  ) {
    if (requiredPoints < 0) {
      this.topRank = true;
    }
  }

  /**
   * returns the previous title
   */
  async prev(maxCacheAge: number = 24 * 60 * 60 * 1000): Promise<GameTitle> {
    if (this.topRank) return;

    let titles = await this.gameType.titles(maxCacheAge);

    titles = titles.filter(
      title => title.requiredPoints < this.requiredPoints && !title.topRank
    );

    return titles[titles.length - 1] || undefined;
  }

  /**
   * returns the next title
   */
  async next(maxCacheAge: number = 24 * 60 * 60 * 1000): Promise<GameTitle> {
    if (this.topRank) return;

    let titles = await this.gameType.titles(maxCacheAge);

    titles = titles.filter(
      title => title.requiredPoints > this.requiredPoints && !title.topRank
    );

    return titles[0] || undefined;
  }
}

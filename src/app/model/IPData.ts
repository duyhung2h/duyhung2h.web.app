export class IPData {
  private _IP: string;
  private _LikedArticles: number[] = [];

  constructor(IP: string, LikedArticles: number[]) {
    this._IP = IP;
    this._LikedArticles = LikedArticles;
  }

  /**
   * Getter IP
   * @return {string}
   */
  public get IP(): string {
    return this._IP;
  }

  /**
   * Getter LikedArticles
   * @return {number[]}
   */
  public get LikedArticles(): number[] {
    return this._LikedArticles;
  }

  /**
   * Setter IP
   * @param {string} value
   */
  public set IP(value: string) {
    this._IP = value;
  }

  /**
   * Setter LikedArticles
   * @param {number[]} value
   */
  public set LikedArticles(value: number[]) {
    this._LikedArticles = value;
  }
}

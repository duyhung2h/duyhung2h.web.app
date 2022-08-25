export class IPData {
  private _Id: string;
  private _IP: string;
  private _LikedArticles: number[] = [];


	constructor(Id: string, IP: string, LikedArticles: number[] ) {
		this._Id = Id;
		this._IP = IP;
		this._LikedArticles = LikedArticles;
	}

    /**
     * Getter Id
     * @return {string}
     */
	public get Id(): string {
		return this._Id;
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
     * @return {number[] }
     */
	public get LikedArticles(): number[]  {
		return this._LikedArticles;
	}

    /**
     * Setter Id
     * @param {string} value
     */
	public set Id(value: string) {
		this._Id = value;
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
     * @param {number[] } value
     */
	public set LikedArticles(value: number[] ) {
		this._LikedArticles = value;
	}
  
}

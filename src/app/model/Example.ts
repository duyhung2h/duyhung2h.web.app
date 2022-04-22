export class Example{
    private _exampleId: string;
    private _exampleTitle: string;
    private _exampleShortDesc: string;
    private _exampleLikeCount: number;


	constructor(exampleId: string, exampleTitle: string, exampleShortDesc: string, exampleLikeCount: number) {
		this._exampleId = exampleId;
		this._exampleTitle = exampleTitle;
		this._exampleShortDesc = exampleShortDesc;
		this._exampleLikeCount = exampleLikeCount;
	}

    /**
     * Getter exampleId
     * @return {string}
     */
	public get exampleId(): string {
		return this._exampleId;
	}

    /**
     * Getter exampleTitle
     * @return {string}
     */
	public get exampleTitle(): string {
		return this._exampleTitle;
	}

    /**
     * Getter exampleShortDesc
     * @return {string}
     */
	public get exampleShortDesc(): string {
		return this._exampleShortDesc;
	}

    /**
     * Getter exampleLikeCount
     * @return {number}
     */
	public get exampleLikeCount(): number {
		return this._exampleLikeCount;
	}

    /**
     * Setter exampleId
     * @param {string} value
     */
	public set exampleId(value: string) {
		this._exampleId = value;
	}

    /**
     * Setter exampleTitle
     * @param {string} value
     */
	public set exampleTitle(value: string) {
		this._exampleTitle = value;
	}

    /**
     * Setter exampleShortDesc
     * @param {string} value
     */
	public set exampleShortDesc(value: string) {
		this._exampleShortDesc = value;
	}

    /**
     * Setter exampleLikeCount
     * @param {number} value
     */
	public set exampleLikeCount(value: number) {
		this._exampleLikeCount = value;
	}

}
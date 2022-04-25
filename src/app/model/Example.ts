export class Example{
    private _exampleId: string | undefined;
    private _exampleTitle: string;
    private _exampleShortDesc: string;
    private _exampleDesc: string;
    private _exampleImageLink: string;
    private _exampleLikeCount: number;


	constructor(exampleTitle: string, exampleShortDesc: string, exampleDesc: string, exampleImageLink: string, exampleLikeCount: number, exampleId?: string) {
		this._exampleId = exampleId;
		this._exampleTitle = exampleTitle;
		this._exampleShortDesc = exampleShortDesc;
		this._exampleDesc = exampleDesc;
		this._exampleImageLink = exampleImageLink;
		this._exampleLikeCount = exampleLikeCount;
	}

    /**
     * Getter exampleId
     * @return {string }
     */
	public get exampleId(): string | undefined {
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
     * Getter exampleDesc
     * @return {string}
     */
	public get exampleDesc(): string {
		return this._exampleDesc;
	}

    /**
     * Getter exampleImageLink
     * @return {string}
     */
	public get exampleImageLink(): string {
		return this._exampleImageLink;
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
     * @param {string } value
     */
	public set exampleId(value: string | undefined ) {
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
     * Setter exampleDesc
     * @param {string} value
     */
	public set exampleDesc(value: string) {
		this._exampleDesc = value;
	}

    /**
     * Setter exampleImageLink
     * @param {string} value
     */
	public set exampleImageLink(value: string) {
		this._exampleImageLink = value;
	}

    /**
     * Setter exampleLikeCount
     * @param {number} value
     */
	public set exampleLikeCount(value: number) {
		this._exampleLikeCount = value;
	}

}
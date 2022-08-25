export class Article{
    private _coreId: string;
    private _articleId: string | undefined;
    private _articleTitle: string;
    private _articleShortDesc: string;
    private _articleDesc: string;
    private _articleImageLink: string;
    private _articleLikeCount: number;
    private _articleTag: string[];


	constructor(articleTitle: string, articleShortDesc: string, articleDesc: string, articleImageLink: string, articleLikeCount: number, articleTag: string[], coreId: string, articleId?: string) {
		this._coreId = coreId;
		this._articleId = articleId;
		this._articleTitle = articleTitle;
		this._articleShortDesc = articleShortDesc;
		this._articleDesc = articleDesc;
		this._articleImageLink = articleImageLink;
		this._articleLikeCount = articleLikeCount;
		this._articleTag = articleTag;
	}


    /**
     * Getter coreId
     * @return {string}
     */
	public get coreId(): string {
		return this._coreId;
	}

    /**
     * Setter coreId
     * @param {string} value
     */
	public set coreId(value: string) {
		this._coreId = value;
	}


    /**
     * Getter exampleId
     * @return {string }
     */
	public get articleId(): string | undefined  {
		return this._articleId;
	}

    /**
     * Getter articleTitle
     * @return {string}
     */
	public get articleTitle(): string {
		return this._articleTitle;
	}

    /**
     * Getter exampleShortDesc
     * @return {string}
     */
	public get articleShortDesc(): string {
		return this._articleShortDesc;
	}

    /**
     * Getter exampleDesc
     * @return {string}
     */
	public get articleDesc(): string {
		return this._articleDesc;
	}

    /**
     * Getter exampleImageLink
     * @return {string}
     */
	public get articleImageLink(): string {
		return this._articleImageLink;
	}

    /**
     * Getter articleLikeCount
     * @return {number}
     */
	public get articleLikeCount(): number {
		return this._articleLikeCount;
	}

    /**
     * Getter exampleTag
     * @return {string[]}
     */
	public get articleTag(): string[]{
		return this._articleTag;
	}

    /**
     * Setter exampleId
     * @param {string } value
     */
	public set articleId(value: string | undefined ) {
		this._articleId = value;
	}

    /**
     * Setter articleTitle
     * @param {string} value
     */
	public set articleTitle(value: string) {
		this._articleTitle = value;
	}

    /**
     * Setter exampleShortDesc
     * @param {string} value
     */
	public set articleShortDesc(value: string) {
		this._articleShortDesc = value;
	}

    /**
     * Setter exampleDesc
     * @param {string} value
     */
	public set articleDesc(value: string) {
		this._articleDesc = value;
	}

    /**
     * Setter exampleImageLink
     * @param {string} value
     */
	public set articleImageLink(value: string) {
		this._articleImageLink = value;
	}

    /**
     * Setter articleLikeCount
     * @param {number} value
     */
	public set articleLikeCount(value: number) {
		this._articleLikeCount = value;
	}

    /**
     * Setter exampleTag
     * @param {string[]} value
     */
	public set articleTag(value: string[]) {
		this._articleTag = value;
	}


}
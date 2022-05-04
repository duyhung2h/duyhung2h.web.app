export class Info{
    private _title: string;
    private _shortDesc: string;
    private _subText: string;
    private _iconPath: string;
    private _link: string;


	constructor(title: string, shortDesc: string, subText: string, iconPath: string, link: string) {
		this._title = title;
		this._shortDesc = shortDesc;
		this._subText = subText;
		this._iconPath = iconPath;
		this._link = link;
	}

    /**
     * Getter title
     * @return {string}
     */
	public get title(): string {
		return this._title;
	}

    /**
     * Getter shortDesc
     * @return {string}
     */
	public get shortDesc(): string {
		return this._shortDesc;
	}

    /**
     * Getter subText
     * @return {string}
     */
	public get subText(): string {
		return this._subText;
	}

    /**
     * Getter iconPath
     * @return {string}
     */
	public get iconPath(): string {
		return this._iconPath;
	}

    /**
     * Getter link
     * @return {string}
     */
	public get link(): string {
		return this._link;
	}

    /**
     * Setter title
     * @param {string} value
     */
	public set title(value: string) {
		this._title = value;
	}

    /**
     * Setter shortDesc
     * @param {string} value
     */
	public set shortDesc(value: string) {
		this._shortDesc = value;
	}

    /**
     * Setter subText
     * @param {string} value
     */
	public set subText(value: string) {
		this._subText = value;
	}

    /**
     * Setter iconPath
     * @param {string} value
     */
	public set iconPath(value: string) {
		this._iconPath = value;
	}

    /**
     * Setter link
     * @param {string} value
     */
	public set link(value: string) {
		this._link = value;
	}

}
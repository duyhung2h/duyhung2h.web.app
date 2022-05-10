export class User{
    private _userId: number;
    private _username: string;
    private _password: string;
    private _token: string;


	constructor(userId: number, username: string, password: string, token: string) {
		this._userId = userId;
		this._username = username;
		this._password = password;
		this._token = token;
	}

    /**
     * Getter userId
     * @return {number}
     */
	public get userId(): number {
		return this._userId;
	}

    /**
     * Getter username
     * @return {string}
     */
	public get username(): string {
		return this._username;
	}

    /**
     * Getter password
     * @return {string}
     */
	public get password(): string {
		return this._password;
	}

    /**
     * Getter token
     * @return {string}
     */
	public get token(): string {
		return this._token;
	}

    /**
     * Setter userId
     * @param {number} value
     */
	public set userId(value: number) {
		this._userId = value;
	}

    /**
     * Setter username
     * @param {string} value
     */
	public set username(value: string) {
		this._username = value;
	}

    /**
     * Setter password
     * @param {string} value
     */
	public set password(value: string) {
		this._password = value;
	}

    /**
     * Setter token
     * @param {string} value
     */
	public set token(value: string) {
		this._token = value;
	}
    
    
}
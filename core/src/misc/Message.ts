export enum STATUS {
    OK,
    FAIL,
}
export class Message 
{
    private _status: STATUS;
    private _message: string;
    constructor(_status: STATUS, _message: string) 
    {
        this._status = _status;
        this._message = _message;
    }

    public get message(): string 
    {
        return this._message;
    }
    public set message(v: string) 
    {
        this._message = v;
    }

    public get status(): STATUS 
    {
        return this._status;
    }

    public set status(v: STATUS) 
    {
        this._status = v;
    }
}

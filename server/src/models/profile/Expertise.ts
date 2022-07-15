export class Expertise
{
    private _name: string;
    private _count: number;

    constructor(_name: string, _count: number)
    {
        this._name = _name;
        this._count = _count;
    }

    public get name(): string
    {
        return this._name;
    }

    public set name(_newName: string)
    {
        this._name = _newName;
    }

    public get count(): number
    {
        return this._count;
    }

    public set count(_newCount: number)
    {
        this._count = _newCount;
    }
}
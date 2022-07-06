export class ArticleCoAuthor {
    private _id: string;
    private _name: string;

    public get id(): string {
        return this._id;
    }

    public set id(_id: string) {
        this._id = _id;
    }

    public get name(): string {
        return this._name;
    }

    public set name(_name: string) {
        this._name = _name;
    }
}
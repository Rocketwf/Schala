import { Filter, Filterable } from '../../filters';

export interface Input<T, S extends Filterable<S>> {
    data: S[];
    filter: Filter<T, S>;
    /*
     Represents the input name as string
    */
    inputName: string;

    /*
     Represents the input ID as string
    */
    inputId: string;
    /*
     Represents the input value as the type bound to T
    */
    inputValue: T;

    /*
     Defines a handler for a new input, it changes the current value of the corresponding filter object, and calls applyAllFilters on the data
    */
    handleInput(): void;
}

export class Field<T, S extends Filterable<S>> implements Input<T, S> {
    private _inputName: string;
    private _inputId: string = '@' + Math.random().toString(31);
    private _inputValue: T;
    private _filter: Filter<T, S>;

    private _data: S[];

    constructor(_inputName: string, inputValue: T, _filter: Filter<T, S>, _data: S[]) {
        this._inputName = _inputName;
        this._inputValue = inputValue;
        this._filter = _filter;
        this._data = _data;
    }

    public get data(): S[] {
        return this._data;
    }

    public set data(v: S[]) {
        this._data = v;
    }

    handleInput(): void {
        this._filter.value = this._inputValue;
        for (const entry of this._data) {
            entry.applyAllFilters();
        }
    }

    public get filter(): Filter<T, S> {
        return this._filter;
    }

    public set filter(v: Filter<T, S>) {
        this._filter = v;
    }

    /*
     Getter method of the input name as a string
    */
    public get inputName(): string {
        return this._inputName;
    }

    /*
     Setter method of the input name as a string
    */
    public set inputName(name: string) {
        this._inputName = name;
    }

    /*
     Getter method of the input ID
    */
    public get inputId(): string {
        return this._inputId;
    }

    public set inputId(v: string) {
        this._inputId = v;
    }

    /*
      Getter method of the input value
    */
    public get inputValue(): T {
        return this._inputValue;
    }

    /*
      Setter method of the input value
    */
    public set inputValue(value: T) {
        this._inputValue = value;
    }
}

export class CheckBox<S extends Filterable<S>> implements Input<boolean, S> {
    private _inputName: string;
    private _inputId: string = '@' + Math.random().toString(31);
    private _inputValue: boolean;
    private _filter: Filter<boolean, S>;
    private _data: S[];

    constructor(_inputName: string, _inputId: string, inputValue: boolean, _filter: Filter<boolean, S>) {
        this._inputName = _inputName;
        this._inputId = _inputId;
        this._inputValue = inputValue;
        this._filter = _filter;
    }

    public get data(): S[] {
        return this._data;
    }
    public set data(data: S[]) {
        this._data = data;
    }

    handleInput(): void {
        this._filter.value = this._inputValue;
        for (const entry of this._data) {
            entry.applyAllFilters();
        }
    }
    public get filter(): Filter<boolean, S> {
        return this._filter;
    }

    public set filter(v: Filter<boolean, S>) {
        this._filter = v;
    }

    /*
     Getter method of the input name as a string
    */
    public get inputName(): string {
        return this._inputName;
    }

    /*
     Setter method of the input name as a string
    */
    public set inputName(name: string) {
        this._inputName = name;
    }

    /*
     Getter method of the input ID
    */
    public get inputId(): string {
        return this._inputId;
    }

    public set inputId(v: string) {
        this._inputId = v;
    }

    /*
      Getter method of the input value
    */
    public get inputValue(): boolean {
        return this._inputValue;
    }

    /*
      Setter method of the input value
    */
    public set inputValue(value: boolean) {
        this._inputValue = value;
    }
}

export class SelectOptions<T, S extends Filterable<S>> implements Input<T, S> {
    protected _data: S[];
    protected _filter: Filter<T, S>;
    protected _inputName: string;
    protected _inputId: string = '@' + Math.random().toString(32);
    protected _inputValue: T;

    private _possibeOptions: T[];

    constructor(_inputName: string, _inputValue: T, _possibleOptions: T[], _filter: Filter<T, S>, _data: S[]) {
        this._inputName = _inputName;
        this._inputValue = _inputValue;
        this._possibeOptions = _possibleOptions;
        this._filter = _filter;
        this._data = _data;
    }

    public handleInput(): void {
        this._filter.value = this._inputValue;
        for (const entry of this._data) {
            entry.applyAllFilters();
        }
    }

    public get data(): S[] {
        return this._data;
    }

    public set data(v: S[]) {
        this._data = v;
    }

    public get filter(): Filter<T, S> {
        return this._filter;
    }

    public set filter(v: Filter<T, S>) {
        this._filter = v;
    }

    public get inputName(): string {
        return this._inputName;
    }

    public set inputName(v: string) {
        this._inputName = v;
    }

    public get inputId(): string {
        return this._inputId;
    }

    public set inputId(v: string) {
        this._inputId = v;
    }

    public get inputValue(): T {
        return this._inputValue;
    }
    public set inputValue(inputValue: T) {
        this._inputValue = inputValue;
    }

    public get possibleOptions(): T[] {
        return this._possibeOptions;
    }

    public set possibleOptions(v: T[]) {
        this._possibeOptions = v;
    }
}

import { Filter, Filterable } from '../../filters';

export interface Input<T, S extends Filterable<S>> {
    inputName: string;
    inputId: string;
    inputValue: T;

    handleInput(value: T, filter: Filter<T, S>, data: Filterable<S>[]): void;
}

export class TextField<S extends Filterable<S>> implements Input<string, S> {
    private _inputName: string;
    private _inputId: string;
    private _inputValue: string;

    constructor(_inputName: string, _inputId: string, inputValue: string) {
        this._inputName = _inputName;
        this._inputId = _inputId;
        this._inputValue = inputValue;
    }

    handleInput(value: string, filter: Filter<string, S>, data: Filterable<S>[]): void {
        filter.value = value;
        for (const entry of data) {
            entry.applyAllFilters();
        }
    }

    public get inputName(): string {
        return this._inputName;
    }

    public set inputName(name: string) {
        this._inputName = name;
    }

    public get inputId(): string {
        return this._inputId;
    }

    public get inputValue(): string {
        return this._inputValue;
    }

    public set inputValue(value: string) {
        this._inputValue = value;
    }
}

export class CheckBox<S extends Filterable<S>> implements Input<boolean, S> {
    private _inputName: string;
    private _inputId: string;
    private _inputValue: boolean;

    constructor(_inputName: string, _inputId: string, inputValue: boolean) {
        this._inputName = _inputName;
        this._inputId = _inputId;
        this._inputValue = inputValue;
    }

    handleInput(value: boolean, filter: Filter<boolean, S>, data: Filterable<S>[]): void {
        filter.value = value;
        for (const entry of data) {
            entry.applyAllFilters();
        }
    }

    public get inputName(): string {
        return this._inputName;
    }

    public set inputName(name: string) {
        this._inputName = name;
    }

    public get inputId(): string {
        return this._inputId;
    }

    public get inputValue(): boolean {
        return this._inputValue;
    }

    public set inputValue(value: boolean) {
        this._inputValue = value;
    }
}
export class SelectOption<S extends Filterable<S>> implements Input<boolean, S> {
    private _inputName: string;
    private _inputId: string;
    private _inputValue: boolean;
    private _possibleOptions: string[];

    constructor(_inputName: string, _inputId: string, inputValue: boolean) {
        this._inputName = _inputName;
        this._inputId = _inputId;
        this._inputValue = inputValue;
    }

    handleInput(value: boolean, filter: Filter<boolean, S>, data: Filterable<S>[]): void {
        filter.value = value;
        for (const entry of data) {
            entry.applyAllFilters();
        }
    }

    public get inputName(): string {
        return this._inputName;
    }

    public set inputName(name: string) {
        this._inputName = name;
    }

    public get inputId(): string {
        return this._inputId;
    }

    public get inputValue(): boolean {
        return this._inputValue;
    }

    public set inputValue(value: boolean) {
        this._inputValue = value;
    }

    public get possibleOptions(): string[] {
        return this._possibleOptions;
    }

    public set possibelOptions(newPossibleOptions: string[]) {
        this._possibleOptions = newPossibleOptions;
    }
}

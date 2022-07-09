import { Filter, Filterable } from '../../filters';

export interface Input<T, S extends Filterable<S>> {
    filter: Filter<T | T[], S>;
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
    handleInput(data: Filterable<S>[]): void;
}

export class Field<T, S extends Filterable<S>> implements Input<T, S> {
    private _inputName: string;
    private _inputId: string = '@' + Math.random().toString(31);
    private _inputValue: T;
    private _filter: Filter<T, S>;

    constructor(_inputName: string, inputValue: T, _filter: Filter<T, S>) {
        this._inputName = _inputName;
        this._inputValue = inputValue;
        this._filter = _filter;
    }

    handleInput(data: Filterable<S>[]): void {
        this._filter.value = this._inputValue;
        for (const entry of data) {
            entry.applyAllFilters();
        }
    }

    public get filter(): Filter<T, S> {
        return this._filter;
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

// export class CheckBox<S extends Filterable<S>> implements Input<boolean, S> {
//     private _inputName: string;
//     private _inputId: string;
//     private _inputValue: boolean;
//     private _filter: Filter<boolean, S>;

//     constructor(_inputName: string, _inputId: string, inputValue: boolean, _filter: Filter<boolean, S>) {
//         this._inputName = _inputName;
//         this._inputId = _inputId;
//         this._inputValue = inputValue;
//         this._filter = _filter;
//     }

//     handleInput(value: boolean, data: Filterable<S>[]): void {
//         this._filter.value = !value;
//         for (const entry of data) {
//             entry.applyAllFilters();
//         }
//     }
//     public get filter(): Filter<boolean, S> {
//         return this._filter;
//     }

//     /*
//      Getter method of the input name as a string
//     */
//     public get inputName(): string {
//         return this._inputName;
//     }

//     /*
//      Setter method of the input name as a string
//     */
//     public set inputName(name: string) {
//         this._inputName = name;
//     }

//     /*
//      Getter method of the input ID
//     */
//     public get inputId(): string {
//         return this._inputId;
//     }

//     /*
//       Getter method of the input value
//     */
//     public get inputValue(): boolean {
//         return this._inputValue;
//     }

//     /*
//       Setter method of the input value
//     */
//     public set inputValue(value: boolean) {
//         this._inputValue = value;
//     }

//     // public get filter(): ObjectSeriesFilter<ChartOptionsModel> {
//     //    return this._filter;
//     //}

//     //public set filter(newFilter: ObjectSeriesFilter<ChartOptionsModel>) {
//     //   this._filter = newFilter;
//     //}
// }
// export class SelectOption<S extends Filterable<S>> implements Input<string, S> {
//     private _inputName: string;
//     private _inputId: string;
//     private _inputValue: string;
//     private _possibleOptions: string[];
//     private _filter: Filter<string, S>;

//     constructor(_inputName: string, _inputId: string, inputValue: string, _filter: Filter<string, S>) {
//         this._inputName = _inputName;
//         this._inputId = _inputId;
//         this._inputValue = inputValue;
//         this._filter = _filter;
//     }

//     handleInput(value: string, data: Filterable<S>[]): void {
//         this._filter.value = value;
//         for (const entry of data) {
//             entry.applyAllFilters();
//         }
//     }

//     public get filter(): Filter<string, S> {
//         return this._filter;
//     }
//     /*
//      Getter method of the input name as a string
//     */
//     public get inputName(): string {
//         return this._inputName;
//     }
//     /*
//      Setter method of the input name as a string
//     */
//     public set inputName(name: string) {
//         this._inputName = name;
//     }

//     /*
//      Getter method of the input ID
//     */
//     public get inputId(): string {
//         return this._inputId;
//     }

//     /*
//       Getter method of the input value
//     */
//     public get inputValue(): string {
//         return this._inputValue;
//     }

//     /*
//       Setter method of the input value
//     */
//     public set inputValue(value: string) {
//         this._inputValue = value;
//     }

//     /*
//       Getter method of the possibleOptions array
//     */
//     public get possibleOptions(): string[] {
//         return this._possibleOptions;
//     }

//     /*
//       Setter method of the possibleOptions array
//     */
//     public set possibelOptions(newPossibleOptions: string[]) {
//         this._possibleOptions = newPossibleOptions;
//     }

//     //public get filter(): ObjectSeriesFilter<ArticlesModel> {
//     //    return this._filter;
//     //}

//     //public set filter(newFilter: ObjectSeriesFilter<ArticlesModel>) {
//     //    this._filter = newFilter;
//     //}
// }

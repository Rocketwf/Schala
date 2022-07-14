import { Filter, Filterable } from '../../filters';
import { Message, STATUS } from '../../misc/Message';

export interface Input<T, S extends Filterable<S>> {
    /**
     *Represents the data as the array of type bound to S
     */
    data: S[];
    /**
     *Represents the filter value as a Filter
     */
    filter: Filter<T, S>;
    /**
     *Represents the input name as string
     */
    inputName: string;
    /**
     *Represents the input id as string
     */
    inputId: string;
    /**
     *Represents the input value as the type bound to T
     */
    inputValue: T;

    /**
     *Defines a handler for a new input, it changes the current value of the corresponding filter object, and calls applyAllFilters on the data
     */
    handleInput(): Message[];

    deepCopy(): Input<T, S>;
}

export class Field<T, S extends Filterable<S>> implements Input<T, S> 
{
    /**
     *Represents the input name as string
     */
    private _inputName: string;
    /**
     *Represents the input ID as string
     */
    private _inputId: string = '@' + Math.random().toString(31);
    /**
     *Represents the input value as the type bound to T
     */
    private _previousInputValue: T;
    /**
     *Represents the input value as the type bound to T
     */
    private _inputValue: T;
    /**
     *Represents the filter value as a Filter
     */
    private _filter: Filter<T, S>;
    /**
     *Represents the data as the array of type bound to S
     */
    private _data: S[];

    /**
     * Creates an instance of field.
     * @param _inputName - Represents the input name as string
     * @param inputValue -  Represents the input value as the type bound to T
     * @param _filter - Represents the filter value as a Filter
     * @param _data - Represents the data as the array of type bound to S
     */
    constructor(_inputName: string, inputValue: T, _filter: Filter<T, S>, _data: S[]) 
    {
        this._inputName = _inputName;
        this._inputValue = inputValue;
        this._filter = _filter;
        this._data = _data;
    }

    /**
     * Getter method of data attribute
     */
    public get data(): S[] 
    {
        return this._data;
    }
    /**
     * Setter method of data attribute
     */
    public set data(v: S[]) 
    {
        this._data = v;
    }
    /**
     *Defines a handler for a new input, it changes the current value of the corresponding filter object, and calls applyAllFilters on the data
     */
    handleInput(): Message[] 
    {
        if (this._previousInputValue === this._inputValue) return [new Message(STATUS.OK)];
        this._previousInputValue = this._inputValue;

        this._filter.value = this._inputValue;
        const msgs: Message[] = [];
        for (const entry of this._data) 
        {
            msgs.push(...entry.applyAllFilters());
        }
        for (const msg of msgs) 
        {
            if (msg.status === STATUS.FAIL) 
            {
                this._inputValue = this._filter.value;
            }
        }
        return msgs;
    }
    /**
     * Getter method of filter attribute
     */
    public get filter(): Filter<T, S> 
    {
        return this._filter;
    }
    /**
     * Setter method of filter attribute
     */
    public set filter(v: Filter<T, S>) 
    {
        this._filter = v;
    }

    /**
     * Getter method of inputName attribute
     */
    public get inputName(): string 
    {
        return this._inputName;
    }

    /**
     * Setter method of inputName attribute
     */
    public set inputName(name: string) 
    {
        this._inputName = name;
    }

    /**
     * Getter method of inputId attribute
     */
    public get inputId(): string 
    {
        return this._inputId;
    }
    /**
     * Setter method of inputId attribute
     */
    public set inputId(v: string) 
    {
        this._inputId = v;
    }

    /**
     * Getter method of inputValue attribute
     */
    public get inputValue(): T 
    {
        return this._inputValue;
    }

    /**
     *Setter method of inputValue attribute
     */
    public set inputValue(value: T) 
    {
        this._inputValue = value;
    }

    deepCopy(): Field<T, S> 
    {
        return new Field<T, S>(this._inputName, this._inputValue, this._filter.deepCopy(), this._data);
    }
}

export class CheckBox<S extends Filterable<S>> implements Input<boolean, S> 
{
    /**
     *Represents the input name as string
     */
    private _inputName: string;
    /**
     *Represents the input ID as string
     */
    private _inputId: string = '@' + Math.random().toString(31);
    /**
     *Represents the input value as a boolean
     */
    private _inputValue: boolean;
    /**
     *Represents the filter value as a Filter
     */
    private _filter: Filter<boolean, S>;
    /**
     *Represents the data as the array of type bound to S
     */
    private _data: S[];

    /**
     * Creates an instance of check box.
     * @param _inputName - Represents the input name as string
     * @param _inputId - Represents the input ID as string
     * @param inputValue - Represents the input value as a boolean
     * @param _filter - Represents the filter value as a Filter
     */
    constructor(_inputName: string, inputValue: boolean, _filter: Filter<boolean, S>, _data: S[]) 
    {
        this._inputName = _inputName;
        this._inputValue = inputValue;
        this._filter = _filter;
        this._data = _data;
    }
    /**
     * Getter method of data attribute
     */
    public get data(): S[] 
    {
        return this._data;
    }
    /**
     * Setter method of data attribute
     */
    public set data(data: S[]) 
    {
        this._data = data;
    }
    /**
     *Defines a handler for a new input, it changes the current value of the corresponding filter object, and calls applyAllFilters on the data
     */
    handleInput(): Message[] 
    {
        this._filter.value = this._inputValue;
        for (const entry of this._data) 
        {
            entry.applyAllFilters();
        }
        return null;
    }
    /**
     * Getter method of filter attribute
     */
    public get filter(): Filter<boolean, S> 
    {
        return this._filter;
    }
    /**
     * Setter method of filter attribute
     */
    public set filter(v: Filter<boolean, S>) 
    {
        this._filter = v;
    }

    /**
     * Getter method of inputId attribute
     */
    public get inputName(): string 
    {
        return this._inputName;
    }

    /**
     * Setter method of inputName attribute
     */
    public set inputName(name: string) 
    {
        this._inputName = name;
    }

    /**
     * Getter method of inputId attribute
     */
    public get inputId(): string 
    {
        return this._inputId;
    }
    /**
     * Setter method of inputId attribute
     */
    public set inputId(v: string) 
    {
        this._inputId = v;
    }

    /**
     * Getter method of inputValue attribute
     */
    public get inputValue(): boolean 
    {
        return this._inputValue;
    }

    /**
     * Setter method of inputId attribute
     */
    public set inputValue(value: boolean) 
    {
        this._inputValue = value;
    }
    deepCopy(): CheckBox<S> 
    {
        return new CheckBox<S>(this._inputName, this._inputValue, this._filter.deepCopy(), this._data);
    }
}

export class SelectOptions<T, S extends Filterable<S>> implements Input<T, S> 
{
    /**
     *Represents the data as the array of type bound to S
     */
    protected _data: S[];
    /**
     *Represents the filter value as a Filter
     */
    protected _filter: Filter<T, S>;
    /**
     *Represents the input name as string
     */
    protected _inputName: string;
    /**
     *Represents the input id as string
     */
    protected _inputId: string = '@' + Math.random().toString(32);
    /**
     *Represents the input value as the type bound to T
     */
    protected _inputValue: T;
    /**
     *Represents the possibleOptions as an array of the type bound to T
     */
    private _possibeOptions: T[];

    /**
     * Creates an instance of select options.
     * @param _inputName - Represents the input name as string
     * @param _inputValue - Represents the input value as the type bound to T
     * @param _possibleOptions - Represents the possibleOptions as an array of the type bound to T
     * @param _filter - Represents the filter value as a Filter
     * @param _data - Represents the data as the array of type bound to S
     */
    constructor(_inputName: string, _inputValue: T, _possibleOptions: T[], _filter: Filter<T, S>, _data: S[]) 
    {
        this._inputName = _inputName;
        this._inputValue = _inputValue;
        this._possibeOptions = _possibleOptions;
        this._filter = _filter;
        this._data = _data;
    }
    /**
     *Defines a handler for a new input, it changes the current value of the corresponding filter object, and calls applyAllFilters on the data
     */
    public handleInput(): Message[] 
    {
        this._filter.value = this._inputValue;
        for (const entry of this._data) 
        {
            entry.applyAllFilters();
        }
        return null;
    }
    /**
     * Getter method of data attribute
     */
    public get data(): S[] 
    {
        return this._data;
    }
    /**
     * Setter method of data attribute
     */
    public set data(v: S[]) 
    {
        this._data = v;
    }
    /**
     * Getter method of filter attribute
     */
    public get filter(): Filter<T, S> 
    {
        return this._filter;
    }
    /**
     * Setter method of filter attribute
     */
    public set filter(v: Filter<T, S>) 
    {
        this._filter = v;
    }
    /**
     * Getter method of inputName attribute
     */
    public get inputName(): string 
    {
        return this._inputName;
    }
    /**
     * Setter method of inputName attribute
     */
    public set inputName(v: string) 
    {
        this._inputName = v;
    }
    /**
     * Getter method of inputId attribute
     */
    public get inputId(): string 
    {
        return this._inputId;
    }
    /**
     * Setter method of inputId attribute
     */
    public set inputId(v: string) 
    {
        this._inputId = v;
    }
    /**
     * Getter method of inputValue attribute
     */
    public get inputValue(): T 
    {
        return this._inputValue;
    }
    /**
     * Getter method of inputValue attribute
     */
    public set inputValue(inputValue: T) 
    {
        this._inputValue = inputValue;
    }
    /**
     * Getter method of possibleOptions attribute
     */
    public get possibleOptions(): T[] 
    {
        return this._possibeOptions;
    }
    /**
     * Setter method of possibleOptions attribute
     */
    public set possibleOptions(v: T[]) 
    {
        this._possibeOptions = v;
    }
    deepCopy(): SelectOptions<T, S> 
    {
        return new SelectOptions<T, S>(
            this._inputName,
            this._inputValue,
            this._possibeOptions,
            this._filter.deepCopy(),
            this._data,
        );
    }
}

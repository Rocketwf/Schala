import { Filter } from '../../filters';
import { ObjectSeriesChartModel } from '../../models';
import { Series } from '../../models/objectserieschartmodel/ObjectSeriesChartModel';

export abstract class ObjectSeriesFilter<S> extends Filter<S, ObjectSeriesChartModel> 
{
    /**
     * Applys object series filter on the given model
     * @param model - the given ObjectSeriesChartModel
     */
    abstract apply(model: ObjectSeriesChartModel): void;
}

export class FromFilter extends ObjectSeriesFilter<number> 
{
    /**
     * It checks if the given model is valid
     * @param model - the given ObjectSeriesChartModel
     * @returns true if the given model is valid
     */
    validate(model: ObjectSeriesChartModel): boolean 
    {
        if (!model.series || model.series.length === 0) 
        {
            return false;
        }
        if (this._value > +model.series[model.series.length - 1].name) 
        {
            return false;
        }
        if (this._value < +model.series[0].name) 
        {
            return false;
        }
        return true;
    }
    deepCopy(): FromFilter 
    {
        const copy: FromFilter = new FromFilter(this._value);
        return copy;
    }
    /**
     * Creates an instance of from filter.
     * @param value - value of the filter
     */
    constructor(value: number) 
    {
        super(value);
    }
    /**
     * Applys from filter on the given model
     * @param model - the given ObjectSeriesChartModel
     */
    apply(model: ObjectSeriesChartModel): void 
    {
        const newSeries: Series[] = new Array<Series>();
        for (const series of model.series) 
        {
            if (+series.name >= this._value) 
            {
                newSeries.push(series);
            }
        }
        model.series = newSeries;
    }
}

export class ToFilter extends ObjectSeriesFilter<number> 
{
    /**
     * It checks if the given model is valid
     * @param model - the given ObjectSeriesChartModel
     * @returns true if the given model is valid
     */
    validate(model: ObjectSeriesChartModel): boolean 
    {
        if (!model.series || model.series.length === 0) 
        {
            return false;
        }
        if (this._value > +model.series[model.series.length - 1].name) 
        {
            return false;
        }
        if (this._value < +model.series[0].name) 
        {
            return false;
        }
        return true;
    }
    /**
     * Creates an instance of to filter.
     * @param value - value of the filter
     */
    constructor(value: number) 
    {
        super(value);
    }
    deepCopy(): ToFilter 
    {
        const copy: ToFilter = new ToFilter(this._value);
        return copy;
    }
    /**
     * Applys to filter on the given model
     * @param model - the given ObjectSeriesChartModel
     */
    apply(model: ObjectSeriesChartModel): void 
    {
        const newSeries: Series[] = new Array<Series>();
        for (const series of model.series) 
        {
            if (+series.name <= this.value) 
            {
                newSeries.push(series);
            }
        }
        model.series = newSeries;
    }
}

export class ShowingFilter extends ObjectSeriesFilter<number> 
{
    /**
     * Creates an instance of showing filter.
     * @param value - value of the filter
     */
    constructor(value: number) 
    {
        super(value);
    }

    /**
     * It checks if the given model is valid
     * @param model - the given ObjectSeriesChartModel
     * @returns true if the given model is valid
     */
    validate(model: ObjectSeriesChartModel): boolean 
    {
        // if (!model.isExpanded && this._value >= 50)
        // {
        //     return new Message(STATUS.FAIL, 'Value too large');
        // }
        if (!model.series || model.series.length === 0) 
        {
            return false;
        }
        if (this._value <= 0) 
        {
            return false;
        }
        return true;
    }
    deepCopy(): ShowingFilter 
    {
        const copy: ShowingFilter = new ShowingFilter(this._value);
        return copy;
    }

    /**
     * Applys showing filter on the given filter
     * @param model - the given ObjectSeriesChartModel
     */
    apply(model: ObjectSeriesChartModel): void 
    {
        const newSeries: Series[] = new Array<Series>();
        if (model.series[0].type) 
        {
            let i: number = 0;
            let end: number = 2 * this.value;
            if (end >= model.series.length) 
            {
                end = model.series.length;
            }
            for (i = 0; i < end; ++i) 
            {
                newSeries.push(model.series[i]);
            }
        }
        else 
        {
            let i: number = 0;
            let end: number = this.value;
            if (end >= model.series.length) 
            {
                end = model.series.length;
            }
            for (i = 0; i < end; ++i) 
            {
                newSeries.push(model.series[i]);
            }
        }
        model.series = newSeries;
    }
}

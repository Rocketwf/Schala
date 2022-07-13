import { ChartOptionsModel } from '../../models';
import { Filter } from '../Filter';

export abstract class ChartOptionFilter<S> extends Filter<S, ChartOptionsModel> 
{
    /**
     * Applys chart option filter on the given model
     * @param model - the given ChartOptionsModel
     */
    abstract apply(model: ChartOptionsModel): void;
}

export class ScaleUpFilter extends ChartOptionFilter<boolean> 
{
    deepCopy(): ScaleUpFilter 
    {
        const copy: ScaleUpFilter = new ScaleUpFilter(this._value);
        return copy;
    }
    /**
     * It checks if the given model is valid
     * @param model -The given ChartOptionsModel
     * @returns true if the given model is valid
     */
    validate(model: ChartOptionsModel): boolean 
    {
        model;
        return true;
    }

    /**
     * Applys scale up filter on the given model
     * @param model - the given ChartOptionsModel
     */
    apply(model: ChartOptionsModel): void 
    {
        if (this._value) 
        {
            const limits: number[] = [];
            for (const m of model.objectSeriesChartModels) 
            {
                for (const serie of m.series) 
                {
                    const sum: number = serie.data.reduce((accumulator: number, current: number) => 
                    {
                        return accumulator + current;
                    }, 0);
                    limits.push(sum);
                }
            }
            let max: number = 0;
            for (const val of limits) 
            {
                if (val > max) 
                {
                    max = val;
                }
            }
            model.maxLimit = max;
            return;
        }
        model.maxLimit = 0;
    }
}

export class ScaleUpMixedFilter extends ChartOptionFilter<boolean> 
{
    /**
     * It represents type of ScaleUpMixedFilter
     */
    private _type: TypeName;

    /**
     * Creates an instance of scale up mixed filter.
     * @param state - the state of filter
     * @param type - the type of filter
     */
    constructor(state: boolean, type: TypeName) 
    {
        super(state);
        this._type = type;
    }
    deepCopy(): ScaleUpMixedFilter 
    {
        const copy: ScaleUpMixedFilter = new ScaleUpMixedFilter(this._value, this._type);
        return copy;
    }

    /**
     * It checks if the given model is valid
     * @param model -The given ChartOptionsModel
     * @returns true if the given model is valid
     */
    validate(model: ChartOptionsModel): boolean 
    {
        model;
        return true;
    }

    /**
     * Applys scale up mixed filter on the given model
     * @param model - the given ChartOptionsModel
     */
    apply(model: ChartOptionsModel): void 
    {
        if (this._value) 
        {
            const limits: number[] = [];
            for (const m of model.objectSeriesChartModels) 
            {
                for (const serie of m.series) 
                {
                    if (serie.type === this.type) 
                    {
                        limits.push(serie.data[0]);
                    }
                }
            }
            if (this.type === 'column') 
            {
                let max: number = 0;
                for (const val of limits) 
                {
                    if (val > max) 
                    {
                        max = val;
                    }
                }
                model.maxLimit = max;
            }
            if (this.type === 'line') 
            {
                let max: number = 0;
                for (const val of limits) 
                {
                    if (val > max) 
                    {
                        max = val;
                    }
                }
                model.maxLimitTwo = max;
            }
            return;
        }
        if (this.type === 'column') 
        {
            model.maxLimit = 0;
        }
        if (this.type === 'line') 
        {
            model.maxLimitTwo = 0;
        }
    }

    /**
     * Getter method of the type attribute
     */
    public get type(): TypeName 
    {
        return this._type;
    }
}

export enum TypeName {
    Line = 'line',
    Column = 'column',
}

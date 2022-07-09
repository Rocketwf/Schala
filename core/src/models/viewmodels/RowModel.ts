import { ChartOptionsModel } from '../chartoptionsmodel';
import { PopupEditButton } from '../inputs';
import { CheckBox } from '../inputs/Inputs';
import { ObjectSeriesChartModel } from '../objectserieschartmodel';
import { SimpleCardModel } from '../simplecardmodel';

export class RowModel {
    private _id: string = '_' + Math.random().toString(36);
    private _width: number;
    private _simpleCardModels: Array<SimpleCardModel>;

    private _popupButtons: PopupEditButton<ObjectSeriesChartModel>[];
    private _checkBoxes: CheckBox<ChartOptionsModel>[];

    constructor(_width: number) {
        this._width = _width;
        this._simpleCardModels = new Array<SimpleCardModel>();
    }
    public get id(): string {
        return this._id;
    }
    public get width(): number {
        return this._width;
    }
    public get simpleCardModels(): Array<SimpleCardModel> {
        return this._simpleCardModels;
    }

    public get popupButtons(): PopupEditButton<ObjectSeriesChartModel>[] {
        return this._popupButtons;
    }
    public set popupButtons(popupButtons: PopupEditButton<ObjectSeriesChartModel>[]) {
        this._popupButtons = popupButtons;
    }
    public get checkBoxes(): CheckBox<ChartOptionsModel>[] {
        return this._checkBoxes;
    }
    public set checkBoxes(checkBoxes: CheckBox<ChartOptionsModel>[]) {
        this._checkBoxes = checkBoxes;
    }
}

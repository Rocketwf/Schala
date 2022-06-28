export enum ViewName {
    PieChartCard = 'PieChartCard',
}

export interface SimpleCardModel {
    id: string;
    colWidth: number;
    title: string;
    sub: string;
    viewName: ViewName;
}

export enum ViewName {
    PieChartCard = 'PieChartCard',
    ArticlesCard = 'ArticlesCard',
    StackedColumns100ChartCard = 'StackedColumns100ChartCard',
}

export interface SimpleCardModel {
    id: string;
    colWidth: number;
    title: string;
    sub: string;
    viewName: ViewName;
}

export enum ViewName {
    PieChartCard = 'PieChartCard',
    ArticlesCard = 'ArticlesCard',
    StackedColumns100Chart = 'StackedColumns100Chart',
}

export interface SimpleCardModel {
    id: string;
    colWidth: number;
    title: string;
    sub: string;
    viewName: ViewName;
}

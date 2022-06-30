export enum ViewName {
    PieChartCard = 'PieChartCard',
    ArticlesCard = 'ArticlesCard',
    BasicColumnsChartCard = 'BasicColumnsChartCard',
    DistributedColumnsChartCard = 'DistributedColumnsChartCard',
    LineColumnsMixedChartCard = 'LineColumnsMixedChartCard',
    StackedColumns100ChartCard = 'StackedColumns100ChartCard',
    StackedColumnsChartCard = 'StackedColumnsChartCard',
    ExpertisesCard = 'ExpertisesCard',
}

export interface SimpleCardModel {
    id: string;
    colWidth: number;
    title: string;
    sub: string;
    viewName: ViewName;
}

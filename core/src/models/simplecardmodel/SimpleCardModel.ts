export enum ViewName {
    PieChartCard = 'PieChartCard',
    ArticlesCard = 'ArticlesCard',
}

export interface SimpleCardModel {
    id: string;
    colWidth: number;
    title: string;
    sub: string;
    viewName: ViewName;
}

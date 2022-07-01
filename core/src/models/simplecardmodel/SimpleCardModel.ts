/**
 * Allowed values for view names.
 */
export enum ViewName {
    PieChartCard = 'PieChartCard',
    ArticlesCard = 'ArticlesCard',
    StackedColumns100ChartCard = 'StackedColumns100ChartCard',
}

/**
 * Defines a generic structure for a card.
 */
export interface SimpleCardModel {
    /**
     * Represents the id of the SimpleCardModel as a string.
     */
    id: string;

    /**
     * Represents the colWidth value as a number.
     */
    colWidth: number;

    /**
     * Represents the title value as a string.
     */
    title: string;

    /**
     * Represents the subtitle value as string.
     */
    sub: string;

    /**
     * Enumeration of possible names.
     */
    viewName: ViewName;
}

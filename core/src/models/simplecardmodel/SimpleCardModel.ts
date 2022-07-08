import { PopupEditButton } from '../inputs';

/**
 * Allowed values for view names.
 */
export enum ViewName {
    PieChartCard = 'PieChartCard',
    ArticlesCard = 'ArticlesCard',
    BasicColumnsChartCard = 'BasicColumnsChartCard',
    BasicBarsChartCard = 'BasicBarsChartCard',
    DistributedColumnsChartCard = 'DistributedColumnsChartCard',
    LineColumnsMixedChartCard = 'LineColumnsMixedChartCard',
    StackedColumns100ChartCard = 'StackedColumns100ChartCard',
    StackedColumnsChartCard = 'StackedColumnsChartCard',
    ExpertiseCard = 'ExpertiseCard',
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

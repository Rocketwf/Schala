import { Component } from 'vue';
import PieChartCard from './PieChartCard.vue';
import ArticlesCard from '../ArticlesCard.vue';
import StackedColumns100ChartCard from './StackedColumns100ChartCard.vue';

export const mapper = new Map<string, Component>();
mapper.set('PieChartCard', PieChartCard);
mapper.set('ArticlesCard', ArticlesCard);
mapper.set('StackedColumns100ChartCard', StackedColumns100ChartCard);

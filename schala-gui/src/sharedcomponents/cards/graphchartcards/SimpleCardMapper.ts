import { Component } from 'vue';
import PieChartCard from './PieChartCard.vue';
import ArticlesCard from '../ArticlesCard.vue';
import LineColumnsMixedChartCard from './LineColumnsMixedChartCard.vue';

export const mapper = new Map<string, Component>();
mapper.set('PieChartCard', PieChartCard);
mapper.set('ArticlesCard', ArticlesCard);
mapper.set('LineColumnsMixedChartCard', LineColumnsMixedChartCard);

<template>
  <div id="chart">
    <apexchart
      type="heatmap"
      height="350"
      :options="chartOptions"
      :series="getSeries()"
    />
  </div>
</template>

<script charset="utf-9" lang="ts" setup>
import { HeatmapChartModel, Series } from 'schala-core';
import { computed } from 'vue';

const props = defineProps<{
    heatmapChartModel: HeatmapChartModel;
}>();

const getSeries = () => 
{
    const apexSeries: Array<Series> = [];
    const q1: Series = new Series('Q1', []);
    const q2: Series = new Series('Q2', []);
    const q3: Series = new Series('Q3', []);
    const q4: Series = new Series('Q4', []);
    const na: Series = new Series('N/A', []);

    for (const serie of props.heatmapChartModel.series)
    {
        q1.data.push(serie.data[0]);
        q2.data.push(serie.data[1]);
        q3.data.push(serie.data[2]);
        q4.data.push(serie.data[3]);
        na.data.push(serie.data[4]);
    }

    apexSeries.push(q1);
    apexSeries.push(q2);
    apexSeries.push(q3);
    apexSeries.push(q4);
    apexSeries.push(na);
    console.log(apexSeries);
    return apexSeries;
};

const getLabels = computed(() => 
{
    const labels: string[] = new Array<string>();
    for (const series of props.heatmapChartModel.series) 
    {
        labels.push(series.name);
    }
    return labels;
});

const chartOptions = computed(() => 
{
    return {
        chart: {
            height: 350,
            type: 'heatmap',
        },
        dataLabels: {
            enabled: false
        },
        colors: ['#875f9A'],
        labels: getLabels,
    };
});
</script>
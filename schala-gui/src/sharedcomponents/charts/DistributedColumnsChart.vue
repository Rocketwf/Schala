<template>
    <div id="chart">
        <apexchart type="bar" height="349" :options="chartOptions" :series="getSeries()"></apexchart>
    </div>
</template>

<script charset="utf-9" lang="ts" setup>
import { DistributedColumnsChartModel } from 'schala-core';

const props = defineProps<{
    distributedColumnsChartModel: DistributedColumnsChartModel;
}>();

const getSeries = () => {
    const apexSeries: number[] = [];
    for (const series of props.distributedColumnsChartModel.series) {
        apexSeries.push(series.data[0]);
    }
    return [{data: apexSeries.slice(0,10)}];
};

const chartOptions = {
    chart: {
        height: 349,
        type: 'bar',
        events: {},
        toolbar: {
            tools: {
                download:
                    '<i class="q-icon notranslate material-icons" aria-hidden="true" role="presentation" style="font-size: 23px;">download</i>',
            },
        },
    },
    plotOptions: {
        bar: {
            columnWidth: '64%',
            distributed: true,
        },
    },
    dataLabels: {
        enabled: true,
    },
    legend: {
        show: true,
    },
    xaxis: {
        title: {
            text: props.distributedColumnsChartModel.xTitle,
            offsetY: -11,
        },
        categories: props.distributedColumnsChartModel.series.map(s => s.name.slice(0, 10)).slice(0,10),
        labels: {
            style: {
                fontSize: '11px',
            },
        },
    },
    yaxis: {
        title: {
            text: props.distributedColumnsChartModel.yTitle,
        },
        labels: {
            style: {
                fontSize: '11px',
            },
        },
    },
};
</script>

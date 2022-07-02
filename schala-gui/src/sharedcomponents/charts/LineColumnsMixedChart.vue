<template>
    <div id="chart">
        <apexchart :options="chartOptions" :series="getSeries()"></apexchart>
    </div>
</template>

<script setup charset="utf-8" lang="ts">
import { LineColumnsMixedChartModel, Series } from 'schala-core';

const props = defineProps<{
    lineColumnsMixedChartModel: LineColumnsMixedChartModel;
}>();

/**
 * Converts the series to the form specific to the LineColumnsMixedChart.
 */
const getSeries = () => {
    const columnData: Array<number> = props.lineColumnsMixedChartModel.series
        .filter((s: Series) => s.type === 'column')
        .map((s: Series) => s.data[0]);
    const lineData: Array<number> = props.lineColumnsMixedChartModel.series
        .filter((s: Series) => s.type === 'line')
        .map((s: Series) => s.data[0]);
    const series = [
        {
            name: props.lineColumnsMixedChartModel.labels[0],
            type: 'column',
            data: columnData.splice(0, 10),
        },
        {
            name: props.lineColumnsMixedChartModel.labels[1],
            type: 'line',
            data: lineData.splice(0, 10),
        },
    ];
    return series;
};

/**
 * Getter method for LineColumnsMixedChart labels
 */
const getLabels = () => {
    return props.lineColumnsMixedChartModel.series.filter(s => s.type == 'line')
        .map((s: Series) => s.name).splice(0, 10);
};

/**
 *  Options of the displayed apex-chart
 */
const chartOptions = {
    dataLabels: {
        enabled: true,
        enabledOnSeries: [1],
    },

    chart: {
        height: 350,
        type: 'line',
        toolbar: {
            offsetX: -52,
            offsetY: -52,
            show: true,
            tools: {
                download:
                    '<i class="q-icon notranslate material-icons" aria-hidden="true" role="presentation" style="font-size: 24px;">download</i>',
                zoom: false,
                zoomin: false,
                zoomout: false,
                pan: false,
                reset: false,
                selection: false,
                customIcons: [],
            },
        },
    },
    stroke: {
        width: [0, 4],
    },
    labels: getLabels(),
    xaxis: {
        type: 'category',
        labels: {
            rotate: -45,
        }
    },
    yaxis: [
        {
            title: {
                text: props.lineColumnsMixedChartModel.yTitle,
            },
        },
        {
            opposite: true,
            title: {
                text: props.lineColumnsMixedChartModel.xTitle,
            },
        },
    ],
};
</script>

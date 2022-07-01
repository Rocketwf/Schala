<template>
    <div id="chart">
        <apexchart :options="chartOptions" :series="getSeries()"></apexchart>
    </div>
</template>

<script setup charset="utf-8" lang="ts">
import { LineColumnsMixedChartModel } from 'schala-core';

const props = defineProps<{
    lineColumnsMixedChartModel: LineColumnsMixedChartModel;
}>();

const getSeries = () => {
    return props.lineColumnsMixedChartModel.series;
};

const getLabels = () => {
    return props.lineColumnsMixedChartModel.labels;
};

type ApexOptionsType = { seriesIndex: number; w: { config: { series: Array<number> } } };
const chartOptions = {
    dataLabels: {
        enabled: true,
        enabledOnSeries: [1],
        formatter: function (value: number, opts: ApexOptionsType) {
            return value;
        },
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
    },
    yaxis: [
        {
            title: {
                text: 'Publications',
            },
        },
        {
            opposite: true,
            title: {
                text: 'h-index',
            },
        },
    ],
};
</script>

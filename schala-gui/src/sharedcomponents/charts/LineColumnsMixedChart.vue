<template>
    <div id="chart">
        <apexchart height="350" :options="chartOptions" :series="getSeries()"></apexchart>
    </div>
</template>

<script setup charset="utf-8" lang="ts">
import { LineColumnsMixedChartModel, Series } from 'schala-core';
import { computed } from 'vue';

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
            data: columnData,
        },
        {
            name: props.lineColumnsMixedChartModel.labels[1],
            type: 'line',
            data: lineData,
        },
    ];
    return series;
};

/**
 * Getter method for LineColumnsMixedChart labels
 */
const getLabels = computed(() => {
    return props.lineColumnsMixedChartModel.series.filter(s => s.type == 'line')
        .map((s: Series) => s.name);
});

const getmaxLimitLine = computed(() => {
    if (props.lineColumnsMixedChartModel.chartOptionsModel) {
        return props.lineColumnsMixedChartModel.chartOptionsModel.maxLimitTwo;
    }
    return 0;
});

const getmaxLimitColumn = computed(() => {
    if (props.lineColumnsMixedChartModel.chartOptionsModel) {
        return props.lineColumnsMixedChartModel.chartOptionsModel.maxLimit;
    }
    return 0;
});

/**
 *  Options of the displayed apex-chart
 */
const chartOptions = computed(() => {
    return { chart: {
            dataLabels: {
                enabled: true,
                enabledOnSeries: [1],
            },

            height: 350,
            type: 'line',
            toolbar: {
                offsetX: -30,
                offsetY: -30,
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
        labels: getLabels.value,
        xaxis: {
            type: 'category',
            labels: {
                rotate: -45,
            }
        },
        yaxis: [
            {
                max: getmaxLimitColumn.value !== 0 ? getmaxLimitColumn.value : (max: number) => max,
                title: {
                    text: props.lineColumnsMixedChartModel.yTitle,
                },
            },
            {
                max: getmaxLimitLine.value !== 0 ? getmaxLimitLine.value : (max: number) => max,
                opposite: true,
                title: {
                    text: props.lineColumnsMixedChartModel.xTitle,
                },
            },
        ],
    }
});
</script>

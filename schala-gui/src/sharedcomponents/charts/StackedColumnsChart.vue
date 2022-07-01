<template>
    <div id="chart">
        <apexchart
            v-if="!hasNoCitations()"
            type="bar"
            height="350"
            :options="chartOptions"
            :series="getSeries().slice(0, 10)"
        ></apexchart>
        <div v-else class="text-body1 text-center text-grey q-mb-xl">This author has no citations</div>
    </div>
</template>

<script charset="utf-8" lang="ts" setup>
import { StackedColumnsChartModel, Series } from 'schala-core';
const props = defineProps<{
    stackedColumnsChartModel: StackedColumnsChartModel;
}>();

const hasNoCitations = () => {
    return false;
};
const getSeries = () => {
    const apexSeries: Array<{name: string, data: Array<number>}> = new Array<{name: string, data: Array<number>}>();
    const stackedModel: StackedColumnsChartModel = props.stackedColumnsChartModel;
    console.log(stackedModel);
    for (let i = 0; i < stackedModel.labels.length; ++i) {
        const convertedSeries = new Array<number>();
        for(const series of stackedModel.series) {
          convertedSeries.push(series.data[i]);
        }
        const apexSeriesObj = {name: stackedModel.labels[i], data: convertedSeries};
        apexSeries.push(apexSeriesObj);
    }
    return apexSeries;
};

type ApexOptionsType = { seriesIndex: number; dataPointIndex: number; w: { config: { series: Array<Series> } } };
const chartOptions = {
    dataLabels: {
        enabled: true,
        enabledOnSeries: undefined,
        formatter: function (value: number, { seriesIndex, dataPointIndex, w }: ApexOptionsType) {
            return w.config.series[seriesIndex].data[dataPointIndex] + ' (' + Number(value).toFixed(2) + '%)';
        },
    },
    chart: {
        height: 350,
        stacked: true,
        stackType: '100%',
        toolbar: {
            offsetX: -52,
            offsetY: -52,
            show: true,
            tools: {
                download:
                    '<i class="q-icon notranslate material-icons" aria-hidden="true" role="presentation" style="font-size: 24px;">download</i>',
            },
        },
    },
    responsive: [
        {
            breakpoint: 480,
            options: {
                legend: {
                    position: 'bottom',
                    offsetX: -10,
                    offsetY: 0,
                },
            },
        },
    ],
    xaxis: {
        title: {
            text: props.stackedColumnsChartModel.xTitle,
            offsetY: 0,
        },
        categories: props.stackedColumnsChartModel.series.map(series => series.name).slice(0,10),
        labels: {
            style: {
                fontSize: '12px',
            },
        },
    },
    yaxis: {
        title: {
            text: props.stackedColumnsChartModel.yTitle,
        },
        labels: {
            style: {
                fontSize: '12px',
            },
        },
    },
    fill: {
        opacity: 1,
    },
    legend: {
        position: 'right',
        offsetX: 0,
        offsetY: 50,
    },
};
</script>

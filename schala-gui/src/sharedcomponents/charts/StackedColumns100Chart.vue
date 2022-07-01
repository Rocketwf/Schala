<template>
    <div id="chart">
        <apexchart
            v-if="!hasNoCitations()"
            type="bar"
            :options="chartOptions"
            :series="getSeries()"
        ></apexchart>
        <div v-else class="text-body1 text-center text-grey q-mb-xl">
            These authors have no citations
        </div>
    </div>
</template>
<script setup charset="utf-8" lang="ts">
import { Series, StackedColumns100ChartModel } from 'schala-core';

const props = defineProps<{
    stackedColumns100ChartModel: StackedColumns100ChartModel;
}>();

const hasNoCitations = () => {
  const series: Array<Series> = getSeries();
  return series[0].data.reduce((a, b) => a + b, 0) + series[1].data.reduce((a, b) => a + b, 0) + series[2].data.reduce((a, b) => a + b, 0) === 0;
}

const getSeries = () => {
    return props.stackedColumns100ChartModel.series;
};

type ApexOptionsType = { seriesIndex: number; dataPointIndex: number, w: { config: { series: Array<Series> } } };
const chartOptions = {
    dataLabels: {
        enabled: true,
        enabledOnSeries: undefined,
        formatter: function(value:number, { seriesIndex, dataPointIndex, w }:ApexOptionsType) {
                return w.config.series[seriesIndex].data[dataPointIndex] + ' (' + Number(value).toFixed(2) + '%)'
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
    responsive: [{
        breakpoint: 480,
        options: {
        legend: {
            position: 'bottom',
            offsetX: -10,
            offsetY: 0
            }
        }
    }],

    xaxis: {
        title: {
            text: props.stackedColumns100ChartModel.xTitle,
            offsetY: 0,
        },
        categories: props.stackedColumns100ChartModel.labels,
        labels: {
            style: {
            fontSize: '12px'
            }
        }
    },

    yaxis: {
        title: {
            text: props.stackedColumns100ChartModel.yTitle,
        },
        labels: {
            style: {
                fontSize: '12px'
            }
        }
    },

    fill: {
        opacity: 1
    },

    legend: {
        position: 'right',
        offsetX: 0,
        offsetY: 50
    },
};

</script>

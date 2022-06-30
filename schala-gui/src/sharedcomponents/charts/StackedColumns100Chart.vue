<template>
    <div id="chart">
        <apexchart
            v-if="!hasNoCitations()"
            type="bar"
            :options="chartOptions"
            :series="getSeries()"
        ></apexchart>
        <div v-else class="text-body1 text-grey q-mb-xl">
            These authors have no citations
        </div>
    </div>
</template>
<script setup charset="utf-8" lang="ts">
import { StackedColumns100ChartModel } from 'schala-core';

const props = defineProps<{
    stackedColumns100ChartModel: StackedColumns100ChartModel;
}>();

const hasNoCitations = () => {
  const series: Array<number> = getSeries();
  return series[0] + series[1] + series[2] === 0;
}

const getSeries = () => {
    const apexSeries: Array<number> = new Array<number>();
    for (const serie of props.stackedColumns100ChartModel.series) {
        apexSeries.push(...serie.data);
    }
    return apexSeries;
};

type ApexOptionsType = { seriesIndex: number; w: { config: { series: Array<number> } } };
const chartOptions = {
    dataLabels: {
        enabled: true,
        enabledOnSeries: undefined,
        formatter: function (value: number, opts: ApexOptionsType) {
            return opts.w.config.series[opts.seriesIndex] + ' (' + Number(value).toFixed(2) + '%)';
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

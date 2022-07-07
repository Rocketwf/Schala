<template>
    <div id="chart">
        <apexchart type="bar" height="350" :options="chartOptions" :series="getSeries()"></apexchart>
    </div>
</template>
<script setup charset="utf-8" lang="ts">
import { BasicColumnsChartModel, Series } from 'schala-core';

const props = defineProps<{
    basicColumnsChartModel: BasicColumnsChartModel;
}>();
const getSeries = () => {
    const apexSeries: { name: string, data: number[] }[] = [];
    let apexData: Array<Array<number>> = [];
    for(const series of props.basicColumnsChartModel.series) {
        apexData.push(series.data);
    }
    apexData = apexData[0].map((_, colIndex) => apexData.map(row => row[colIndex]));
    for (let i: number = 0; i < apexData.length; i++) {
        apexSeries.push({ name: props.basicColumnsChartModel.labels[i], data: apexData[i] })
    }
    return apexSeries;
};

//type ApexOptionsType = { seriesIndex: number; dataPointIndex: number, w: { config: { series: Array<Series> } } };
const chartOptions = {
    dataLabels: {
        enabled: true,
        enabledOnSeries: true,
    },
    chart: {
        height: 350,
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
            text: props.basicColumnsChartModel.xTitle,
        },
        categories: props.basicColumnsChartModel.series.map((serie: Series) => serie.name),
        labels: {
            style: {
                fontSize: '12px',
            },
        },
    },

    yaxis: {
        title: {
            text: props.basicColumnsChartModel.yTitle,
        },
        labels: {
            style: {
                fontSize: '12px',
            },
        },
    },
    plotOptions: {
        bar: {
            horizontal: false,
            columnWidth: '55%',
            endingShape: 'rounded',
            tools: {
                download:
                    '<i class="q-icon notranslate material-icons" aria-hidden="true" role="presentation" style="font-size: 24px;">download</i>',
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

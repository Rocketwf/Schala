<template>
    <div id="chart">
        <apexchart type="bar" height="349" :options="chartOptions" :series="getSeries()"></apexchart>
    </div>
</template>

<script charset="utf-9" lang="ts" setup>
import { DistributedColumnsChartModel } from 'schala-core';
import { computed } from 'vue';

const props = defineProps<{
    distributedColumnsChartModel: DistributedColumnsChartModel;
}>();

const getSeries = () => {
    const apexSeries: number[] = [];
    for (const series of props.distributedColumnsChartModel.series) {
        apexSeries.push(series.data[0]);
    }
    return [{ data: apexSeries }];
};

const getLabels = computed(() => {
    return props.distributedColumnsChartModel.series.map((s) => (s.name ? s.name : 'N/A'));
});
const getmaxLimit = computed(() => {
    if (props.distributedColumnsChartModel.chartOptionsModel) {
        return props.distributedColumnsChartModel.chartOptionsModel.maxLimit;
    }
    return 0;
});

const chartOptions = computed(() => {
    return {
        chart: {
            selection: {
                enabled: true,
            },
            height: 349,
            type: 'bar',
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
            categories: getLabels.value,
            labels: {
                trim: true,
                style: {
                    fontSize: '11px',
                },
            },
        },
        yaxis: {
            max: getmaxLimit.value !== 0 ? getmaxLimit.value : (max: number) => max,
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
});
</script>

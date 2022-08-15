<template>
  <div id="chart">
    <apexchart
      v-if="!badDataLength"
      :height="distributedColumnsChartModel.isExpanded ? '800px' : 340"
      type="bar"
      :options="chartOptions"
      :series="getSeries()"
    />
    <div
      v-else
      class="text-body1 text-center text-grey q-mb-xl"
    >
      The data is too large to fit, please use the expand button
    </div>
  </div>
</template>

<script charset="utf-9" lang="ts" setup>
import { DistributedColumnsChartModel } from 'schala-core';
import { computed } from 'vue';

const props = defineProps<{
    distributedColumnsChartModel: DistributedColumnsChartModel;
}>();

const getSeries = () => 
{
    const apexSeries: number[] = [];
    for (const series of props.distributedColumnsChartModel.series) 
    {
        apexSeries.push(series.data[0]);
    }
    return [{
        name: '#', 
        data: apexSeries }];
};

const getLabels = computed(() => 
{
    const labels: string[] = new Array<string>();
    for (const series of props.distributedColumnsChartModel.series) 
    {
        if (series.name) 
        {
            labels.push(series.name);
        }
        else 
        {
            labels.push('N/A');
        }
    }
    return labels;
});
const getmaxLimit = computed(() => 
{
    if (props.distributedColumnsChartModel.chartOptionsModel) 
    {
        return props.distributedColumnsChartModel.chartOptionsModel.maxLimit;
    }
    return 0;
});
const defaultMax = (): ((max: number) => number) => 
{
    return (max: number) => max;
};
const badDataLength = computed(() => 
{
    return (
        props.distributedColumnsChartModel.isShowingExpandButton &&
        !props.distributedColumnsChartModel.isExpanded &&
        getLabels.value.length >= 20
    );
});

const chartOptions = computed(() => 
{
    return {
        chart: {
            selection: {
                enabled: true,
            },
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
            position: 'top',
            onItemHover: {
                highlightDataSeries: true,
            },
        },
        xaxis: {
            title: {
                text: props.distributedColumnsChartModel.xTitle,
                offsetY: -11,
            },
            categories: getLabels.value,
            labels: {
                hideOverlappingLabels: false,
                trim: true,
                rotate: -45,
                style: {
                    fontSize: '12px',
                },
                show: false,
            },
        },
        yaxis: {
            max: getmaxLimit.value !== 0 ? getmaxLimit.value : defaultMax(),
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

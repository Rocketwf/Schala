<template>
  <div id="chart">
    <div
      v-if="noEntries"
      class="text-body1 text-center text-grey q-mb-xl"
    >
      Nothing to be listed
    </div>
    <apexchart
      v-else
      :height="stackedColumnsChartModel.isExpanded ? '800px' : 340"
      type="bar"
      :options="chartOptions"
      :series="getSeries()"
    />
  </div>
</template>

<script charset="utf-8" lang="ts" setup>
import { StackedColumnsChartModel, Series } from 'schala-core';
import { computed } from 'vue';
const props = defineProps<{
    stackedColumnsChartModel: StackedColumnsChartModel;
}>();


const getSeries = () => 
{
    const apexSeries: Array<{ name: string; data: Array<number> }> = new Array<{ name: string; data: Array<number> }>();
    const stackedModel: StackedColumnsChartModel = props.stackedColumnsChartModel;
    for (let i = 0; i < stackedModel.labels.length; ++i) 
    {
        const convertedSeries = new Array<number>();
        for (const series of stackedModel.series) 
        {
            convertedSeries.push(series.data[i]);
        }
        const apexSeriesObj = { name: stackedModel.labels[i], data: convertedSeries };
        apexSeries.push(apexSeriesObj);
    }
    return apexSeries;
};

const noEntries = computed(() => 
{
    let sum = 0;
    const series = getSeries();
    for (const ser of series) 
    {
        sum += ser.data.length;
    }
    return sum === 0;
});
const getLabels = computed(() => 
{
    const labels: string[] = new Array<string>();
    for (const series of props.stackedColumnsChartModel.series) 
    {
        labels.push(series.name);
    }
    return labels;
});

const getmaxLimit = computed(() => 
{
    if (props.stackedColumnsChartModel.chartOptionsModel) 
    {
        return props.stackedColumnsChartModel.chartOptionsModel.maxLimit;
    }
    return 0;
});

const defaultMax = (): ((max: number) => number) => 
{
    return (max: number) => max;
};
type ApexOptionsType = { seriesIndex: number; dataPointIndex: number; w: { config: { series: Array<Series> } } };
const chartOptions = computed(() => 
{
    return {
        chart: {
            dataLabels: {
                enabled: true,
                enabledOnSeries: [4],
                textAnchor: 'left',
                formatter: function (_val: number, opt: ApexOptionsType) 
                {
                    let series = opt.w.config.series;
                    let idx = opt.dataPointIndex;
                    const total = series.reduce((total, self) => total + self.data[idx], 0);
                    return total + 'K';
                },
                style: {
                    colors: ['#000'],
                },
            },
            type: 'bar',
            stacked: true,
            toolbar: {
                show: true,
                tools: {
                    download:
                        '<i class="q-icon notranslate material-icons" aria-hidden="true" role="presentation" style="font-size: 24px;">download</i>',
                },
            },
            zoom: {
                enabled: true,
            },
        },
        plotOptions: {
            bar: {
                horizontal: false,
            },
        },
        xaxis: {
            title: {
                text: props.stackedColumnsChartModel.xTitle,
                offsetY: -10,
            },
            categories: getLabels.value,
            labels: {
                rotate: -45,
                style: {
                    fontSize: '12px',
                },
            },
        },
        yaxis: {
            max: getmaxLimit.value !== 0 ? getmaxLimit.value : defaultMax(),
            title: {
                text: props.stackedColumnsChartModel.yTitle,
            },
            labels: {
                style: {
                    fontSize: '12px',
                },
            },
        },
        legend: {
            position: 'top',
            offsetY: 0,
        },
        fill: {
            opacity: 1,
        },
    };
});
</script>

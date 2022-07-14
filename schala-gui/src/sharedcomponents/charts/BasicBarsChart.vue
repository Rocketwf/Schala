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
      :height="height"
      type="bar"
      :options="chartOptions"
      :series="getSeries()"
    />
  </div>
</template>
<script setup charset="utf-8" lang="ts">
import { BasicBarsChartModel } from 'schala-core';
import { computed } from 'vue';

const props = defineProps<{
    basicBarsChartModel: BasicBarsChartModel;
}>();

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
const getSeries = () => 
{
    const apexSeries: number[] = [];
    for (const cs of props.basicBarsChartModel.series) 
    {
        apexSeries.push(cs.data[0]);
    }
    return [
        {
            data: apexSeries,
        },
    ];
};

const getLabels = computed(() => 
{
    const labels: string[] = new Array<string>();
    for (const series of props.basicBarsChartModel.series) 
    {
        labels.push(series.name);
    }
    return labels;
});
const getmaxLimit = computed(() => 
{
    if (props.basicBarsChartModel.chartOptionsModel) 
    {
        return props.basicBarsChartModel.chartOptionsModel.maxLimit;
    }
    return 0;
});

const height = computed(() => 
{
    if (!props.basicBarsChartModel.isShowingExpandButton) 
    {
        return getLabels.value.length * 40 + 'px';
    }
    if (!props.basicBarsChartModel.isExpanded) 
    {
        return '340px';
    }
    return getLabels.value.length * 20 + 'px';
});

const chartOptions = computed(() => 
{
    return {
        chart: {
            type: 'bar',
            width: '100%',
            toolbar: {
                tools: {
                    download:
                        '<i class="q-icon notranslate material-icons" aria-hidden="true" role="presentation" style="font-size: 24px;">download</i>',
                },
            },
        },
        plotOptions: {
            bar: {
                borderRadius: 4,
                horizontal: true,
                barHeight: '40px',
            },
        },
        dataLabels: {
            enabled: true,
        },
        xaxis: {
            title: {
                text: props.basicBarsChartModel.xTitle,
                offsetY: 0,
            },
            categories: getLabels.value,
            labels: {
                style: {
                    fontSize: '12px',
                },
            },
        },
        yaxis: {
            max: getmaxLimit.value !== 0 ? getmaxLimit.value : (max: number) => max,
            title: {
                text: props.basicBarsChartModel.yTitle,
            },
            labels: {
                style: {
                    fontSize: '12px',
                },
            },
        },
    };
});
</script>

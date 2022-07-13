<template>
  <div id="chart">
    <div
      v-if="noEntries"
      class="text-body1 text-center text-grey q-mb-xl"
    >
      The data is too large to fit, please use the expand button
    </div>
    <div
      v-else-if="badDataLength"
      class="text-body1 text-center text-grey q-mb-xl"
    >
      The data is too large to fit, please use the expand button
    </div>
    <apexchart
      v-else
      :height="lineColumnsMixedChartModel.isExpanded ? '800px' : 340"
      :options="chartOptions"
      :series="getSeries()"
    />
  </div>
</template>

<script setup charset="utf-8" lang="ts">
import { LineColumnsMixedChartModel, Series } from 'schala-core';
import { computed } from 'vue';

const props = defineProps<{
    lineColumnsMixedChartModel: LineColumnsMixedChartModel;
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
/**
 * Converts the series to the form specific to the LineColumnsMixedChart.
 */
const getSeries = () => 
{
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

const badDataLength = computed(() => 
{
    return (
        props.lineColumnsMixedChartModel.isShowingExpandButton &&
        !props.lineColumnsMixedChartModel.isExpanded &&
        getLabels.value.length >= 20
    );
});
/**
 * Getter method for LineColumnsMixedChart labels
 */
const getLabels = computed(() => 
{
    const labels: string[] = new Array<string>();
    for (const series of props.lineColumnsMixedChartModel.series) 
    {
        if (series.type === 'line') 
        {
            labels.push(series.name);
        }
    }
    return labels;
});

const defaultMax = (): ((max: number) => number) => 
{
    return (max: number) => max;
};

const getmaxLimitLine = computed(() => 
{
    if (props.lineColumnsMixedChartModel.chartOptionsModel) 
    {
        return props.lineColumnsMixedChartModel.chartOptionsModel.maxLimitTwo;
    }
    return 0;
});

const getmaxLimitColumn = computed(() => 
{
    if (props.lineColumnsMixedChartModel.chartOptionsModel) 
    {
        return props.lineColumnsMixedChartModel.chartOptionsModel.maxLimit;
    }
    return 0;
});

/**
 *  Options of the displayed apex-chart
 */
const chartOptions = computed(() => 
{
    return {
        chart: {
            dataLabels: {
                enabled: true,
                enabledOnSeries: [1],
            },

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
                position: 'top',
                hideOverlappingLabels: false
            },
        },
        yaxis: [
            {
                max: getmaxLimitColumn.value !== 0 ? getmaxLimitColumn.value : defaultMax(),
                title: {
                    text: props.lineColumnsMixedChartModel.yTitle,
                },
            },
            {
                max: getmaxLimitLine.value !== 0 ? getmaxLimitLine.value : defaultMax(),
                opposite: true,
                title: {
                    text: props.lineColumnsMixedChartModel.xTitle,
                },
            },
        ],
    };
});
</script>

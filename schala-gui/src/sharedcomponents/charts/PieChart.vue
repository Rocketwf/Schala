<template>
  <div id="chart">
    <div
      v-if="noEntries()"
      class="text-body1 text-center text-grey q-mb-xl"
    >
      No data to be listed
    </div>
    <apexchart
      v-else
      type="pie"
      :options="chartOptions"
      :series="getSeries()"
    />
  </div>
</template>
<script setup charset="utf-8" lang="ts">
import { PieChartModel } from 'schala-core';
const props = defineProps<{
    pieChartModel: PieChartModel;
}>();

const noEntries = () => 
{
    const series: Array<number> = getSeries();
    return series[0] + series[1] + series[2] === 0;
};
const getSeries = () => 
{
    const apexSeries: Array<number> = new Array<number>();
    for (const serie of props.pieChartModel.series) 
    {
        for (const data of serie.data) 
        {
            apexSeries.push(data);
        }
    }
    return apexSeries;
};

const getLabels = () => 
{
    const apexLabels: Array<string> = new Array<string>();
    for (const serie of props.pieChartModel.series) 
    {
        apexLabels.push(serie.name);
    }
    return apexLabels;
};

type ApexOptionsType = { seriesIndex: number; w: { config: { series: Array<number> } } };
const chartOptions = {
    dataLabels: {
        enabled: true,
        enabledOnSeries: undefined,
        formatter: function (value: number, opts: ApexOptionsType) 
        {
            return opts.w.config.series[opts.seriesIndex] + ' (' + Number(value).toFixed(2) + '%)';
        },
    },
    chart: {
        width: 380,
        type: 'pie',
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
    labels: getLabels(),

    legend: {
        show: true,
        position: 'bottom',
        fontSize: '13px',
    },
    plotOptions: {
        pie: {
            dataLabels: {
                offset: -20,
            },
        },
    },
};
</script>

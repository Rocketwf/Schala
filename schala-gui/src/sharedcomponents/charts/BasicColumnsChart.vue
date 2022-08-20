<template>
  <div id="chart">
    <apexchart
      v-if="!badDataLength"
      :height="basicColumnsChartModel.isExpanded ? '800px' : 340"
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
<script setup charset="utf-8" lang="ts">
import { BasicColumnsChartModel } from 'schala-core';
import { computed } from 'vue';

const props = defineProps<{
    basicColumnsChartModel: BasicColumnsChartModel;
}>();
const getSeries = () => 
{
    const apexSeries: { name: string; data: number[] }[] = [];
    let apexData: Array<Array<number>> = [];
    for (const series of props.basicColumnsChartModel.series) 
    {
        apexData.push(series.data);
    }
    apexData = apexData[0].map((_, colIndex) => apexData.map((row) => row[colIndex]));
    for (let i: number = 0; i < apexData.length; i++) 
    {
        apexSeries.push({ name: props.basicColumnsChartModel.labels[i], data: apexData[i] });
    }
    return apexSeries;
};
const getLabels = computed(() => 
{
    const labels: string[] = new Array<string>();
    for (const series of props.basicColumnsChartModel.series) 
    {
        labels.push(series.name);
    }
    return labels;
});

const badDataLength = computed(() => 
{
    return (
        props.basicColumnsChartModel.isShowingExpandButton &&
        !props.basicColumnsChartModel.isExpanded &&
        getLabels.value.length >= 20
    );
});

const chartOptions = computed(() => 
{
    return {
        dataLabels: {
            enabled: true,
            enabledOnSeries: true,
        },
        chart: {
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
            categories: getLabels.value,
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
});
</script>

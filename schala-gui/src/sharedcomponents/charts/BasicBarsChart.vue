<template>
    <div id="chart">
      <apexchart type="bar" height="300" :options="chartOptions" :series="getSeries()"></apexchart>
    </div>
</template>
<script setup charset="utf-8" lang="ts">
import { BasicBarsChartModel } from 'schala-core';
import { computed } from 'vue';

const props = defineProps<{
    basicBarsChartModel: BasicBarsChartModel;
}>();

const getSeries = () => {
    const apexSeries: number[] = [];
    for(const cs of props.basicBarsChartModel.series){
      apexSeries.push(cs.data[0]);
    }
    return [{
          data: apexSeries
        }];
};

const getLabels = computed(() => {
    return props.basicBarsChartModel.series.map((s) => s.name);
});
const getmaxLimit = computed(() => {
    if (props.basicBarsChartModel.chartOptionsModel) {
        return props.basicBarsChartModel.chartOptionsModel.maxLimit;
    }
    return 0;
});


const chartOptions = computed(() => {
    return { chart: {
          type: 'bar',
          toolbar: {
            tools: {
              download: '<i class="q-icon notranslate material-icons" aria-hidden="true" role="presentation" style="font-size: 24px;">download</i>',
            },
          }
        },
        plotOptions: {
          bar: {
            borderRadius: 4,
            horizontal: true,
          }
        },
        dataLabels: {
          enabled: true
        },
        xaxis: {
          title: {
            text: props.basicBarsChartModel.xTitle,
            offsetY: 0,
          },
          categories: getLabels.value,
          labels: {
            style: {
              fontSize: '12px'
            }
          }
        },
        yaxis: {
          max: getmaxLimit.value !== 0 ? getmaxLimit.value : (max: number) => max,
          title: {
            text: props.basicBarsChartModel.yTitle,
          },
          labels: {
            style: {
              fontSize: '12px'
            }
          }
        },
      }
  });
</script>
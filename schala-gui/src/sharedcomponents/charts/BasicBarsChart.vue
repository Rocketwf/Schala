<template>
    <div id="chart">
      <apexchart type="bar" height="400" :options="chartOptions" :series="getSeries()"></apexchart>
    </div>
</template>
<script setup charset="utf-8" lang="ts">
import { BasicBarsChartModel } from 'schala-core';
const props = defineProps<{
    basicBarsChartModel: BasicBarsChartModel;
}>();
const getSeries = () => {
    const apexSeries: number[] = [];
    for(const cs of props.basicBarsChartModel.series){
      apexSeries.push(cs.data[0]);
    }
    return [{
          data: apexSeries.slice(0, 10)
        }];
};
const chartOptions = {
      chart: {
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
      categories: props.basicBarsChartModel.series.map(s => s.name).slice(0, 10),
      labels: {
        style: {
          fontSize: '12px'
        }
      }
    },
    yaxis: {
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
</script>
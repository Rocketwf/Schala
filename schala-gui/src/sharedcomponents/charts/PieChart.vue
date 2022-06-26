<template>
    <div id="chart">
        <apexchart type="pie" width="370" :options="chartOptions" :series="series"></apexchart>
    </div>
</template>
<script setup charset="utf-8" lang="ts">
import { ref } from 'vue';

const props = defineProps<{
    passedLabels: Array<string>;
    passedSeries: Array<string>;
}>();

const series = ref(props.passedSeries);
const labels = ref(props.passedLabels);



let chartOptions = {
          dataLabels: {
            enabled: true,
            enabledOnSeries: undefined,
            formatter: function(value:number, { seriesIndex, _, w }:any) {
              return w.config.series[seriesIndex] + ' (' + Number(value).toFixed(2) + '%)'
            }
          },
          chart: {
            width: 380,
            type: 'pie',
            toolbar: {
              offsetX: -52,
              offsetY: -52,
              show: true,
              tools: {
                download: '<i class="q-icon notranslate material-icons" aria-hidden="true" role="presentation" style="font-size: 24px;">download</i>',
              },
            },
          },
          labels: labels.value,
                  
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
           }
         }
        }


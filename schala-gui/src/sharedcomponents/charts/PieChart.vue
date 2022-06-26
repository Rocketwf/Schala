<template>
    <div id="chart">
        <apexchart :passed-labels = "chartOptions.dataLabels" :passsed-series="chartOptions.series"></apexchart>
    </div>
</template>
<script setup charset="utf-8" lang="ts">
import { ref } from 'vue';
import { PieChartModel } from '../../../../core/src/models/simplecardmodel/PieChartModel' // created and updated indexes but doesn't work with import ... from 'schala-core' idk why 
let pieChart: PieChartModel = new PieChartModel();
const props = defineProps<{
    passedLabels: Array<string>;
    passedSeries: Array<string>;
}>();

const series = ref(props.passedSeries);
const labels = ref(props.passedLabels);

let chartOptions = {
          dataLabels: {
          },
          chart: {
            width: pieChart.colWidth,
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
                  
          legend: {
              show: true,
              position: 'bottom',
              fontSize: '13px',
          },
          
          series: {
            series,
          }
        }
</script>

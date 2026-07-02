<template>
  <div class="pr-3">
    <VueApexCharts
      type="candlestick"
      :options="chartOptions"
    />
  </div>
</template>

<script>
import VueApexCharts from "vue-apexcharts";
import Vue from 'vue';
Vue.config.silent = true;

export default {
  name: "CandleChart",
  components: {
    VueApexCharts,
  },
  props: {
    series: {
      type: Array,
      required: true
    },
  },
  data() {
    return {
      chartOptions: {},
      data: null
    };
  },
  mounted() {
    this.data = [{ data: this.series }]
    this.chartOptions = {
      series: [{
        data: this.series
      }],
      chart: {
        type: 'candlestick',
        height: 250
      },
      xaxis: {
        type: 'category',
        labels: {
          show: false,
          formatter: function(val) {
            const date = new Date(val);
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const day = String(date.getDate()).padStart(2, '0');
            return `${month}:${day}`;
          }
        }
      },
      yaxis: {
        labels: {
          formatter: function(val) {
            return parseFloat(val).toFixed(4);
          }
        }
      },
    }
  },
  methods: {

  }
};
</script>
<style scoped>

</style>

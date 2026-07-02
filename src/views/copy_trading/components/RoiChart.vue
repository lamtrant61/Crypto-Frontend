<template>
  <div class="pr-3 w-full flex justify-center">
    <VueApexCharts
      v-if="data"
      type="bar"
      :options="chartOptions"
      :series="data"
      height="200"
      width="500"
    />
  </div>
</template>

<script>
import VueApexCharts from "vue-apexcharts";
import Vue from 'vue';
Vue.config.silent = true;

export default {
  name: "RoiChart",
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
    const data = this.series.map((item) => item.value);
    this.data = [{
      name: 'ROI Flow',
      data: data
    }]
    this.chartOptions = {
      plotOptions: {
        bar: {
          colors: {
            ranges: [{
              from: -100,
              to: -46,
              color: '#F15B46'
            }, {
              from: -45,
              to: 0,
              color: '#FEB019'
            }]
          },
          columnWidth: '80%',
        }
      },
      dataLabels: {
        enabled: false,
      },
      yaxis: {
        title: {
          text: 'Growth',
        },
        labels: {
          formatter: function (y) {
            return y.toFixed(0) + "%";
          }
        }
      },
      xaxis: {
        type: 'datetime',
        categories: this.series.map((item) => item.dateTime),
        labels: {
          rotate: -90
        }
      }
    }
  },
  methods: {

  }
};
</script>
<style scoped>

</style>

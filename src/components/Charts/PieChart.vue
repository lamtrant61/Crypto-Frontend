<template>
  <div class="pr-3">
    <VueApexCharts
      type="pie"
      :options="chartOptions"
    />
  </div>
</template>

<script>
import VueApexCharts from "vue-apexcharts";
import Vue from 'vue';
Vue.config.silent = true;

export default {
  name: "PieChart",
  components: {
    VueApexCharts,
  },
  props: {
    series: {
      type: Array,
      required: true
    },
    labels: {
      type: Array,
      required: true
    },
    colors: {
      type: Array,
      required: false,
      default: () => []
    }
  },
  data() {
    return {
      chartOptions: {},
    };
  },
  mounted() {
    this.chartOptions = {
      series: this.series,
      chart: {
        type: 'pie',
        height: 250
      },
      labels: this.labels,
    }
    if (this.colors.length > 0) {
      this.chartOptions.colors = this.colors
    }
  },
  methods: {

  }
};
</script>
  <style scoped>

  </style>

<template>
  <div id="c_Chart" class="border border-gray">
    <trading-vue
      id="trading_id"
      ref="tvjs"
      :data="chart"
      :toolbar="toolbar_show"
      :title-txt="objData.name"
      :color-title="colors.colorText"
      :overlays="overlays"
      :width="width*0.93"
      :height="height*0.8"
      :color-back="colors.colorBack"
      :color-grid="colors.colorGrid"
      :color-text="colors.colorText"
    />
  </div>
</template>
<script>
import { TradingVue, DataCube } from "trading-vue-js";
import Overlays from "tvjs-overlays";
import { Loading } from "element-ui";
import CoinResource from "@/api/coin";
const coinResource = new CoinResource();

export default {
  name: "App",
  components: { TradingVue },
  props: {
    objData: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      full_page_loading: true,
      cancel_loading: false,
      default_sidebar: 180,

      toolbar_show: true,
      code_cp: "",
      chart: {},
      overlays: [Overlays["Ichi"], Overlays["RSI"]],
      width: window.innerWidth,
      height: window.innerHeight,
      colors: {
        colorBack: "#fff",
        colorGrid: "#eee",
        colorText: "#333",
      },
    };
  },
  computed: {},
  watch: {
    '$store.getters.sidebar.opened': {
      handler: function(newVal, oldVal) {
        this.calculate_width(newVal)
      },
      deep: true,
    }
  },
  mounted() {
    this.$on("update-chart", (data) => {
      this.objData = data;
      this.getCandleData();
    });

    this.calculate_width(this.$store.getters.sidebar.opened);
    this.getCandleData();
    window.addEventListener("resize", this.onResize);
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.onResize);
  },
  methods: {
    calculate_width(check_sidebar) {
      if (check_sidebar) {
        this.width = window.innerWidth - this.default_sidebar;
      } else {
        this.width = window.innerWidth;
      }
    },
    onResize() {
      this.width = window.innerWidth;
      this.height = window.innerHeight;
    },

    getCandleData() {
      this.$set(this, "chart", new DataCube());
      this.$refs.tvjs.resetChart();

      let loadingInstance = Loading.service({
        lock: true,
        text: "Loading",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)",
      });
      coinResource.data_detail_coin(this.objData.id)
        .then((dataAll) => {
          let dataC = dataAll.data.map((item) => {
            return [item[0], parseFloat(item[1]), parseFloat(item[2]), parseFloat(item[3]), parseFloat(item[4]), parseFloat(item[5])];
          });
          this.chart.set("chart.data", dataC);

          this.chart.add("onchart", {
            name: "Ichimoku",
            type: "Ichi",
            data: [],
            settings: {
              baseColor: "#155DFC",
              conversionColor: "#E7180B",
              laggingColor: "#5EA529",
              back1: "#3C6301",
              back2: "#9F0712",
            },
          });

          // this.chart.add("onchart", {
          //   name: "Bollinger Bands, 25",
          //   type: "BB",
          //   data: [],
          //   settings: {
          //     showMid: false,
          //     color: "#D4AC0D",
          //     backColor: "#F7F9F9",
          //     length: 25,
          //   },
          // });
          // this.chart.add("onchart", {
          //   name: "Moving Average, 25",
          //   type: "SMA",
          //   data: [],
          //   settings: {
          //     length: 25,
          //     color: "#2980B9",
          //   },
          // });
          this.chart.add("offchart", {
            name: "Relative Strength Index",
            type: "RSI",
            data: [],
            settings: {
              length: 25,
              color: this.colors.colorText,
            },
          });
          // this.chart.add("onchart", {
          //   name: "Predict data",
          //   type: "Spline",
          //   data: [],
          //   settings: {
          //     lineWidth: 1.5,
          //     color: "#7D3C98",
          //   },
          // });
          this.chart.set("chart.indexBased", true);
        })
        .catch((e) => {
          console.log(e);
          this.$message.error(e.message);
        })
        .finally(() => {
          loadingInstance.close();
        });
    },
  },
};
</script>

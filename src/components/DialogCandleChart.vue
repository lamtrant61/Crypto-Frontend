<template>
  <el-dialog
    class="section_view"
    :close-on-click-modal="false"
    :visible.sync="showDialog"
    width="70%"
    height="60%"
    :before-close="handleClose"
  >
    <p class="mb-5 text-xl" style="color: darkslateblue">
      {{ $t("technical_chart")
      }}<span class="font-normal">{{ ` ${objData.code.toUpperCase()}` }}</span>
    </p>
    <div class="border border-gray">
      <trading-vue
        id="trading_id"
        ref="tvjs"
        :data="chart"
        :toolbar="toolbar_show"
        :title-txt="objData.name"
        :color-title="colors.colorText"
        :overlays="overlays"
        :width="cal_width"
        :height="height * 0.555"
        :color-back="colors.colorBack"
        :color-grid="colors.colorGrid"
        :color-text="colors.colorText"
      />
    </div>
  </el-dialog>
</template>
<script>
import { TradingVue, DataCube } from "trading-vue-js";
import Overlays from "tvjs-overlays";
import { Loading } from "element-ui";
import CoinResource from "@/api/coin";
import PredictResource from "@/api/predict";
const coinResource = new CoinResource();
const predictResource = new PredictResource();

export default {
  name: "DialogCandleChart",
  components: { TradingVue },
  props: {
    showDialog: {
      type: Boolean,
      required: true,
    },
    objData: {
      type: Object,
      required: true,
    }
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
      }
    };
  },
  computed: {
    cal_width() {
      return this.width * 0.665;
    },
  },
  watch: {
    "$store.getters.sidebar.opened": {
      // eslint-disable-next-line
      handler: function (newVal, oldVal) {
        this.calculate_width(newVal);
      },
      deep: true,
    },
  },
  mounted() {
    this.$store.dispatch("user/setSymbol", this.objData.symbol);
    this.calculate_width(this.$store.getters.sidebar.opened);
    this.getCandleData();
    window.addEventListener("resize", this.onResize);
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.onResize);
  },
  methods: {
    handle_predict_data(data) {
      const data_predict = [];
      data.median.forEach((_, index) => {
        data_predict.push([data.time[index], data.high[index], data.median[index], data.low[index]]);
      });
      this.chart.add("onchart", {
        name: 'Predict Range',
        type: 'Channel',
        data: data_predict,
        settings: {
          lineWidth: 0.6,
          color: '#6805fc',
          backColor: '#fae9e8',
          showMid: false
        }
      });
    },
    get_predict_data() {
      predictResource
        .get_predict_data({ symbol: this.objData.symbol })
        .then((response) => {
          if (!response.time) throw new Error(this.$t("error_predict"));
          if (Object.keys(response).length > 0) {
            this.handle_predict_data(response);
          }
        })
        .catch((e) => {
          console.log(e);
          this.$message.error(e.message);
        });
    },
    calculate_width(check_sidebar) {
      this.width = window.innerWidth;
      //   if (check_sidebar) {
      //     this.width = window.innerWidth - this.default_sidebar;
      //   } else {
      //     this.width = window.innerWidth;
      //   }
    },
    onResize() {
      this.width = window.innerWidth;
      this.height = window.innerHeight;
    },

    getCandleData() {
      this.$set(this, "chart", new DataCube());
      //   this.chart = new DataCube();
      // this.$refs.tvjs.resetChart();

      let loadingInstance = Loading.service({
        lock: true,
        text: "Loading",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)",
      });
      coinResource
        .data_detail_coin(this.objData.id)
        .then((dataAll) => {
          let dataC = dataAll.data.map((item) => {
            return [
              item[0],
              parseFloat(item[1]),
              parseFloat(item[2]),
              parseFloat(item[3]),
              parseFloat(item[4]),
              parseFloat(item[5]),
            ];
          });
          this.chart.set("chart.data", dataC);
          //   this.chart.data = dataC;

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
          this.chart.set("chart.indexBased", true);
        })
        .catch((e) => {
          console.log(e);
          this.$message.error(e.message);
        })
        .finally(() => {
          this.get_predict_data();
          loadingInstance.close();
        });
    },
    handleClose() {
      this.$emit("onCloseDialog");
    },
  },
};
</script>

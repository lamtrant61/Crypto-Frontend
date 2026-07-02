<template>
  <div>
    <div class="h-3 mt-4 mb-16 flex justify-end">
      <div class="pr-16 flex flex-col">
        <span class="text-xl">{{ `${$t('balance')}: ${balance.toLocaleString('vn')}$` }}</span>
        <span class="text-xl">{{ `${$t('total_coin')}: ${totalCoin.toLocaleString('vn')}` }}</span>
      </div>
    </div>
    <div id="div-content" class="flex justify-between">
      <div id="c_Chart" class="border border-gray" :style="{ width: width_chart + 10 + 'px' }">
        <trading-vue
          id="trading_id"
          ref="tvjs"
          :data="chart"
          :toolbar="toolbar_show"
          :title-txt="objData.name"
          :color-title="colors.colorText"
          :overlays="overlays"
          :width="width*0.7"
          :height="height*0.5"
          :color-back="colors.colorBack"
          :color-grid="colors.colorGrid"
          :color-text="colors.colorText"
        />
      </div>
      <div class="w-auto flex flex-col justify-center items-center" :style="{ width: width_trade + 'px' }">
        <div class="flex justify-end">
          <el-button type="success" icon="el-icon-video-play" @click="onIntervalCandle" />
          <el-button type="primary" icon="el-icon-right" @click="nextCandle" />
        </div>
        <div class="w-11/12 my-4 p-3 border border-gray">
          <el-input v-model="totalBuy" :placeholder="$t('buy')" />
          <p class="mt-2">{{ `${$t('money_amount')}` }}</p>
          <el-button class="mt-2 w-full" type="success" @click="buyCoin">{{ $t('buy') }}</el-button>
        </div>
        <div class="w-11/12 my-4 p-3 border border-gray">
          <el-input v-model="totalSell" :placeholder="$t('sell')" />
          <p class="mt-2">{{ `${$t('money_amount')}` }}</p>
          <el-button class="mt-2 w-full" type="danger" @click="sellCoin">{{ $t('sell') }}</el-button>
        </div>
      </div>
    </div>
    <div class="mt-4 py-4 px-2 w-full border border-gray">
      <p>{{ $t('transaction_history') }}</p>
      <div v-for="trans in [...transaction_history].reverse()" :key="trans.date">
        <el-link :type="trans.type.toUpperCase()=='BUY' ? 'success' : 'danger'" class="text-base">{{ `${trans.type.toUpperCase()} - ${trans.date} - ${trans.amount.toLocaleString('vn')}$` }}</el-link>
      </div>
    </div>
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
      interval: null,
      intervalNextCandle: false,
      data_minus_all: null,
      current_data: null,

      width_chart: null,
      width_trade: null,
      transaction_history: [],
      balance: 1000,

      totalCoin: 0,
      totalBuy: 0,
      totalSell: 0,

      full_page_loading: true,
      cancel_loading: false,
      default_sidebar: 180,

      toolbar_show: true,
      code_cp: "",
      chart: {},
      overlays: [Overlays["BB"], Overlays["RSI"], Overlays["SMA"]],
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
      this.refreshTransaction();
    });

    this.calculate_width(this.$store.getters.sidebar.opened);
    this.getCandleData();
    window.addEventListener("resize", this.onResize);

    const div_chart = document.getElementById('trading_id');
    this.width_chart = div_chart.clientWidth;
    this.width_trade = document.getElementById('div-content').clientWidth - this.width_chart - 10;
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
      const div_chart = document.getElementById('trading_id');
      this.width_chart = div_chart.clientWidth;
      this.width_trade = document.getElementById('div-content').clientWidth - this.width_chart - 10;
    },
    refreshTransaction() {
      this.balance = 1000;
      this.transaction_history = [];
      clearInterval(this.interval)
      this.intervalNextCandle = false
    },
    nextCandle() {
      if (this.data_minus_all.length <= 0) return;
      const nextCandle = this.data_minus_all.shift();
      console.log(nextCandle, 'sedfsf!!!!');
      this.current_data.push(nextCandle);
      this.chart.set("chart.data", this.current_data);
    },
    plotIndicator() {
      this.chart.add("onchart", {
        name: "Bollinger Bands, 25",
        type: "BB",
        data: [],
        settings: {
          showMid: false,
          color: "#D4AC0D",
          backColor: "#F7F9F9",
          length: 25,
        },
      });
      this.chart.add("onchart", {
        name: "Moving Average, 25",
        type: "SMA",
        data: [],
        settings: {
          length: 25,
          color: "#2980B9",
        },
      });
      this.chart.add("offchart", {
        name: "Relative Strength Index",
        type: "RSI",
        data: [],
        settings: {
          length: 25,
          color: this.colors.colorText,
        },
      });
      console.log(this.chart);

      // this.chart.add("onchart", {
      //   name: "Predict data",
      //   type: "Spline",
      //   data: [],
      //   settings: {
      //     lineWidth: 1.5,
      //     color: "#7D3C98",
      //   },
      // });
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
          if (dataC.length < 100) {
            dataC = []
            this.$message.error(this.$t('error_simulator'));
            return
          }
          // Chỗ này sẽ lấy index random ~ 30 < index < length để tạo history chart
          const range_random = dataC.length - 60
          const random_index = 30 + Math.floor(Math.random() * range_random) + 1
          console.log(range_random, random_index);

          this.current_data = dataC.slice(0, random_index)
          this.data_minus_all = dataC.slice(random_index, dataC.length)

          this.chart.set("chart.data", this.current_data);
          this.plotIndicator()
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
    buyCoin() {
      this.totalBuy = parseInt(this.totalBuy);
      if (this.totalBuy > this.balance) {
        this.totalBuy = this.balance;
      }
      const currentClose = this.current_data[this.current_data.length - 1][4];
      const currentDate = this.current_data[this.current_data.length - 1][0];
      this.totalCoin += parseInt(this.totalBuy / currentClose);
      this.transaction_history.push({
        type: "buy",
        amount: this.totalBuy,
        date: new Date(currentDate).toLocaleDateString(),
      });
      this.balance -= this.totalBuy;
    },
    sellCoin() {
      this.totalSell = parseInt(this.totalSell);

      const currentClose = this.current_data[this.current_data.length - 1][4];
      const currentDate = this.current_data[this.current_data.length - 1][0];
      if (this.totalSell > this.totalCoin * currentClose) {
        this.totalSell = this.totalCoin * currentClose;
      }

      this.totalCoin -= parseInt(this.totalSell / currentClose);
      this.transaction_history.push({
        type: "sell",
        amount: this.totalSell,
        date: new Date(currentDate).toLocaleDateString(),
      });
      this.balance += this.totalSell;
    },
    onIntervalCandle() {
      if (!this.intervalNextCandle) {
        this.$message.success(this.$t('start_interval_simulator'))
        let index_interval = 0
        this.interval = setInterval(() => {
          index_interval += 1
          if (index_interval >= 10 | index_interval <= 0) clearInterval(this.interval)
          this.nextCandle()
        }, 1000);
      } else {
        this.$message.warning(this.$t('stop_interval_simulator'))
        clearInterval(this.interval)
      }
      this.intervalNextCandle = !this.intervalNextCandle
    }
  },
};
</script>

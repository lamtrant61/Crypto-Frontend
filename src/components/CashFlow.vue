<template>
  <el-dialog
    class="section_view"
    :close-on-click-modal="false"
    :visible.sync="showDialog"
    width="80%"
    height="60%"
    custom-class="dialog-cash-flow-145CE3"
    :before-close="handleClose"
  >
    <div class="flex justify-evenly flex-wrap">
      <div v-for="item, index in data_cash_flow" :key="index" class="mb-8 py-4 border rounded-2xl ">
        <div class="w-160 h-128">
          <PieCash class="w-full h-full" :series="item" :labels="labels" :colors="colors" :title="`${$t('invest_cash_flow')} - ${list_period[index].name}`" :sub-title="list_period[index].name" />
        </div>
      <!-- <PieChart :series="item" :labels="labels" :colors="colors" /> -->
      </div>
    </div>

  </el-dialog>
</template>
<script>
// import PieChart from "@/components/Charts/PieChart";
import PieCash from "@/components/Charts/PieCash";
import CoinResource from "@/api/coin";
const coinResource = new CoinResource();

export default {
  name: "DialogCandleChart",
  components: {
    // PieChart,
    PieCash,
  },
  props: {
    showDialog: {
      type: Boolean,
      required: true,
    },
    dataSymbol: {
      type: Object,
      required: true,
      default: () => ({}),
    },
  },
  data() {
    return {
      list_period: [
        {
          name: "15 phút",
          value: "MINUTE_15",
        },
        {
          name: "30 phút",
          value: "MINUTE_30",
        },
        {
          name: "1 giờ",
          value: "HOUR_1",
        },
        {
          name: "2 giờ",
          value: "HOUR_2",
        },
        {
          name: "4 giờ",
          value: "HOUR_4",
        },
        {
          name: "1 ngày",
          value: "DAY_1",
        },
      ],
      data_cash_flow: null,
      labels: [this.$t('buy_maker_big'), this.$t('buy_maker_medium'), this.$t('buy_maker_small'), this.$t('buy_taker_big'), this.$t('buy_taker_medium'), this.$t('buy_taker_small')],
      colors: ["#d9304e", "#f6465d", "#ff99a0", "#0f8f62", "#2ebd85", "#78d6ac"]
    };
  },
  async mounted() {
    const list_promise = this.list_period.map((period) => {
      return this.get_predict_data(period.value);
    });
    const data_cash_flow = await Promise.all(list_promise);
    this.data_cash_flow = data_cash_flow.map((item, index) => {
      return [parseFloat(item.percent_buy_maker_big).toFixed(2), parseFloat(item.percent_buy_maker_medium).toFixed(2), parseFloat(item.percent_buy_maker_small).toFixed(2), parseFloat(item.percent_buy_taker_big).toFixed(2), parseFloat(item.percent_buy_taker_medium).toFixed(2), parseFloat(item.percent_buy_taker_small).toFixed(2)];
    });
    console.log(this.data_cash_flow);
  },
  methods: {
    get_predict_data(period) {
      return new Promise((resolve, reject) => {
        coinResource
          .get_cash_flow({ period: period, symbol: this.dataSymbol.symbol })
          .then((response) => {
            if (response.statusCode !== 200) throw new Error(this.$t("error_data"));
            resolve(response.data);
          })
          .catch((e) => {
            console.log(e);
            this.$message.error(e.message);
            reject(e);
          });
      })
    },
    handleClose() {
      this.$emit("onCloseDialog");
    },
  },
};
</script>
<style>
.dialog-cash-flow-145CE3 {
    margin-top: 1vh !important;
}
</style>

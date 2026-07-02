<template>
  <section class="mx-8 my-8">
    <div class="flex items-center justify-between m-0 mb-4 ">
      <p class="text-2xl">{{ $t('simulator') }}</p>
      <el-select
        v-model="objData.id"
        filterable
        :placeholder="$t('select_coin')"
        :remote-method="remote_method"
        remote
        reserve-keyword
      >
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
    </div>

    <CandleChart v-if="objData.id" ref="candleRef" :obj-data="objData" />
  </section>
</template>
<script>
import CandleChart from "./components/CandleChart.vue";
import CoinResource from "@/api/coin";
const coinResource = new CoinResource();

export default {
  components: {
    CandleChart,
  },
  data() {
    return {
      options: [],
      objData: {
        id: null,
        name: null,
      },
      firstTime: true,
      queryObj: {
        w: ""
      },
    };
  },
  watch: {
    'objData.id': {
      handler: function(newVal, oldVal) {
        if (newVal !== oldVal && this.$refs.candleRef) {
          this.objData.name = this.options.find((item) => item.value === newVal).label;
          this.$refs.candleRef.$emit('update-chart', this.objData)
        }
      },
      deep: true,
    },
  },
  mounted() {
    if (Object.keys(this.$route.params).length) {
      this.queryObj.w = this.$route.params.code;
    }
    this.get_list_coin();
  },
  methods: {
    get_list_coin() {
      if (!this.queryObj.w) {
        delete this.queryObj.w;
      }
      coinResource
        .list_coin(this.queryObj)
        .then((response) => {
          if (response.statusCode !== 200) throw new Error(response.message);
          let data = response.data.data;
          this.options = data.map((item) => {
            return {
              value: item.id,
              label: item.code,
            };
          });
        })
        .catch((err) => {
          console.log(err);
          this.$message.error(err.message);
        })
        .finally(() => {
          if (this.firstTime) {
            if (this.queryObj.w) {
              let findCode = this.options.find((item) => item.label === this.queryObj.w);
              this.objData = {
                id: findCode ? findCode.value : this.options[0].value,
                name: findCode ? findCode.label : this.options[0].label,
              };
            } else {
              this.objData = {
                id: this.options[0].value,
                name: this.options[0].label,
              };
            }
          }
          this.firstTime = false;
        });
    },
    remote_method(query) {
      this.queryObj.w = query;
      this.get_list_coin();
    },
  },
};
</script>
<style scoped></style>

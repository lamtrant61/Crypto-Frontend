<template>
  <div class="coin-container mx-8 my-8">
    <div class="flex justify-between">
      <p class="m-0 text-2xl">
        {{ $t("list_coin")
        }}{{ coin_update_time ? ` - ${coin_update_time}` : "" }}
      </p>
      <div>
        <el-button icon="el-icon-refresh" :loading="loading" @click="onRefresh">
          Làm mới
        </el-button>
      </div>
    </div>
    <div class="flex justify-between my-3">
      <div>
        <el-select
          v-model="query_params.tag"
          class="w-32"
          placeholder="Tag"
          filterable
          clearable
          @change="get_list_coin_on_select_order"
        >
          <el-option
            v-for="item in list_tag"
            :key="item.id"
            :label="item.label"
            :value="item.value"
          >
            <el-tooltip class="item" effect="light" popper-class="tooltip-class" :content="item.detail" :open-delay="400" placement="right-start">
              <div>{{ item.label }}</div>
            </el-tooltip>
          </el-option>
        </el-select>
        <el-select
          v-model="query_params.order"
          class="w-32 ml-2"
          placeholder="Order"
          @change="get_list_coin_on_select_order"
        >
          <el-option
            v-for="item in list_order"
            :key="item.id"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
        <el-select
          v-model="query_params.sort_by"
          class="w-32 ml-2"
          placeholder="Sort by"
          @change="get_list_coin_on_select_order"
        >
          <el-option
            v-for="item in list_sort"
            :key="item.id"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </div>
      <div>
        <el-input
          v-model="query_params.w"
          class="w-48"
          type="text"
          :rows="2"
          :placeholder="$t('input_to_search')"
          @keyup.enter.native="get_list_coin_on_select_order"
        >
          <i slot="suffix" class="el-icon-search el-input__icon" />
        </el-input>
        <el-button
          class="ml-2"
          type="primary"
          icon="el-icon-search"
          @click="get_list_coin_on_select_order"
        >Tìm kiếm</el-button>
      </div>
    </div>
    <CoinTable :table-data="tableData" :loading="loading" @show-chart-dialog="onShowChartDialog" @save-coin="onSaveCoin" />
    <pagination
      :total="total"
      :limit.sync="query_params.limit"
      :page.sync="query_params.page"
      @pagination="get_list_coin"
      @limit-change="get_list_coin"
    />

    <DialogCandleChart v-if="dialogVisible" :show-dialog="dialogVisible" :obj-data="dataObj" @onCloseDialog="dialogVisible=false" />
  </div>
</template>
<script>
import Pagination from "@/components/Pagination";
import DialogCandleChart from "@/components/DialogCandleChart";
// import CandleChart from "@/components/Charts/Candle";
import CoinTable from "@/components/CoinTable.vue";
import CoinResource from "@/api/coin";
import TagResource from "@/api/tag";
const coinResource = new CoinResource();
const tagResource = new TagResource();

export default {
  name: "Coin",
  components: {
    Pagination,
    // CandleChart,
    CoinTable,
    DialogCandleChart
  },
  data() {
    return {
      loading: false,
      coin_update_time: null,
      tableData: [],
      list_tag: [],
      total: 0,
      query_params: {
        page: 1,
        limit: 10,
        w: "",
        order: "price",
        sort_by: "asc",
      },
      list_order: [
        {
          id: 1,
          value: "id",
          label: "ID",
        },
        {
          id: 2,
          value: "price",
          label: this.$t("price"),
        },
        {
          id: 3,
          value: "volume",
          label: this.$t("volume"),
        },
        {
          id: 4,
          value: "nvt",
          label: "NVT",
        },
        {
          id: 5,
          value: "change_24h",
          label: this.$t("change_24h"),
        },
        {
          id: 6,
          value: "change_7d",
          label: this.$t("change_7d"),
        },
        {
          id: 7,
          value: "change_1m",
          label: this.$t("change_1m"),
        }
      ],
      list_sort: [
        {
          id: 1,
          value: "asc",
          label: this.$t("asc"),
        },
        {
          id: 2,
          value: "desc",
          label: this.$t("desc"),
        },
      ],
      dialogVisible: false,
      dataObj: {},
    };
  },
  created() {
    this.get_list_tag();
    this.get_list_coin();
    this.get_update_time();
  },
  methods: {
    convert_time(time) {
      return this.$moment(time).format("YYYY-MM-DD HH:mm");
    },
    get_update_time() {
      coinResource
        .get_update_time()
        .then((response) => {
          if (response.statusCode !== 200) throw new Error(response.message);
          this.coin_update_time = this.convert_time(response.data?.time_create);
        })
        .catch((e) => {
          console.log(e);
          this.$message.error(e.message);
        });
    },
    get_list_coin_on_select_order() {
      this.query_params.page = 1;
      this.get_list_coin();
    },
    get_list_coin() {
      if (!this.query_params.tag) delete this.query_params.tag;
      if (!this.query_params.w) delete this.query_params.w;
      this.loading = false;
      coinResource
        .list_coin(this.query_params)
        .then((response) => {
          if (response.statusCode !== 200) throw new Error(response.message);
          if (this.query_params.page === 1) this.total = response.data.total;
          this.tableData = response.data.data;
          this.tableData.forEach((coin, index) => {
            coin.tag = JSON.parse(coin.tag).join(", ");
            coin.updatedAt = this.$moment(coin.updatedAt).format(
              "YYYY-MM-DD HH:mm"
            );
            coin.is_show = false;

            coinResource
              .detail_coin(coin.id)
              .then((response) => {
                if (response.statusCode !== 200) {
                  throw new Error(response.message);
                }
                // coin.candle_data = response.data
                coin.candle_data = response.data.map((item) => {
                  let time = new Date(item.time);
                  return {
                    x: time,
                    y: [item.open, item.high, item.low, item.close],
                  };
                });
                //coin.is_show = true
              })
              .catch((e) => {
                console.log(e);
              })
              .finally(() => {
                coin.is_show = true;
                this.$set(this.tableData, index, { ...coin });
              });
          });
        })
        .catch((e) => {
          console.log(e);
          this.$message.error(e.message);
        })
        .finally(() => {
          this.loading = false;
        });
    },
    get_list_tag() {
      tagResource
        .list_tag()
        .then((response) => {
          if (response.statusCode !== 200) throw new Error(response.message);
          this.list_tag = response.data.map((tag) => {
            return {
              id: tag.id,
              value: tag.name,
              label: tag.name,
              detail: tag.detail
            };
          });
        })
        .catch((e) => {
          console.log(e);
          this.$message.error(e.message);
        });
    },
    redirect_url(url) {
      // console.log(url);
      window.open(url, "_blank");
    },
    onRefresh() {
      this.query_params.page = 1;
      this.query_params.limit = 10;
      this.query_params.w = "";
      this.query_params.tag = null;
      // this.query_params.order = "price"
      // this.query_params.sort_by = 'asc'
      this.get_list_coin();
    },
    isValidImage(url) {
      return url && (url.startsWith("http://") || url.startsWith("https://"));
    },
    onSaveCoin(code) {
      coinResource
        .save_coin({ code: code })
        .then((response) => {
          if (response.statusCode !== 200) throw new Error(response.message);
          this.$message.success(response.message);
        })
        .catch((e) => {
          console.log(e);
          this.$message.error(e.message);
        });
    },
    onShowChartDialog(row) {
      this.dataObj = { id: row.id, code: row.code, name: row.name, symbol: row.symbol };
      this.dialogVisible = true;
    },
  },
};
</script>
<style scoped>
#code-link :hover {
  color: dodgerblue;
}
</style>
<style>
.tooltip-class {
  width: 30% !important;
}
</style>

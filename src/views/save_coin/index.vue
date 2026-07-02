<template>
  <div class="coin-container mx-8 my-8">
    <div class="flex justify-between mb-4">
      <p class="m-0 text-2xl">
        {{ $t("list_coin")
        }}{{ coin_update_time ? ` - ${coin_update_time}` : "" }}
      </p>
      <div>
        <el-button icon="el-icon-refresh" :loading="loading" @click="onRefresh">
          Làm mới
        </el-button>
        <el-input
          v-model="query_params.w"
          class="w-48 ml-2"
          type="text"
          :rows="2"
          :placeholder="$t('input_to_search')"
          @keyup.enter.native="get_list_save_coin"
        >
          <i slot="suffix" class="el-icon-search el-input__icon" />
        </el-input>
        <el-button
          class="ml-2"
          type="primary"
          icon="el-icon-search"
          @click="get_list_save_coin"
        >Tìm kiếm</el-button>
      </div>
    </div>
    <CoinTable :table-data="tableData" :loading="loading" :is-save="true" @show-chart-dialog="onShowChartDialog" @remove-save-coin="onRemoveSaveCoin" />
    <pagination
      :total="total"
      :limit.sync="query_params.limit"
      :page.sync="query_params.page"
      @pagination="get_list_save_coin"
      @limit-change="get_list_save_coin"
    />
    <DialogCandleChart v-if="dialogVisible" :show-dialog="dialogVisible" :obj-data="dataObj" @onCloseDialog="dialogVisible=false" />
  </div>
</template>
<script>
import Pagination from "@/components/Pagination";
import CoinTable from "@/components/CoinTable.vue";
import DialogCandleChart from "@/components/DialogCandleChart";
import CoinResource from "@/api/coin";
import TagResource from "@/api/tag";
import SaveCoinResource from "@/api/save_coin";
const coinResource = new CoinResource();
const tagResource = new TagResource();
const saveCoinResource = new SaveCoinResource();

export default {
  name: "Coin",
  components: {
    Pagination,
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
      },
      dialogVisible: false,
      dataObj: {},
    };
  },
  created() {
    this.get_list_tag();
    this.get_list_save_coin();
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
    get_list_save_coin() {
      if (!this.query_params.tag) delete this.query_params.tag;
      if (!this.query_params.w) delete this.query_params.w;
      this.loading = false;
      saveCoinResource
        .list_save_coin(this.query_params)
        .then((response) => {
          if (response.statusCode !== 200) throw new Error(response.message);
          if (this.query_params.page === 1) this.total = response.data.total;
          // console.log(response.data);
          this.tableData = response.data;
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
            };
          });
        })
        .catch((e) => {
          console.log(e);
          this.$message.error(e.message);
        });
    },
    redirect_url(url) {
      window.open(url, "_blank");
    },
    onRefresh() {
      this.query_params.page = 1;
      this.query_params.limit = 10;
      this.query_params.w = "";
      // this.query_params.order = "price"
      // this.query_params.sort_by = 'asc'

      this.get_list_save_coin();
    },
    isValidImage(url) {
      return url && (url.startsWith("http://") || url.startsWith("https://"));
    },
    onRemoveSaveCoin(id) {
      console.log(id);
      saveCoinResource
        .delete_save_coin(id)
        .then((response) => {
          if (response.statusCode !== 200) throw new Error(response.message);
          this.$message.success(response.message);
          this.get_list_save_coin();
        })
        .catch((e) => {
          console.log(e);
          this.$message.error(e.message);
        });
    },
    onClickCode(row) {
      this.$router.push({ name: "Phân tích kỹ thuật", params: { id: row.id, code: row.code }});
    },
    onShowChartDialog(row) {
      this.dataObj = { id: row.id, code: row.code, name: row.name, symbol: row.symbol };
      // this.dataObj = { id: row.id, code: row.code, name: row.name };
      this.dialogVisible = true;
    },
  },
};
</script>
<style scoped></style>

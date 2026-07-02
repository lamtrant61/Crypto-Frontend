<template>
  <section class="coin-container mx-8 my-8">
    <div class="flex justify-between mb-4">
      <p class="m-0 text-2xl">
        {{ $t("copy_trading")
        }}
      </p>
    </div>
    <TableData v-if="tableData.length" :table-data="tableData" :loading="loading" />
    <pagination
      :total="total"
      :limit.sync="queryObj.limit"
      :page.sync="queryObj.page"
      @pagination="get_list_copy_trading"
      @limit-change="get_list_copy_trading"
    />
  </section>
</template>
<script>
import Pagination from "@/components/Pagination";
import TableData from "./components/TableData.vue";
import CopyTradingResource from "@/api/copy_trading";
const copyTradingResource = new CopyTradingResource();

export default {
  components: {
    TableData,
    Pagination,
  },
  data() {
    return {
      tableData: [],
      loading: false,
      queryObj: {
        limit: 10,
        page: 1,
      },
      total: 0,
    };
  },
  mounted() {
    this.get_list_copy_trading();
  },
  methods: {
    get_list_copy_trading() {
      this.loading = true;
      this.tableData = [];
      copyTradingResource
        .get_list_copy_trading(this.queryObj)
        .then((response) => {
          if (response.statusCode !== 200) {
            throw new Error(response.message);
          }
          if (this.queryObj.page === 1) {
            this.total = response.data.total;
          }
          this.tableData = response.data.data;
        })
        .catch((err) => {
          console.log(err);
          this.$message.error(err.message);
        }).finally(() => {
          this.loading = false;
        });
    },
  },
};
</script>

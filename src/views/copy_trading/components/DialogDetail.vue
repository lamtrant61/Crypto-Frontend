<template>
  <el-dialog
    class="section_view"
    :close-on-click-modal="true"
    :visible.sync="showDialog"
    width="70%"
    height="60%"
    :before-close="handleClose"
  >
    <el-table
      v-loading="loading"
      :data="tableData"
      align="center"
      border
      style="width: 100%"
    >
      <el-table-column
        prop="symbol"
        width="150"
        label="Symbol"
        align="center"
      />
      <el-table-column
        prop="avgCost"
        label="Avg Cost"
        align="center"
      />
      <el-table-column
        prop="avgClosePrice"
        label="Avg Close Price"
        align="center"
      />
      <el-table-column
        prop="closingPnl"
        label="Close PNL"
        align="center"
      />
      <el-table-column
        prop="side"
        label="Side"
        align="center"
      />
      <el-table-column
        prop="opened_datetime"
        label="Open Time"
        align="center"
      />
      <el-table-column
        prop="closed_datetime"
        label="Close Time"
        align="center"
      />
    </el-table>
    <pagination
      :total="total"
      :limit.sync="queryObj.limit"
      :page.sync="queryObj.page"
      @pagination="get_list_coin_trading"
      @limit-change="get_list_coin_trading"
    />
  </el-dialog>

</template>
<script>
const moment = require('moment');
import Pagination from "@/components/Pagination";
import CopyTradingResource from "@/api/copy_trading";
const copyTradingResource = new CopyTradingResource();

export default {
  name: "DialogDetail",
  components: {
    Pagination,
  },
  props: {
    showDialog: {
      type: Boolean,
      required: true,
    },
    id: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      loading: false,
      total: 0,
      tableData: [],
      queryObj: {
        limit: 10,
        page: 1,
      },
    };
  },
  mounted() {
    this.get_list_coin_trading();
  },
  methods: {
    handleClose() {
      this.$emit("onCloseDialog");
    },
    get_list_coin_trading() {
      this.loading = true;
      this.queryObj.portfolio_id = this.id;
      copyTradingResource
        .get_data_copy_trading(this.queryObj)
        .then((response) => {
          if (response.statusCode !== 200) {
            throw new Error(response.message);
          }
          if (this.queryObj.page === 1) {
            this.total = response.data.total;
          }
          this.tableData = response.data.data;
          this.tableData.forEach((item) => {
            item.opened_datetime = item.opened ? moment(new Date(item.opened)).format('YYYY-MM-DD HH:mm') : null;
            item.closed_datetime = item.closed ? moment(new Date(item.closed)).format('YYYY-MM-DD HH:mm') : null;
          });
        })
        .catch((err) => {
          console.log(err);
          this.$message.error(err.message);
        }).finally(() => {
          this.loading = false;
        });
    },
  }
}
</script>

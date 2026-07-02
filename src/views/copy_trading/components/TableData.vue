<template>
  <div>
    <el-table
      v-loading="loading"
      :data="tableData"
      align="center"
      border
      style="width: 100%"
    >
      <el-table-column
        prop="leadPortfolioId"
        width="120"
        label="ID"
        align="center"
      />
      <el-table-column
        prop="nickname"
        width="150"
        :label="$t('name')"
        align="center"
      />
      <el-table-column label="Image" align="center" width="150">
        <template slot-scope="scope">
          <el-image :src="scope.row.avatarUrl" referrerpolicy="no-referrer" />
        </template>
      </el-table-column>
      <el-table-column
        prop="winRate"
        label="Win Rate"
        align="center"
      >
        <template slot-scope="{ row }">
          <el-link
            size="small"
            :underline="false"
            type="primary"
          >{{ parseFloat(row.winRate).toFixed(0) }}%</el-link>
        </template>
      </el-table-column>
      <el-table-column label="ROI" align="center">
        <template slot-scope="{ row }">
          <el-link
            v-if="parseFloat(row.roi) < 0"
            size="small"
            :underline="false"
            type="danger"
          >{{ parseFloat(row.roi).toFixed(0) }}%</el-link>
          <el-link
            v-else-if="parseFloat(row.roi) >= 0"
            size="small"
            :underline="false"
            type="success"
          >{{ parseFloat(row.roi).toFixed(0) }}%</el-link>
        </template>
      </el-table-column>
      <el-table-column label="PNL" align="center">
        <template slot-scope="{ row }">
          <el-link
            v-if="parseFloat(row.pnl) < 0"
            size="small"
            :underline="false"
            type="danger"
          >{{ formatNumber(parseFloat(row.pnl).toFixed(0)) }}$</el-link>
          <el-link
            v-else-if="parseFloat(row.pnl) >= 0"
            size="small"
            :underline="false"
            type="success"
          >{{ formatNumber(parseFloat(row.pnl).toFixed(0)) }}$</el-link>
        </template>
      </el-table-column>
      <el-table-column label="Chart" width="700" align="center">
        <template slot-scope="{ row }">
          <RoiChart :series="row.chartItems" />
        </template>
      </el-table-column>
      <el-table-column label="Action" width="150" align="center">
        <template slot-scope="{ row }">
          <div class="flex flex-col justify-center items-center">
            <el-button
              class="mb-2 w-24"
              style="margin-left: 0px"
              type="primary"
              round
              @click="showDetail(row.leadPortfolioId)"
            >{{ $t("detail") }}</el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <DialogDetail
      v-if="is_show_detail"
      :id="id_show_detail"
      :show-dialog="is_show_detail"
      @onCloseDialog="is_show_detail = false"
    />
  </div>
</template>
<script>
import RoiChart from "./RoiChart.vue";
import DialogDetail from "./DialogDetail.vue";
import { formatNumber } from "@/utils";
export default {
  components: {
    RoiChart,
    DialogDetail,
  },
  props: {
    tableData: {
      type: Array,
      default: () => [],
    },
    loading: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      is_show_detail: false,
      id_show_detail: null
    };
  },
  mounted() {
  },
  methods: {
    formatNumber,
    onShowChartDialog(row) {
      this.$emit("show-chart-dialog", row);
    },
    showDetail(id) {
      this.id_show_detail = id;
      this.is_show_detail = true;
    }
  },
};
</script>
<style scoped></style>

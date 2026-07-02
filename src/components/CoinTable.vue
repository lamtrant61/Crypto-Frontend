<template>
  <div>
    <el-table
      v-loading="loading"
      :data="tableData"
      align="center"
      border
      style="width: 100%"
    >
      <el-table-column prop="id" label="ID" align="center" width="65" />
      <el-table-column
        prop="code"
        width="100"
        align="center"
        :label="$t('code')"
      >
        <template slot-scope="{ row }">
          <el-link id="code-link" style="color: blue;" :underline="true" @click="onClickCode(row)">{{ row.code }}</el-link>
        </template>
      </el-table-column>
      <el-table-column
        prop="name"
        width="120"
        :label="$t('name')"
        align="center"
      />

      <el-table-column label="Logo" align="center" width="80">
        <template slot-scope="scope">
          <el-image :src="scope.row.logo" referrerpolicy="no-referrer" />
        </template>
      </el-table-column>

      <el-table-column
        prop="price"
        :label="$t('price')"
        width="150"
        align="center"
      />
      <el-table-column
        prop="volume"
        :label="$t('volume')"
        width="130"
        align="center"
      >
        <template slot-scope="{ row }">
          <p>{{ parseInt(row.volume).toLocaleString("en-us") }}</p>
        </template>
      </el-table-column>
      <el-table-column prop="tag" label="Tag" width="130" align="center">
        <template slot-scope="{ row }">
          <div v-for="tag in row.tag.split(',')" :key="tag">
            <el-tag v-if="tag.length > 0" class="m-2" type="primari">{{
              tag
            }}</el-tag>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="NVT" width="100" align="center">
        <template slot-scope="{ row }">
          <p>{{ parseFloat(row.nvt).toFixed(2) }}</p>
        </template>
      </el-table-column>
      <el-table-column :label="$t('change_24h')" width="110" align="center">
        <template slot-scope="{ row }">
          <el-link v-if="parseFloat(row.change_24h) < 0" size="small" :underline="false" type="danger">{{ parseFloat(row.change_24h).toFixed(2) }}%</el-link>
          <el-link v-else-if="parseFloat(row.change_24h) >= 0" size="small" :underline="false" type="success">{{ parseFloat(row.change_24h).toFixed(2) }}%</el-link>
        </template>
      </el-table-column>
      <el-table-column :label="$t('change_7d')" width="110" align="center">
        <template slot-scope="{ row }">
          <el-link v-if="parseFloat(row.change_7d) < 0" size="small" :underline="false" type="danger">{{ parseFloat(row.change_7d).toFixed(2) }}%</el-link>
          <el-link v-else-if="parseFloat(row.change_7d) >= 0" size="small" :underline="false" type="success">{{ parseFloat(row.change_7d).toFixed(2) }}%</el-link>
        </template>
      </el-table-column>
      <el-table-column :label="$t('change_1m')" width="110" align="center">
        <template slot-scope="{ row }">
          <el-link v-if="parseFloat(row.change_1m) < 0" size="small" :underline="false" type="danger">{{ parseFloat(row.change_1m).toFixed(2) }}%</el-link>
          <el-link v-else-if="parseFloat(row.change_1m) >= 0" size="small" :underline="false" type="success">{{ parseFloat(row.change_1m).toFixed(2) }}%</el-link>
        </template>
      </el-table-column>
      <el-table-column label="Chart" align="center">
        <template slot-scope="{ row }">
          <CandleChart v-if="row.is_show || false" :series="row.candle_data" />
        </template>
      </el-table-column>
      <el-table-column label="Action" width="150" align="center">
        <template slot-scope="{ row }">
          <div class="flex flex-col justify-center items-center">
            <el-button
              class="mb-2 w-24"
              style="margin-left: 0px"
              type="danger"
              round
              @click="onShowChartDialog(row)"
            >{{ $t("show_chart") }}</el-button>
            <el-button
              class="mb-2 w-24"
              style="margin-left: 0px; background-color: #7040d5; border-color: #7040d5;"
              type="danger"
              round
              @click="onShowCashFlow(row)"
            >{{ $t("cash_flow") }}</el-button>
            <el-button
              class="mb-2 w-24"
              style="margin-left: 0px"
              type="success"
              round
              @click="redirect_url(row.website)"
            >{{ $t("website") }}</el-button>
            <el-button
              class="mb-2 w-24"
              style="margin-left: 0px"
              type="warning"
              round
              @click="redirect_url(row.urlBinance)"
            >{{ $t("binance") }}</el-button>
            <el-button
              v-if="!isSave"
              class="mb-2 w-24"
              style="margin-left: 0px"
              type="primary"
              round
              @click="onSaveCoin(row.code)"
            >{{ $t("save") }}</el-button>
            <el-button
              v-if="isSave"
              class="mb-2 w-24"
              style="margin-left: 0px"
              type="primary"
              round
              @click="onRemoveSaveCoin(row.Save_Coins_ID)"
            >{{ $t("remove") }}</el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <CashFlow v-if="is_show_cash_flow" :show-dialog="is_show_cash_flow" :data-symbol="data_symbol" @onCloseDialog="is_show_cash_flow=false" />
  </div>
</template>
<script>
import CandleChart from "@/components/Charts/Candle";
import CashFlow from "@/components/CashFlow";
export default {
  components: {
    CandleChart,
    CashFlow,
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
    isSave: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      is_show_cash_flow: false,
      data_symbol: null,
    };
  },
  methods: {
    onClickCode(row) {
      this.$router.push({ name: "Phân tích kỹ thuật", params: { id: row.id, code: row.code }});
    },
    onShowChartDialog(row) {
      this.$emit("show-chart-dialog", row);
    },
    onShowCashFlow(row) {
      this.is_show_cash_flow = true;
      this.data_symbol = row;
    },
    redirect_url(url) {
      window.open(url, "_blank");
    },
    onSaveCoin(code) {
      this.$emit("save-coin", code);
    },
    onRemoveSaveCoin(id) {
      this.$emit("remove-save-coin", id);
    },
  },
};

</script>
<style scoped>
</style>


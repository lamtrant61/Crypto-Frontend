<template>
  <div class="w-112 h-160 px-4 py-4 border rounded-4xl">
    <div class="mt-3 flex justify-center text-purple">
      <p class="font-semibold text-xl">{{ title }}</p>
    </div>

    <el-table
      v-loading="loading"
      class="mt-4"
      :data="tableData"
      align="center"
      style="width: 100%"
    >
      <el-table-column
        width="120"
        :label="$t('code')"
        align="center"
      >
        <template slot-scope="{ row }">
          <div class="flex justify-between">
            <el-image class="w-7 mr-2" :src="row.logo" referrerpolicy="no-referrer" />
            <el-link
              :underline="false"
              type="primary"
            >{{ row.code }}
            </el-link>
          </div>
        </template>
      </el-table-column>
      <el-table-column
        prop="price"
        :label="$t('price')"
        align="center"
      />
      <el-table-column :label="$t('change_24h')" width="120" align="center">
        <template slot-scope="{ row }">
          <el-link v-if="parseFloat(row.change_24h) < 0" size="small" :underline="false" type="danger">{{ parseFloat(row.change_24h).toFixed(2) }}%</el-link>
          <el-link v-else-if="parseFloat(row.change_24h) >= 0" size="small" :underline="false" type="success">{{ parseFloat(row.change_24h).toFixed(2) }}%</el-link>
        </template>
      </el-table-column>
      <el-table-column label="NVT" align="center">
        <template slot-scope="{ row }">
          <p>{{ parseFloat(row.nvt).toFixed(2) }}</p>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: "TopTier",
  props: {
    title: {
      type: String,
      default: "Top Tier"
    },
    tableData: {
      type: Array,
      default: () => []
    },
    loading: {
      type: Boolean,
      default: false
    }
  },
};
</script>
<style scoped>
::v-deep .el-table td.el-table__cell {
  border: 0px;
}
::v-deep .el-table th.el-table__cell.is-leaf {
  border: 0px;
}
::v-deep .el-table::before {
  display: none;
}
</style>

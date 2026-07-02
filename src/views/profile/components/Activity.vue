<template>
  <div class="user-activity">
    <div class="post">
      <el-table
        v-loading="loadingTable"
        :data="tableData"
        border
        style="width: 100%"
      >
        <el-table-column
          prop="user_name"
          :label="$t('user')"
          width="100"
          align="center"
        />
        <el-table-column
          prop="createdAt"
          :label="$t('date_create')"
          width="130"
          align="center"
        />
        <el-table-column
          prop="ip_request"
          label="IP"
          width="150"
          align="center"
        />
        <el-table-column
          prop="name_browser"
          :label="$t('browser')"
          width="180"
          align="center"
        />
        <el-table-column
          prop="content"
          :label="$t('content')"
          align="center"
        />
        <el-table-column
          prop="content_old"
          :label="$t('org_value')"
          align="center"
        />
      </el-table>
      <el-row class="list-shop__footer">
        <pagination v-show="total > listQuery.limit" :total="total" :limit.sync="listQuery.limit" :page.sync="listQuery.page" @pagination="onGetListActivity" />
      </el-row>
    </div>
  </div>
</template>

<script>
import Pagination from '@/components/Pagination'
// import ActivityResource from '@/api/activity'
// const activityResource = new ActivityResource()
const defaultQuery = {
  page: 1,
  limit: 10
}
export default {
  name: 'Activity',
  components: { Pagination },
  data() {
    return {
      loadingTable: false,
      listQuery: Object.assign({}, defaultQuery),
      total: 0,
      tableData: []
    }
  },
  created() {
    // this.onGetListActivity()
  },
  methods: {
    // onGetListActivity() {
    //   this.loadingTable = true
    //   activityResource.activityList(this.listQuery).then(response => {
    //     this.loadingTable = false
    //     if (response.error === 0) {
    //       this.tableData = response.data
    //       this.total = response.total
    //     } else {
    //       this.tableData = []
    //     }
    //   }).catch(error => {
    //     this.loadingTable = false
    //     this.$message.error(` Có lỗi, ${error}`)
    //   })
    // }
  }
}
</script>

<style lang="scss" scoped>
.user-activity {
  .user-block {

    .username,
    .description {
      display: block;
      margin-left: 50px;
      padding: 2px 0;
    }

    .username{
      font-size: 16px;
      color: #000;
    }

    :after {
      clear: both;
    }

    .img-circle {
      border-radius: 50%;
      width: 40px;
      height: 40px;
      float: left;
    }

    span {
      font-weight: 500;
      font-size: 12px;
    }
  }

  .post {
    font-size: 14px;
    margin-bottom: 15px;
    padding-bottom: 15px;
    color: #666;

    .image {
      width: 100%;
      height: 100%;

    }

    .user-images {
      padding-top: 20px;
    }
  }

  .list-inline {
    padding-left: 0;
    margin-left: -5px;
    list-style: none;

    li {
      display: inline-block;
      padding-right: 5px;
      padding-left: 5px;
      font-size: 13px;
    }

    .link-black {

      &:hover,
      &:focus {
        color: #999;
      }
    }
  }

}

.box-center {
  margin: 0 auto;
  display: table;
}

.text-muted {
  color: #777;
}
</style>

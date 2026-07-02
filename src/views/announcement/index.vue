<template>
  <section class="mx-8 my-8">
    <div class="flex items-center justify-between m-0 mb-4 ">
      <p class="text-2xl">{{ $t('binance_announcement') }}</p>
    </div>
    <el-tabs type="border-card">
      <el-tab-pane v-for="data, index in data_announcement" :key="index">
        <span slot="label" class="font-bold text-lg"><i :class="icon_announcement[index] || 'el-icon-postcard'" /> {{ data.name }}</span>
        <div v-for="info, index_child in data.announcement" :key="index_child" class="mb-4">
          <el-link class="font-semibold text-lg" :href="info.url" target="_blank">{{ info.content }}</el-link>
        </div>
      </el-tab-pane>
    </el-tabs>
  </section>
</template>
<script>
import AnnouncementResource from "@/api/announcement";
const announcementResource = new AnnouncementResource();

export default {
  components: {
  },
  data() {
    return {
      data_announcement: [],
      icon_announcement: ['el-icon-sell', 'el-icon-sold-out', 'el-icon-notebook-1', 'el-icon-postcard']
    };
  },
  mounted() {
    this.get_announcement()
  },
  methods: {
    get_announcement() {
      announcementResource.get_binance_announcement().then((response) => {
        this.data_announcement = response.data;
      })
        .catch((err) => {
          console.log(err);
          this.$message.error(err.message);
        })
    },
  },
};
</script>
<style scoped></style>

<template>
  <div class="coin-container mx-8 my-8">
    <p class="m-0 text-2xl">
      {{ $t("markets_overview")
      }}
    </p>
    <div class="mt-6 flex justify-around flex-wrap">
      <TopTier v-if="!!top_nvt" class="mb-12" title="Top NVT" :table-data="top_nvt" :loading="!top_nvt" />
      <TopTier v-if="!!top_volume" class="mb-12" title="Top volume" :table-data="top_volume" :loading="!top_volume" />
      <TopTier v-if="!!top_increase_24h" class="mb-12" title="Top tăng giá 24H" :table-data="top_increase_24h" :loading="!top_increase_24h" />
      <TopTier v-if="!!top_decrease_24h" class="mb-12" title="Top giảm giá 24H" :table-data="top_decrease_24h" :loading="!top_decrease_24h" />
      <TopTier v-if="!!top_increase_7d" class="mb-12" title="Top tăng giá 7D" :table-data="top_increase_7d" :loading="!top_increase_7d" />
      <TopTier v-if="!!top_decrease_7d" class="mb-12" title="Top giảm giá 7D" :table-data="top_decrease_7d" :loading="!top_decrease_7d" />
    </div>
  </div>
</template>

<script>
import TopTier from './components/TopTier.vue'
import CoinResource from "@/api/coin";
const coinResource = new CoinResource();

export default {
  name: "Home",
  components: {
    TopTier
  },
  data() {
    return {
      top_nvt: null,
      top_volume: null,
      top_increase_24h: null,
      top_decrease_24h: null,
      top_increase_7d: null,
      top_decrease_7d: null,
      queryObj: {
        page: 1,
        limit: 10
      },
    };
  },
  async mounted() {
    const query_top_increase_24h = {
      ...this.queryObj,
      order: "change_24h",
      sort_by: "desc"
    }
    const query_top_decrease_24h = {
      ...this.queryObj,
      order: "change_24h",
      sort_by: "asc"
    }
    const query_top_increase_7d = {
      ...this.queryObj,
      order: "change_7d",
      sort_by: "desc"
    }
    const query_top_decrease_7d = {
      ...this.queryObj,
      order: "change_7d",
      sort_by: "asc"
    }
    const query_top_volume = {
      ...this.queryObj,
      order: "volume",
      sort_by: "desc"
    }
    const query_top_nvt = {
      ...this.queryObj,
      order: "change_7d",
      sort_by: "asc"
    }
    this.top_increase_24h = await this.get_list_coin(query_top_increase_24h);
    this.top_decrease_24h = await this.get_list_coin(query_top_decrease_24h);
    this.top_increase_7d = await this.get_list_coin(query_top_increase_7d);
    this.top_decrease_7d = await this.get_list_coin(query_top_decrease_7d);
    this.top_volume = await this.get_list_coin(query_top_volume);
    this.top_nvt = await this.get_list_coin(query_top_nvt);
  },
  methods: {
    get_list_coin(queryObj) {
      return new Promise((resolve, reject) => {
        coinResource
          .list_coin(queryObj)
          .then((response) => {
            if (response.statusCode !== 200) throw new Error(response.message);
            resolve(response.data.data);
          })
          .catch((err) => {
            console.log(err);
            this.$message.error(err.message);
            reject(err);
          })
      });
    },
  }
};
</script>

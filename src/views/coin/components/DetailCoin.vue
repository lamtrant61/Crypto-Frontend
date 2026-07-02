<template>
  <el-dialog
    :title="dialog_name"
    :visible.sync="showDialog"
    :before-close="handleClose"
    :close-on-click-modal="true"
  >
    <p>{{ $t('code') }}: <span>{{ coin.code }}</span></p>
  </el-dialog>
</template>
<script>
export default {
  name: 'DetailCoin',
  props: {
    coin: {
      type: Object,
      required: true
    },
    showDialog: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      dialog_name: ''
    }
  },
  mounted() {
    this.dialog_name = this.$t('detail') + ' ' + this.coin.name
  },
  methods: {
    handleClose() {
      this.$emit('emit-close-detail')
    }
  }
}
</script>

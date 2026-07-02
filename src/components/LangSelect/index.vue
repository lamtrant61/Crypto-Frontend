<template>
  <el-dropdown trigger="click" class="international" @command="handleSetLanguage">
    <div style="display: ruby-base;">
      <span style="margin-right: 5px">{{ $t('trans') }}</span>
      <svg-icon class-name="international-icon" icon-class="language" />
    </div>
    <el-dropdown-menu slot="dropdown">
      <el-dropdown-item style="display: block ruby;" :disabled="language==='vi'" command="vi">
        <img width="15" height="10" style="margin-right: 5px" :src="logo" class="sidebar-logo">
        Việt Nam
      </el-dropdown-item>
      <!-- <el-dropdown-item style="display: block ruby;" :disabled="language==='en'" command="en">
        <img width="15" height="10" style="margin-right: 5px" :src="logo1" class="sidebar-logo">
        English
      </el-dropdown-item> -->
      <!--      <el-dropdown-item :disabled="language==='zh'" command="zh">-->
      <!--        中文-->
      <!--      </el-dropdown-item>-->
      <!--      <el-dropdown-item :disabled="language==='es'" command="es">-->
      <!--        Español-->
      <!--      </el-dropdown-item>-->
      <!--      <el-dropdown-item :disabled="language==='ja'" command="ja">-->
      <!--        日本語-->
      <!--      </el-dropdown-item>-->
    </el-dropdown-menu>
  </el-dropdown>
</template>

<script>

import I18n from '../../lang/i18n'
import iconVnImage from '@/assets/images/vn.png'
import iconEnImage from '@/assets/images/gb.png'

export default {
  name: 'LangSelect',
  data() {
    return {
      logo: iconVnImage,
      logo1: iconEnImage,
      choose: false
    }
  },
  computed: {
    language() {
      console.log(this.$store.getters.language, 'lang')
      return 'vi' // this.$store.getters.language
    }
  },
  methods: {
    handleSetLanguage(lang) {
      I18n.locale = lang
      if (lang) {
        this.choose = false
      }
      console.log('.................lang ', lang)
      this.$store.dispatch('app/setLanguage', lang)
      // this.$message({
      //   message: 'Switch Language Success',
      //   type: 'success'
      // })
    }
  }
}
</script>

<style scoped>
</style>

<template>
  <div id="app">
    <router-view />
  </div>

</template>

<script>

// import { getToken } from '@/utils/auth'
// import { MessageBox } from 'element-ui'
// import store from '@/store'

export default {
  name: 'App',
  created() {
    // if (!getToken()) {
    //   // to re-login
    //   MessageBox.confirm('You have been logged out, you can cancel to stay on this page, or log in again', 'Confirm logout', {
    //     confirmButtonText: 'Re-Login',
    //     cancelButtonText: 'Cancel',
    //     type: 'warning'
    //   }).then(() => {
    //     store.dispatch('user/resetToken').then(() => {
    //   location.reload()
    //     })
    //   })
    // }
  }
}
</script>

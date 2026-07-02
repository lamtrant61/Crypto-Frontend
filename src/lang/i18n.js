import Vue from 'vue'
import VueI18n from 'vue-i18n'
import vn from './vn.json'
import en from './en.json'
// import Cookies from 'js-cookie'

Vue.use(VueI18n)

const messages = {
  'en': en,
  'vi': vn
}
export function getLanguage() {
  // const chooseLanguage = Cookies.get('language')
  // if (chooseLanguage) return chooseLanguage

  // // if has not choose language
  // const language = (navigator.language || navigator.browserLanguage).toLowerCase()
  // const locales = Object.keys(messages)
  // for (const locale of locales) {
  //   if (language.indexOf(locale) > -1) {
  //     return locale
  //   }
  // }
  return 'vi'
}
// eslint-disable-next-line no-unused-vars
const i18n = new VueI18n({
  locale: getLanguage(), // 'vi',   set locale
  fallbackLocale: 'vi', // set fallback locale
  messages // set locale messages
})

export default i18n
